import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Startup Idea Generator",
  description: "Generate unique startup ideas instantly with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 min-h-screen flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
