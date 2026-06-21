"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, FileText, Award, BookOpen, Code2, FileJson } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useData } from "@/hooks/use-data"
import ResourceCard from "./resource-card"

interface Resource {
  id: string
  title: string
  slug: string
  description: string
  type: string
  fileUrl: string
  downloadCount: number
  published: boolean
  createdAt: string
  updatedAt: string
  tags?: string[]
  fileSize?: string
  lastUpdated?: string
  category?: string
}

const categories = [
  { id: "all", label: "All Resources" },
  { id: "resume", label: "Resume" },
  { id: "certificate", label: "Certificates" },
  { id: "portfolio", label: "Portfolio" },
  { id: "cheatsheet", label: "Cheat Sheets" },
  { id: "guide", label: "Guides" },
] as const

const sectionIcons: Record<string, LucideIcon> = {
  resume: FileText,
  certificate: Award,
  portfolio: BookOpen,
  cheatsheet: Code2,
  guide: FileJson,
}

function groupByType(items: Resource[]) {
  const groups = [
    ["resume", [] as Resource[]],
    ["portfolio", [] as Resource[]],
    ["certificate", [] as Resource[]],
    ["cheatsheet", [] as Resource[]],
    ["guide", [] as Resource[]],
  ] as const
  const map = new Map<string, Resource[]>()
  for (const r of items) {
    const key = r.type.toLowerCase()
    const arr = map.get(key) ?? []
    arr.push(r)
    map.set(key, arr)
  }
  return groups.filter(([type]) => (map.get(type)?.length ?? 0) > 0).map(([type]) => [type, map.get(type)!] as const)
}

const sectionNames: Record<string, string> = {
  resume: "Resume",
  portfolio: "Portfolio",
  certificate: "Certificates",
  cheatsheet: "Cheat Sheets",
  guide: "Guides",
}

export default function ResourcesGrid() {
  const resources = useData<Resource>("/api/resources", [])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const query = searchQuery.toLowerCase().trim()

  const matchesSearch = (r: Resource) =>
    !query ||
    r.title.toLowerCase().includes(query) ||
    r.description.toLowerCase().includes(query) ||
    (r.tags ?? []).some((t) => t.toLowerCase().includes(query))

  const filtered = useMemo(() => {
    const categoryFiltered =
      activeCategory === "all" ? resources : resources.filter((r) => r.type.toLowerCase() === activeCategory)
    return categoryFiltered.filter(matchesSearch)
  }, [activeCategory, query, resources])

  const showSections = activeCategory === "all" && !query
  const sections = useMemo(() => groupByType(filtered), [filtered])

  return (
    <section className="pb-24">
      <div className="mb-8 space-y-4">
        <div className="relative mx-auto max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-zinc-400 focus:outline-none focus:ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                activeCategory === cat.id
                  ? "bg-zinc-900 text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
              <Search className="h-6 w-6 text-zinc-400" />
            </div>
            <p className="text-base font-medium text-zinc-900 dark:text-zinc-50">No resources found</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Try a different search or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("all")
              }}
              className="mt-4 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : showSections ? (
          <motion.div
            key="sections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            {sections.map(([type, items]) => {
              const SectionIcon = sectionIcons[type]
              return (
                <section key={type}>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                      {SectionIcon && <SectionIcon size={15} className="text-zinc-600 dark:text-zinc-400" />}
                    </div>
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {sectionNames[type] ?? type}
                    </h2>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      {items.length} {items.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((resource, index) => (
                      <ResourceCard key={resource.id} resource={resource} index={index} />
                    ))}
                  </div>
                </section>
              )
            })}
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
