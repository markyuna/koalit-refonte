// src/components/quiz/QuizSommeil.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import { useMemo, useState } from "react";

type Question = {
  id: string;
  question: string;
  options: string[];
};

type Result = {
  title: string;
  description: string;
  mattressAdvice: string;
  baseAdvice: string;
  pillowAdvice: string;
};

const questions: Question[] = [
  {
    id: "sleepingWith",
    question: "Dormez-vous seul ou à deux ?",
    options: ["Seul", "À deux"],
  },
  {
    id: "position",
    question: "Quelle est votre position de sommeil ?",
    options: ["Dos", "Côté", "Ventre"],
  },
  {
    id: "comfort",
    question: "Quel niveau de confort préférez-vous ?",
    options: ["Ferme", "Équilibré", "Moelleux"],
  },
  {
    id: "backPain",
    question: "Souffrez-vous de douleurs dorsales ?",
    options: ["Oui", "Non"],
  },
  {
    id: "heat",
    question: "Avez-vous souvent chaud la nuit ?",
    options: ["Oui", "Non"],
  },
  {
    id: "need",
    question: "Que recherchez-vous en priorité ?",
    options: ["Matelas", "Sommier", "Oreiller", "Pack complet"],
  },
];

export default function QuizSommeil() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[step];
  const isFinished = step >= questions.length;

  const progress = isFinished
    ? 100
    : Math.round(((step + 1) / questions.length) * 100);

  const result: Result = useMemo(() => {
    const comfort = answers.comfort;
    const backPain = answers.backPain;
    const heat = answers.heat;
    const sleepingWith = answers.sleepingWith;
    const position = answers.position;
    const need = answers.need;

    if (backPain === "Oui") {
      return {
        title: "Profil soutien renforcé",
        description:
          "D’après vos réponses, votre literie idéale doit privilégier un excellent maintien du dos, une bonne stabilité et un confort qui accompagne la récupération nocturne.",
        mattressAdvice:
          "Nous vous conseillons un matelas avec un soutien ferme ou équilibré, capable de maintenir correctement la colonne vertébrale pendant la nuit.",
        baseAdvice:
          "Un sommier adapté permettra d’améliorer la stabilité du couchage et de prolonger la durée de vie du matelas.",
        pillowAdvice:
          "Un oreiller ergonomique peut aider à mieux aligner la nuque, les épaules et le dos.",
      };
    }

    if (heat === "Oui") {
      return {
        title: "Profil fraîcheur & respirabilité",
        description:
          "Votre profil indique un besoin de fraîcheur pendant la nuit. Une literie respirante et bien ventilée sera plus adaptée à votre confort.",
        mattressAdvice:
          "Nous vous conseillons un matelas respirant, avec une bonne circulation de l’air et un accueil confortable.",
        baseAdvice:
          "Un sommier bien ventilé aide à limiter l’humidité et améliore l’aération générale de la literie.",
        pillowAdvice:
          "Un oreiller thermorégulant ou respirant peut apporter plus de fraîcheur au niveau de la tête et de la nuque.",
      };
    }

    if (sleepingWith === "À deux") {
      return {
        title: "Profil confort à deux",
        description:
          "Vous dormez à deux : l’indépendance de couchage, la stabilité et le confort partagé sont des critères essentiels pour mieux dormir.",
        mattressAdvice:
          "Nous vous conseillons un matelas offrant une bonne indépendance de couchage afin de limiter les mouvements ressentis pendant la nuit.",
        baseAdvice:
          "Un sommier de qualité apporte un meilleur maintien global et améliore le confort du couchage à deux.",
        pillowAdvice:
          "Chaque dormeur peut avoir besoin d’un oreiller différent selon sa position de sommeil et sa morphologie.",
      };
    }

    if (comfort === "Moelleux") {
      return {
        title: "Profil confort enveloppant",
        description:
          "Vous recherchez une sensation douce et accueillante. L’objectif est de trouver un confort moelleux sans perdre le maintien nécessaire au bon repos.",
        mattressAdvice:
          "Nous vous conseillons un matelas à l’accueil moelleux avec un soutien progressif pour éviter l’effet trop souple.",
        baseAdvice:
          "Un sommier compatible permettra de conserver l’équilibre entre souplesse, confort et maintien.",
        pillowAdvice:
          "Un oreiller confortable et adapté à votre position de sommeil renforcera la sensation cocooning.",
      };
    }

    if (comfort === "Ferme" || position === "Dos" || position === "Ventre") {
      return {
        title: "Profil maintien ferme",
        description:
          "Votre profil semble correspondre à un besoin de stabilité, de maintien et de soutien régulier pendant toute la nuit.",
        mattressAdvice:
          "Nous vous conseillons un matelas ferme ou équilibré, adapté aux dormeurs qui recherchent une sensation de maintien.",
        baseAdvice:
          "Un sommier stable et résistant permettra d’accompagner efficacement le soutien du matelas.",
        pillowAdvice:
          "Un oreiller ni trop haut ni trop souple favorisera un meilleur alignement de la nuque.",
      };
    }

    if (need === "Pack complet") {
      return {
        title: "Profil solution complète",
        description:
          "Votre besoin semble porter sur une literie harmonieuse dans son ensemble : matelas, sommier et oreiller doivent fonctionner ensemble.",
        mattressAdvice:
          "Nous vous conseillons de choisir le matelas en fonction de votre morphologie, de votre confort souhaité et de vos habitudes de sommeil.",
        baseAdvice:
          "Un sommier compatible est essentiel pour obtenir le meilleur confort et préserver les qualités du matelas.",
        pillowAdvice:
          "L’oreiller finalise l’équilibre du couchage et joue un rôle important dans la qualité du sommeil.",
      };
    }

    return {
      title: "Profil confort équilibré",
      description:
        "D’après vos réponses, votre confort idéal semble être un soutien équilibré avec une attention particulière à la qualité du maintien et à la récupération nocturne.",
      mattressAdvice:
        "Nous vous conseillons un matelas adapté à votre morphologie et à vos habitudes de sommeil.",
      baseAdvice:
        "Un sommier compatible améliore le confort, la stabilité et la durabilité de votre literie.",
      pillowAdvice:
        "Le choix de l’oreiller joue un rôle essentiel dans l’alignement de la nuque et de la colonne vertébrale.",
    };
  }, [answers]);

  const recommendations = [
    {
      title: "Matelas recommandé",
      description: result.mattressAdvice,
    },
    {
      title: "Sommier conseillé",
      description: result.baseAdvice,
    },
    {
      title: "Oreiller adapté",
      description: result.pillowAdvice,
    },
  ];

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion.id]: answer,
    }));

    setStep((previousStep) => previousStep + 1);
  };

  const handlePrevious = () => {
    setStep((previousStep) => Math.max(previousStep - 1, 0));
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
  };

  if (isFinished) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[var(--koalit-cream)] px-6 py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(217,196,90,0.28),transparent_32%),radial-gradient(circle_at_86%_20%,rgba(16,58,99,0.16),transparent_34%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-5 inline-flex rounded-full bg-[var(--koalit-gold)]/15 px-5 py-2 text-sm font-medium text-[var(--koalit-navy)]">
              Analyse terminée
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-[var(--koalit-navy)] md:text-6xl">
              {result.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {result.description}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {recommendations.map((recommendation) => (
              <article
                key={recommendation.title}
                className="rounded-[2rem] border border-white/70 bg-white/85 p-6 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
              >
                <CheckCircle2 className="mb-5 h-6 w-6 text-[var(--koalit-gold)]" />

                <h2 className="text-xl font-bold text-[var(--koalit-navy)]">
                  {recommendation.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {recommendation.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/70 bg-white/80 p-6 text-center shadow-sm backdrop-blur md:p-8">
            <h2 className="text-2xl font-bold text-[var(--koalit-navy)]">
              Besoin d’un conseil personnalisé ?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Nos spécialistes du sommeil vous accompagnent pour trouver la
              literie la plus adaptée à vos besoins, à votre morphologie et à
              votre budget.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--koalit-navy)] px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <CalendarCheck className="h-5 w-5" />
                Réserver un essai en magasin
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--koalit-navy)]/15 bg-white px-8 py-4 font-semibold text-[var(--koalit-navy)] transition hover:-translate-y-0.5 hover:bg-white/70"
              >
                <MessageCircle className="h-5 w-5" />
                Être conseillé par un expert
              </a>

              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-[var(--koalit-navy)] transition hover:bg-white/60"
              >
                <RotateCcw className="h-5 w-5" />
                Recommencer
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--koalit-cream)] px-6 py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(217,196,90,0.25),transparent_32%),radial-gradient(circle_at_86%_20%,rgba(16,58,99,0.12),transparent_34%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-14rem)] max-w-5xl flex-col justify-center">
        <div className="mb-10">
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[var(--koalit-gold)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Question {step + 1} sur {questions.length}
            </p>

            {step > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--koalit-navy)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.28 }}
          >
            <span className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--koalit-navy)] shadow-sm">
              Quiz sommeil Koal’it
            </span>

            <h1 className="mb-10 max-w-3xl text-4xl font-bold tracking-tight text-[var(--koalit-navy)] md:text-6xl">
              {currentQuestion.question}
            </h1>

            <div className="grid gap-4 md:grid-cols-2">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  className="group rounded-[2rem] border border-white/70 bg-white/85 p-6 text-left text-lg font-semibold text-[var(--koalit-navy)] shadow-sm transition hover:-translate-y-1 hover:border-[var(--koalit-gold)] hover:shadow-xl"
                >
                  <span className="flex items-center justify-between gap-4">
                    {option}
                    <span className="h-3 w-3 rounded-full bg-[var(--koalit-gold)] opacity-0 transition group-hover:opacity-100" />
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}