"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  "All", "JavaScript", "React", "Next.js", "AI", "Flutter", "Development", "Career", "Tutorial",
] as const

interface BlogHeaderProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function BlogHeader({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: BlogHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-100/60 to-transparent blur-3xl dark:from-violet-950/40" />
        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-fuchsia-100/50 to-transparent blur-3xl dark:from-fuchsia-950/30" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl pb-16 pt-20 text-center sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-[var(--card-bg-60)] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              Articles & insights
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Blog
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Thoughts, tutorials, and insights on software development, technology, and building great products.
            </p>

            <div className="relative mx-auto mt-8 max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Search articles..."
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
            className="mt-8"
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={cn(
                    "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                    activeCategory === category
                      ? "bg-foreground text-background shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-secondary dark:hover:bg-muted"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
