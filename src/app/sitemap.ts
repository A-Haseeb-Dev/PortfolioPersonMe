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

async function fetchData(url: string): Promise<any[]> {
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
    return json.data || []
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

  const blogPages = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || post.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const knowledgePages = knowledgeNotes.map((note: any) => ({
    url: `${baseUrl}/knowledge/${note.slug}`,
    lastModified: new Date(note.lastUpdated || note.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...blogPages,
    ...knowledgePages,
  ]
}
