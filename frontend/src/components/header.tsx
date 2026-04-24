export function Header() {
  return (
    <header className="border-b border-slate-800 p-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">Developer Behavior Intelligence Platform</h2>
        <p className="text-sm text-slate-400">Invisible work. Visible outcomes.</p>
      </div>
      <button className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-lg">New Session</button>
    </header>
  );
}
