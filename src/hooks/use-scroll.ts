"use client"

import { useEffect, useState } from "react"

interface ScrollState {
  scrollY: number
  scrollX: number
  scrollDirection: "up" | "down"
  isAtTop: boolean
  isAtBottom: boolean
  scrollProgress: number
}

export function useScroll(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: "up",
    isAtTop: true,
    isAtBottom: false,
    scrollProgress: 0,
  })

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight

          setScrollState({
            scrollY: currentScrollY,
            scrollX: window.scrollX,
            scrollDirection: currentScrollY > lastScrollY ? "down" : "up",
            isAtTop: currentScrollY < 10,
            isAtBottom: Math.abs(docHeight - currentScrollY) < 10,
            scrollProgress: docHeight > 0 ? Math.min(currentScrollY / docHeight, 1) : 0,
          })

          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handler, { passive: true })
    handler()

    return () => window.removeEventListener("scroll", handler)
  }, [])

  return scrollState
}
