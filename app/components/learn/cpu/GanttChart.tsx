export default function GanttChart() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-3xl font-bold">
        Example Gantt Chart
      </h2>

      <p className="mt-3 text-slate-400">
        FCFS Scheduling Example
      </p>

      <div className="mt-10">

        <div className="flex overflow-hidden rounded-xl border border-slate-700">

          <div className="flex-1 bg-emerald-500 p-6 text-center font-bold">
            P1
          </div>

          <div className="flex-1 bg-blue-500 p-6 text-center font-bold">
            P2
          </div>

          <div className="flex-1 bg-purple-500 p-6 text-center font-bold">
            P3
          </div>

          <div className="flex-1 bg-orange-500 p-6 text-center font-bold">
            P4
          </div>

        </div>

        <div className="flex justify-between mt-2 text-slate-400 text-sm">
          <span>0</span>
          <span>5</span>
          <span>8</span>
          <span>12</span>
          <span>16</span>
        </div>

      </div>
    </section>
  );
}