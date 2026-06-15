export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
      <div className="h-4 w-28 animate-pulse rounded bg-green-400/20" />
      <div className="mt-5 h-12 max-w-xl animate-pulse rounded bg-white/10" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-lg border border-white/10 bg-zinc-950/70" />
        ))}
      </div>
    </div>
  );
}
