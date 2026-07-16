import {
  ShieldCheck,
  Gauge,
  Database,
  Layers3,
  Cpu,
  Lock,
} from "lucide-react";

const objectives = [
  {
    title: "Efficient Allocation",
    icon: Database,
    description:
      "Allocate memory to processes quickly while minimizing wasted memory space.",
  },
  {
    title: "Maximum Utilization",
    icon: Cpu,
    description:
      "Ensure that available memory is used as efficiently as possible.",
  },
  {
    title: "Memory Protection",
    icon: Lock,
    description:
      "Prevent one process from accessing another process's allocated memory.",
  },
  {
    title: "Performance",
    icon: Gauge,
    description:
      "Reduce allocation overhead and improve overall system responsiveness.",
  },
  {
    title: "Process Isolation",
    icon: ShieldCheck,
    description:
      "Ensure each process executes within its own protected memory region.",
  },
  {
    title: "Fragmentation Control",
    icon: Layers3,
    description:
      "Reduce internal and external fragmentation for better memory utilization.",
  },
];

export default function Objectives() {
  return (
    <section className="space-y-12">

      <div className="text-center">

        <h2 className="text-4xl font-bold text-white">
          Objectives of Memory Management
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-400">
          Every operating system performs memory management with the
          primary goal of maximizing efficiency while ensuring safe
          execution of multiple processes.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {objectives.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10"
            >

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10">

                <Icon className="text-emerald-400" size={30} />

              </div>

              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {item.description}
              </p>

            </div>

          );

        })}

      </div>

    </section>
  );
}