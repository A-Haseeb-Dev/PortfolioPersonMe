"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useSettings } from "@/contexts/settings-context"
import { usePendingFetches } from "@/lib/loading-store"

const MIN_DURATION = 1100
const MAX_DURATION = 8000

let hasBooted = false

export function PreloaderVisual({ name, title }: { name?: string; title?: string }) {
  const displayName = name && name.trim() ? name : "Portfolio"
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div className="relative flex flex-col items-center gap-8 px-6">
      <div className="pointer-events-none absolute -z-10 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />

      <div className="relative flex h-24 w-24 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-3xl"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--accent) 100deg, transparent 220deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
        />
        <span className="absolute inset-[3px] rounded-[20px] bg-background" />
        <motion.span
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-2xl font-bold text-white shadow-lg dark:bg-white dark:text-zinc-900"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {initial}
        </motion.span>
      </div>

      <div className="flex flex-col items-center gap-1.5 text-center">
        <motion.span
          className="text-base font-semibold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {displayName}
        </motion.span>
        {title ? (
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {title}
          </span>
        ) : null}
      </div>

      <div className="h-1 w-56 overflow-hidden rounded-full bg-muted">
        <motion.span
          className="block h-full w-1/3 rounded-full bg-gradient-to-r from-accent/30 via-accent to-accent/30"
          animate={{ x: ["-140%", "340%"] }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    </div>
  )
}

/**
 * Full-screen branded loader shown on the very first visit. It stays visible
 * until settings are loaded and every tracked data request has settled, then
 * fades away. It only shows once per session so client-side navigation stays
 * instant.
 */
export function SitePreloader() {
  const { settings, loading } = useSettings()
  const pending = usePendingFetches()

  const [minElapsed, setMinElapsed] = useState(false)
  const [show, setShow] = useState(!hasBooted)

  useEffect(() => {
    const timer = setTimeout(() => setMinElapsed(true), MIN_DURATION)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!show) return
    if (!loading && pending === 0 && minElapsed) {
      hasBooted = true
      setShow(false)
    }
  }, [show, loading, pending, minElapsed])

  // Never get stuck if a request hangs.
  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => {
      hasBooted = true
      setShow(false)
    }, MAX_DURATION)
    return () => clearTimeout(timer)
  }, [show])

  useEffect(() => {
    if (!show) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="site-preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <PreloaderVisual
            name={settings.site_config.name}
            title={settings.site_config.title}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Slim top progress bar shown while data is being fetched on navigation. */
export function RouteProgressBar() {
  const pending = usePendingFetches()
  const active = pending > 0

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="route-progress"
          className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-gradient-to-r from-accent/40 via-accent to-accent/40"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 0.9, opacity: 1 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  )
}
