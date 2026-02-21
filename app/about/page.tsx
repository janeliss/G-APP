export default function AboutPage() {
  return (
    <div className="space-y-6">

      <div>
        <p className="section-label mb-0.5">Info</p>
        <h1 className="text-lg font-bold text-white">About</h1>
      </div>

      {/* Main card */}
      <div className="game-card space-y-4 text-sm leading-relaxed">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <span className="text-accent-green font-black text-2xl">●</span>
          <div>
            <p className="font-bold text-white">Sports Facts Dashboard</p>
            <p className="text-xs text-slate-500">NBA Research Tool</p>
          </div>
        </div>

        <p className="text-slate-300">
          A personal NBA research dashboard showing{" "}
          <span className="text-white font-semibold">factual data only</span> — games,
          injury statuses, and status change history. No predictions. No betting advice.
        </p>

        <div className="rounded-xl bg-navy-700 border border-white/5 p-3 space-y-1">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Data Source</p>
          <p className="text-white font-medium">API-NBA by API-Sports</p>
          <p className="text-xs text-slate-500">via RapidAPI · may be delayed or inaccurate</p>
        </div>

        <div className="rounded-xl bg-accent-yellow/10 border border-accent-yellow/20 p-3">
          <p className="text-accent-yellow text-xs font-bold uppercase tracking-wide mb-1">Disclaimer</p>
          <p className="text-slate-300 text-xs leading-relaxed">
            Informational purposes only. Data may be delayed or inaccurate.
            No guarantees are made regarding completeness or timeliness.
            All timestamps shown in America/Chicago time.
          </p>
        </div>
      </div>

    </div>
  );
}
