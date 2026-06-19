export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="rounded-3xl border border-slate-700/80 bg-slate-950/90 p-10 text-slate-100 shadow-xl shadow-slate-950/30">
        <h1 className="text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
    </main>
  );
}
