"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { contributions, totalContributions } from "@/data/opensource"

const levelColors = [
  "bg-zinc-100 dark:bg-zinc-800",
  "bg-emerald-200 dark:bg-emerald-900/40",
  "bg-emerald-300 dark:bg-emerald-700/50",
  "bg-emerald-400 dark:bg-emerald-600/60",
  "bg-emerald-500 dark:bg-emerald-500/70",
]

interface TooltipData {
  date: string
  count: number
  x: number
  y: number
}

export default function OpensourceContributions() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const weeks = useMemo(() => {
    const w: (typeof contributions)[] = []
    for (let i = 0; i < contributions.length; i += 7) {
      w.push(contributions.slice(i, i + 7))
    }
    return w
  }, [])

  return (
    <section className="pb-16 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        <GlassCard intensity="light" className="relative overflow-hidden p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Contribution Activity
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {totalContributions.toLocaleString()} contributions in the last year
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <span
                  key={level}
                  className={cn(
                    "h-3 w-3 rounded-sm",
                    levelColors[level]
                  )}
                />
              ))}
              <span>More</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-[3px]" style={{ minWidth: "720px" }}>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className={cn(
                        "h-3 w-3 rounded-sm transition-colors",
                        levelColors[day.level]
                      )}
                      onMouseEnter={(e) => {
                        const rect = (e.target as HTMLElement).getBoundingClientRect()
                        setTooltip({
                          date: day.date,
                          count: day.count,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 8,
                        })
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
            <span>{contributions[0]?.date} — {contributions[contributions.length - 1]?.date}</span>
          </div>

          {tooltip && (
            <div
              className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {tooltip.count} contributions
              </span>
              <span className="ml-1 text-zinc-500 dark:text-zinc-400">
                on {tooltip.date}
              </span>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}
