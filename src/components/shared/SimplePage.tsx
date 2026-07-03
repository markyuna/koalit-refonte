// src/components/shared/SimplePage.tsx

import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export default function SimplePage({ title, description }: Props) {
  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 py-28">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--koalit-blue)] md:text-5xl">
          {title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-700">
          {description}
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-full bg-[var(--koalit-blue)] px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Nous contacter
        </Link>
      </section>
    </main>
  );
}
