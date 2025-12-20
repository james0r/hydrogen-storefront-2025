export default function SomeExampleComponent({number}: {number: number}) {
  return (
    <div className="max-w-md mx-auto p-6 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-xl shadow-lg transform transition-shadow hover:scale-105 hover:shadow-2xl text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Example Component</h3>
          <p className="mt-1 text-sm text-white/90">A polished card built with Tailwind: responsive spacing, subtle animations, and a clear number badge.</p>
        </div>
        <div className="shrink-0">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-xl font-bold">{number}</span>
        </div>
      </div>
      <div>{number}</div>
      <div className="mt-4 flex items-center gap-3">
        <button type="button" className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/20 rounded-md text-sm font-medium transition">
          Action
        </button>

        <a href="/" className="ml-auto text-sm underline hover:text-white/90">Learn more →</a>
      </div>
    </div>
  );
}
