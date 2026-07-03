// src/components/shared/LegalPage.tsx

export type LegalBlock =
  | { type: "paragraph"; text: string; linkEmail?: string }
  | { type: "list"; intro?: string; items: string[] }
  | { type: "subheading"; text: string };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

type Props = {
  eyebrow: string;
  title: string;
  sections: LegalSection[];
};

function renderParagraphText(text: string, email?: string) {
  if (!email || !text.includes(email)) return text;

  const [before, after] = text.split(email);

  return (
    <>
      {before}
      <a
        href={`mailto:${email}`}
        className="font-medium text-[var(--koalit-blue)] underline underline-offset-2 hover:text-[var(--koalit-gold-hover)]"
      >
        {email}
      </a>
      {after}
    </>
  );
}

function LegalBlockView({ block, index }: { block: LegalBlock; index: number }) {
  if (block.type === "paragraph") {
    return (
      <p className="mt-3 whitespace-pre-line leading-8 text-[var(--koalit-text)]">
        {renderParagraphText(block.text, block.linkEmail)}
      </p>
    );
  }

  if (block.type === "subheading") {
    return (
      <h3 className="mt-6 text-base font-semibold text-[var(--koalit-blue)]">
        {block.text}
      </h3>
    );
  }

  return (
    <div className={index === 0 ? "" : "mt-3"}>
      {block.intro && (
        <p className="leading-8 text-[var(--koalit-text)]">{block.intro}</p>
      )}
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[var(--koalit-text)]">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function LegalPage({ eyebrow, title, sections }: Props) {
  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 pb-24 pt-32">
      <section className="mx-auto max-w-[680px]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--koalit-gold)]">
          {eyebrow}
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--koalit-blue)] md:text-5xl">
          {title}
        </h1>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-semibold text-[var(--koalit-blue)]">
                {section.heading}
              </h2>

              {section.blocks.map((block, index) => (
                <LegalBlockView key={index} block={block} index={index} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
