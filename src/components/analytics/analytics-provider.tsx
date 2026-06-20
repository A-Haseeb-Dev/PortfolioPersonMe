"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()
  const startTimeRef = React.useRef(Date.now())
  const trackedPathRef = React.useRef("")

  React.useEffect(() => {
    const page = pathname || "/"
    if (trackedPathRef.current === page) return
    trackedPathRef.current = page

    const payload = { type: "pageview", page }
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {})

    if (!sessionStorage.getItem("visitor_tracked")) {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "visitor", page }),
      }).catch(() => {})
      sessionStorage.setItem("visitor_tracked", "1")
    }

    startTimeRef.current = Date.now()
  }, [pathname])

  return <>{children}</>
}
