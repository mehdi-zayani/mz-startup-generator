import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Startup Idea Generator",
  description: "Generate creative, funny, and random startup ideas in seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
