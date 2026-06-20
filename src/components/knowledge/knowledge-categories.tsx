"use client"

import { motion } from "framer-motion"
import { Zap, Atom, ChevronUp, Palette, Brain, Briefcase, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { KnowledgeCategory } from "@/data/knowledge"

const categoryIconMap: Record<string, LucideIcon> = {
  javascript: Zap,
  react: Atom,
  nextjs: ChevronUp,
  flutter: Palette,
  ai: Brain,
  business: Briefcase,
}

interface KnowledgeCategoriesProps {
  categories: KnowledgeCategory[]
  activeCategory: string
  onCategoryChange: (id: string) => void
}

export default function KnowledgeCategories({
  categories,
  activeCategory,
  onCategoryChange,
}: KnowledgeCategoriesProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat, index) => {
        const isActive = activeCategory === cat.id
        const Icon = categoryIconMap[cat.id]

        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
          >
            <button
              onClick={() => onCategoryChange(isActive ? "all" : cat.id)}
              className={cn(
                "group relative w-full cursor-pointer overflow-hidden rounded-xl border p-5 text-left transition-all duration-300",
                "hover:shadow-md",
                isActive
                  ? "border-foreground bg-foreground text-background shadow-sm"
                  : "border-border/60 bg-[var(--card-bg-80)] text-foreground hover:border-foreground/30"
              )}
            >
              <div className="relative flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                    isActive
                      ? "bg-background/20 text-background"
                      : "bg-muted"
                  )}
                >
                  {Icon ? (
                    <Icon size={22} className={isActive ? "" : "text-muted-foreground"} />
                  ) : (
                    <span className="text-lg">{cat.icon}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3
                    className={cn(
                      "font-semibold",
                      isActive ? "text-background" : "text-foreground"
                    )}
                  >
                    {cat.name.replace(" Notes", "")}
                  </h3>
                  <p
                    className={cn(
                      "mt-0.5 text-sm leading-relaxed",
                      isActive
                        ? "text-background/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {cat.description}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                        isActive
                          ? "bg-background/20 text-background"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {cat.noteCount} {cat.noteCount === 1 ? "note" : "notes"}
                    </span>

                    {!isActive && (
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        )
      })}
    </div>
  )
}
