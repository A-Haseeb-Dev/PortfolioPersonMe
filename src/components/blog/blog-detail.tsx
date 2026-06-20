"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Copy,
  Link as LinkIcon,
  Share2,
  Link2,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import BlogTableOfContents from "./blog-table-of-contents"
import BlogCard from "./blog-card"
import type { BlogPost } from "@/data/blog"

interface BlogDetailProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

const categoryColors: Record<string, "info" | "success" | "warning" | "danger" | "default" | "secondary"> = {
  JavaScript: "warning",
  React: "info",
  "Next.js": "default",
  AI: "danger",
  Flutter: "info",
  Development: "success",
  Career: "warning",
  Tutorial: "secondary",
}

const gradientPairs = [
  "from-violet-500/20 to-fuchsia-500/20",
  "from-blue-500/20 to-cyan-500/20",
  "from-emerald-500/20 to-teal-500/20",
  "from-amber-500/20 to-orange-500/20",
  "from-rose-500/20 to-pink-500/20",
  "from-indigo-500/20 to-purple-500/20",
]

export default function BlogDetail({ post, relatedPosts }: BlogDetailProps) {
  const [copied, setCopied] = React.useState(false)
  const [readingProgress, setReadingProgress] = React.useState(0)
  const gradientClass = gradientPairs[parseInt(post.id) % gradientPairs.length]

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setReadingProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silently fail
    }
  }

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  const shareLinkedin = () => {
    window.open(
      `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
      <div className="fixed inset-x-0 top-0 z-50 h-0.5">
        <div className="h-full bg-gradient-to-r from-zinc-900 to-zinc-500 transition-all duration-150 dark:from-zinc-50 dark:to-zinc-400" style={{ width: `${readingProgress * 100}%` }} />
      </div>

      <Container className="relative pt-8">
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </motion.div>
      </Container>

      <Container className="relative pt-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <article className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
            >
              <div className="overflow-hidden rounded-2xl border border-border">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="aspect-[2/1] w-full object-cover sm:aspect-[3/1]"
                  />
                ) : (
                  <div
                    className={cn(
                      "flex aspect-[2/1] items-center justify-center bg-gradient-to-br sm:aspect-[3/1]",
                      gradientClass
                    )}
                  >
                    <span className="text-8xl font-bold text-foreground/10">
                      {post.category.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge variant={categoryColors[post.category] || "default"}>
                  {post.category}
                </Badge>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <div className="mt-6 flex items-center gap-3 border-b border-border pb-6">
                <Avatar className="h-10 w-10">
                  {post.author.avatar ? (
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  ) : null}
                  <AvatarFallback className="text-sm">
                    {post.author.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.author.role}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="prose prose-zinc mt-8 max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-code:rounded-lg prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-img:rounded-xl"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, rehypeHighlight]}
                components={{
                  a: ({ href, children, ...props }) => (
                    <a
                      href={href}
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-foreground underline underline-offset-2 hover:text-muted-foreground"
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                  img: ({ src, alt, ...props }) => (
                    <img
                      src={src}
                      alt={alt || ""}
                      className="rounded-xl border border-border"
                      loading="lazy"
                      {...props}
                    />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex items-center justify-between border-t border-border pt-6"
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyLink}
                  className="gap-1.5"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy link"}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={shareTwitter}
                  className="h-9 w-9"
                  title="Share on X"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={shareLinkedin}
                  className="h-9 w-9"
                  title="Share on LinkedIn"
                >
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <BlogTableOfContents content={post.content} />
            </div>
          </aside>
        </div>
      </Container>

      {relatedPosts.length > 0 && (
        <Container className="pt-20">
          <div className="border-t border-border pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Related Articles
            </h2>
            <p className="mt-1 text-muted-foreground">
              Continue reading about {post.category}
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related, index) => (
                <BlogCard key={related.id} post={related} index={index} />
              ))}
            </div>
          </div>
        </Container>
      )}
    </div>
  )
}
