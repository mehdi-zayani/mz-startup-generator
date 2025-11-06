import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "MZ Startup Generator",
  description: "Generate unique startup ideas powered by OpenAI. Built by Mehdi Zayani.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 min-h-screen">
        <header className="w-full py-4 border-b border-neutral-200 bg-white sticky top-0 z-10">
          <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
            <h1 className="font-bold text-lg">MZ Generator</h1>
            <nav className="text-sm text-neutral-600">
              <a href="https://github.com" target="_blank" className="hover:text-black transition">
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="text-center py-6 text-neutral-400 text-sm">
          © {new Date().getFullYear()} MZ Generator – Powered by OpenAI API
        </footer>
      </body>
    </html>
  );
}
