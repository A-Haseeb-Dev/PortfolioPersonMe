import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { getAdminServices } from "@/lib/admin-data"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { getCollection, addToCollection } from "@/lib/data-store"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, Number(searchParams.get("page")) || 1)
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 10))
    const published = searchParams.get("published")
    const search = searchParams.get("search")

    const where: Record<string, unknown> = { deletedAt: null }

    if (published === "true") where.published = true
    else if (published === "false") where.published = false

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const [services, total] = await Promise.all([
      db.service.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.service.count({ where }),
    ])

    return apiResponse({
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (prismaError) {
    console.warn("[SERVICES_GET] DB unavailable, using data store", prismaError)
    const data = getCollection("services", getAdminServices())
    return apiResponse({ data, total: data.length, fallback: true })
  }
}

export async function POST(request: Request) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const body = await request.json()
  const { title, slug: customSlug, description, icon, features, price, published } = body

  try {
    if (!title || typeof title !== "string") {
      return apiError("Title is required", 400)
    }

    const slug = customSlug || slugify(title)

    const existing = await db.service.findUnique({ where: { slug } })
    if (existing) {
      return apiError("A service with this slug already exists", 409)
    }

    const service = await db.service.create({
      data: {
        title,
        slug,
        description: description || "",
        icon: icon || null,
        features: features || [],
        price: price != null ? price : null,
        published: published || false,
      },
    })

    return apiResponse({ service }, 201)
  } catch (prismaError) {
    console.warn("[SERVICES_POST] DB unavailable, using data store", prismaError)
    const fallback = getAdminServices()
    const newItem = { id: `store_${Date.now()}`, ...body, createdAt: new Date() }
    const data = addToCollection("services", newItem, fallback)
    return apiResponse({ data, item: newItem }, 201)
  }
}
