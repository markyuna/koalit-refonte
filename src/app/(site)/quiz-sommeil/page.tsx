import type { Metadata } from "next";

import QuizSommeil from "@/components/quiz/QuizSommeil";

export const metadata: Metadata = {
  title: "Quiz sommeil | Koa'lit",
  description:
    "Répondez à quelques questions pour découvrir la literie Koa'lit la mieux adaptée à votre morphologie et à vos habitudes de sommeil.",
  alternates: {
    canonical: "/quiz-sommeil",
  },
};

export default function QuizSommeilPage() {
  return (
    <main className="min-h-screen bg-[var(--koalit-cream)]">
      <QuizSommeil />
    </main>
  );
}