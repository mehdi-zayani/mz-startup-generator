export default function HomePage() {
  return (
    <main className="text-center space-y-6">
      <h1 className="text-4xl font-bold">🚀 Startup Idea Generator</h1>
      <p className="text-neutral-600">
        Get a fresh business idea powered by AI. Click the button below to generate your next big
        thing.
      </p>
      <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-neutral-800 transition">
        Generate Idea
      </button>
    </main>
  );
}
