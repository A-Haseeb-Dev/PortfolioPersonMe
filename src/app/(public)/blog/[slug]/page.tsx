"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

import { useData } from "@/hooks/use-data"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"
import BlogDetail from "@/components/blog/blog-detail"

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

function transformBlogPost(p: any): BlogPost {
  const isObject = (v: any) => v !== null && typeof v === "object"
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || "",
    content: p.content,
    coverImage: p.coverImage || null,
    category: isObject(p.category) ? p.category.name : (p.category ?? ""),
    tags: Array.isArray(p.tags)
      ? p.tags.map((t: any) => (isObject(t) ? (t.tag?.name ?? t.name ?? "") : t))
      : [],
    readingTime: typeof p.readingTime === "number" ? `${p.readingTime} min read` : (p.readingTime ?? "5 min read"),
    date: p.date
      ? p.date
      : p.createdAt
        ? new Date(p.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "",
    featured: p.featured || false,
    author: {
      name: p.author?.name ?? "Author",
      avatar: p.author?.image ?? p.author?.avatar ?? null,
      role: p.author?.role ?? "Author",
    },
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string

  const allPosts = useData<BlogPost>("/api/blog?published=true", [], (data) => ((data as any).data || []).map(transformBlogPost))
  const post = allPosts.find((p) => p.slug === slug)
  const relatedPosts = post
    ? allPosts
        .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
        .slice(0, 3)
    : []

  if (!post) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <EmptyState
          icon={<FileText className="h-6 w-6" />}
          title="Post not found"
          description="The blog post you are looking for does not exist or has been removed."
          action={
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          }
        />
      </Container>
    )
  }

  return <BlogDetail post={post} relatedPosts={relatedPosts} />
}
