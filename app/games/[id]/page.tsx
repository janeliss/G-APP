interface PageProps {
  params: { id: string };
}

export default function GameDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="section-label mb-0.5">Game</p>
        <h1 className="text-lg font-bold text-white">#{params.id}</h1>
      </div>

      {/* Score card placeholder */}
      <div className="game-card">
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 w-20 bg-white/10 rounded-full animate-pulse" />
          <span className="badge-scheduled">Scheduled</span>
        </div>
        <div className="flex items-center justify-between px-4 animate-pulse">
          <div className="flex flex-col items-center gap-2 w-24">
            <div className="w-14 h-14 rounded-full bg-white/10" />
            <div className="h-3 w-16 bg-white/10 rounded-full" />
            <div className="h-2 w-10 bg-white/10 rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-20 bg-white/10 rounded-xl" />
            <div className="h-2 w-12 bg-white/10 rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-2 w-24">
            <div className="w-14 h-14 rounded-full bg-white/10" />
            <div className="h-3 w-16 bg-white/10 rounded-full" />
            <div className="h-2 w-10 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Team injury lists */}
      {["Away Team", "Home Team"].map((side) => (
        <div key={side} className="space-y-2">
          <p className="section-label">{side} — Status</p>
          <div className="game-card space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/10" />
                  <div className="h-2.5 w-24 bg-white/10 rounded-full" />
                </div>
                <div className="h-5 w-20 bg-white/10 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="text-center text-xs text-slate-600 pb-2">
        Add API key &amp; refresh to load game data.
      </p>

    </div>
  );
}
