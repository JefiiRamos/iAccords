"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { KeyOption } from "@/types/music";

type KeySelectorProps = {
  keys: KeyOption[];
};

export function KeySelector({ keys }: KeySelectorProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [selectedKey, setSelectedKey] = useState(keys[0]?.value ?? "C");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const selectedOption = keys.find((key) => key.value === selectedKey) ?? keys[0];

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function exploreKey() {
    startTransition(() => {
      router.push(`/key/${encodeURIComponent(selectedKey)}`);
    });
  }

  function moveSelection(direction: 1 | -1) {
    const currentIndex = keys.findIndex((key) => key.value === selectedKey);
    const nextIndex = (currentIndex + direction + keys.length) % keys.length;
    setSelectedKey(keys[nextIndex]?.value ?? selectedKey);
  }

  return (
    <div
      ref={rootRef}
      className="apple-surface relative flex w-full flex-col gap-3 rounded-lg border border-white/10 p-3 sm:max-w-xl sm:flex-row"
    >
      <div className="relative flex-1">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setIsOpen(true);
              moveSelection(1);
            }

            if (event.key === "ArrowUp") {
              event.preventDefault();
              setIsOpen(true);
              moveSelection(-1);
            }

            if (event.key === "Escape") {
              setIsOpen(false);
            }
          }}
          className="flex h-12 w-full items-center justify-between rounded-md border border-white/10 bg-black/80 px-4 text-left outline-none transition duration-300 hover:border-white/20 focus:border-green-400"
        >
          <span className="grid gap-0.5">
            <span className="block text-xs font-medium text-zinc-500">Choose a key</span>
            <span className="block text-base font-semibold text-zinc-50">{selectedOption?.label}</span>
          </span>
          <span
            aria-hidden="true"
            className={`text-zinc-500 transition duration-300 ${isOpen ? "rotate-180 text-green-400" : ""}`}
          >
            ▾
          </span>
        </button>

        {isOpen ? (
          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-lg border border-white/10 bg-[#161618]/95 p-1 shadow-2xl shadow-black/50 backdrop-blur-2xl">
            <div role="listbox" aria-label="Choose a key" className="max-h-72 overflow-y-auto p-1">
              {keys.map((key) => {
                const isSelected = key.value === selectedKey;

                return (
                  <button
                    key={key.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedKey(key.value);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition duration-200 ${
                      isSelected ? "bg-green-400 text-black" : "text-zinc-200 hover:bg-white/10"
                    }`}
                  >
                    <span className="font-medium">{key.label}</span>
                    <span className={`font-mono text-xs ${isSelected ? "text-black/60" : "text-zinc-500"}`}>
                      {key.value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={exploreKey}
        disabled={isPending}
        className="h-12 rounded-full bg-green-500 px-6 text-sm font-semibold text-black transition duration-300 hover:bg-green-400 disabled:cursor-wait disabled:bg-green-500/60 sm:min-w-36"
      >
        {isPending ? "Loading..." : "Explore"}
      </button>
    </div>
  );
}
