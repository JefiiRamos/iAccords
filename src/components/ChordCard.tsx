import Link from "next/link";
import type { Degree } from "@/types/music";

type ChordCardProps = {
  degree: Degree;
};

export function ChordCard({ degree }: ChordCardProps) {
  return (
    <Link
      href={`/chord/${encodeURIComponent(degree.chord)}`}
      className="apple-surface group rounded-lg border border-white/10 p-5 transition duration-500 hover:-translate-y-1 hover:border-green-400/40"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-sm text-zinc-500">{degree.degree}</span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-400 transition-colors group-hover:bg-green-400/15 group-hover:text-green-300">
          View
        </span>
      </div>
      <p className="mt-10 text-5xl font-semibold text-zinc-50">{degree.chord}</p>
    </Link>
  );
}
