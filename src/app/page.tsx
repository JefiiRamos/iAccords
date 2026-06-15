import { KeySelector } from "@/components/KeySelector";
import { getKeyOptions } from "@/lib/music-data";

export default function Home() {
  const keys = getKeyOptions();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-6xl items-center px-5 py-16 sm:px-8">
      <section className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1.5 text-sm font-medium text-green-300">
            <span className="size-1.5 rounded-full bg-green-400" />
            iAccords
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold text-zinc-50 sm:text-6xl lg:text-7xl">
              Discover chords, harmony and progressions instantly.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400">
              Explore harmonic fields, chord tones and musical progressions in a focused interface built for practice,
              writing and quick reference.
            </p>
          </div>
          <KeySelector keys={keys} />
        </div>

        <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/30">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-sm font-medium text-zinc-400">Preview</span>
            <span className="rounded-full bg-green-400/10 px-2.5 py-1 text-xs font-medium text-green-300">G Major</span>
          </div>
          <div className="grid gap-3">
            {[
              ["I", "G"],
              ["ii", "Am"],
              ["iii", "Bm"],
              ["IV", "C"],
              ["V", "D"],
              ["vi", "Em"],
              ["vii°", "F#dim"],
            ].map(([degree, chord]) => (
              <div key={degree} className="flex items-center justify-between rounded-md bg-black/70 px-4 py-3">
                <span className="font-mono text-sm text-zinc-500">{degree}</span>
                <span className="text-lg font-semibold text-zinc-100">{chord}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
