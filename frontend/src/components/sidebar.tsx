import Link from 'next/link';

const links = [
  ['Dashboard', '/dashboard'],
  ['Sessions', '/sessions'],
  ['Decisions', '/decisions'],
  ['Friction', '/friction'],
  ['Reports', '/reports'],
  ['Team', '/team'],
];

export function Sidebar() {
  return (
    <aside className="hidden md:block h-screen sticky top-0 w-64 border-r border-slate-800 p-4">
      <h1 className="text-xl font-semibold mb-6">DEV Intelligence</h1>
      <nav className="space-y-2">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="block px-3 py-2 rounded-lg hover:bg-slate-800 transition">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
