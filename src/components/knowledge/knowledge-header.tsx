"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface CategoryPill {
  id: string
  name: string
  color: string
}

interface KnowledgeHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  activeCategory: string
  onCategoryChange: (category: string) => void
  categories: CategoryPill[]
}

export default function KnowledgeHeader({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  categories,
}: KnowledgeHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background pb-12 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-100/60 to-transparent blur-3xl dark:from-purple-950/40" />
        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-fuchsia-100/50 to-transparent blur-3xl dark:from-fuchsia-950/30" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-[var(--card-bg-60)] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              A curated collection of notes & guides
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Knowledge{" "}
              <span className="bg-gradient-to-r from-purple-600 to-fuchsia-400 bg-clip-text text-transparent dark:from-purple-400 dark:to-fuchsia-300">
                Base
              </span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              A curated collection of notes, guides, and references I have gathered on software development, AI, and more.
            </p>

            <div className="relative mx-auto mt-8 max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search all notes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-xl border border-border bg-[var(--card-bg-80)] py-3 pl-11 pr-4 text-sm text-foreground shadow-sm backdrop-blur-sm placeholder:text-muted-foreground focus:border-zinc-400 focus:outline-none focus:ring-0 dark:focus:border-zinc-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              onClick={() => onCategoryChange("all")}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                activeCategory === "all"
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              )}
            >
              All
            </button>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-foreground text-background shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {!isActive && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  )}
                  {cat.name}
                </button>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
