export default function AboutPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">About</h1>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        <p>
          <strong className="text-gray-900 dark:text-white">Sports Facts Dashboard</strong> is a
          personal NBA research tool. It displays factual, timestamped data only.
        </p>

        <hr className="border-gray-200 dark:border-gray-700" />

        <p>
          Data is provided by{" "}
          <strong className="text-gray-900 dark:text-white">API-NBA</strong> (API-Sports via
          RapidAPI). Data may be delayed or inaccurate. No guarantees are made
          regarding completeness or timeliness.
        </p>

        <p>
          This dashboard is for <strong className="text-gray-900 dark:text-white">informational
          purposes only</strong>. It does not offer predictions, guarantees, or
          betting advice of any kind.
        </p>

        <p className="text-xs text-gray-400">
          All timestamps are displayed in America/Chicago time.
        </p>
      </div>
    </div>
  );
}
