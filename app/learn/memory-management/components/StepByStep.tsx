interface StepByStepProps {
  title?: string;
  subtitle?: string;
  steps: string[];
}

export default function StepByStep({
  title = "Step-by-Step Execution",
  subtitle,
  steps,
}: StepByStepProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">{title}</h2>

        {subtitle && (
          <p className="mt-3 max-w-3xl text-slate-400">{subtitle}</p>
        )}
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-6">
            {/* Step Number */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg">
              {index + 1}
            </div>

            {/* Step Content */}
            <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-white">
                Step {index + 1}
              </h3>

              <p className="mt-2 leading-7 text-slate-300">{step}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}