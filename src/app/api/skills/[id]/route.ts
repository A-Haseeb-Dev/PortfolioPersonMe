import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { getAdminSkills } from "@/lib/admin-data"
import { getCollection, updateInCollection, removeFromCollection } from "@/lib/data-store"

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
    console.warn("[SKILL_CATEGORY_GET] DB unavailable, using data store", error)
    const data = getCollection("skills", getAdminSkills())
    const item = data.find((i: any) => i.id === id)
    if (!item) return apiError("Not found", 404)
    return apiResponse({ category: item })
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
    console.warn("[SKILL_CATEGORY_PUT] DB unavailable, using data store", error)
    const fallback = getAdminSkills()
    const collection = updateInCollection("skills", id, body, fallback)
    const item = collection.find((i: any) => i.id === id)
    if (!item) return apiError("Not found", 404)
    return apiResponse({ category: item })
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
    console.warn("[SKILL_CATEGORY_DELETE] DB unavailable, using data store", error)
    const fallback = getAdminSkills()
    removeFromCollection("skills", id, fallback)
    return apiResponse({ message: "Category deleted successfully" })
  }
}
