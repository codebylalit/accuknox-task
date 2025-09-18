import React, { useState } from "react";
import WidgetCard from "./WidgetCard";
import { useDashboard } from "../store/dashboardStore";

export default function CategorySection({ category }) {
  const { removeWidgetFromCategory } = useDashboard();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <section className="my-6">
      <header className="flex items-center justify-between px-3 pt-3">
        <h3 className="text-slate-700 font-semibold tracking-tight">
          {category.title}
        </h3>
      </header>

      <div
        className="grid gap-5 p-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
        {category.widgets.map((w) => (
          <WidgetCard
            key={w.id}
            widget={w}
            onRemove={() => removeWidgetFromCategory(category.id, w.id)}
          />
        ))}
        {category.widgets.length === 0 && (
          <div className="bg-white rounded-xl p-5 text-center text-slate-500 shadow-card">
            No widgets yet. Click Add Widget.
          </div>
        )}
        <button
          className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 p-5 text-primary font-semibold hover:shadow-md"
          onClick={() => setShowAdd(true)}
        >
          + Add Widget
        </button>
      </div>

      {showAdd && (
        <AddWidgetModal
          categoryId={category.id}
          onClose={() => setShowAdd(false)}
        />
      )}
    </section>
  );
}

function AddWidgetModal({ categoryId, onClose }) {
  const { addWidgetToCategory, addToLibrary } = useDashboard();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  function submit(e) {
    e.preventDefault();
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    let inferredType = type || undefined;
    if (!inferredType) {
      if (/\bpie\b/i.test(name)) inferredType = "pie";
      else if (/\bbar\b/i.test(name)) inferredType = "bar";
      else if (/\bline\b/i.test(name)) inferredType = "line";
    }

    const widget = {
      id,
      name,
      text: text || "Sample text",
      ...(inferredType ? { type: inferredType } : {}),
    };
    addWidgetToCategory(categoryId, widget);
    addToLibrary(widget);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-100 animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal box */}
      <div className="relative bg-white rounded-xl w-[520px] max-w-[90vw] p-6 shadow-2xl transform scale-95 opacity-0 animate-modalIn">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">
          Add Widget
        </h4>
        <form onSubmit={submit} className="space-y-4">
          <label className="flex flex-col gap-1 text-sm">
            Widget name
            <input
              className="border border-slate-300 rounded-lg px-3 py-2 outline-none transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Select Chart Type
            <div className="flex gap-3 mt-2">
              {["text", "pie", "bar", "line"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`border rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    type === t
                      ? "bg-indigo-500 text-white border-indigo-500 shadow-md"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-indigo-50 hover:border-indigo-300"
                  }`}
                  onClick={() => setType(t === "text" ? "" : t)}
                >
                  {t === "text" ? "Text Only" : t.toUpperCase()}
                </button>
              ))}
            </div>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Widget text
            <textarea
              className="border border-slate-300 rounded-lg px-3 py-2 min-h-24 outline-none transition-colors resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg px-4 py-2 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 transition-colors"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}