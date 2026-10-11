"use client"

import { useCallback, useSyncExternalStore } from "react"

const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
} as const

export type Breakpoint = keyof typeof breakpoints

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const mql = window.matchMedia(query)
    mql.addEventListener("change", onStoreChange)
    return () => mql.removeEventListener("change", onStoreChange)
  }, [query])

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(breakpoints[breakpoint])
}

export function useIsMobile(): boolean {
  return useBreakpoint("mobile")
}

export function useIsTablet(): boolean {
  return useBreakpoint("tablet")
}

export function useIsDesktop(): boolean {
  return useBreakpoint("desktop")
}
