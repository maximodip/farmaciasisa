export default function Loading() {
  // Create an array of 8 items to show loading skeletons
  const loadingItems = Array.from({ length: 18 }, (_, i) => i)

  return (
    <div className="">
      {/* Grid of loading skeletons */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {loadingItems.map((index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-100 p-4 rounded-lg space-y-2"
          >
            {/* Loading states for customer ID, name, and phone */}
            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
