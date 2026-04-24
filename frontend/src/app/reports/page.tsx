const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000/api';

export default function ReportsPage() {
  const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const to = new Date().toISOString().slice(0, 10);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xl">
      <h1 className="text-2xl font-semibold mb-2">Reports Export</h1>
      <p className="text-slate-400 mb-4">Generate PDF reports for daily, weekly, or custom date ranges.</p>
      <a className="inline-block bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-lg" href={`${API_BASE}/reports/export?from=${from}&to=${to}`}>
        Download weekly report
      </a>
    </div>
  );
}
