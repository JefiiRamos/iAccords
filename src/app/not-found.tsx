import Link from "next/link";
import { BackButton } from "@/components/BackButton";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-3xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
      <p className="text-sm font-medium uppercase text-green-400">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-zinc-50">Nothing to play here</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
        This key or chord is not available in the local iAccords library yet.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <BackButton />
        <Link
          href="/"
          className="rounded-md bg-green-500 px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-400"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
