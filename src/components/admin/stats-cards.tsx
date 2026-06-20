"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"

interface Stat {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: { value: number; positive: boolean }
  onClick?: () => void
}

interface StatsCardsProps {
  stats: Stat[]
  className?: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function StatsCards({ stats, className }: StatsCardsProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", className)}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={item}
          className={cn(stat.onClick && "cursor-pointer")}
          onClick={stat.onClick}
        >
          <GlassCard intensity="light" className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                {stat.icon}
              </div>
              {stat.trend && (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
                    stat.trend.positive
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                      : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                  )}
                >
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {stat.trend.positive ? (
                      <polyline points="18 15 12 9 6 15" />
                    ) : (
                      <polyline points="6 9 12 15 18 9" />
                    )}
                  </svg>
                  {Math.abs(stat.trend.value)}%
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </motion.div>
  )
}
