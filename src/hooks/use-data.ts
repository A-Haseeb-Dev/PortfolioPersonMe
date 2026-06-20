"use client"

import { useState, useEffect } from "react"

export function useData<T>(
  apiUrl: string,
  fallback: T[],
  transform?: (data: Record<string, unknown>) => T[],
): T[] {
  const [data, setData] = useState<T[]>(fallback)

  useEffect(() => {
    fetch(apiUrl)
      .then((r) => r.json())
      .then((res) => {
        if (transform) {
          const transformed = transform(res as Record<string, unknown>)
          if (transformed.length > 0) setData(transformed)
        } else {
          const key = Object.keys(res as Record<string, unknown>).find(
            (k) => k !== "pagination" && k !== "total" && k !== "fallback",
          )
          const items = key ? (res as any)[key] : (res as any).data
          if (Array.isArray(items) && items.length > 0) setData(items)
        }
      })
      .catch(() => {})
  }, [apiUrl])

  return data
}
