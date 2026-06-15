import type { Progression } from "@/types/music";

type ProgressionCardProps = {
  progression: Progression;
};

export function ProgressionCard({ progression }: ProgressionCardProps) {
  return (
    <div className="apple-surface rounded-lg border border-white/10 p-5 transition duration-500 hover:-translate-y-0.5 hover:border-green-400/40">
      <div className="flex flex-wrap items-center gap-3">
        {progression.map((chord, index) => (
          <span key={`${chord}-${index}`} className="flex items-center gap-3">
            <span className="rounded-md bg-black/80 px-4 py-2 text-lg font-semibold text-zinc-50 ring-1 ring-white/10">
              {chord}
            </span>
            {index < progression.length - 1 ? <span className="text-zinc-600">&rarr;</span> : null}
          </span>
        ))}
      </div>
    </div>
  );
}
