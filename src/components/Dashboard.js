import React, { useState } from "react";
import { useDashboard } from "../store/dashboardStore";
import CategorySection from "./CategorySection";
import GlobalAddWidgetDrawer from "./GlobalAddWidgetDrawer";

export default function Dashboard() {
  const { state } = useDashboard();
  const [open, setOpen] = useState(false);

  return (
    <div className="px-6 pb-20">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          CNAPP Dashboard
        </h2>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-lg px-5 py-2 shadow-sm font-medium"
          onClick={() => setOpen(true)}
        >
          + Add Widget
        </button>
      </header>

      {/* Category sections */}
      <main className="mt-6 space-y-10">
        {state.categories.map((cat) => (
          <CategorySection key={cat.id} category={cat} />
        ))}
      </main>

      {/* Drawer for global widget add */}
      <GlobalAddWidgetDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}