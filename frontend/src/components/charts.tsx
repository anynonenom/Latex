'use client';

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function WorkDistributionChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="h-72 bg-slate-900 border border-slate-800 rounded-2xl p-4">
      <h3 className="mb-3 font-medium">Work Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} fill="#6366F1" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TeamHeatmap({ data }: { data: { day: string; minutes: number }[] }) {
  return (
    <div className="h-72 bg-slate-900 border border-slate-800 rounded-2xl p-4">
      <h3 className="mb-3 font-medium">Team Activity Heatmap</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="day" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />
          <Bar dataKey="minutes" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
