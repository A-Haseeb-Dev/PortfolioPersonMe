import { PreloaderVisual } from "@/components/layout/preloader"

export default function PublicLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <PreloaderVisual />
    </div>
  )
}