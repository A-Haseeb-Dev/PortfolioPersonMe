import { db } from "@/lib/db"
import { technologySchema } from "@/lib/validations"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { logActivity } from "@/lib/activity"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const tech = await db.technology.findFirst({
      where: { id, deletedAt: null },
      include: { category: true },
    })

    if (!tech) {
      return apiError("Technology not found", 404)
    }

    return apiResponse({ technology: tech })
  } catch (error) {
    console.error("[TECHNOLOGY_GET]", error)
    return apiError("Failed to fetch technology", 500)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const { id } = await params
    const existing = await db.technology.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Technology not found", 404)
    }

    const body = await request.json()
    const parsed = technologySchema.partial().safeParse(body)
    if (!parsed.success) {
      return apiError("Validation failed", 422)
    }

    const data: Record<string, unknown> = {}
    if (parsed.data.name !== undefined) {
      data.name = parsed.data.name
      data.slug = slugify(parsed.data.name)
    }
    if (parsed.data.icon !== undefined) data.icon = parsed.data.icon || null
    if (parsed.data.proficiency !== undefined) {
      const level = parsed.data.proficiency >= 80 ? "EXPERT" as const
        : parsed.data.proficiency >= 60 ? "ADVANCED" as const
        : parsed.data.proficiency >= 40 ? "INTERMEDIATE" as const
        : "BEGINNER" as const
      data.experienceLevel = level
    }
    if (parsed.data.color !== undefined) data.color = parsed.data.color || null
    if (parsed.data.url !== undefined) data.url = parsed.data.url || null
    if (parsed.data.order !== undefined) data.order = parsed.data.order
    if (parsed.data.category !== undefined) {
      const catSlug = slugify(parsed.data.category)
      let category = await db.technologyCategory.findUnique({ where: { slug: catSlug } })
      if (!category) {
        category = await db.technologyCategory.create({
          data: { name: parsed.data.category, slug: catSlug },
        })
      }
      data.categoryId = category.id
    }

    const tech = await db.technology.update({
      where: { id },
      data,
      include: { category: true },
    })

    logActivity("update", "technology", id, existing.name)

    return apiResponse({ technology: tech })
  } catch (error) {
    console.error("[TECHNOLOGY_PUT]", error)
    return apiError("Failed to update technology", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const { id } = await params
    const existing = await db.technology.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Technology not found", 404)
    }

    await db.technology.update({
      where: { id },
      data: { deletedAt: new Date() },
    })

    logActivity("delete", "technology", id, existing.name)

    return apiResponse({ message: "Technology deleted successfully" })
  } catch (error) {
    console.error("[TECHNOLOGY_DELETE]", error)
    return apiError("Failed to delete technology", 500)
  }
}
