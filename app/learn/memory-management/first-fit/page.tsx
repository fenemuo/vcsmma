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
  title: "First Fit Memory Allocation | VCSMMA",
  description:
    "Learn how the First Fit memory allocation algorithm works through explanations, examples, and interactive simulation.",
};

export default function FirstFitPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-24 px-6 py-12">

      <AlgorithmHero
        title="First Fit Memory Allocation"
        subtitle="Dynamic Memory Allocation"
        description="The First Fit algorithm scans memory from the beginning and allocates the first free block that is large enough to satisfy a process request. It is one of the fastest and simplest memory allocation strategies used in operating systems."
        color="blue"
        complexity="O(n)"
      />

      <AlgorithmExplanation
        title="How First Fit Works"
        paragraphs={[
          "When a process requests memory, the operating system searches the list of available memory blocks starting from the first block.",
          "The first block that is large enough to satisfy the request is immediately allocated.",
          "If the selected block is larger than the requested memory, the remaining portion becomes a new free block.",
          "The search then stops without checking the remaining blocks.",
        ]}
      />

      <StepByStep
  subtitle="The operating system searches memory from the beginning and allocates the first block large enough for the process."
  steps={[
    "Receive a memory request from a process.",
    "Begin searching from the first available memory block.",
    "Compare each block with the requested size.",
    "Stop immediately when the first suitable block is found.",
    "Allocate the process into that block.",
    "Update the remaining free memory.",
  ]}
/>

      <ExampleSimulation
        algorithm="first-fit"
      />

      <AdvantagesDisadvantages
        advantages={[
          "Simple to implement",
          "Fast allocation",
          "Low processing overhead",
          "Suitable for general-purpose operating systems",
        ]}
        disadvantages={[
          "Creates external fragmentation",
          "Early memory blocks become fragmented",
          "Memory utilization decreases over time",
          "Large free blocks may become unavailable",
        ]}
      />

      <Complexity
        time="O(n)"
        space="O(1)"
        explanation="In the worst case, the algorithm scans every available memory block until it finds one that fits."
      />

      <CommonApplications
        applications={[
          "General-purpose operating systems",
          "Embedded systems",
          "Real-time operating systems",
          "Dynamic memory managers",
          "Kernel memory allocation",
        ]}
      />

      <InteractiveTips
        tips={[
          "Observe how allocation always begins from the first memory block.",
          "Compare the remaining free memory with Best Fit and Worst Fit.",
          "Notice how repeated allocations create external fragmentation.",
          "Run the same example using different algorithms to compare memory utilization.",
        ]}
      />

      <TrySimulator
        algorithm="First Fit"
      />

    </main>
  );
}