interface AlgorithmExplanationProps {
  title: string;
  paragraphs: string[];
}

export default function AlgorithmExplanation({
  title,
  paragraphs,
}: AlgorithmExplanationProps) {
  return (
    <section className="space-y-8 bg-slate-950/80 p-8 rounded-xl">

      <div>

        <h2 className="text-4xl font-bold text-white">
          {title}
        </h2>

        <div className="mt-8 space-y-6">

          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg leading-9 text-slate-300"
            >
              {paragraph}
            </p>
          ))}

        </div>

      </div>

    </section>
  );
}