"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ExternalLink, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { LucideIcon } from "lucide-react"

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
  icon: LucideIcon
  color: string
  description: string
}

interface TechCategoriesProps {
  searchQuery: string
  activeCategory: string | null
  onTechSelect: (tech: Technology) => void
  selectedTech: Technology | null
  technologies: Technology[]
  skillCategories: SkillCategory[]
}

export default function TechCategories({
  searchQuery,
  activeCategory,
  onTechSelect,
  selectedTech,
  technologies,
  skillCategories,
}: TechCategoriesProps) {
  const categoryCounts = technologies.reduce<Record<string, number>>((acc, t) => {
    acc[t.categoryId] = (acc[t.categoryId] || 0) + 1
    return acc
  }, {})
  const [expandedCategory, setExpandedCategory] = useState<string | null>("frontend")
  const [expandedTechs, setExpandedTechs] = useState<Set<string>>(new Set())

  const filteredCategories = skillCategories.filter((cat) => {
    if (activeCategory && activeCategory !== cat.id) return false
    if (searchQuery) {
      const catTechs = technologies.filter((t) => t.categoryId === cat.id)
      return catTechs.some(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return true
  })

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const getTechsByCategory = (categoryId: string) => {
    let techs = technologies.filter((t) => t.categoryId === categoryId)
    if (searchQuery) {
      techs = techs.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return techs
  }

  const experienceColors: Record<string, string> = {
    beginner: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    intermediate: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
    advanced: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
    expert: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
  }

  return (
    <div className="space-y-4">
      {filteredCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Filter size={40} className="mb-4 text-zinc-300 dark:text-zinc-600" />
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
            No technologies found
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        filteredCategories.map((category, index) => {
          const Icon = category.icon
          const isExpanded = expandedCategory === category.id
          const techs = getTechsByCategory(category.id)
          const count = techs.length
          const totalCount = categoryCounts[category.id] || 0

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <GlassCard
                intensity="light"
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  isExpanded && "shadow-xl"
                )}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-white/50 dark:hover:bg-zinc-800/30"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                      {category.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                      {count === totalCount
                        ? `${totalCount} technologies`
                        : `${count} of ${totalCount} technologies`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs">
                      {totalCount}
                    </Badge>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown
                        size={18}
                        className="text-zinc-400 dark:text-zinc-500"
                      />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-zinc-100 dark:border-zinc-800" />
                      <ScrollArea className="max-h-[500px]">
                        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {techs.map((tech) => {
                            const isSelected = selectedTech?.id === tech.id
                            return (
                              <motion.button
                                key={tech.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => onTechSelect(tech)}
                                className={cn(
                                  "group relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-200",
                                  isSelected
                                    ? "border-zinc-900 bg-zinc-50 shadow-md dark:border-zinc-50 dark:bg-zinc-800"
                                    : "border-zinc-200 bg-white/50 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-zinc-600"
                                )}
                              >
                                <div className="flex w-full items-center justify-between">
                                  <span className="text-xl">{tech.icon}</span>
                                  <span
                                    className={cn(
                                      "rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                                      experienceColors[tech.experienceLevel]
                                    )}
                                  >
                                    {tech.experienceLevel}
                                  </span>
                                </div>
                                <div className="w-full">
                                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                    {tech.name}
                                  </h4>
                                  <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
                                    {tech.description}
                                  </p>
                                </div>
                                <div className="flex w-full items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
                                  <span>{tech.yearsExperience} yr{tech.yearsExperience !== 1 ? "s" : ""}</span>
                                  <div className="flex items-center gap-1">
                                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                                      <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                          width: `${tech.proficiency}%`,
                                          backgroundColor: tech.color,
                                        }}
                                      />
                                    </div>
                                    <span className="text-[10px] font-medium">
                                      {tech.proficiency}%
                                    </span>
                                  </div>
                                </div>
                                <ExternalLink
                                  size={12}
                                  className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-40"
                                />
                              </motion.button>
                            )
                          })}
                        </div>
                      </ScrollArea>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          )
        })
      )}
    </div>
  )
}
