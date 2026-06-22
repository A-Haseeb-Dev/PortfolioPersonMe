import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { logActivity } from "@/lib/activity"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10")))
    const published = searchParams.get("published")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")

    const where: Record<string, unknown> = { deletedAt: null }
    if (published === "true") where.published = true
    if (published === "false") where.published = false
    if (featured === "true") where.featured = true
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { client: { contains: search } },
        { industry: { contains: search } },
      ]
    }

    const [caseStudies, total] = await Promise.all([
      db.caseStudy.findMany({
        where: where as any,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.caseStudy.count({ where: where as any }),
    ])

    return apiResponse({
      caseStudies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[CASE_STUDIES_GET] Failed to fetch case studies", error)
    return apiError("Failed to fetch case studies", 500)
  }
}

export async function POST(request: Request) {
  let body: any
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    body = await request.json()
    const { title, slug, client, industry, duration, role, team, problem, research, planning, design, architecture, development, testing, deployment, results, technologies, coverImage, published, featured } = body

    if (!title || typeof title !== "string") {
      return apiError("Title is required", 422)
    }

    const finalSlug = slug || slugify(title)

    const existing = await db.caseStudy.findUnique({ where: { slug: finalSlug } })
    if (existing) {
      return apiError("A case study with this slug already exists", 409)
    }

    const caseStudy = await db.caseStudy.create({
      data: {
        title,
        slug: finalSlug,
        client: client || null,
        industry: industry || null,
        duration: duration || null,
        role: role || null,
        team: team || null,
        problem: problem || null,
        research: research || null,
        planning: planning || null,
        design: design || null,
        architecture: architecture || null,
        development: development || null,
        testing: testing || null,
        deployment: deployment || null,
        results: results || null,
        technologies: technologies || undefined,
        coverImage: coverImage || null,
        published: published ?? false,
        featured: featured ?? false,
      },
    })

    logActivity("create", "case-study", caseStudy.id, caseStudy.title)

    return apiResponse({ caseStudy }, 201)
  } catch (error) {
    console.error("[CASE_STUDIES_POST] Failed to create case study", error)
    return apiError("Failed to create case study", 500)
  }
}
