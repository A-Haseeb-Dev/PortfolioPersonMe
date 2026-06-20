import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q")

    if (!q || q.trim().length < 2) {
      return apiError("Search query must be at least 2 characters", 400)
    }

    const query = q.trim()

    const [projects, blogs, technologies, knowledgeEntries, resources] =
      await Promise.all([
        db.project.findMany({
          where: {
            deletedAt: null,
            published: true,
            OR: [
              { title: { contains: query } },
              { description: { contains: query } },
              { problem: { contains: query } },
              { solution: { contains: query } },
              { results: { contains: query } },
            ],
          },
          select: { id: true, title: true, slug: true, description: true, coverImage: true },
          take: 5,
        }),
        db.blog.findMany({
          where: {
            deletedAt: null,
            published: true,
            OR: [
              { title: { contains: query } },
              { content: { contains: query } },
              { excerpt: { contains: query } },
            ],
          },
          select: { id: true, title: true, slug: true, excerpt: true, coverImage: true },
          take: 5,
        }),
        db.technology.findMany({
          where: {
            deletedAt: null,
            OR: [
              { name: { contains: query } },
              { description: { contains: query } },
            ],
          },
          select: { id: true, name: true, slug: true, description: true, icon: true },
          take: 5,
        }),
        db.caseStudy.findMany({
          where: {
            deletedAt: null,
            published: true,
            OR: [
              { title: { contains: query } },
              { problem: { contains: query } },
              { results: { contains: query } },
            ],
          },
          select: { id: true, title: true, slug: true, client: true, coverImage: true },
          take: 5,
        }),
        db.resource.findMany({
          where: {
            deletedAt: null,
            published: true,
            OR: [
              { title: { contains: query } },
              { description: { contains: query } },
            ],
          },
          select: { id: true, title: true, slug: true, description: true, type: true },
          take: 5,
        }),
      ])

    return apiResponse({
      query,
      results: {
        projects,
        blogs,
        technologies,
        knowledge: knowledgeEntries,
        resources,
      },
      totals: {
        projects: projects.length,
        blogs: blogs.length,
        technologies: technologies.length,
        knowledge: knowledgeEntries.length,
        resources: resources.length,
      },
      total: projects.length + blogs.length + technologies.length + knowledgeEntries.length + resources.length,
    })
  } catch (error) {
    console.error("[SEARCH_GET]", error)
    return apiError("Search failed", 500)
  }
}
