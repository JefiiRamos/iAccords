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
      className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-medium text-zinc-100 backdrop-blur-xl transition duration-300 hover:bg-white/15 hover:text-green-300"
    >
      <span aria-hidden="true">&larr;</span>
      {label}
    </button>
  );
}
