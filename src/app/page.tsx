import { InstrumentShowcase } from "@/components/InstrumentShowcase";
import { KeySelector } from "@/components/KeySelector";
import { getKeyOptions } from "@/lib/music-data";

const previewDegrees = [
  ["I", "G"],
  ["ii", "Am"],
  ["iii", "Bm"],
  ["IV", "C"],
  ["V", "D"],
  ["vi", "Em"],
  ["vii\u00b0", "F#dim"],
];

export default function Home() {
  const keys = getKeyOptions();

  return (
    <div className="bg-black">
      <section className="relative mx-auto flex min-h-[calc(100vh-2.75rem)] w-full max-w-6xl flex-col items-center overflow-hidden px-5 pt-14 text-center sm:px-8 sm:pt-20">
        <div className="soft-reveal z-10 max-w-5xl space-y-6">
          <p className="text-lg font-semibold text-green-400">iAccords</p>
          <h1 className="text-5xl font-semibold text-zinc-50 sm:text-7xl lg:text-8xl">
            Harmony, instantly.
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-8 text-zinc-400 sm:text-2xl">
            Discover chords, harmony and progressions instantly.
          </p>
        </div>

        <div className="soft-reveal-delay z-10 mt-8 flex w-full justify-center">
          <KeySelector keys={keys} />
        </div>

        <InstrumentShowcase />
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
        <div className="apple-surface grid gap-8 rounded-lg border border-white/10 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-green-400">G Major</p>
            <h2 className="text-4xl font-semibold text-zinc-50 sm:text-5xl">A complete key at a glance.</h2>
            <p className="max-w-xl text-lg leading-8 text-zinc-400">
              Move from tonal center to chord detail without breaking your practice flow.
            </p>
          </div>
          <div className="grid gap-2">
            {previewDegrees.map(([degree, chord]) => (
              <div
                key={degree}
                className="flex items-center justify-between rounded-lg bg-black/65 px-5 py-4 ring-1 ring-white/10 transition duration-500 hover:bg-black/90 hover:ring-green-400/30"
              >
                <span className="font-mono text-sm text-zinc-500">{degree}</span>
                <span className="text-2xl font-semibold text-zinc-100">{chord}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
