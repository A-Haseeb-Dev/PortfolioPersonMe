"use client"

import { motion } from "framer-motion"
import { FileText, Award, BookOpen, Code2, FileJson, Download, Calendar, Eye } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
interface Resource {
  id: string
  title: string
  slug?: string
  description: string
  type: string
  fileUrl: string
  downloadCount: number
  published?: boolean
  createdAt?: string
  updatedAt?: string
  tags?: string[]
  fileSize?: string
  lastUpdated?: string
  category?: string
}

const typeIcons: Record<string, LucideIcon> = {
  resume: FileText,
  certificate: Award,
  portfolio: BookOpen,
  cheatsheet: Code2,
  guide: FileJson,
}

const typeGradients: Record<string, string> = {
  resume: "from-blue-500 to-cyan-400",
  certificate: "from-amber-500 to-orange-400",
  portfolio: "from-purple-500 to-pink-400",
  cheatsheet: "from-emerald-500 to-teal-400",
  guide: "from-violet-500 to-indigo-400",
}

const typeLabels: Record<string, string> = {
  resume: "Resume",
  certificate: "Certificate",
  portfolio: "Portfolio",
  cheatsheet: "Cheat Sheet",
  guide: "Guide",
}

interface ResourceCardProps {
  resource: Resource
  index: number
}

export default function ResourceCard({ resource, index }: ResourceCardProps) {
  const resourceType = resource.type.toLowerCase()
  const Icon = typeIcons[resourceType]

  return (
    <motion.a
      href={resource.fileUrl}
      download
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative block cursor-pointer"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-zinc-200/60 bg-white p-5 shadow-sm transition-all duration-300",
          "dark:border-zinc-800/60 dark:bg-zinc-900/80",
          "hover:border-zinc-300/80 hover:shadow-lg dark:hover:border-zinc-700/80"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            "bg-gradient-to-br",
            typeGradients[resourceType]
          )}
          style={{ maskImage: "radial-gradient(circle at 0% 0%, black, transparent 70%)" }}
        />

        <div className="relative flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md",
              typeGradients[resourceType],
              "text-white"
            )}
          >
            <Icon size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {resource.title}
              </h3>
              <span className="shrink-0 rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                {typeLabels[resourceType]}
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {resource.description}
            </p>
          </div>
        </div>

        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {(resource.tags ?? []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Download size={12} />
              {resource.fileSize}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {resource.downloadCount}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {resource.lastUpdated}
            </span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform duration-200 group-hover:scale-110 dark:bg-zinc-50 dark:text-zinc-900">
            <Download size={14} />
          </div>
        </div>
      </div>
    </motion.a>
  )
}
