"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import BlogCard from "./blog-card"
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

const POSTS_PER_PAGE = 6

interface BlogGridProps {
  posts: BlogPost[]
  loading?: boolean
}

export default function BlogGrid({ posts, loading = false }: BlogGridProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [posts.length])

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  if (loading) {
    return (
      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border">
              <Skeleton className="aspect-[2/1] rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    )
  }

  if (posts.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<FileText className="h-6 w-6" />}
          title="No articles found"
          description="No blog posts match your current filters. Try adjusting your search or category selection."
        />
      </Container>
    )
  }

  const featuredPost = paginatedPosts[0]
  const restPosts = paginatedPosts.slice(1)

  return (
    <Container className="py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredPost && (
          <BlogCard key={featuredPost.id} post={featuredPost} index={0} featured />
        )}
        {restPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index + 1} />
        ))}
      </div>

      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 flex items-center justify-center gap-2"
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              currentPage === 1
                ? "cursor-not-allowed text-muted-foreground/40"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                  currentPage === i + 1
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              currentPage === totalPages
                ? "cursor-not-allowed text-muted-foreground/40"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </Container>
  )
}
