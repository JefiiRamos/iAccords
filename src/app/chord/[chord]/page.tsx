import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { ProgressionCard } from "@/components/ProgressionCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getChord, getChordNames, getProgressions } from "@/lib/music-data";

type ChordPageProps = {
  params: Promise<{ chord: string }>;
};

export function generateStaticParams() {
  return getChordNames().map((chord) => ({ chord }));
}

export async function generateMetadata({ params }: ChordPageProps): Promise<Metadata> {
  const { chord } = await params;
  const chordData = getChord(chord);
  const decodedChord = decodeURIComponent(chord);

  if (!chordData) {
    return {
      title: "Chord Not Found",
      description: "The requested chord is not available in iAccords.",
    };
  }

  return {
    title: `${decodedChord} Chord`,
    description: `Explore notes, harmonic function and common progressions for ${decodedChord}.`,
  };
}

export default async function ChordPage({ params }: ChordPageProps) {
  const { chord } = await params;
  const decodedChord = decodeURIComponent(chord);
  const chordData = getChord(chord);
  const progressions = getProgressions(chord);

  if (!chordData) {
    notFound();
  }

  return (
    <div className="bg-black">
      <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="soft-reveal space-y-8 text-center">
          <div className="text-left">
            <BackButton />
          </div>
          <SectionTitle
            eyebrow="Chord"
            title={decodedChord}
            description="Inspect the chord tones, its most common harmonic role and progressions that place it in motion."
          />
        </div>

        <div className="soft-reveal-delay mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="apple-surface rounded-lg border border-white/10 p-6 sm:p-8">
            <dl className="grid gap-7">
              <div>
                <dt className="text-sm font-semibold text-zinc-500">Notes</dt>
                <dd className="mt-4 flex flex-wrap gap-2">
                  {chordData.notes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full bg-green-400 px-4 py-2 text-lg font-semibold text-black"
                    >
                      {note}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-black/65 p-5 ring-1 ring-white/10">
                  <dt className="text-sm font-semibold text-zinc-500">Degree</dt>
                  <dd className="mt-3 font-mono text-4xl text-zinc-50">{chordData.degree}</dd>
                </div>
                <div className="rounded-lg bg-black/65 p-5 ring-1 ring-white/10">
                  <dt className="text-sm font-semibold text-zinc-500">Function</dt>
                  <dd className="mt-3 text-3xl font-semibold text-zinc-50">{chordData.function}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-zinc-50">Common progressions</h2>
            <div className="grid gap-3">
              {progressions.map((progression, index) => (
                <ProgressionCard key={`${decodedChord}-progression-${index}`} progression={progression} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
