"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, TrendingUp, Users, Clock, DollarSign, ArrowRight, ChevronRight, AlertCircle, Route, Target, Quote } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface CaseStudyItem {
  id: string
  title: string
  client: string | null
  industry: string | null
  problem: string | null
  results: string | null
  slug: string
}

const metricIcons: Record<string, React.ElementType> = { TrendingUp, Users, Clock, DollarSign }

const accentColors = [
  { bg: "from-blue-500 to-cyan-500", light: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-600 dark:text-blue-400" },
  { bg: "from-emerald-500 to-teal-500", light: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-600 dark:text-emerald-400" },
  { bg: "from-violet-500 to-purple-500", light: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-600 dark:text-violet-400" },
]

export default function FeaturedCaseStudies() {
  const [studies, setStudies] = React.useState<CaseStudyItem[]>([])
  const [selected, setSelected] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("/api/case-studies?featured=true&published=true&limit=6")
      .then((r) => r.json())
      .then((json) => {
        const items = json.caseStudies || json.data || []
        if (items.length > 0) {
          setStudies(items.map((s: Record<string, unknown>) => ({
            id: s.id as string,
            title: s.title as string,
            client: s.client as string | null,
            industry: s.industry as string | null,
            problem: s.problem as string | null,
            results: s.results as string | null,
            slug: s.slug as string,
          })))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Section title="Case Studies" subtitle="Loading case studies...">
        <Skeleton className="h-96 rounded-xl" />
      </Section>
    )
  }

  if (studies.length === 0) return null

  const study = studies[selected]
  const colors = accentColors[selected % accentColors.length]

  return (
    <Section
      title="Case Studies"
      subtitle="Real projects, real results. See how I've helped businesses transform their digital presence."
      action={
        <Button variant="ghost" size="sm" asChild>
          <a href="/case-studies">
            View All Case Studies
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      }
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="w-full shrink-0 space-y-1 lg:w-72 xl:w-80 lg:max-h-[600px] lg:overflow-y-auto">
          {studies.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setSelected(index)}
              className={cn(
                "group relative flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-200",
                selected === index ? "bg-muted shadow-sm" : "hover:bg-muted"
              )}
            >
              <div className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200",
                selected === index ? "bg-gradient-to-br shadow-sm text-white" + " " + colors.bg : "bg-muted text-muted-foreground"
              )}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className={cn("text-sm font-medium truncate", selected === index ? "text-foreground" : "text-muted-foreground")}>
                  {s.title}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.client}</div>
              </div>
              <ChevronRight className={cn("h-4 w-4 shrink-0 transition-all", selected === index ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0")} />
            </button>
          ))}
        </div>
        <div className="relative min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <GlassCard intensity="light" hover={false} className="relative h-full overflow-hidden">
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.02]", colors.bg)} />
                <div className="relative h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <div className={cn("h-2 w-full bg-gradient-to-r", colors.bg)} />
                    <div className="px-6 sm:px-8 pt-6 sm:pt-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", colors.light)}>
                            <Target className={cn("h-5 w-5", colors.text)} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider">
                                {study.industry || "Project"}
                              </Badge>
                              {study.client && <span className="text-xs text-muted-foreground">{study.client}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="mt-4 text-xl font-bold leading-snug text-foreground sm:text-2xl">{study.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {study.problem || ""}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 sm:px-8 mt-6 pb-6 sm:pb-8">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/30">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">The Problem</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{study.problem || "Not specified"}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-4">
                      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", colors.light)}>
                        <Route className={cn("h-4 w-4", colors.text)} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">The Results</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{study.results || "Completed successfully"}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <a href={`/case-studies/${study.slug}`} className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
                        Read full case study
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
