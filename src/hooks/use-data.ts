"use client"

import { useState, useEffect } from "react"

export function useData<T>(
  apiUrl: string,
  fallback: T[],
  transform?: (data: Record<string, unknown>) => T[],
): T[] {
  const [data, setData] = useState<T[]>(fallback)

  useEffect(() => {
    let cancelled = false

    fetch(apiUrl)
      .then((r) => {
        if (!r.ok) throw new Error(`API error: ${r.status}`)
        return r.json()
      })
      .then((res: Record<string, unknown>) => {
        if (cancelled) return
        if (transform) {
          const transformed = transform(res)
          if (transformed.length > 0) setData(transformed)
        } else {
          const items: unknown[] = res.data as unknown[] ||
            (res[Object.keys(res).find(
              (k) => k !== "pagination" && k !== "total" && k !== "fallback",
            ) || ""] as unknown[]) ||
            []
          if (Array.isArray(items) && items.length > 0) setData(items as T[])
        }
      })
      .catch((err: Error) => {
        if (!cancelled) console.error(`[useData] Failed to fetch ${apiUrl}:`, err)
      })

    return () => { cancelled = true }
  }, [apiUrl, transform])

  return data
}
