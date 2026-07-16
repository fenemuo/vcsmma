import { Server, Cpu, Database, Monitor } from "lucide-react";

interface Props {
  applications: string[];
}

const icons = [
  Server,
  Cpu,
  Database,
  Monitor,
];

export default function CommonApplications({
  applications,
}: Props) {
  return (
    <section>

      <h2 className="text-3xl font-bold text-white">
        Real-World Applications
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        {applications.map((app, index) => {

          const Icon = icons[index % icons.length];

          return (

            <div
              key={app}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500"
            >

              <Icon
                className="mb-4 text-blue-400"
                size={36}
              />

              <p className="text-slate-200">
                {app}
              </p>

            </div>

          );
        })}

      </div>

    </section>
  );
}