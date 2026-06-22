import { db } from "@/lib/db"
import { technologySchema } from "@/lib/validations"
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

    const allTechnologies = await db.technology.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
      include: { category: true },
    })

    return apiResponse({ categories, technologies: allTechnologies })
  } catch (error) {
    console.error("[TECHNOLOGIES_GET]", error)
    return apiError("Failed to fetch technologies", 500)
  }
}

export async function POST(request: Request) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const body = await request.json()
    const parsed = technologySchema.safeParse(body)
    if (!parsed.success) {
      return apiError("Validation failed", 422)
    }

    const slug = slugify(parsed.data.name)
    const existing = await db.technology.findUnique({ where: { slug } })
    if (existing) {
      return apiError("A technology with this name already exists", 409)
    }

    let categoryId: string
    const catSlug = slugify(parsed.data.category)
    const existingCategory = await db.technologyCategory.findUnique({
      where: { slug: catSlug },
    })
    if (existingCategory) {
      categoryId = existingCategory.id
    } else {
      const cat = await db.technologyCategory.create({
        data: { name: parsed.data.category, slug: catSlug },
      })
      categoryId = cat.id
    }

    const tech = await db.technology.create({
      data: {
        name: parsed.data.name,
        slug,
        icon: parsed.data.icon || null,
        experienceLevel: "INTERMEDIATE",
        yearsExperience: 0,
        categoryId,
      },
    })

    logActivity("create", "technology", tech.id, tech.name)

    return apiResponse({ technology: tech }, 201)
  } catch (error) {
    console.error("[TECHNOLOGIES_POST]", error)
    return apiError("Failed to create technology", 500)
  }
}
