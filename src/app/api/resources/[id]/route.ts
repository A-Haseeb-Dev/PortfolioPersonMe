import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { getAdminResources } from "@/lib/admin-data"
import { getCollection, updateInCollection, removeFromCollection } from "@/lib/data-store"

const typeMap: Record<string, string> = {
  resume: "RESUME",
  certificate: "CERTIFICATE",
  portfolio: "PORTFOLIO",
  cheatsheet: "CHEAT_SHEET",
  guide: "GUIDE",
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const resource = await db.resource.findFirst({
      where: { id, deletedAt: null },
    })

    if (!resource) {
      return apiError("Resource not found", 404)
    }

    return apiResponse({ resource })
  } catch (error) {
    console.warn("[RESOURCE_GET] DB unavailable, using data store", error)
    const data = getCollection("resources", getAdminResources())
    const item = data.find((i: any) => i.id === id)
    if (!item) return apiError("Not found", 404)
    return apiResponse({ resource: item })
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
    const existing = await db.resource.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Resource not found", 404)
    }

    const data: Record<string, unknown> = {}

    if (body.title !== undefined) {
      data.title = body.title
      data.slug = body.slug && typeof body.slug === "string" ? body.slug : slugify(body.title)
    }
    if (body.description !== undefined) data.description = body.description || null
    if (body.type !== undefined) {
      data.type = typeof body.type === "string" ? typeMap[body.type.toLowerCase()] || "GUIDE" : "GUIDE"
    }
    if (body.fileUrl !== undefined) data.fileUrl = body.fileUrl || null
    if (body.published !== undefined) data.published = body.published === true
    if (body.downloadCount !== undefined) data.downloadCount = body.downloadCount

    const resource = await db.resource.update({
      where: { id },
      data,
    })

    return apiResponse({ resource })
  } catch (error) {
    console.warn("[RESOURCE_PUT] DB unavailable, using data store", error)
    const fallback = getAdminResources()
    const collection = updateInCollection("resources", id, body, fallback)
    const item = collection.find((i: any) => i.id === id)
    if (!item) return apiError("Not found", 404)
    return apiResponse({ resource: item })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.resource.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Resource not found", 404)
    }

    await db.resource.update({
      where: { id },
      data: { deletedAt: new Date() },
    })

    return apiResponse({ message: "Resource deleted successfully" })
  } catch (error) {
    console.warn("[RESOURCE_DELETE] DB unavailable, using data store", error)
    const fallback = getAdminResources()
    removeFromCollection("resources", id, fallback)
    return apiResponse({ message: "Resource deleted successfully" })
  }
}
