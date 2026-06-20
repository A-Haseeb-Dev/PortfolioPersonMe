"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Command, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { GradientText } from "@/components/ui/gradient-text"
import { skillCategories, technologies } from "@/data/skills"

interface SkillsHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

const categoryCounts = technologies.reduce<Record<string, number>>((acc, t) => {
  acc[t.categoryId] = (acc[t.categoryId] || 0) + 1
  return acc
}, {})

const filterTabs = [
  { id: null as string | null, name: "All", icon: Sparkles },
  ...skillCategories.map((c) => ({ id: c.id, name: c.name, icon: c.icon })),
]

export default function SkillsHeader({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: SkillsHeaderProps) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="relative overflow-hidden border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/50 to-transparent dark:from-zinc-900/30" />
      <Container className="relative py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200/50 bg-white/50 px-4 py-1.5 text-xs font-medium text-zinc-500 backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-900/50 dark:text-zinc-400"
          >
            <Sparkles size={12} />
            Interactive Technology Explorer
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <GradientText from="from-zinc-900" via="via-zinc-600" to="to-zinc-400" animate>
              Skills & Technologies
            </GradientText>
          </h1>

          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 sm:text-xl">
            Explore my technical expertise across{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">
              {skillCategories.length} categories
            </span>{" "}
            and{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">
              {technologies.length}+ technologies
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div
            className={cn(
              "group relative flex items-center rounded-2xl border-2 bg-white/60 backdrop-blur-xl transition-all duration-300 dark:bg-zinc-900/60",
              focused
                ? "border-zinc-900 shadow-lg shadow-zinc-900/10 dark:border-zinc-50 dark:shadow-zinc-900/30"
                : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
            )}
          >
            <Search
              size={18}
              className={cn(
                "ml-4 shrink-0 transition-colors duration-300",
                focused ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400"
              )}
            />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search technologies..."
              className="h-14 flex-1 bg-transparent px-4 text-base outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
            <div className="mr-4 hidden items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 sm:flex">
              <Command size={12} />
              <span>K</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab, index) => {
              const Icon = tab.icon
              const isActive = activeCategory === tab.id
              return (
                <motion.button
                  key={tab.id ?? "all"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.03, duration: 0.3 }}
                  onClick={() => onCategoryChange(isActive && tab.id !== null ? null : tab.id)}
                  className={cn(
                    "group relative inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-50 dark:text-zinc-900"
                      : "bg-white/50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  )}
                >
                  <Icon size={14} />
                  <span>{tab.name}</span>
                  {tab.id && (
                    <span
                      className={cn(
                        "ml-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium",
                        isActive
                          ? "bg-zinc-800 text-zinc-300 dark:bg-zinc-700 dark:text-zinc-400"
                          : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                      )}
                    >
                      {categoryCounts[tab.id] || 0}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
