"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
interface Technology {
  id: string
  name: string
  categoryId: string
  icon: string
  description: string
  experienceLevel: string
  yearsExperience: number
  proficiency: number
  color: string
}

interface SkillCategory {
  id: string
  name: string
  icon: React.ComponentType<{ size?: number }>
  color: string
  description: string
}

interface SkillProgressProps {
  categories: SkillCategory[]
  technologies: Technology[]
}

export default function SkillProgress({ categories, technologies }: SkillProgressProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("frontend")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter((cat) => {
    if (searchQuery) {
      return technologies.some(
        (t) =>
          t.categoryId === cat.id &&
          (t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    return true
  })

  const getTechsByCategory = (categoryId: string) => {
    let techs = technologies.filter((t) => t.categoryId === categoryId)
    if (searchQuery) {
      techs = techs.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return techs.sort((a, b) => b.proficiency - a.proficiency)
  }

  const getCategoryAverage = (categoryId: string): number => {
    const techs = technologies.filter((t) => t.categoryId === categoryId)
    if (techs.length === 0) return 0
    return Math.round(techs.reduce((sum, t) => sum + t.proficiency, 0) / techs.length)
  }

  return (
    <GlassCard intensity="light" className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
            <BarChart3 size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Skill Progress</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Detailed proficiency breakdown by category</p>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4">
        <Input
          icon={<Search size={14} />}
          placeholder="Filter skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 text-sm"
        />
      </div>

      <ScrollArea className="mt-4 max-h-[600px] px-6 pb-6">
        <div className="space-y-3">
          {filteredCategories.map((category) => {
            const Icon = category.icon
            const isExpanded = expandedCategory === category.id
            const techs = getTechsByCategory(category.id)
            const avg = getCategoryAverage(category.id)

            if (techs.length === 0) return null

            return (
              <div key={category.id} className="overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {category.name}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${avg}%` }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: category.color }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-xs font-medium text-zinc-500">{avg}%</span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={cn(
                      "shrink-0 text-zinc-400 transition-transform duration-200",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
                        {techs.map((tech, index) => (
                          <motion.div
                            key={tech.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                            className="group"
                          >
                            <div className="mb-1 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{tech.icon}</span>
                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                  {tech.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                                    tech.experienceLevel === "expert" && "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                                    tech.experienceLevel === "advanced" && "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
                                    tech.experienceLevel === "intermediate" && "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                                    tech.experienceLevel === "beginner" && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                  )}
                                >
                                  {tech.experienceLevel}
                                </span>
                                <span className="text-xs font-medium text-zinc-500">
                                  {tech.proficiency}%
                                </span>
                              </div>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${tech.proficiency}%` }}
                                transition={{ delay: index * 0.05, duration: 0.8, ease: "easeOut" }}
                                className="h-full rounded-full transition-all duration-300 group-hover:opacity-80"
                                style={{ backgroundColor: tech.color }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </GlassCard>
  )
}
