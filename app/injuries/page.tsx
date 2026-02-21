export default function InjuriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Injury &amp; Status Tracker</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          All non-active players today.
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
          No data yet — run a refresh to populate injury statuses.
        </p>
      </div>
    </div>
  );
}
