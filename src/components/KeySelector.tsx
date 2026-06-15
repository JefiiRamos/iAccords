"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { KeyOption } from "@/types/music";

type KeySelectorProps = {
  keys: KeyOption[];
};

export function KeySelector({ keys }: KeySelectorProps) {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState(keys[0]?.value ?? "C");
  const [isPending, startTransition] = useTransition();

  function exploreKey() {
    startTransition(() => {
      router.push(`/key/${encodeURIComponent(selectedKey)}`);
    });
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-white/10 bg-zinc-950/70 p-3 shadow-2xl shadow-black/30 sm:max-w-lg sm:flex-row">
      <label className="sr-only" htmlFor="key-selector">
        Select a key
      </label>
      <select
        id="key-selector"
        value={selectedKey}
        onChange={(event) => setSelectedKey(event.target.value)}
        className="h-12 flex-1 rounded-md border border-white/10 bg-black px-4 text-base font-medium text-zinc-50 outline-none transition-colors hover:border-white/20 focus:border-green-400"
      >
        {keys.map((key) => (
          <option key={key.value} value={key.value}>
            {key.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={exploreKey}
        disabled={isPending}
        className="h-12 rounded-md bg-green-500 px-5 text-sm font-semibold text-black transition duration-200 hover:bg-green-400 disabled:cursor-wait disabled:bg-green-500/60 sm:min-w-32"
      >
        {isPending ? "Loading..." : "Explore"}
      </button>
    </div>
  );
}
