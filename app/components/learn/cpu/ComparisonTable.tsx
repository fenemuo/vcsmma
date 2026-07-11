export default function ComparisonTable() {
  const algorithms = [
    {
      name: "FCFS",
      preemptive: "No",
      starvation: "No",
      complexity: "Easy",
      performance: "Poor",
      best: "Batch Processing",
    },
    {
      name: "SJF",
      preemptive: "No",
      starvation: "Yes",
      complexity: "Medium",
      performance: "Excellent",
      best: "Short Jobs",
    },
    {
      name: "Priority",
      preemptive: "Both",
      starvation: "Yes",
      complexity: "Medium",
      performance: "Very Good",
      best: "Real-Time Systems",
    },
    {
      name: "Round Robin",
      preemptive: "Yes",
      starvation: "No",
      complexity: "Medium",
      performance: "Good",
      best: "Time Sharing",
    },
  ];

  return (
    <section
      id="comparison"
      className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
    >
      <h2 className="text-3xl font-bold text-white">
        Algorithm Comparison
      </h2>

      <p className="mt-3 text-slate-400">
        Compare the characteristics of each CPU Scheduling Algorithm.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-800">
              <th className="p-4 text-left">Algorithm</th>
              <th className="p-4">Preemptive</th>
              <th className="p-4">Starvation</th>
              <th className="p-4">Complexity</th>
              <th className="p-4">Performance</th>
              <th className="p-4">Best Use</th>
            </tr>
          </thead>

          <tbody>
            {algorithms.map((algo) => (
              <tr
                key={algo.name}
                className="border-b border-slate-800 hover:bg-slate-800/40"
              >
                <td className="p-4 font-semibold">{algo.name}</td>
                <td className="p-4 text-center">{algo.preemptive}</td>
                <td className="p-4 text-center">{algo.starvation}</td>
                <td className="p-4 text-center">{algo.complexity}</td>
                <td className="p-4 text-center">{algo.performance}</td>
                <td className="p-4 text-center">{algo.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}