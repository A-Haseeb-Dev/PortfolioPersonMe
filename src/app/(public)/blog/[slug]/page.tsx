"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { blogPosts as staticPosts, getBlogPost, transformBlogPost } from "@/data/blog"
import { useData } from "@/hooks/use-data"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"
import BlogDetail from "@/components/blog/blog-detail"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string

  const allPosts = useData("/api/blog", staticPosts, (data) => ((data as any).posts || []).map(transformBlogPost))
  const post = allPosts.find((p) => p.slug === slug) || getBlogPost(slug)
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
