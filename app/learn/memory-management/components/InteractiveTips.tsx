import { Lightbulb } from "lucide-react";

interface Props {
  tips: string[];
}

export default function InteractiveTips({
  tips,
}: Props) {
  return (
    <section className="rounded-3xl bg-amber-950/20 border border-yellow-600/20 p-8">

      <div className="flex items-center gap-4">

        <Lightbulb
          className="text-yellow-400"
          size={40}
        />

        <div>

          <h2 className="text-3xl font-bold text-white">
            Learning Tips
          </h2>

          <p className="text-slate-400">
            Things to observe while using the simulator.
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-5">

        {tips.map((tip) => (

          <div
            key={tip}
            className="flex gap-4"
          >

            <span className="mt-1 text-yellow-400">
              ✔
            </span>

            <p className="text-slate-300">
              {tip}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}