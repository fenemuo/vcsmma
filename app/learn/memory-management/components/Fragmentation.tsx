import { AlertTriangle } from "lucide-react";

export default function Fragmentation() {
  return (
    <section className="space-y-12">

      <div className="text-center">

        <h2 className="text-4xl font-bold text-white">
          Memory Fragmentation
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-400">
          Frequent memory allocation and deallocation create
          unused memory spaces called <strong>fragmentation</strong>.
          It reduces memory utilization and may prevent future
          allocations.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Internal */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-yellow-400" />

            <h3 className="text-2xl font-bold text-white">
              Internal Fragmentation
            </h3>

          </div>

          <p className="mt-5 text-slate-400 leading-8">

            Internal fragmentation occurs when a process is allocated
            a memory block larger than it actually requires, leaving
            unused space inside the allocated block.

          </p>

          <div className="mt-8 rounded-xl bg-slate-950 p-6">

            <div className="overflow-hidden rounded-lg border border-slate-700">

              <div className="flex">

                <div className="w-4/5 bg-emerald-600 py-6 text-center font-semibold text-white">
                  Process P1 (80 KB)
                </div>

                <div className="w-1/5 bg-red-500 py-6 text-center font-semibold text-white">
                  Wasted
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* External */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-red-400" />

            <h3 className="text-2xl font-bold text-white">
              External Fragmentation
            </h3>

          </div>

          <p className="mt-5 text-slate-400 leading-8">

            External fragmentation occurs when enough total free
            memory exists, but it is scattered into several
            small blocks that cannot satisfy a large request.

          </p>

          <div className="mt-8 flex items-end gap-3">

            <div className="h-20 w-12 rounded bg-green-600"></div>

            <div className="h-12 w-12 rounded bg-slate-700"></div>

            <div className="h-24 w-12 rounded bg-green-600"></div>

            <div className="h-10 w-12 rounded bg-slate-700"></div>

            <div className="h-28 w-12 rounded bg-green-600"></div>

          </div>

          <p className="mt-4 text-sm text-slate-500">
            Gray blocks represent scattered free memory.
          </p>

        </div>

      </div>

    </section>
  );
}