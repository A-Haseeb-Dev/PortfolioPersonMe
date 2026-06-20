import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { getAdminStartupIdeas } from "@/lib/admin-data"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { getCollection, addToCollection } from "@/lib/data-store"

const statusMap: Record<string, "IDEA" | "VALIDATING" | "BUILDING" | "LAUNCHED" | "FAILED"> = {
  idea: "IDEA",
  validating: "VALIDATING",
  "in-progress": "BUILDING",
  launched: "LAUNCHED",
  pivoted: "FAILED",
  failed: "FAILED",
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10")))
    const published = searchParams.get("published")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const where: Record<string, unknown> = { deletedAt: null }
    if (published === "true") where.published = true
    if (published === "false") where.published = false
    if (status && statusMap[status]) where.status = statusMap[status]
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { problem: { contains: search } },
        { solution: { contains: search } },
      ]
    }

    const [startupIdeas, total] = await Promise.all([
      db.startupIdea.findMany({
        where: where as any,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.startupIdea.count({ where: where as any }),
    ])

    return apiResponse({
      startupIdeas,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (prismaError) {
    console.warn("[STARTUP_IDEAS_GET] DB unavailable, using data store", prismaError)
    const data = getCollection("startup-ideas", getAdminStartupIdeas())
    return apiResponse({ data, total: data.length, fallback: true })
  }
}

export async function POST(request: Request) {
  let body: any
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    body = await request.json()
    const { title, slug, problem, solution, market, revenueModel, status, published } = body

    if (!title || typeof title !== "string") {
      return apiError("Title is required", 422)
    }

    const finalSlug = slug || slugify(title)
    const existing = await db.startupIdea.findUnique({ where: { slug: finalSlug } })
    if (existing) {
      return apiError("A startup idea with this slug already exists", 409)
    }

    const startupIdea = await db.startupIdea.create({
      data: {
        title,
        slug: finalSlug,
        problem: problem || null,
        solution: solution || null,
        market: market || null,
        revenueModel: revenueModel || null,
        status: status && statusMap[status] ? statusMap[status] : "IDEA",
        published: published === true,
      },
    })

    return apiResponse({ startupIdea }, 201)
  } catch (prismaError) {
    console.warn("[STARTUP_IDEAS_POST] DB unavailable, using data store", prismaError)
    const fallback = getAdminStartupIdeas()
    const newItem = { id: `store_${Date.now()}`, ...body, createdAt: new Date() }
    const data = addToCollection("startup-ideas", newItem, fallback)
    return apiResponse({ data, item: newItem }, 201)
  }
}
