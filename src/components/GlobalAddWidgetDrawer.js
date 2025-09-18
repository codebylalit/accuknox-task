import React, { useMemo, useState } from "react";
import RightDrawer from "./RightDrawer";
import { useDashboard } from "../store/dashboardStore";

export default function GlobalAddWidgetDrawer({ open, onClose }) {
  const { state, bulkSetCategoryWidgets } =
    useDashboard();
  const [activeCatId, setActiveCatId] = useState(() => state.categories[0]?.id);
  const [search, setSearch] = useState("");

  const activeCategory = useMemo(
    () =>
      state.categories.find((c) => c.id === activeCatId) || state.categories[0],
    [activeCatId, state.categories]
  );

  const checked = useMemo(
    () => new Set(activeCategory.widgets.map((w) => w.id)),
    [activeCategory]
  );

  const filteredLibrary = state.library.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  function toggleWidget(id) {
    const next = new Set(checked);
    next.has(id) ? next.delete(id) : next.add(id);
    bulkSetCategoryWidgets(activeCategory.id, Array.from(next));
  }

  return (
    <RightDrawer open={open} onClose={onClose} title="Add Widget">
      <div className="flex flex-col h-full">
        {/* Category selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {state.categories.map((c) => (
            <button
              key={c.id}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                c.id === activeCatId
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              onClick={() => setActiveCatId(c.id)}
            >
              {c.title.replace(/ Dashboard:?$/i, "")}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <input
            className="w-full border border-slate-300 rounded-lg pl-9 pr-1 py-2 text-sm outline-none transition-colors"
            placeholder="Search widgets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Scrollable widget list */}
        <div className="flex-1 overflow-auto border border-slate-200 rounded-lg divide-y divide-slate-100">
          {filteredLibrary.map((w) => (
            <label
              key={w.id}
              className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={checked.has(w.id)}
                onChange={() => toggleWidget(w.id)}
                className="rounded border-slate-300 text-indigo-600 outline-none"
              />
              <span className="flex-1">
                {w.name}
                {w.type && (
                  <span className="text-slate-500 text-xs ml-2">
                    ({w.type})
                  </span>
                )}
              </span>
            </label>
          ))}
          {filteredLibrary.length === 0 && (
            <div className="p-6 text-center text-slate-500 text-sm">
              No widgets found. Try another search.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-slate-200 mt-4">
          <button
            type="button"
            className="rounded-lg px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors"
            onClick={onClose}
          >
            Confirm
          </button>
        </div>
      </div>
    </RightDrawer>
  );
}