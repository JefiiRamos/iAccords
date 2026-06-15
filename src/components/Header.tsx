import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/45 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="iAccords home">
          <span className="flex size-9 items-center justify-center rounded-lg border border-green-400/30 bg-green-400/10 text-sm font-semibold text-green-400 shadow-[0_0_24px_rgba(34,197,94,0.16)] transition-colors group-hover:border-green-400/60">
            iA
          </span>
          <span className="text-base font-semibold tracking-normal text-zinc-50">iAccords</span>
        </Link>
        <span className="hidden text-sm text-zinc-500 sm:inline">Harmony explorer</span>
      </div>
    </header>
  );
}
