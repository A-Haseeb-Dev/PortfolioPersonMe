"use client"

import * as React from "react"
import Link from "next/link"
import { CalendarDays, Clock, Mail, ArrowUpRight, Tags, FolderOpen, Newspaper } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

interface BlogSidebarProps {
  posts: BlogPost[]
  categories: Record<string, number>
  tags: string[]
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export default function BlogSidebar({
  posts,
  categories,
  tags,
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagToggle,
}: BlogSidebarProps) {
  const recentPosts = posts.slice(0, 4)

  return (
    <aside className="space-y-6">
      <div className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Search
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted py-2 pl-3 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-5">
        <div className="mb-3 flex items-center gap-2">
          <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </h3>
        </div>
        <div className="space-y-1">
          {Object.entries(categories).map(([category, count]) => (
            <Link
              key={category}
              href={`/blog?category=${category.toLowerCase()}`}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <span>{category}</span>
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-5">
        <div className="mb-3 flex items-center gap-2">
          <Tags className="h-3.5 w-3.5 text-muted-foreground" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tags
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 15).map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={cn(
                "rounded-md px-2 py-0.5 text-xs transition-colors",
                selectedTags.includes(tag)
                  ? "bg-foreground font-medium text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <button
            onClick={() => selectedTags.forEach((t) => onTagToggle(t))}
            className="mt-3 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-5">
        <div className="mb-3 flex items-center gap-2">
          <Newspaper className="h-3.5 w-3.5 text-muted-foreground" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent Posts
          </h3>
        </div>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
            >
              <Avatar className="mt-0.5 h-7 w-7 shrink-0">
                {post.author.avatar ? (
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                ) : null}
                <AvatarFallback className="text-[10px]">
                  {post.author.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-muted-foreground">
                  {post.title}
                </h4>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="mt-1 h-3 w-3 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-400 text-white">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Stay updated
            </h3>
            <p className="text-xs text-muted-foreground">
              Get notified about new posts
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Input
            type="email"
            placeholder="your@email.com"
            className="h-9 text-sm"
          />
          <Button size="sm" className="w-full">
            Subscribe
          </Button>
        </div>
      </div>
    </aside>
  )
}
