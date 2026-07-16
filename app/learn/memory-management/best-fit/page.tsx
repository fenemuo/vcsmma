import type { Metadata } from "next";

import AlgorithmHero from "../components/AlgorithmHero";
import AlgorithmExplanation from "../components/AlgorithmExplanation";
import StepByStep from "../components/StepByStep";
import ExampleSimulation from "../components/ExampleSimulation";
import AdvantagesDisadvantages from "../components/AdvantagesDisadvantages";
import Complexity from "../components/Complexity";
import CommonApplications from "../components/CommonApplications";
import InteractiveTips from "../components/InteractiveTips";
import TrySimulator from "../components/TrySimulator";

export const metadata: Metadata = {
  title: "Best Fit Memory Allocation | VCSMMA",
  description:
    "Learn the Best Fit memory allocation algorithm through explanations, worked examples, and interactive simulation.",
};

export default function BestFitPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-24 px-6 py-12">

      <AlgorithmHero
        title="Best Fit Memory Allocation"
        subtitle="Dynamic Memory Allocation"
        description="Best Fit searches every available memory block and allocates the smallest block that is still large enough to satisfy the memory request. This reduces wasted space after allocation but requires searching the entire memory list."
        color="emerald"
        complexity="O(n)"
      />

      <AlgorithmExplanation
        title="How Best Fit Works"
        paragraphs={[
          "Whenever a process requests memory, the operating system examines every available free memory block.",
          "Among all suitable blocks, the algorithm selects the smallest block that can accommodate the process.",
          "This minimizes the unused memory left after allocation.",
          "Unlike First Fit, Best Fit never stops at the first suitable block. It continues searching until every free block has been examined before making its final decision.",
        ]}
      />

      <StepByStep
  subtitle="The operating system examines every free memory block before choosing the smallest block capable of satisfying the request."
  steps={[
    "Receive a memory request from a process.",
    "Search every available memory block.",
    "Ignore blocks that are too small.",
    "Compare all suitable blocks.",
    "Select the smallest suitable block.",
    "Allocate the process and update the remaining memory.",
  ]}
/>

      <ExampleSimulation algorithm="best-fit" />

      <AdvantagesDisadvantages
        advantages={[
          "Reduces wasted memory after allocation.",
          "Produces better memory utilization than First Fit in many situations.",
          "Leaves larger blocks available for future requests.",
          "Suitable when minimizing leftover space is important.",
        ]}
        disadvantages={[
          "Must search the entire memory list.",
          "Slower than First Fit.",
          "Can create many very small unusable memory fragments.",
          "May increase external fragmentation over time.",
        ]}
      />

      <Complexity
        time="O(n)"
        space="O(1)"
        explanation="Best Fit examines every available memory block before selecting the smallest suitable block. Therefore, the search operation has a worst-case time complexity of O(n), where n is the number of free memory blocks."
      />

      <CommonApplications
        applications={[
          "Dynamic memory allocation",
          "Operating system memory managers",
          "Embedded operating systems",
          "Database buffer allocation",
          "Cloud resource allocation",
        ]}
      />

      <InteractiveTips
        tips={[
          "Observe that every memory block is checked before allocation.",
          "Notice that the smallest suitable block is always selected.",
          "Compare the remaining memory with the First Fit algorithm.",
          "Try different request sizes to see how fragmentation changes.",
        ]}
      />

      <TrySimulator algorithm="Best Fit" />

    </main>
  );
}