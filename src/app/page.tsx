"use client";
import { useState } from "react";

export default function HomePage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");

  const generateIdea = async () => {
    setLoading(true);
    setIdea("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      setIdea(data.idea || "No idea generated.");
    } catch (error) {
      setIdea("Error generating idea.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">🚀 Startup Idea Generator</h1>

      <p className="text-neutral-600 mb-6 text-center max-w-md">
        Type a topic or leave empty to get a random startup idea powered by AI.
      </p>

      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. health tech, music, education..."
          className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
        />
        <button
          onClick={generateIdea}
          disabled={loading}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className="w-full max-w-2xl text-left">
        {loading && (
          <p className="text-neutral-500 text-center animate-pulse">
            Thinking of something brilliant...
          </p>
        )}

        {idea && !loading && (
          <div className="bg-white p-6 rounded-xl shadow-md text-neutral-800 whitespace-pre-line leading-relaxed">
            {idea}
          </div>
        )}
      </div>
    </main>
  );
}
