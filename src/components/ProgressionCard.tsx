import type { Progression } from "@/types/music";

type ProgressionCardProps = {
  progression: Progression;
};

export function ProgressionCard({ progression }: ProgressionCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-5 transition duration-200 hover:border-green-400/40 hover:bg-zinc-900">
      <div className="flex flex-wrap items-center gap-3">
        {progression.map((chord, index) => (
          <span key={`${chord}-${index}`} className="flex items-center gap-3">
            <span className="rounded-md border border-white/10 bg-black px-3 py-2 text-lg font-semibold text-zinc-50">
              {chord}
            </span>
            {index < progression.length - 1 ? <span className="text-zinc-600">→</span> : null}
          </span>
        ))}
      </div>
    </div>
  );
}
