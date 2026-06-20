export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-ping-slow rounded-full bg-accent/30" />
          <div className="absolute h-12 w-12 animate-spin-slow rounded-full border-2 border-transparent border-t-accent border-r-accent" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-accent/20" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-2 w-24 shimmer-skeleton" />
          <div className="h-2 w-16 shimmer-skeleton" />
        </div>
      </div>
    </div>
  )
}
