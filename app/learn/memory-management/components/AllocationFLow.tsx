import {
  ArrowDown,
  Search,
  Database,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Memory Request",
    description:
      "A process requests a specific amount of memory from the operating system.",
  },
  {
    icon: Search,
    title: "Search Free Blocks",
    description:
      "The operating system searches available memory blocks using a selected allocation algorithm.",
  },
  {
    icon: CheckCircle,
    title: "Allocate Memory",
    description:
      "A suitable memory block is assigned to the requesting process.",
  },
  {
    icon: RefreshCw,
    title: "Update Memory",
    description:
      "The memory map is updated to reflect allocated and remaining free blocks.",
  },
];

export default function AllocationFlow() {
  return (
    <section className="space-y-12">

      <div className="text-center">

        <h2 className="text-4xl font-bold text-white">
          Memory Allocation Process
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-400">
          Every memory allocation follows a sequence of operations
          performed by the operating system.
        </p>

      </div>

      <div className="grid gap-10 lg:grid-cols-4">

        {steps.map((step, index) => {

          const Icon = step.icon;

          return (

            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center"
            >

              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">

                <Icon className="text-emerald-400" size={30} />

              </div>

              <h3 className="text-xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-4 text-slate-400">
                {step.description}
              </p>

              {/* {index !== steps.length - 1 && (

                <ArrowDown
                  className="absolute left-1/2 top-full hidden -translate-x-1/2 text-slate-600 lg:block lg:rotate-[-90deg]"
                  size={34}
                />

              )} */}

            </div>

          );

        })}

      </div>

    </section>
  );
}