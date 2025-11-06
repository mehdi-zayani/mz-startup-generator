"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [theme, setTheme] = useState("");
  const [idea, setIdea] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateIdea = async () => {
    if (!theme.trim()) {
      setIdea("Please enter a theme before generating.");
      return;
    }

    setLoading(true);
    setIdea(null);
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });

      const data = await response.json();
      setIdea(data.idea || "No idea generated.");
    } catch (err) {
      setIdea("Error generating idea. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (idea) {
      await navigator.clipboard.writeText(idea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center min-h-[80vh]">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-4">AI Startup Idea Generator</h2>
      <p className="text-neutral-600 max-w-2xl mb-8">
        Enter a theme or keyword and let AI craft a unique startup concept for you in seconds.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mb-6">
        <input
          type="text"
          placeholder="e.g. health, education, blockchain..."
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={generateIdea}
          disabled={loading}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            loading
              ? "bg-neutral-300 cursor-not-allowed"
              : "bg-black text-white hover:bg-neutral-800"
          }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className="mt-6 max-w-3xl w-full relative">
        {loading && (
          <div className="animate-pulse text-neutral-500">Thinking of something brilliant...</div>
        )}

        {idea && (
          <div className="mt-6 bg-white shadow-sm border border-neutral-200 rounded-2xl p-6 text-left whitespace-pre-line fade-in relative">
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black transition"
              title="Copy to clipboard"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            {idea}
          </div>
        )}
      </div>
    </div>
  );
}
