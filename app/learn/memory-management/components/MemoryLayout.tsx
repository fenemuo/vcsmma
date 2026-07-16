export default function MemoryLayout() {

    return (

        <section className="space-y-10">

            <div className="text-center">

                <h2 className="text-4xl font-bold text-white">
                    Typical Main Memory Layout
                </h2>

                <p className="mx-auto mt-4 max-w-3xl text-slate-400">

                    The operating system divides main memory into
                    allocated and free regions. As processes are
                    loaded and terminated, these regions change
                    dynamically.

                </p>

            </div>

            <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <div className="space-y-4">

                    <div className="rounded-lg bg-blue-600 px-6 py-5 text-white font-semibold">
                        Operating System (Reserved)
                    </div>

                    <div className="rounded-lg border-2 border-dashed border-slate-600 bg-slate-800 px-6 py-5 text-slate-300">
                        Free Memory Block (120 KB)
                    </div>

                    <div className="rounded-lg bg-emerald-600 px-6 py-5 text-white font-semibold">
                        Process P1 (200 KB)
                    </div>

                    <div className="rounded-lg border-2 border-dashed border-slate-600 bg-slate-800 px-6 py-5 text-slate-300">
                        Free Memory Block (80 KB)
                    </div>

                    <div className="rounded-lg bg-purple-600 px-6 py-5 text-white font-semibold">
                        Process P2 (150 KB)
                    </div>

                    <div className="rounded-lg border-2 border-dashed border-slate-600 bg-slate-800 px-6 py-5 text-slate-300">
                        Free Memory Block (250 KB)
                    </div>

                </div>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                    <h3 className="font-semibold text-emerald-400">
                        Allocated Memory
                    </h3>

                    <p className="mt-3 text-slate-400">

                        Memory currently occupied by processes or
                        the operating system.

                    </p>

                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                    <h3 className="font-semibold text-yellow-400">
                        Free Memory
                    </h3>

                    <p className="mt-3 text-slate-400">

                        Available blocks that can be assigned to
                        newly arriving processes.

                    </p>

                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                    <h3 className="font-semibold text-red-400">
                        Fragmentation
                    </h3>

                    <p className="mt-3 text-slate-400">

                        Small unused memory spaces that appear after
                        repeated allocation and deallocation.

                    </p>

                </div>

            </div>

        </section>

    );

}