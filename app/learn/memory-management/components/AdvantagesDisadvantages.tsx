import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  advantages: string[];
  disadvantages: string[];
}

export default function AdvantagesDisadvantages({
  advantages,
  disadvantages,
}: Props) {
  return (
    <section className="grid gap-8 lg:grid-cols-2">

      {/* Advantages */}

      <div className="rounded-3xl border border-emerald-700/30 bg-emerald-950/70 p-8">

        <h2 className="text-3xl font-bold text-white">
          Advantages
        </h2>

        <div className="mt-8 space-y-5">

          {advantages.map((item) => (

            <div
              key={item}
              className="flex items-start gap-4"
            >
              <CheckCircle2
                className="mt-1 text-emerald-400"
                size={22}
              />

              <p className="text-slate-300">
                {item}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Disadvantages */}

      <div className="rounded-3xl border border-red-700/30 bg-red-950/70 p-8">

        <h2 className="text-3xl font-bold text-white">
          Disadvantages
        </h2>

        <div className="mt-8 space-y-5">

          {disadvantages.map((item) => (

            <div
              key={item}
              className="flex items-start gap-4"
            >
              <XCircle
                className="mt-1 text-red-400"
                size={22}
              />

              <p className="text-slate-300">
                {item}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}