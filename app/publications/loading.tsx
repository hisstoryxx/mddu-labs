export default function PublicationsLoading() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      {/* SectionTitle skeleton */}
      <div className="mb-8">
        <div className="h-9 w-56 bg-gray-200 rounded-lg" />
        <div className="mt-2 h-5 w-40 bg-gray-100 rounded" />
        <div className="mt-4 h-1 w-16 bg-gray-200 rounded-full" />
      </div>

      {/* FilterBar skeleton */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-9 w-28 bg-gray-200 rounded-lg" />
        ))}
      </div>

      {/* Publication list skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-border p-5 space-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded" />
              <div className="h-5 w-36 bg-gray-200 rounded" />
            </div>
            <div className="h-5 w-full bg-gray-100 rounded" />
            <div className="h-4 w-3/4 bg-gray-100 rounded" />
            <div className="h-4 w-1/2 bg-gray-50 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
