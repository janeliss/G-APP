export default function HomePage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });

  return (
    <div className="space-y-6">

      {/* Date + Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <p className="section-label mb-0.5">Today</p>
          <h1 className="text-lg font-bold text-white">{today}</h1>
        </div>
        <button
          disabled
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-700 border border-white/10 text-slate-400 text-xs font-semibold cursor-not-allowed"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M4.582 9A7.5 7.5 0 0119.418 15M19.418 15H15M4.582 9H9" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Daily Brief */}
      <div className="rounded-2xl bg-gradient-to-br from-accent-purple/30 to-navy-800 border border-white/10 p-4 shadow-card">
        <p className="section-label mb-3">Daily Brief</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Games",   value: "—" },
            { label: "Injured", value: "—" },
            { label: "Changes", value: "—" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center bg-black/20 rounded-xl py-3">
              <p className="text-2xl font-black text-white">{value}</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          No data — add your API key &amp; refresh.
        </p>
      </div>

      {/* Tab row */}
      <div className="flex items-center gap-2">
        <button className="tab-pill tab-pill-active">All</button>
        <button className="tab-pill tab-pill-inactive">Live</button>
        <button className="tab-pill tab-pill-inactive">Scheduled</button>
        <button className="tab-pill tab-pill-inactive">Final</button>
      </div>

      {/* Game cards placeholder */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="game-card animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 bg-white/10 rounded-full" />
            <div className="h-5 w-12 bg-white/10 rounded-full" />
          </div>
          <div className="flex items-center justify-between px-2">
            {/* Away */}
            <div className="flex flex-col items-center gap-2 w-20">
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div className="h-2.5 w-14 bg-white/10 rounded-full" />
            </div>
            {/* Score */}
            <div className="flex flex-col items-center gap-1">
              <div className="h-6 w-16 bg-white/10 rounded-lg" />
              <div className="h-2 w-8 bg-white/10 rounded-full" />
            </div>
            {/* Home */}
            <div className="flex flex-col items-center gap-2 w-20">
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div className="h-2.5 w-14 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      ))}

      <p className="text-center text-xs text-slate-600 pb-2">
        Connect API key to load real games
      </p>

    </div>
  );
}
