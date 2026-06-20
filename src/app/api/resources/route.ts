import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"

type ResourceType = "RESUME" | "CERTIFICATE" | "PORTFOLIO" | "CHEAT_SHEET" | "GUIDE"

const typeMap: Record<string, ResourceType> = {
  resume: "RESUME",
  certificate: "CERTIFICATE",
  portfolio: "PORTFOLIO",
  cheatsheet: "CHEAT_SHEET",
  guide: "GUIDE",
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10")))
    const published = searchParams.get("published")
    const type = searchParams.get("type")
    const search = searchParams.get("search")

    const where: Record<string, unknown> = { deletedAt: null }
    if (published === "true") where.published = true
    if (published === "false") where.published = false
    if (type) {
      const mapped = typeMap[type.toLowerCase()]
      if (mapped) where.type = mapped
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const [resources, total] = await Promise.all([
      db.resource.findMany({
        where: where as any,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.resource.count({ where: where as any }),
    ])

    return apiResponse({
      resources,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[RESOURCES_GET] Failed to fetch resources", error)
    return apiError("Failed to fetch resources", 500)
  }
}

export async function POST(request: Request) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const body = await request.json()
  const { title, slug: rawSlug, description, type: rawType, fileUrl, published: rawPublished } = body

  try {
    if (!title || typeof title !== "string") {
      return apiError("Title is required", 422)
    }

    const slug = rawSlug && typeof rawSlug === "string" ? rawSlug : slugify(title)

    const existing = await db.resource.findUnique({ where: { slug } })
    if (existing) {
      return apiError("A resource with this slug already exists", 409)
    }

    const type = rawType && typeof rawType === "string" ? typeMap[rawType.toLowerCase()] || "GUIDE" : "GUIDE"

    const resource = await db.resource.create({
      data: {
        title,
        slug,
        description: description || null,
        type,
        fileUrl: fileUrl || null,
        published: rawPublished === true,
      },
    })

    return apiResponse({ resource }, 201)
  } catch (error) {
    console.error("[RESOURCES_POST] Failed to create resource", error)
    return apiError("Failed to create resource", 500)
  }
}
