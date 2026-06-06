export default function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
      <div className="h-48 bg-zinc-100 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-200 rounded animate-pulse" />
        <div className="h-4 bg-zinc-200 rounded w-3/4 animate-pulse" />
        <div className="flex items-center space-x-4">
          <div className="h-4 bg-zinc-200 rounded w-16 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
