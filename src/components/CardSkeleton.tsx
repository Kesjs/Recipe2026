export default function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-8 w-full animate-in fade-in duration-1000">
      <div className="relative aspect-[4/5] rounded-[2.5rem] bg-zinc-100 overflow-hidden shadow-sm ring-1 ring-zinc-200/50">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-pulse" />
      </div>
      <div className="space-y-4 px-2">
        <div className="h-2 w-24 bg-zinc-200 rounded-full animate-pulse" />
        <div className="h-8 w-full bg-zinc-100 rounded-2xl animate-pulse" />
        <div className="flex items-center space-x-4">
          <div className="h-4 w-16 bg-zinc-50 rounded-lg animate-pulse" />
          <div className="h-4 w-16 bg-zinc-50 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
