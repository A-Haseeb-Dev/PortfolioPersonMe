"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, ExternalLink, Calendar, ChevronRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui/glass-card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface CertificateItem {
  id: string
  title: string
  issuer: string
  date: string
  url: string | null
  description: string | null
}

const gradients = [
  "from-orange-500 to-amber-500",
  "from-blue-500 to-cyan-500",
  "from-blue-600 to-indigo-600",
  "from-violet-500 to-purple-500",
  "from-blue-400 to-sky-500",
  "from-emerald-500 to-teal-500",
]

export default function Certifications() {
  const [certs, setCerts] = React.useState<CertificateItem[]>([])
  const [selected, setSelected] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("/api/achievements?limit=10")
      .then((r) => r.json())
      .then((json) => {
        const items = json.achievements || json.data || []
        if (items.length > 0) {
          setCerts(items.map((c: Record<string, unknown>) => ({
            id: c.id as string,
            title: c.title as string,
            issuer: (c.issuer as string) || "",
            date: c.date ? new Date(c.date as string).getFullYear().toString() : "",
            url: c.url as string | null,
            description: c.description as string | null,
          })))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Section title="Certifications" subtitle="Loading certifications...">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      </Section>
    )
  }

  if (certs.length === 0) return null

  const cert = certs[selected]

  return (
    <Section
      title="Certifications"
      subtitle="Professional certifications and credentials that validate my expertise."
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="w-full shrink-0 space-y-1 lg:w-72 xl:w-80 lg:max-h-[600px] lg:overflow-y-auto">
          {certs.map((c, index) => (
            <button
              key={c.id}
              onClick={() => setSelected(index)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                selected === index
                  ? "bg-zinc-100 text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br",
                selected === index ? gradients[index % gradients.length] : "from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600"
              )}>
                <Award className={cn("h-4 w-4", selected === index ? "text-white" : "text-zinc-400 dark:text-zinc-500")} />
              </div>
              <div className="flex-1 truncate">
                <div className="truncate">{c.title}</div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500">{c.issuer}</div>
              </div>
              <ChevronRight className={cn(
                "h-4 w-4 shrink-0 transition-all duration-200",
                selected === index ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
              )} />
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
              transition={{ duration: 0.2 }}
            >
              <GlassCard intensity="light" hover={false} className="h-full overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="mb-6 flex items-start gap-5">
                    <div className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm", gradients[selected % gradients.length])}>
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{cert.title}</h3>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{cert.issuer}</p>
                      {cert.date && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
                          <Calendar className="h-3.5 w-3.5" />
                          {cert.date}
                        </div>
                      )}
                    </div>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  {cert.description && (
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{cert.description}</p>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
