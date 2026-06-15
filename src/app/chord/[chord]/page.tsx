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
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <section className="space-y-10">
        <div className="space-y-6">
          <BackButton />
          <SectionTitle
            eyebrow="Chord"
            title={decodedChord}
            description="Inspect the chord tones, its most common harmonic role and progressions that place it in motion."
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-6">
            <dl className="space-y-7">
              <div>
                <dt className="text-sm font-medium uppercase text-zinc-500">Notes</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {chordData.notes.map((note) => (
                    <span key={note} className="rounded-md border border-green-400/20 bg-green-400/10 px-3 py-2 text-lg font-semibold text-green-300">
                      {note}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium uppercase text-zinc-500">Degree</dt>
                <dd className="mt-2 font-mono text-2xl text-zinc-50">{chordData.degree}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium uppercase text-zinc-500">Harmonic Function</dt>
                <dd className="mt-2 text-2xl font-semibold text-zinc-50">{chordData.function}</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-50">Common progressions</h2>
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
