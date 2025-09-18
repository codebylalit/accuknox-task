import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function WidgetCard({ widget, onRemove }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 text-left">
      <div className="flex items-center justify-between">
        <h4 className="m-0 text-sm font-semibold text-slate-800">
          {widget.name}
        </h4>
        {onRemove && (
          <button
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 rounded px-2 py-0.5"
            aria-label="remove"
            onClick={onRemove}
          >
            ×
          </button>
        )}
      </div>
      <div className="mt-3 text-slate-600 text-sm">
        {widget.type === "pie" && <PieDemo />}
        {widget.type === "bar" && <BarDemo />}
        {widget.type === "line" && <LineDemo />}
        {!widget.type && <p className="m-0">{widget.text}</p>}
      </div>
    </div>
  );
}

const PIE_COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

function PieDemo() {
  const data = [
    { name: "Passed", value: 72 },
    { name: "Warning", value: 15 },
    { name: "Failed", value: 10 },
    { name: "Other", value: 3 },
  ];
  return (
    <div className="w-full h-40">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={60}
            paddingAngle={2}
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function BarDemo() {
  const data = [
    { name: "Mon", uv: 30 },
    { name: "Tue", uv: 60 },
    { name: "Wed", uv: 45 },
    { name: "Thu", uv: 80 },
    { name: "Fri", uv: 55 },
  ];
  return (
    <div className="w-full h-40">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" hide />
          <Tooltip />
          <Bar dataKey="uv" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function LineDemo() {
  const data = [
    { name: 0, uv: 20 },
    { name: 1, uv: 28 },
    { name: 2, uv: 26 },
    { name: 3, uv: 40 },
    { name: 4, uv: 32 },
    { name: 5, uv: 52 },
  ];
  return (
    <div className="w-full h-40">
      <ResponsiveContainer>
        <LineChart data={data}>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#0e1a47"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
