"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="rounded-3xl border border-red-500/40 bg-slate-950/90 p-10 text-slate-100 shadow-xl shadow-red-950/20">
        <h1 className="text-4xl font-semibold text-white">Something went wrong</h1>
        <p className="mt-4 text-sm leading-6 text-slate-300">{error?.message ?? "An unexpected error occurred."}</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
