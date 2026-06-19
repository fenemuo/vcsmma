import type { Metadata } from "next";
import SimpleHero from "./components/ui/SimpleHero";
import ExploreSection from "./components/ui/ExploreSection";

export const metadata: Metadata = {
  title: "Home — VCSMMA",
  description: "VCSMMA — interactive operating systems lab for operating systems learning.",
  authors: [{ name: "Francis Enemuo", url: "https://linkedin.com/in/franc-enemuo" }],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <SimpleHero />
      <ExploreSection />
    </main>
  );
}
