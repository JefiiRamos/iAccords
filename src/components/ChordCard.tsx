import Link from "next/link";
import type { Degree } from "@/types/music";

type ChordCardProps = {
  degree: Degree;
};

export function ChordCard({ degree }: ChordCardProps) {
  return (
    <Link
      href={`/chord/${encodeURIComponent(degree.chord)}`}
      className="group rounded-lg border border-white/10 bg-zinc-950/70 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-green-400/50 hover:bg-zinc-900 hover:shadow-[0_18px_60px_rgba(34,197,94,0.1)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-sm text-zinc-500">{degree.degree}</span>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-500 transition-colors group-hover:border-green-400/30 group-hover:text-green-300">
          Open
        </span>
      </div>
      <p className="mt-7 text-4xl font-semibold tracking-normal text-zinc-50">{degree.chord}</p>
    </Link>
  );
}
