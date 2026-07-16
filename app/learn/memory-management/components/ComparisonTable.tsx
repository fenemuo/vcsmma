export default function ComparisonTable() {
  return (
    <section className="space-y-10">

      <div className="text-center">

        <h2 className="text-4xl font-bold text-white">
          Algorithm Comparison
        </h2>

        <p className="mt-4 text-slate-400">
          Compare the characteristics of the three allocation strategies.
        </p>

      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="px-6 py-5 text-left text-white">
                Algorithm
              </th>

              <th className="px-6 py-5 text-left text-white">
                Speed
              </th>

              <th className="px-6 py-5 text-left text-white">
                Memory Utilization
              </th>

              <th className="px-6 py-5 text-left text-white">
                Fragmentation
              </th>

              <th className="px-6 py-5 text-left text-white">
                Best Used When
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-800 bg-slate-950">

            <tr>

              <td className="px-6 py-5 font-semibold text-blue-400">
                First Fit
              </td>

              <td className="px-6 py-5 text-slate-300">
                ⭐⭐⭐⭐⭐
              </td>

              <td className="px-6 py-5 text-slate-300">
                Good
              </td>

              <td className="px-6 py-5 text-slate-300">
                Moderate
              </td>

              <td className="px-6 py-5 text-slate-300">
                Fast allocation
              </td>

            </tr>

            <tr>

              <td className="px-6 py-5 font-semibold text-emerald-400">
                Best Fit
              </td>

              <td className="px-6 py-5 text-slate-300">
                ⭐⭐⭐
              </td>

              <td className="px-6 py-5 text-slate-300">
                Excellent
              </td>

              <td className="px-6 py-5 text-slate-300">
                Low
              </td>

              <td className="px-6 py-5 text-slate-300">
                Efficient utilization
              </td>

            </tr>

            <tr>

              <td className="px-6 py-5 font-semibold text-purple-400">
                Worst Fit
              </td>

              <td className="px-6 py-5 text-slate-300">
                ⭐⭐
              </td>

              <td className="px-6 py-5 text-slate-300">
                Fair
              </td>

              <td className="px-6 py-5 text-slate-300">
                High
              </td>

              <td className="px-6 py-5 text-slate-300">
                Large free partitions
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </section>
  );
}