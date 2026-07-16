import { Clock, Database } from "lucide-react";

interface ComplexityProps {
  time: string;
  space: string;
  explanation: string;
}

export default function Complexity({
  time,
  space,
  explanation,
}: ComplexityProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-3xl font-bold text-white">
        Algorithm Complexity
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-slate-800 p-6">
          <Clock className="mb-4 text-blue-400" />

          <p className="text-slate-400">Time Complexity</p>

          <h3 className="mt-2 text-4xl font-bold text-white">
            {time}
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-800 p-6">
          <Database className="mb-4 text-emerald-400" />

          <p className="text-slate-400">Space Complexity</p>

          <h3 className="mt-2 text-4xl font-bold text-white">
            {space}
          </h3>
        </div>

      </div>

      <p className="mt-8 text-lg leading-8 text-slate-300">
        {explanation}
      </p>

    </section>
  );
}