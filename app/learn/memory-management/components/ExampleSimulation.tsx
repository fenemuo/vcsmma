interface Props {
  algorithm: string;
}

export default function ExampleSimulation({
  algorithm,
}: Props) {

  const blocks = [100, 500, 200, 300, 600];

  const request = 212;

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-3xl font-bold text-white">

        Worked Example

      </h2>

      <p className="mt-3 text-slate-400">

        Example allocation using {algorithm}.

      </p>

      <div className="mt-10">

        <h3 className="mb-5 text-lg font-semibold text-white">

          Memory Blocks

        </h3>

        <div className="flex flex-wrap gap-5">

          {blocks.map((block, index) => (

            <div
              key={index}
              className={`flex h-24 w-24 items-center justify-center rounded-xl border text-lg font-bold transition hover:scale-105 ${
                block === 500
                  ? "border-green-500 bg-green-500/20 text-green-300"
                  : "border-slate-700 bg-slate-800 text-slate-200"
              }`}
            >

              {block}KB

            </div>

          ))}

        </div>

        <div className="mt-10 rounded-xl bg-slate-800 p-6">

          <p className="text-slate-300">

            Requested Process

          </p>

          <h3 className="mt-2 text-3xl font-bold text-blue-400">

            {request} KB

          </h3>

        </div>

        <div className="mt-8 rounded-xl border border-green-600 bg-green-950/20 p-6">

          <p className="text-green-300">

            ✓ First Fit selects the first available block (500 KB), allocates 212 KB, leaving 288 KB free.

          </p>

        </div>

      </div>

    </section>
  );
}