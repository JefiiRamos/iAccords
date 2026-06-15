type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-sm font-medium uppercase text-green-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-normal text-zinc-50 sm:text-3xl">{title}</h2>
      {description ? <p className="max-w-2xl text-base leading-7 text-zinc-400">{description}</p> : null}
    </div>
  );
}
