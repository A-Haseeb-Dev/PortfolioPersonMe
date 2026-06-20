"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Globe,
  Smartphone,
  Palette,
  Cloud,
  Lightbulb,
  Brain,
  ArrowUpRight,
  Check,
  ChevronRight,
} from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import { services } from "@/lib/constants"

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe className="h-5 w-5" />,
  smartphone: <Smartphone className="h-5 w-5" />,
  palette: <Palette className="h-5 w-5" />,
  cloud: <Cloud className="h-5 w-5" />,
  lightbulb: <Lightbulb className="h-5 w-5" />,
  brain: <Brain className="h-5 w-5" />,
}

const accentColors = [
  { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-600 dark:text-blue-400", bar: "bg-blue-500", border: "border-blue-200 dark:border-blue-800" },
  { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500", border: "border-emerald-200 dark:border-emerald-800" },
  { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-600 dark:text-violet-400", bar: "bg-violet-500", border: "border-violet-200 dark:border-violet-800" },
  { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-600 dark:text-amber-400", bar: "bg-amber-500", border: "border-amber-200 dark:border-amber-800" },
  { bg: "bg-rose-50 dark:bg-rose-950/30", text: "text-rose-600 dark:text-rose-400", bar: "bg-rose-500", border: "border-rose-200 dark:border-rose-800" },
  { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-600 dark:text-cyan-400", bar: "bg-cyan-500", border: "border-cyan-200 dark:border-cyan-800" },
]

export default function FeaturedServices() {
  const [selected, setSelected] = React.useState(0)

  return (
    <Section
      title="Services"
      subtitle="Comprehensive solutions tailored to bring your digital vision to life."
      action={
        <Button variant="ghost" size="sm" asChild>
          <a href="/services">
            View All Services
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      }
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="w-full shrink-0 space-y-1 lg:w-72 xl:w-80 lg:max-h-[600px] lg:overflow-y-auto">
          {services.slice(0, 6).map((service, index) => {
            const colors = accentColors[index % accentColors.length]
            return (
              <button
                key={service.title}
                onClick={() => setSelected(index)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                  selected === index
                    ? "bg-zinc-100 text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
                )}
              >
                <span className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  selected === index ? colors.bg : "bg-zinc-100 dark:bg-zinc-800"
                )}>
                  <span className={selected === index ? colors.text : "text-zinc-400 dark:text-zinc-500"}>
                    {iconMap[service.icon] || <Lightbulb className="h-4 w-4" />}
                  </span>
                </span>
                <span className="flex-1 truncate">{service.title}</span>
                <ChevronRight className={cn(
                  "h-4 w-4 shrink-0 transition-all duration-200",
                  selected === index ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                )} />
              </button>
            )
          })}
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
              {(() => {
                const service = services[selected]
                const colors = accentColors[selected % accentColors.length]
                return (
                  <GlassCard intensity="light" hover={false} className="h-full overflow-hidden">
                    <div className={cn("h-1.5 w-full", colors.bar)} />
                    <div className="p-6 sm:p-8">
                      <div className="mb-6 flex items-center gap-4">
                        <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", colors.bg)}>
                          <span className={cn("h-7 w-7", colors.text)}>
                            {iconMap[service.icon] || <Lightbulb className="h-7 w-7" />}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                            {service.title}
                          </h3>
                          <p className="text-sm text-zinc-400 dark:text-zinc-500">
                            {service.price}
                          </p>
                        </div>
                      </div>
                      <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {service.description}
                      </p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/20">
                            <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full", colors.bg)}>
                              <Check className={cn("h-3 w-3", colors.text)} />
                            </div>
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center gap-3 text-sm">
                        <Button size="sm">
                          Get Started
                        </Button>
                        <Button variant="ghost" size="sm">
                          Learn more &rarr;
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                )
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
