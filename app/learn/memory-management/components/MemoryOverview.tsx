import {
    Database,
    ShieldCheck,
    Gauge,
    Layers3,
} from "lucide-react";

const features = [
    {
        icon: Database,
        title: "Efficient Allocation",
        description:
            "Allocate memory blocks to processes while minimizing wasted space."
    },
    {
        icon: ShieldCheck,
        title: "Protection",
        description:
            "Prevent processes from accessing memory belonging to other programs."
    },
    {
        icon: Gauge,
        title: "Performance",
        description:
            "Improve CPU utilization by ensuring memory is available when required."
    },
    {
        icon: Layers3,
        title: "Organization",
        description:
            "Track allocated and free memory blocks efficiently."
    }
];

export default function MemoryOverview() {

    return (

        <section id="overview" className="space-y-12">

            <div className="text-center">

                <h2 className="text-4xl font-bold text-white">
                    What is Memory Management?
                </h2>

                <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-slate-400">

                    Memory Management is one of the most important
                    responsibilities of an Operating System. It is
                    responsible for allocating memory to processes,
                    keeping track of used and available memory,
                    protecting memory regions, and maximizing
                    overall system performance.

                </p>

            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                {features.map((item) => (

                    <div
                        key={item.title}
                        className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-2 hover:border-emerald-500"
                    >

                        <item.icon
                            className="mb-4 text-emerald-400"
                            size={36}
                        />

                        <h3 className="text-xl font-semibold text-white">
                            {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-slate-400">
                            {item.description}
                        </p>

                    </div>

                ))}

            </div>

        </section>

    );

}