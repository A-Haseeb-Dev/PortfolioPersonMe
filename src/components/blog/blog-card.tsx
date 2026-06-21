"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { CalendarDays, Clock, FileJson, Code2, Atom, Zap, Brain, Smartphone, Briefcase, BookOpen, ArrowUpRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string | null
  category: string
  tags: string[]
  readingTime: string
  date: string
  featured: boolean
  author: {
    name: string
    avatar: string | null
    role: string
  }
}

const categoryMeta: Record<string, { icon: LucideIcon; gradient: string; badge: "info" | "success" | "warning" | "danger" | "default" | "secondary" }> = {
  JavaScript: { icon: FileJson, gradient: "from-yellow-500 to-amber-400", badge: "warning" },
  React: { icon: Atom, gradient: "from-sky-500 to-cyan-400", badge: "info" },
  "Next.js": { icon: Code2, gradient: "from-zinc-600 to-zinc-400", badge: "default" },
  AI: { icon: Brain, gradient: "from-purple-500 to-fuchsia-400", badge: "danger" },
  Flutter: { icon: Smartphone, gradient: "from-blue-500 to-indigo-400", badge: "info" },
  Development: { icon: Zap, gradient: "from-emerald-500 to-teal-400", badge: "success" },
  Career: { icon: Briefcase, gradient: "from-amber-500 to-orange-400", badge: "warning" },
  Tutorial: { icon: BookOpen, gradient: "from-rose-500 to-pink-400", badge: "secondary" },
}

interface BlogCardProps {
  post: BlogPost
  index?: number
  featured?: boolean
}

export default function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const meta = categoryMeta[post.category] ?? categoryMeta.Development
  const Icon = meta.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={cn(featured && "sm:col-span-2 lg:col-span-3")}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div
          className={cn(
            "flex h-full overflow-hidden rounded-xl border border-border/60 bg-[var(--card-bg-80)] shadow-sm transition-all duration-300",
            "hover:shadow-lg",
            featured ? "flex-col sm:flex-row" : "flex-col"
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden",
              featured ? "aspect-video sm:h-auto sm:w-2/5" : "aspect-[2/1]"
            )}
          >
            {post.coverImage ? (
              <>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </>
            ) : (
              <>
                <div
                  className={cn(
                    "flex h-full w-full items-center justify-center bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
                    meta.gradient,
                    featured ? "sm:bg-gradient-to-br" : ""
                  )}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--card-bg-80)] backdrop-blur-sm">
                    <Icon className={cn("h-7 w-7", featured ? "sm:h-9 sm:w-9" : "")} />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </>
            )}
          </div>

          <div className={cn("flex flex-1 flex-col p-5", featured && "sm:w-3/5 sm:self-center sm:p-7")}>
            <div className="flex items-center gap-2">
              <Badge variant={meta.badge} className="text-xs">
                {post.category}
              </Badge>
              {featured && (
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Featured
                </span>
              )}
            </div>

            <h3
              className={cn(
                "mt-3 font-semibold leading-snug text-foreground transition-colors group-hover:text-muted-foreground",
                featured ? "text-xl sm:text-2xl" : "text-base"
              )}
            >
              {post.title}
            </h3>

            <p className={cn(
              "mt-2 leading-relaxed text-muted-foreground",
              featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"
            )}>
              {post.excerpt}
            </p>

            <div className="mt-auto pt-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-7 w-7">
                  {post.author.avatar ? (
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  ) : null}
                  <AvatarFallback className="text-[10px]">
                    {post.author.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">
                  {post.author.name}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime}
                </span>
                <span className="ml-auto flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-muted-foreground">
                  Read
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
