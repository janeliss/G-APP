const STATUS_ORDER = ["OUT", "DOUBTFUL", "QUESTIONABLE", "PROBABLE"];

const statusClass: Record<string, string> = {
  OUT:          "status-out",
  DOUBTFUL:     "status-doubtful",
  QUESTIONABLE: "status-questionable",
  PROBABLE:     "status-probable",
  ACTIVE:       "status-active",
};

export default function InjuriesPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="section-label mb-0.5">Tracker</p>
        <h1 className="text-lg font-bold text-white">Injury &amp; Status</h1>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        <button className="tab-pill tab-pill-active">All</button>
        {STATUS_ORDER.map((s) => (
          <button key={s} className="tab-pill tab-pill-inactive">{s}</button>
        ))}
      </div>

      {/* Recently Upgraded banner */}
      <div className="rounded-2xl border border-accent-green/20 bg-accent-green/5 p-4">
        <p className="section-label text-accent-green/70 mb-2">Recently Upgraded (last 48h)</p>
        <p className="text-sm text-slate-500">
          No upgrades recorded yet.
        </p>
      </div>

      {/* Placeholder rows */}
      <div className="space-y-3">
        <p className="section-label">All Non-Active Players</p>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="game-card flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 shrink-0" />
              <div className="space-y-1.5">
                <div className="h-3 w-28 bg-white/10 rounded-full" />
                <div className="h-2 w-20 bg-white/10 rounded-full" />
              </div>
            </div>
            <div className="h-5 w-20 bg-white/10 rounded-full" />
          </div>
        ))}
        <p className="text-center text-xs text-slate-600 pt-2">
          Add your API key &amp; run a refresh to see live data.
        </p>
      </div>

    </div>
  );
}
