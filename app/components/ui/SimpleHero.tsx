export default function SimpleHero() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-100px)] max-w-6xl items-center justify-center px-6 py-12 text-center sm:px-10">
      <div className="fade-in-up space-y-8 rounded-4xl border border-white/10 bg-slate-950/80 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.7)] sm:p-14">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.45em] text-slate-400">Interactive OS lab</p>
          <h1 className="text-5xl font-black tracking-[0.5em] text-white sm:text-6xl md:text-7xl">
            V C S M M A
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Learn Operating Systems with Interactive Simulators.
          </p>
        </div>

        <a
          href="#explore"
          className="mx-auto inline-flex items-center justify-center gap-3 rounded-full border border-slate-700/80 bg-slate-900/90 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800"
        >
          <span className="text-xl">↓</span>
          <span>Explore</span>
        </a>
      </div>
    </section>
  );
}
