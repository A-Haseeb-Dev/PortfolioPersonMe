"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Monitor,
  Server,
  Database,
  Cloud,
  Smartphone,
  Wrench,
  ChevronRight,
  Star,
} from "lucide-react"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import { techCategories } from "@/lib/constants"

const categoryIcons: Record<string, React.ReactNode> = {
  monitor: <Monitor className="h-5 w-5" />,
  server: <Server className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  cloud: <Cloud className="h-5 w-5" />,
  smartphone: <Smartphone className="h-5 w-5" />,
  tool: <Wrench className="h-5 w-5" />,
}

const accentGradients = [
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-cyan-500 to-sky-500",
]

export default function TechStackPreview() {
  const [selected, setSelected] = React.useState(0)

  return (
    <Section
      title="Technology Stack"
      subtitle="Modern tools and frameworks I work with daily to build exceptional digital products."
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="w-full shrink-0 space-y-1 lg:w-72 xl:w-80 lg:max-h-[600px] lg:overflow-y-auto">
          {techCategories.map((category, index) => (
            <button
              key={category.name}
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
                selected === index ? "bg-zinc-800 text-zinc-50 dark:bg-zinc-700 dark:text-zinc-200" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              )}>
                {categoryIcons[category.icon] || <Wrench className="h-4 w-4" />}
              </span>
              <div className="flex-1 truncate">
                <div className="truncate">{category.name}</div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500">{category.technologies.length} technologies</div>
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
              {(() => {
                const category = techCategories[selected]
                const gradient = accentGradients[selected % accentGradients.length]
                return (
                  <GlassCard intensity="light" hover={false} className="group relative h-full overflow-hidden">
                    <div className={cn("absolute left-0 top-0 h-1 w-full bg-gradient-to-r opacity-80", gradient)} />
                    <div className="p-6 sm:p-8">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 shadow-sm dark:bg-zinc-800">
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {categoryIcons[category.icon] || <Wrench className="h-7 w-7" />}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                            {category.name}
                          </h3>
                          <p className="text-sm text-zinc-400 dark:text-zinc-500">
                            {category.technologies.length} technologies
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {category.technologies.map((tech, i) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 transition-all hover:border-zinc-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-800/20 dark:hover:border-zinc-700"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-200/50 text-xs font-bold text-zinc-500 dark:bg-zinc-700/50 dark:text-zinc-400">
                              {tech.slice(0, 2)}
                            </div>
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{tech}</span>
                            <Star className="ml-auto h-3.5 w-3.5 text-zinc-300 dark:text-zinc-600" />
                          </motion.div>
                        ))}
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
