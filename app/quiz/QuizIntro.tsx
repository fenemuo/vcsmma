type QuizIntroProps = {
  onStart: () => void;
};

export default function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Adaptive OS Quiz
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Get ready for a guided challenge
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
          This quiz begins with two simple questions before it moves to the next level, then adjusts to intermediate and hard levels based on how you perform. Two correct simple answers unlock the next level, two intermediate mistakes send you back to the easy path, and a failed hard question drops you back to intermediate.
        </p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-white">How it works</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>• Simple questions: 20 seconds and 1 point</li>
              <li>• Intermediate questions: 30 seconds and 2 points</li>
              <li>• Hard questions: 55 seconds and 3 points</li>
              <li>• You must click Next Question to continue</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Success rule</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              You will need at least 60% to pass. If your final percentage is below that, you can restart the quiz and try again.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            When you are ready, start the quiz and answer each question before the timer runs out.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Start Quiz
          </button>
        </div>
      </section>
    </main>
  );
}
