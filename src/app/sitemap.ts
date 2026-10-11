import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/constants"

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

interface SitemapEntry {
  slug: string
  date?: string | null
  createdAt?: string | null
  lastUpdated?: string | null
}

async function fetchData(url: string): Promise<SitemapEntry[]> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const res = await fetch(`${siteConfig.url}${url}`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    })
    clearTimeout(timeout)
    if (!res.ok) return []
    const json = await res.json()
    return Array.isArray(json.data) ? (json.data as SitemapEntry[]) : []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  const [blogPosts, knowledgeNotes] = await Promise.all([
    fetchData("/api/blog?published=true&limit=50"),
    fetchData("/api/knowledge?limit=50"),
  ])

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || post.createdAt || ""),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const knowledgePages = knowledgeNotes.map((note) => ({
    url: `${baseUrl}/knowledge/${note.slug}`,
    lastModified: new Date(note.lastUpdated || note.createdAt || ""),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...blogPages,
    ...knowledgePages,
  ]
}
