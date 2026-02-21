interface PageProps {
  params: { id: string };
}

export default function GameDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Game #{params.id}</h1>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
          Game details coming soon.
        </p>
      </div>
    </div>
  );
}
