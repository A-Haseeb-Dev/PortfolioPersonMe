"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/animated-text"
import { cn } from "@/lib/utils"

const clients = [
  { name: "TechFlow Inc.", industry: "SaaS" },
  { name: "ShopGlobal", industry: "E-Commerce" },
  { name: "DataVue Analytics", industry: "Analytics" },
  { name: "NextGen Solutions", industry: "Enterprise" },
  { name: "CloudPeak Systems", industry: "Infrastructure" },
  { name: "InnovateAI Labs", industry: "AI/ML" },
  { name: "PixelPerfect Studio", industry: "Design" },
  { name: "QuantumLeap Ventures", industry: "Startups" },
]

export default function ClientsSection() {
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
                key={`${client.name}-${i}`}
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
