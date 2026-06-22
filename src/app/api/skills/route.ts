import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { logActivity } from "@/lib/activity"

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
  } catch (error) {
    console.error("[SKILLS_GET] Failed to fetch skills", error)
    return apiError("Failed to fetch skills", 500)
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

    logActivity("create", "skill", category.id, category.name)

    return apiResponse({ category }, 201)
  } catch (error) {
    console.error("[SKILLS_POST] Failed to create skill category", error)
    return apiError("Failed to create skill category", 500)
  }
}
