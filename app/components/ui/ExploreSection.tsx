import ExploreGrid from "./ExploreGrid";

const exploreItems = [
  { href: "/simulator", title: "Simulators", description: "Interactive CPU & memory simulators — try FCFS, SJF, and more." },
  { href: "/quiz", title: "Quizzes", description: "Test your knowledge with topic-focused quizzes." },
  { href: "/learn", title: "Learning", description: "Guides and explanations to the underlying OS algorithms." },
  { href: "/dashboard", title: "Dashboard", description: "Overview of your activity, saved simulations, and progress." },
  { href: "/simulators", title: "Component Library", description: "Prebuilt UI components and charts for visualizing simulations." },
  { href: "/profile", title: "Profile", description: "Track learning progress and saved simulations." },
];

export default function ExploreSection() {
  return (
    <section id="explore" className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:px-10">
      <div className="mb-8 rounded-4xl border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Explore</p>
        <h2 className="mt-4 text-md font-semibold text-white sm:text-lg">
          Start learning OS concepts.
        </h2>
      </div>

      <ExploreGrid items={exploreItems} />
    </section>
  );
}
