import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { getAdminServices } from "@/lib/admin-data"
import { getCollection, updateInCollection, removeFromCollection } from "@/lib/data-store"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const service = await db.service.findFirst({
      where: { id, deletedAt: null },
    })

    if (!service) {
      return apiError("Service not found", 404)
    }

    return apiResponse({ service })
  } catch (error) {
    console.warn("[SERVICE_GET] DB unavailable, using data store", error)
    const data = getCollection("services", getAdminServices())
    const item = data.find((i: any) => i.id === id)
    if (!item) return apiError("Service not found", 404)
    return apiResponse({ service: item })
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
    const existing = await db.service.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Service not found", 404)
    }

    const data: Record<string, unknown> = {}

    if (body.title !== undefined) {
      data.title = body.title
      data.slug = body.slug || slugify(body.title)
    }
    if (body.description !== undefined) data.description = body.description
    if (body.icon !== undefined) data.icon = body.icon
    if (body.features !== undefined) data.features = body.features
    if (body.price !== undefined) data.price = body.price
    if (body.published !== undefined) data.published = body.published

    const service = await db.service.update({
      where: { id },
      data,
    })

    return apiResponse({ service })
  } catch (error) {
    console.warn("[SERVICE_PUT] DB unavailable, using data store", error)
    const fallback = getAdminServices()
    const updatedData = updateInCollection("services", id, body, fallback)
    const updated = updatedData.find((i: any) => i.id === id)
    if (!updated) return apiError("Service not found", 404)
    return apiResponse({ service: updated })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.service.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Service not found", 404)
    }

    await db.service.update({
      where: { id },
      data: { deletedAt: new Date() },
    })

    return apiResponse({ message: "Service deleted successfully" })
  } catch (error) {
    console.warn("[SERVICE_DELETE] DB unavailable, using data store", error)
    const fallback = getAdminServices()
    removeFromCollection("services", id, fallback)
    return apiResponse({ message: "Service deleted successfully" })
  }
}
