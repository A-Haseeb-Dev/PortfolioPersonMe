"use client"

import * as React from "react"
import { CalendarDays, Clock, ArrowUpRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { FadeIn } from "@/components/ui/animated-text"
import { Skeleton } from "@/components/ui/skeleton"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  readingTime: number | null
  createdAt: string
  slug: string
  categoryName?: string
}

export default function FeaturedBlogs() {
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("/api/blog?published=true&limit=3")
      .then((r) => r.json())
      .then((json) => {
        const items = json.posts || json.data || []
        if (items.length > 0) {
          setPosts(items.map((p: Record<string, unknown>) => ({
            id: p.id as string,
            title: p.title as string,
            excerpt: (p.excerpt as string) || "",
            category: (p.category as string) || (p.categoryId as string) || "General",
            readingTime: p.readingTime as number | null,
            createdAt: p.createdAt as string,
            slug: p.slug as string,
            categoryName: (p.category as { name?: string })?.name || (p.categoryId as string) || "General",
          })))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Section title="Latest Blog Posts" subtitle="Loading latest posts...">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-72 rounded-xl" />
          ))}
        </div>
      </Section>
    )
  }

  if (posts.length === 0) return null

  return (
    <Section
      title="Latest Blog Posts"
      subtitle="Insights, tutorials, and thoughts on software development, technology, and more."
      action={
        <Button variant="ghost" size="sm" asChild>
          <a href="/blog">
            View All Posts
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <FadeIn key={post.id} delay={index * 0.1} direction="up">
            <a href={`/blog/${post.slug}`} className="group block">
              <GlassCard intensity="light" hover className="overflow-hidden">
                <div className="relative aspect-[2/1] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <div className="flex h-full items-center justify-center">
                    <span className="text-5xl font-bold text-zinc-300 dark:text-zinc-600">
                      {(post.categoryName || post.category).charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <Badge variant="info" className="mb-3 text-xs">
                    {post.categoryName || post.category}
                  </Badge>
                  <h3 className="text-lg font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-50 dark:group-hover:text-zinc-300">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    {post.readingTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min read
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </a>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
