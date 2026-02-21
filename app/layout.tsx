import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sports Facts Dashboard",
  description: "NBA facts dashboard — games, injuries, and status tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <header className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <nav className="max-w-5xl mx-auto flex items-center justify-between">
            <span className="font-bold tracking-tight text-lg">
              Sports Facts Dashboard
            </span>
            <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
              <a href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Games
              </a>
              <a href="/injuries" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Injuries
              </a>
              <a href="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                About
              </a>
            </div>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 text-center text-xs text-gray-400 mt-12">
          Data provided by API-NBA (API-Sports via RapidAPI). Informational purposes only.
        </footer>
      </body>
    </html>
  );
}
