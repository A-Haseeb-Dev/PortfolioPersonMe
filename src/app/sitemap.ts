import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/constants"
import { blogPosts as staticBlogPosts } from "@/data/blog"
import { knowledgeNotes } from "@/data/knowledge"
import { startupIdeas as staticStartupIdeas } from "@/data/startup-ideas"
import { getCollection } from "@/lib/data-store"

const staticRoutes = [
  "",
  "/about",
  "/projects",
  "/services",
  "/blog",
  "/skills",
  "/knowledge",
  "/learning",
  "/resources",
  "/case-studies",
  "/startup-ideas",
  "/achievements",
  "/opensource",
  "/contact",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  const blogData = getCollection("blog", staticBlogPosts)
  const startupData = getCollection("startup-ideas", staticStartupIdeas)

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  const blogPages = blogData.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const knowledgePages = knowledgeNotes.map((note) => ({
    url: `${baseUrl}/knowledge/${note.slug}`,
    lastModified: note.lastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const startupPages = startupData.map((idea: any) => ({
    url: `${baseUrl}/startup-ideas/${idea.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...blogPages,
    ...knowledgePages,
    ...startupPages,
  ]
}
