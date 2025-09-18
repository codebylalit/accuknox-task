import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import config from "../data/widgets.json";

const STORAGE_KEY = "accuknox-dashboard-state-v2";

function withMigratedTypes(stateFromStorage) {
  const idToConfigWidget = new Map(
    (config.library || []).map((w) => [w.id, w])
  );

  const migrateWidget = (w) => {
    const src = idToConfigWidget.get(w.id);
    if (src && src.type && !w.type) {
      return { ...w, type: src.type };
    }
    return w;
  };

  const library = (stateFromStorage.library || []).map(migrateWidget);
  const categories = (stateFromStorage.categories || []).map((cat) => ({
    ...cat,
    widgets: (cat.widgets || []).map(migrateWidget),
  }));

  return { ...stateFromStorage, library, categories };
}

const initialState = (() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return withMigratedTypes(JSON.parse(saved));
    } catch (e) {}
  }
  return config;
})();

function reducer(state, action) {
  switch (action.type) {
    case "ADD_WIDGET_TO_CATEGORY": {
      const { categoryId, widget } = action.payload;
      const categories = state.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, widget] }
          : cat
      );
      const library = mergeLibrary(state.library, widget);
      return { ...state, categories, library };
    }
    case "REMOVE_WIDGET_FROM_CATEGORY": {
      const { categoryId, widgetId } = action.payload;
      const categories = state.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter((w) => w.id !== widgetId) }
          : cat
      );
      return { ...state, categories };
    }
    case "BULK_SET_CATEGORY_WIDGETS": {
      const { categoryId, widgetIds } = action.payload;
      const selected = state.library.filter((w) => widgetIds.includes(w.id));
      const categories = state.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, widgets: selected } : cat
      );
      return { ...state, categories };
    }
    case "ADD_TO_LIBRARY": {
      const { widget } = action.payload;
      const library = mergeLibrary(state.library, widget);
      return { ...state, library };
    }
    default:
      return state;
  }
}

function mergeLibrary(library, widget) {
  const exists = library.some((w) => w.id === widget.id);
  return exists ? library : [...library, widget];
}

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const api = useMemo(
    () => ({
      state,
      addWidgetToCategory: (categoryId, widget) =>
        dispatch({
          type: "ADD_WIDGET_TO_CATEGORY",
          payload: { categoryId, widget },
        }),
      removeWidgetFromCategory: (categoryId, widgetId) =>
        dispatch({
          type: "REMOVE_WIDGET_FROM_CATEGORY",
          payload: { categoryId, widgetId },
        }),
      bulkSetCategoryWidgets: (categoryId, widgetIds) =>
        dispatch({
          type: "BULK_SET_CATEGORY_WIDGETS",
          payload: { categoryId, widgetIds },
        }),
      addToLibrary: (widget) =>
        dispatch({ type: "ADD_TO_LIBRARY", payload: { widget } }),
    }),
    [state]
  );

  return (
    <DashboardContext.Provider value={api}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
