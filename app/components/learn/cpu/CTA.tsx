import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 p-12 text-center">

      <h2 className="text-4xl font-bold text-white">
        Ready to Test Your Knowledge?
      </h2>

      <p className="mt-5 text-lg text-white/90">
        Practice with the interactive simulator or assess your understanding using the quiz section.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <Link
          href="/simulator"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900"
        >
          <PlayCircle size={18}/>
          Launch Simulator
        </Link>

        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 rounded-xl border border-white px-6 py-3 font-semibold text-white"
        >
          Take Quiz
          <ArrowRight size={18}/>
        </Link>

      </div>

    </section>
  );
}