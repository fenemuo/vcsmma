import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PracticeCard() {
  return (
    <section
      id="practice"
      className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
    >
      <h2 className="text-3xl font-bold">
        Practice Exercise
      </h2>

      <p className="mt-5 leading-8 text-slate-300">
        Four processes arrive with the following information:
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4">Process</th>
              <th className="p-4">Arrival Time</th>
              <th className="p-4">Burst Time</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b border-slate-800">
              <td className="p-4">P1</td>
              <td className="p-4">0</td>
              <td className="p-4">5</td>
            </tr>

            <tr className="border-b border-slate-800">
              <td className="p-4">P2</td>
              <td className="p-4">1</td>
              <td className="p-4">3</td>
            </tr>

            <tr className="border-b border-slate-800">
              <td className="p-4">P3</td>
              <td className="p-4">2</td>
              <td className="p-4">2</td>
            </tr>

            <tr>
              <td className="p-4">P4</td>
              <td className="p-4">4</td>
              <td className="p-4">4</td>
            </tr>

          </tbody>
        </table>
      </div>

      <p className="mt-6 text-slate-400">
        Calculate the Waiting Time and Turnaround Time using the FCFS algorithm.
      </p>

      <Link
        href="/simulator"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold hover:bg-emerald-400"
      >
        Solve in Simulator
        <ArrowRight size={18}/>
      </Link>
    </section>
  );
}