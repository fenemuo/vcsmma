import Hero from "./components/Hero";
import MemoryOverview from "./components/MemoryOverview";
import MemoryLayout from "./components/MemoryLayout";

export default function MemoryManagementPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-24 px-6 py-12">
      <Hero />
      <MemoryOverview />
      <MemoryLayout />
    </main>
  );
}