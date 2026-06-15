"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  label?: string;
};

export function BackButton({ label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-zinc-950/70 px-3 text-sm font-medium text-zinc-300 transition-colors hover:border-green-400/40 hover:bg-zinc-900 hover:text-green-300"
    >
      <span aria-hidden="true">←</span>
      {label}
    </button>
  );
}
