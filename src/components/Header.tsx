import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-11 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2" aria-label="iAccords home">
          <span className="flex size-7 items-center justify-center rounded-md bg-zinc-100 text-[11px] font-semibold text-black transition-colors group-hover:bg-green-400">
            iA
          </span>
          <span className="text-sm font-medium text-zinc-100">iAccords</span>
        </Link>
        <nav className="hidden items-center gap-7 text-xs text-zinc-400 sm:flex" aria-label="Main navigation">
          <Link href="/" className="transition-colors hover:text-zinc-100">
            Explore
          </Link>
          <Link href="/key/C" className="transition-colors hover:text-zinc-100">
            Keys
          </Link>
          <Link href="/chord/Am" className="transition-colors hover:text-zinc-100">
            Chords
          </Link>
        </nav>
      </div>
    </header>
  );
}
