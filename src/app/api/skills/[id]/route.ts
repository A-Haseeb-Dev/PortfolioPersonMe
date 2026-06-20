import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const category = await db.technologyCategory.findUnique({
      where: { id },
      include: {
        technologies: {
          where: { deletedAt: null },
          orderBy: { name: "asc" },
        },
      },
    })

    if (!category) {
      return apiError("Category not found", 404)
    }

    return apiResponse({ category })
  } catch (error) {
    console.error("[SKILL_CATEGORY_GET] Failed to fetch skill category", error)
    return apiError("Failed to fetch skill category", 500)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params
  const body = await request.json()

  try {
    const existing = await db.technologyCategory.findUnique({
      where: { id },
    })
    if (!existing) {
      return apiError("Category not found", 404)
    }

    const data: Record<string, unknown> = {}

    if (body.name !== undefined) {
      data.name = body.name
      data.slug = slugify(body.name)
    }
    if (body.description !== undefined) data.description = body.description || null
    if (body.icon !== undefined) data.icon = body.icon || null
    if (body.order !== undefined) data.order = body.order

    const category = await db.technologyCategory.update({
      where: { id },
      data,
      include: {
        technologies: {
          where: { deletedAt: null },
          orderBy: { name: "asc" },
        },
      },
    })

    return apiResponse({ category })
  } catch (error) {
    console.error("[SKILL_CATEGORY_PUT] Failed to update skill category", error)
    return apiError("Failed to update skill category", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.technologyCategory.findUnique({
      where: { id },
    })
    if (!existing) {
      return apiError("Category not found", 404)
    }

    await db.technologyCategory.delete({ where: { id } })

    return apiResponse({ message: "Category deleted successfully" })
  } catch (error) {
    console.error("[SKILL_CATEGORY_DELETE] Failed to delete skill category", error)
    return apiError("Failed to delete skill category", 500)
  }
}
