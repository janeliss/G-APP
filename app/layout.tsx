import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sports Facts Dashboard",
  description: "NBA facts — games, injuries, and status tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-white min-h-dvh flex flex-col">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-navy-950/90 backdrop-blur border-b border-white/5 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-black text-xl tracking-tight">●</span>
              <span className="font-bold text-base tracking-tight">Sports Facts</span>
            </div>
            <span className="text-xs text-slate-500 bg-navy-800 px-2.5 py-1 rounded-full border border-white/5">
              NBA
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 pb-28 pt-5">
          {children}
        </main>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-navy-900/95 backdrop-blur border-t border-white/5">
          <div className="max-w-2xl mx-auto flex items-center justify-around px-4 py-3">

            <a href="/" className="flex flex-col items-center gap-0.5 group">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-accent-green transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5-8l2 2" />
              </svg>
              <span className="text-[10px] text-slate-400 group-hover:text-accent-green transition-colors font-medium">Home</span>
            </a>

            <a href="/injuries" className="flex flex-col items-center gap-0.5 group">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-accent-green transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-[10px] text-slate-400 group-hover:text-accent-green transition-colors font-medium">Injuries</span>
            </a>

            <a href="/about" className="flex flex-col items-center gap-0.5 group">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-accent-green transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              </svg>
              <span className="text-[10px] text-slate-400 group-hover:text-accent-green transition-colors font-medium">About</span>
            </a>

          </div>
        </nav>

      </body>
    </html>
  );
}
