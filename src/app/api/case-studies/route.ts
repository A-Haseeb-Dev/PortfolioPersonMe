import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { getAdminCaseStudies } from "@/lib/admin-data"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { getCollection, addToCollection } from "@/lib/data-store"

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
  } catch (prismaError) {
    console.warn("[CASE_STUDIES_GET] DB unavailable, using data store", prismaError)
    const data = getCollection("case-studies", getAdminCaseStudies())
    return apiResponse({ data, total: data.length, fallback: true })
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

    return apiResponse({ caseStudy }, 201)
  } catch (prismaError) {
    console.warn("[CASE_STUDIES_POST] DB unavailable, using data store", prismaError)
    const fallback = getAdminCaseStudies()
    const newItem = { id: `store_${Date.now()}`, ...body, createdAt: new Date() }
    const data = addToCollection("case-studies", newItem, fallback)
    return apiResponse({ data, item: newItem }, 201)
  }
}
