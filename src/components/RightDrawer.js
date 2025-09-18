import React, { useEffect } from "react";

export default function RightDrawer({
  open,
  title,
  children,
  onClose,
  width = 420,
}) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[1200] ${open ? "" : "pointer-events-none"}`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full bg-white shadow-2xl rounded-l-xl flex flex-col transform transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width }}
      >
        <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <h4 className="m-0 text-slate-800 font-semibold">{title}</h4>
          <button
            className="bg-slate-100 hover:bg-slate-200 rounded px-2"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className="p-3 overflow-auto flex-1">{children}</div>
      </aside>
    </div>
  );
}
