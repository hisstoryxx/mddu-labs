export default function GalleryLoading() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      {/* SectionTitle skeleton */}
      <div className="mb-8">
        <div className="h-9 w-36 bg-gray-200 rounded-lg" />
        <div className="mt-2 h-5 w-32 bg-gray-100 rounded" />
        <div className="mt-4 h-1 w-16 bg-gray-200 rounded-full" />
      </div>

      {/* Gallery grid skeleton */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {[200, 280, 180, 260, 220, 300, 240, 190, 270].map((h, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-2xl break-inside-avoid"
            style={{ height: h }}
          />
        ))}
      </div>
    </div>
  );
}
