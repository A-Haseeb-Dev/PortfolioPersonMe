import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { getAdminSkills } from "@/lib/admin-data"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { getCollection, addToCollection } from "@/lib/data-store"

export async function GET() {
  try {
    const categories = await db.technologyCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        technologies: {
          where: { deletedAt: null },
          orderBy: { name: "asc" },
        },
      },
    })

    const technologies = await db.technology.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
    })

    return apiResponse({ categories, technologies })
  } catch (prismaError) {
    console.warn("[SKILLS_GET] DB unavailable, using data store", prismaError)
    const categories = getCollection("skills", getAdminSkills())
    return apiResponse({ categories, technologies: [], fallback: true })
  }
}

export async function POST(request: Request) {
  let body: any
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    body = await request.json()
    const { name, description, icon, order } = body
    let { slug } = body

    if (!name || typeof name !== "string") {
      return apiError("Name is required", 400)
    }

    slug = slug && typeof slug === "string" ? slugify(slug) : slugify(name)

    const existing = await db.technologyCategory.findUnique({ where: { slug } })
    if (existing) {
      return apiError("A category with this slug already exists", 409)
    }

    const category = await db.technologyCategory.create({
      data: {
        name,
        slug,
        description: description || null,
        icon: icon || null,
        order: typeof order === "number" ? order : 0,
      },
    })

    return apiResponse({ category }, 201)
  } catch (prismaError) {
    console.warn("[SKILLS_POST] DB unavailable, using data store", prismaError)
    const fallback = getAdminSkills()
    const newItem = { id: `store_${Date.now()}`, ...body, createdAt: new Date() }
    const data = addToCollection("skills", newItem, fallback)
    return apiResponse({ data, item: newItem }, 201)
  }
}
