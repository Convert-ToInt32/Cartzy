export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}></div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  )
}

export function CategorySkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
      <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  )
} 