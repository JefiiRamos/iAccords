import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { ChordCard } from "@/components/ChordCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getKey, getKeys } from "@/lib/music-data";

type KeyPageProps = {
  params: Promise<{ key: string }>;
};

export function generateStaticParams() {
  return getKeys().map((key) => ({ key }));
}

export async function generateMetadata({ params }: KeyPageProps): Promise<Metadata> {
  const { key } = await params;
  const musicKey = getKey(key);

  if (!musicKey) {
    return {
      title: "Key Not Found",
      description: "The requested musical key is not available in iAccords.",
    };
  }

  return {
    title: `${musicKey.name} Key`,
    description: `Explore the full harmonic field for ${musicKey.name}.`,
  };
}

export default async function KeyPage({ params }: KeyPageProps) {
  const { key } = await params;
  const musicKey = getKey(key);

  if (!musicKey) {
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
            eyebrow="Key"
            title={musicKey.name}
            description="Read the complete harmonic field and open each chord to inspect notes, function and common progressions."
          />
        </div>

        <div className="soft-reveal-delay mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {musicKey.degrees.map((degree) => (
            <ChordCard key={`${degree.degree}-${degree.chord}`} degree={degree} />
          ))}
        </div>
      </section>
    </div>
  );
}
