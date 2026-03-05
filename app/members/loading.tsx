export default function MembersLoading() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      {/* SectionTitle skeleton */}
      <div className="mb-8">
        <div className="h-9 w-48 bg-gray-200 rounded-lg" />
        <div className="mt-2 h-5 w-32 bg-gray-100 rounded" />
        <div className="mt-4 h-1 w-16 bg-gray-200 rounded-full" />
      </div>

      {/* FilterBar skeleton */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 bg-gray-200 rounded-lg" />
        ))}
      </div>

      {/* Member cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-border overflow-hidden"
          >
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-48 bg-gray-100 rounded" />
              <div className="h-4 w-40 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
