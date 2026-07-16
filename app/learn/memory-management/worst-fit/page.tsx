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
  title: "Worst Fit Memory Allocation | VCSMMA",
  description:
    "Learn the Worst Fit memory allocation algorithm through explanations, examples, and interactive simulation.",
};

export default function WorstFitPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-24 px-6 py-12">

      <AlgorithmHero
        title="Worst Fit Memory Allocation"
        subtitle="Dynamic Memory Allocation"
        description="Worst Fit searches all available memory blocks and allocates the largest free block capable of satisfying the memory request. The objective is to leave relatively large free blocks after allocation, thereby reducing the creation of very small unusable fragments."
        color="rose"
        complexity="O(n)"
      />

      <AlgorithmExplanation
        title="How Worst Fit Works"
        paragraphs={[
          "When a process requests memory, the operating system scans every available free memory block.",
          "All blocks that are large enough to satisfy the request are considered candidates.",
          "Among the candidates, the largest memory block is selected.",
          "After allocation, the remaining unused portion of the selected block becomes a new free block.",
          "Unlike First Fit, Worst Fit never stops at the first suitable block, and unlike Best Fit, it intentionally chooses the largest available block.",
        ]}
      />

      <StepByStep
        subtitle="Worst Fit examines every free memory block before allocating memory to the largest suitable block."
        steps={[
          "Receive a memory request from a process.",
          "Search every available free memory block.",
          "Ignore blocks that are too small.",
          "Compare all suitable memory blocks.",
          "Choose the largest suitable block.",
          "Allocate the process.",
          "Update the free memory list with the remaining space.",
        ]}
      />

      <ExampleSimulation algorithm="worst-fit" />

      <AdvantagesDisadvantages
        advantages={[
          "Leaves relatively large free memory blocks available.",
          "Reduces the likelihood of creating many tiny unusable fragments.",
          "Can improve future allocations requiring large memory.",
          "Easy to understand and implement.",
        ]}
        disadvantages={[
          "Requires scanning the entire memory list.",
          "Generally slower than First Fit.",
          "May waste large blocks on small requests.",
          "Memory utilization is often poorer than Best Fit.",
        ]}
      />

      <Complexity
        time="O(n)"
        space="O(1)"
        explanation="Worst Fit examines every free memory block before selecting the largest suitable block. Therefore, its time complexity is O(n), where n represents the number of free memory blocks."
      />

      <CommonApplications
        applications={[
          "Educational operating system simulators",
          "Experimental memory allocation research",
          "Dynamic storage allocation studies",
          "Operating system laboratory demonstrations",
          "Algorithm comparison experiments",
        ]}
      />

      <InteractiveTips
        tips={[
          "Notice that every free memory block is inspected before allocation.",
          "Observe that the largest suitable block is always selected.",
          "Compare the remaining free memory with First Fit and Best Fit.",
          "Experiment with different process sizes to study fragmentation.",
          "Use the simulator to compare all three allocation strategies side by side.",
        ]}
      />

      <TrySimulator algorithm="Worst Fit" />

    </main>
  );
}