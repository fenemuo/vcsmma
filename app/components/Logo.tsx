export function Logo() {
  return (
    <div className="flex items-center gap-3 font-sans select-none">
      {/* Icon Graphic */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border-2 border-dashed border-emerald-500 bg-slate-900 shadow-md">
        {/* Inner CPU Pulse Center */}
        <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse" />
        {/* Subtle accent bars to mimic memory partitions */}
        <span className="absolute top-0 left-1 text-[8px] text-emerald-400 font-mono">[</span>
        <span className="absolute top-0 right-1 text-[8px] text-emerald-400 font-mono">]</span>
        <span className="absolute bottom-0 left-1 text-[8px] text-emerald-400 font-mono">[</span>
        <span className="absolute bottom-0 right-1 text-[8px] text-emerald-400 font-mono">]</span>
      </div>

      {/* Branding Text */}
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-wider text-slate-100 uppercase">
          VCS<span className="text-emerald-400">MMA</span>
        </span>
        <span className="text-[10px] font-medium tracking-tight text-slate-400 uppercase">
          Interactive OS Lab
        </span>
      </div>
    </div>
  );
}