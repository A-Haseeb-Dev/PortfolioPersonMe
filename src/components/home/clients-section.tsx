"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/animated-text"
import { cn } from "@/lib/utils"

interface Client {
  id: string
  name: string
  industry: string | null
  logo: string | null
  url: string | null
  featured: boolean
  order: number
}

export default function ClientsSection() {
  const [clients, setClients] = React.useState<Client[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    fetch("/api/clients?featured=true")
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (cancelled) return
        if (json && Array.isArray(json.clients)) {
          setClients(json.clients)
        }
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <Section title="Trusted By" subtitle="Organizations I&apos;ve had the privilege of working with.">
        <FadeIn direction="none">
          <div className="relative overflow-hidden">
            <motion.div className="flex gap-16">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex shrink-0 flex-col items-center gap-2">
                  <div className="flex h-16 w-32 items-center justify-center rounded-xl border border-zinc-200 bg-white/50 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/50">
                    <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                  </div>
                  <div className="h-2 w-12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
              ))}
            </motion.div>
          </div>
        </FadeIn>
      </Section>
    )
  }

  if (!clients.length) return null

  const duplicatedClients = [...clients, ...clients]

  return (
    <Section
      title="Trusted By"
      subtitle="Organizations I&apos;ve had the privilege of working with."
    >
      <FadeIn direction="none">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

          <motion.div
            className="flex gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedClients.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="flex shrink-0 flex-col items-center gap-2"
              >
                <div
                  className={cn(
                    "flex h-16 w-32 items-center justify-center rounded-xl",
                    "border border-zinc-200 bg-white/50 backdrop-blur-sm",
                    "dark:border-zinc-700 dark:bg-zinc-900/50"
                  )}
                >
                  <span className="text-sm font-bold text-zinc-400 dark:text-zinc-500">
                    {client.name.split(" ")[0]}
                  </span>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {client.industry}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </FadeIn>
    </Section>
  )
}
