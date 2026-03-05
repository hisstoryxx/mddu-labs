export default function ResearchLoading() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      {/* SectionTitle skeleton */}
      <div className="mb-8">
        <div className="h-9 w-44 bg-gray-200 rounded-lg" />
        <div className="mt-2 h-5 w-36 bg-gray-100 rounded" />
        <div className="mt-4 h-1 w-16 bg-gray-200 rounded-full" />
      </div>

      {/* FilterBars skeleton */}
      <div className="space-y-3 mb-8">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-28 bg-gray-200 rounded-lg" />
          ))}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Research cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-border p-6 space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
              <div className="h-6 w-24 bg-gray-100 rounded-full" />
            </div>
            <div className="h-6 w-3/4 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-5/6 bg-gray-100 rounded" />
            </div>
            <div className="h-4 w-40 bg-gray-50 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
