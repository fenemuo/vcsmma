import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz — VCSMMA",
  description: "Test your knowledge with quizzes and challenges built for OS learners.",
};

export default function QuizPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Quiz
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          Practice with quizzes designed to reinforce core operating systems concepts.
        </p>
      </section>
    </main>
  );
}
