"use client";

import { motion } from "framer-motion";
import { Check, Copy, Lightbulb, Loader2 } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [theme, setTheme] = useState("");
  const [idea, setIdea] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [svgSeed, setSvgSeed] = useState(Math.random());

  const generateIdea = async () => {
    if (!theme.trim()) {
      setIdea("Please enter a topic before generating.");
      return;
    }

    setLoading(true);
    setIdea(null);
    setCopied(false);
    setSvgSeed(Math.random());

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: theme }),
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

  // Génération d’un SVG abstrait basé sur le seed (lié au thème)
  const renderSVG = () => {
    const hue = Math.floor(svgSeed * 360);
    const shapes = Array.from({ length: 6 }, (_, i) => {
      const x = Math.random() * 300;
      const y = Math.random() * 150;
      const r = Math.random() * 50 + 10;
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={`hsl(${(hue + i * 60) % 360}, 70%, 60%)`}
          fillOpacity="0.3"
        />
      );
    });

    return (
      <svg
        viewBox="0 0 300 150"
        className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20"
      >
        {shapes}
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 min-h-[90vh] text-center bg-neutral-50 dark:bg-neutral-900 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <Lightbulb className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          AI Startup Idea Generator
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Enter a topic or keyword and let AI craft a unique startup concept for you in seconds.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mt-10">
        <input
          type="text"
          placeholder="e.g. eco tech, comedy, travel..."
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="flex-1 px-4 py-3 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />
        <button
          onClick={generateIdea}
          disabled={loading}
          className={`px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition ${
            loading
              ? "bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed"
              : "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          }`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lightbulb size={18} />}
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className="mt-10 max-w-3xl w-full relative">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="animate-pulse text-neutral-500 dark:text-neutral-400"
          >
            Thinking of something brilliant...
          </motion.div>
        )}

        {idea && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 text-left relative overflow-hidden"
          >
            {renderSVG()}
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black dark:hover:text-white transition"
              title="Copy to clipboard"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>

            {idea.split("\n").map((line, i) => {
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <h3
                    key={i}
                    className="text-lg font-semibold text-black dark:text-white mt-4 relative z-10"
                  >
                    {line.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              return (
                <p
                  key={i}
                  className="text-neutral-700 dark:text-neutral-300 mt-2 leading-relaxed relative z-10"
                >
                  {line}
                </p>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
