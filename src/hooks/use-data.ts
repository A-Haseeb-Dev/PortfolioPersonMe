"use client"

import { useState, useEffect, useRef } from "react"
import { beginLoading } from "@/lib/loading-store"

export function useData<T>(
  apiUrl: string,
  fallback: T[],
  transform?: (data: Record<string, unknown>) => T[],
): T[] {
  const [data, setData] = useState<T[]>(fallback)
  const transformRef = useRef(transform)

  useEffect(() => {
    transformRef.current = transform
  }, [transform])

  useEffect(() => {
    let cancelled = false
    const end = beginLoading()

    fetch(apiUrl)
      .then((r) => {
        if (!r.ok) throw new Error(`API error: ${r.status}`)
        return r.json()
      })
      .then((res: Record<string, unknown>) => {
        if (cancelled) return
        const transformFn = transformRef.current
        if (transformFn) {
          const transformed = transformFn(res)
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
      .finally(() => {
        end()
      })

    return () => { cancelled = true }
  }, [apiUrl])

  return data
}
