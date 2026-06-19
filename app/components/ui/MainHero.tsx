import Link from "next/link";

type Cta = { href: string; label: string; primary?: boolean };
type Feature = { title: string; subtitle: string };

export default function MainHero({
  title = "VCSMMA — Learn Operating Systems with Interactive Simulators",
  description = "Hands-on simulators, quizzes, and visualizations for CPU scheduling, memory allocation, and paging.",
  ctas = [
    { href: "/simulator", label: "Try Simulators", primary: true },
    { href: "/learn", label: "Learning Content" },
  ],
  features = [
    { title: "CPU Scheduling", subtitle: "FCFS, SJF, Round Robin, Priority, SRTF" },
    { title: "Memory", subtitle: "First Fit, Best Fit, Visualized allocations" },
    { title: "Paging", subtitle: "FIFO, LRU with frame visualization" },
  ],
  imageUrl = "/banner.png",
}: {
  title?: string;
  description?: string;
  ctas?: Cta[];
  features?: Feature[];
  imageUrl?: string;
}) {
  return (
    <section className="animated-border mx-auto rounded-3xl shadow-2xl">
      <div className="inner grid gap-8 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold leading-tight text-slate-50 sm:text-5xl">{title}</h1>
          <p className="text-lg text-slate-300 max-w-2xl">{description}</p>

          <div className="flex flex-wrap gap-3">
            {ctas.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold shadow ${
                  c.primary ? "bg-indigo-600 text-white hover:bg-indigo-500" : "border border-slate-700 text-white hover:bg-slate-900/50"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg bg-slate-900/60 p-4">
                <h3 className="text-sm font-medium text-white">{f.title}</h3>
                <p className="mt-1 text-xs text-slate-300">{f.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative hidden h-80 lg:block rounded-3xl bg-cover bg-center shadow-2xl shadow-slate-950/60"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          <div className="absolute inset-0 rounded-3xl bg-slate-950/10" />
        </div>
      </div>
    </section>
  );
}
