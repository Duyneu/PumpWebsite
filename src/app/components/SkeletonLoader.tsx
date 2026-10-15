/**
 * Skeleton loader components for various UI elements
 * Shows loading placeholders while content is being fetched
 */

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-5 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
        </div>
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[600px] bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-3xl px-4">
          <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto" />
          <div className="h-6 bg-gray-300 rounded w-full mx-auto" />
          <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto" />
          <div className="h-12 bg-gray-300 rounded w-1/4 mx-auto" />
        </div>
      </div>
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded"
          style={{ width: i === lines - 1 ? '80%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-200 animate-pulse ${className}`}>
      <div className="w-full h-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}
