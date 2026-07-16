import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  algorithm: string;
}

export default function TrySimulator({
  algorithm,
}: Props) {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-600 p-12 text-center">

      <h2 className="text-4xl font-bold text-white">
        Ready to Try {algorithm}?
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
        Practice with different memory sizes and process requests using the interactive simulator.
      </p>

      <Link
        href="/simulator"
        className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 transition hover:scale-105"
      >
        Launch Simulator

        <ArrowRight size={22}/>
      </Link>

    </section>
  );
}