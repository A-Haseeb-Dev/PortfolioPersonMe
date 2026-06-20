"use client"

import * as React from "react"
import { CalendarDays, Clock, ArrowUpRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { FadeIn } from "@/components/ui/animated-text"

const featuredBlogs = [
  {
    title: "Building Scalable Web Applications with Next.js",
    excerpt:
      "A deep dive into architecture patterns, optimization techniques, and best practices for building production-ready Next.js applications.",
    category: "Web Development",
    readingTime: "8 min read",
    date: "Mar 15, 2026",
    slug: "/blog/building-scalable-web-apps-nextjs",
  },
  {
    title: "The Future of TypeScript: What's New in 2026",
    excerpt:
      "Exploring the latest TypeScript features, type system improvements, and how they're shaping the modern development landscape.",
    category: "TypeScript",
    readingTime: "6 min read",
    date: "Feb 28, 2026",
    slug: "/blog/future-of-typescript-2026",
  },
  {
    title: "AI-Powered Development: Tools and Workflows",
    excerpt:
      "How AI is transforming software development workflows, from code generation to automated testing and deployment.",
    category: "AI",
    readingTime: "10 min read",
    date: "Feb 10, 2026",
    slug: "/blog/ai-powered-development",
  },
]

export default function FeaturedBlogs() {
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
        {featuredBlogs.map((post, index) => (
          <FadeIn key={post.title} delay={index * 0.1} direction="up">
            <a href={post.slug} className="group block">
              <GlassCard intensity="light" hover className="overflow-hidden">
                <div className="relative aspect-[2/1] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <div className="flex h-full items-center justify-center">
                    <span className="text-5xl font-bold text-zinc-300 dark:text-zinc-600">
                      {post.category.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <Badge variant="info" className="mb-3 text-xs">
                    {post.category}
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
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
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
