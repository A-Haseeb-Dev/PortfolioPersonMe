"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  Trophy,
  Award,
  Star,
  Code2,
  ExternalLink,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { useData } from "@/hooks/use-data"

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: string
  issuer: string
  icon?: string
  url?: string
  featured: boolean
}

const categoryIcons: Record<string, LucideIcon> = {
  award: Trophy,
  certification: Award,
  milestone: Star,
  project: Code2,
}

const categoryColors: Record<string, string> = {
  award: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  certification: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  milestone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  project: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
}

const categoryBorderColors: Record<string, string> = {
  award: "border-amber-300 dark:border-amber-700",
  certification: "border-blue-300 dark:border-blue-700",
  milestone: "border-emerald-300 dark:border-emerald-700",
  project: "border-purple-300 dark:border-purple-700",
}

function groupByYear(items: Achievement[]) {
  const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const groups: Record<string, Achievement[]> = {}
  for (const item of sorted) {
    const year = new Date(item.date).getFullYear().toString()
    if (!groups[year]) groups[year] = []
    groups[year].push(item)
  }
  return groups
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

export default function AchievementsTimeline() {
  const achievements = useData<Achievement>("/api/achievements", [])
  const grouped = useMemo(() => groupByYear(achievements), [achievements])

  return (
    <section className="py-16 sm:py-24">
      <div className="relative">
        <div className="pointer-events-none absolute left-[23px] top-0 h-full w-px bg-zinc-200 dark:bg-zinc-800 sm:left-1/2 sm:-translate-x-px" />

        {Object.entries(grouped).map(([year, items], yearIndex) => (
          <div key={year} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative z-10 mb-8 flex justify-center"
            >
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-4 py-1 text-sm font-bold text-zinc-900 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-50">
                {year}
              </span>
            </motion.div>

            {items.map((achievement, itemIndex) => {
              const Icon = categoryIcons[achievement.type.toLowerCase()]
              const isLeft = itemIndex % 2 === 0

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className={cn(
                    "relative mb-8 pl-14 sm:mb-12 sm:w-1/2 sm:pl-0",
                    isLeft ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
                  )}
                >
                  <div
                    className={cn(
                      "absolute left-[14px] top-1 z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 sm:left-auto",
                      categoryBorderColors[achievement.type.toLowerCase()],
                      isLeft ? "sm:right-[-9px]" : "sm:left-[-9px]"
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                  </div>

                  <GlassCard
                    intensity="light"
                    className={cn(
                      "relative overflow-hidden p-5 transition-all duration-300 hover:shadow-xl sm:p-6",
                      "border-l-2",
                      categoryBorderColors[achievement.type.toLowerCase()]
                    )}
                  >
                    <div className="relative">
                      <div className="flex items-start gap-3 sm:flex-row">
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm",
                            categoryColors[achievement.type.toLowerCase()]
                          )}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                              {achievement.title}
                            </h3>
                            {achievement.featured && (
                              <Badge variant="warning" className="text-[10px]">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                            {achievement.description}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                            <span>{formatDate(achievement.date)}</span>
                            <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                            <span>{achievement.issuer}</span>
                            {achievement.url && (
                              <>
                                <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                                <a
                                  href={achievement.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                                >
                                  View credential
                                  <ExternalLink size={10} />
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
