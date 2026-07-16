interface Props {
  algorithm: string;
}

const steps = [
  "Receive a memory request.",
  "Search the available memory blocks.",
  "Choose the appropriate block.",
  "Allocate memory.",
  "Update the free memory list.",
];

export default function StepByStep({
  algorithm,
}: Props) {
  return (
    <section>

      <h2 className="text-3xl font-bold text-white">
        Step-by-Step Execution
      </h2>

      <div className="mt-10 space-y-8">

        {steps.map((step, index) => (

          <div
            key={step}
            className="flex gap-6"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">

              {index + 1}

            </div>

            <div>

              <h3 className="text-xl font-semibold text-white">

                Step {index + 1}

              </h3>

              <p className="mt-2 text-slate-300">

                {step}

              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}