export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Today&apos;s Games</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "America/Chicago",
            })}
          </p>
        </div>
        <button
          disabled
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-400 cursor-not-allowed"
        >
          Refresh Now
        </button>
      </div>

      {/* Daily Brief placeholder */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Daily Brief
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No data yet — run a refresh to populate today&apos;s brief.
        </p>
      </div>

      {/* Games placeholder */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
          No games loaded. Connect your RapidAPI key and run a refresh.
        </p>
      </div>
    </div>
  );
}
