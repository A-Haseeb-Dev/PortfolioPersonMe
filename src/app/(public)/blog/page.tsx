"use client"

import * as React from "react"
import { blogPosts as staticPosts } from "@/data/blog"
import { useData } from "@/hooks/use-data"
import BlogHeader from "@/components/blog/blog-header"
import BlogGrid from "@/components/blog/blog-grid"
import BlogSidebar from "@/components/blog/blog-sidebar"

export default function BlogPage() {
  const livePosts = useData("/api/blog", staticPosts)
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])

  const filteredPosts = React.useMemo(() => {
    let posts = [...livePosts]

    if (activeCategory !== "All") {
      posts = posts.filter((post) => post.category === activeCategory)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    if (selectedTags.length > 0) {
      posts = posts.filter((post) =>
        selectedTags.some((tag) => post.tags.includes(tag))
      )
    }

    return posts
  }, [activeCategory, searchQuery, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    )
  }

  const categoryCounts = livePosts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})
  const allTags = Array.from(new Set(livePosts.flatMap((post) => post.tags))).sort()

  return (
    <div>
      <BlogHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="relative">
        <div className="mx-auto grid max-w-7xl px-4 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-8">
          <div className="lg:col-span-3">
            <BlogGrid posts={filteredPosts} />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 py-16">
              <BlogSidebar
                posts={livePosts}
                categories={categoryCounts}
                tags={allTags}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
