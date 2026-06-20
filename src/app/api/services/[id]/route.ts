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
    const service = await db.service.findFirst({
      where: { id, deletedAt: null },
    })

    if (!service) {
      return apiError("Service not found", 404)
    }

    return apiResponse({ service })
  } catch (error) {
    console.error("[SERVICE_GET] Failed to fetch service", error)
    return apiError("Failed to fetch service", 500)
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
    console.error("[SERVICE_PUT] Failed to update service", error)
    return apiError("Failed to update service", 500)
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
    console.error("[SERVICE_DELETE] Failed to delete service", error)
    return apiError("Failed to delete service", 500)
  }
}
