export function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
