interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-zinc-200 rounded-md ${className}`}
      aria-hidden="true"
    />
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
      <div className="relative aspect-[4/3] bg-zinc-100">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg">
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
      <div className="p-4">
        <Skeleton className="w-full h-5 mb-2" />
        <div className="flex items-center space-x-4">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
    </div>
  );
}

export function NutritionCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-6">
      <Skeleton className="w-32 h-6 mb-4" />
      <div className="space-y-3">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
    </div>
  );
}

export function UserProfileSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <Skeleton className="w-32 h-5 mb-2" />
          <Skeleton className="w-48 h-4" />
        </div>
      </div>
    </div>
  );
}

export function RecipeDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="aspect-video bg-zinc-100 rounded-xl overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>
    </div>
  );
}
