"use client"

import { motion } from "framer-motion"
import { Clock, Calendar, ArrowUpRight, BookOpen } from "lucide-react"
import { formatDateShort } from "@/lib/utils"
interface KnowledgeNote {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  categoryId: string
  tags: string[]
  readingTime: number
  lastUpdated: Date
  createdAt: Date
}

interface KnowledgeCardProps {
  note: KnowledgeNote
  index: number
  onSelect: (slug: string) => void
}

const categoryGradients: Record<string, string> = {
  javascript: "from-yellow-500 to-amber-400",
  react: "from-sky-500 to-cyan-400",
  nextjs: "from-zinc-600 to-zinc-400",
  flutter: "from-blue-500 to-indigo-400",
  ai: "from-purple-500 to-fuchsia-400",
  business: "from-sky-500 to-blue-400",
}

export default function KnowledgeCard({ note, index, onSelect }: KnowledgeCardProps) {
  const gradient = categoryGradients[note.categoryId] ?? "from-zinc-500 to-zinc-400"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div
        onClick={() => onSelect(note.slug)}
        className="group cursor-pointer rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-5 shadow-sm transition-all duration-300 hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-2">
              <div className={`flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br ${gradient} text-white`}>
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {note.category.replace(" Notes", "")}
              </span>
              <span className="text-xs text-muted-foreground/40">·</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {note.readingTime} min
              </span>
            </div>

            <h3 className="font-semibold text-foreground transition-colors group-hover:text-muted-foreground">
              {note.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {note.excerpt}
            </p>

            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDateShort(note.lastUpdated)}
              </span>
            </div>
          </div>

          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </div>

        {note.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/40 pt-3">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-[10px] text-muted-foreground/60">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
