import './globals.css';
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <div className="flex">
            <Sidebar />
            <main className="w-full">
              <Header />
              <div className="p-6">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
