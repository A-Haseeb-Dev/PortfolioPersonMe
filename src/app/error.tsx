"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RotateCcw, ArrowLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
      <div className="mx-auto max-w-lg text-center">
        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-transparent blur-3xl" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl border border-border bg-card shadow-lg">
            <AlertTriangle className="h-14 w-14 text-red-500" />
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mb-2 text-balance text-muted-foreground">
          An unexpected error occurred. Our team has been notified and we are
          working on a fix.
        </p>
        {error.digest && (
          <p className="mb-8 text-xs text-muted-foreground/60">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} variant="primary" size="lg">
            <RotateCcw size={16} />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              <ArrowLeft size={16} />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
