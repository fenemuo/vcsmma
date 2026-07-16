import { Building2, Hotel, Warehouse } from "lucide-react";

export default function RealLife() {
  return (
    <section className="space-y-10">

      <div className="text-center">

        <h2 className="text-4xl font-bold text-white">
          Real-Life Analogy
        </h2>

        <p className="mt-4 max-w-3xl mx-auto text-slate-400">
          Memory allocation can be understood by comparing it to assigning hotel rooms or parking spaces.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <Hotel className="text-blue-400 mb-6" size={42} />

          <h3 className="text-xl font-bold text-white">
            First Fit
          </h3>

          <p className="mt-4 text-slate-400">
            A hotel receptionist gives you the first available room that is large enough.
          </p>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <Building2 className="text-emerald-400 mb-6" size={42} />

          <h3 className="text-xl font-bold text-white">
            Best Fit
          </h3>

          <p className="mt-4 text-slate-400">
            The receptionist searches every room and assigns the smallest room that perfectly fits your needs.
          </p>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <Warehouse className="text-purple-400 mb-6" size={42} />

          <h3 className="text-xl font-bold text-white">
            Worst Fit
          </h3>

          <p className="mt-4 text-slate-400">
            The receptionist gives you the largest available room, leaving many smaller rooms untouched.
          </p>

        </div>

      </div>

    </section>
  );
}