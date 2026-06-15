type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? <p className="text-sm font-semibold text-green-400">{eyebrow}</p> : null}
      <h2 className="text-4xl font-semibold text-zinc-50 sm:text-6xl">{title}</h2>
      {description ? <p className="max-w-3xl text-lg leading-8 text-zinc-400 sm:text-xl">{description}</p> : null}
    </div>
  );
}
