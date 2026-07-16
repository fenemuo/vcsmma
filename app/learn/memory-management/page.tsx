import Hero from "./components/Hero";
import MemoryOverview from "./components/MemoryOverview";
import MemoryLayout from "./components/MemoryLayout";
import Objectives from "./components/Objectives";
import AllocationFlow from "./components/AllocationFLow";
import AlgorithmCards from "./components/AlgorithmCards";
import Fragmentation from "./components/Fragmentation";
import ComparisonTable from "./components/ComparisonTable";
import RealLife from "./components/RealLife";
import CallToAction from "./components/CallToAction";

export default function MemoryManagementPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-24 px-6 py-12">
      <Hero />
      <MemoryOverview />
      <MemoryLayout />
      <Objectives />
      <AllocationFlow />
      <AlgorithmCards />
      <Fragmentation />
      <ComparisonTable />
      <RealLife />
      <CallToAction />
    </main>
  );
}