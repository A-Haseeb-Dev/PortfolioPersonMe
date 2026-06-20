import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { getAdminLearning } from "@/lib/admin-data"
import { getCollection, updateInCollection, removeFromCollection } from "@/lib/data-store"

const statusMap: Record<string, "CURRENT" | "COMPLETED" | "PLANNED"> = {
  "in-progress": "CURRENT",
  current: "CURRENT",
  completed: "COMPLETED",
  planned: "PLANNED",
  "not-started": "PLANNED",
}

function mapStatus(status?: string): "CURRENT" | "COMPLETED" | "PLANNED" {
  if (!status) return "PLANNED"
  return statusMap[status.toLowerCase()] ?? "PLANNED"
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const journey = await db.learningJourney.findUnique({
      where: { id },
      include: { milestones: true },
    })

    if (!journey) {
      return apiError("Learning journey not found", 404)
    }

    return apiResponse({ journey })
  } catch (error) {
    console.warn("[LEARNING_GET] DB unavailable, using data store", error)
    const data = getCollection("learning", getAdminLearning())
    const item = data.find((i: any) => i.id === id)
    if (!item) return apiError("Learning journey not found", 404)
    return apiResponse({ journey: item })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params
  const body = await req.json()

  try {
    const existing = await db.learningJourney.findUnique({
      where: { id },
    })

    if (!existing) {
      return apiError("Learning journey not found", 404)
    }

    const data: Record<string, unknown> = {}

    if (body.title !== undefined) data.title = body.title
    if (body.description !== undefined) data.description = body.description
    if (body.status !== undefined) data.status = mapStatus(body.status)
    if (body.category !== undefined) data.category = body.category
    if (body.resource !== undefined) data.resource = body.resource
    if (body.startDate !== undefined) data.startDate = new Date(body.startDate)
    if (body.endDate !== undefined) data.endDate = new Date(body.endDate)
    if (body.certificate !== undefined) data.certificate = body.certificate
    if (body.notes !== undefined) data.notes = body.notes

    const journey = await db.learningJourney.update({
      where: { id },
      data,
    })

    return apiResponse({ journey })
  } catch (error) {
    console.warn("[LEARNING_PUT] DB unavailable, using data store", error)
    const fallback = getAdminLearning()
    const updatedData = updateInCollection("learning", id, body, fallback)
    const updated = updatedData.find((i: any) => i.id === id)
    if (!updated) return apiError("Learning journey not found", 404)
    return apiResponse({ journey: updated })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.learningJourney.findUnique({
      where: { id },
    })

    if (!existing) {
      return apiError("Learning journey not found", 404)
    }

    await db.learningJourney.delete({
      where: { id },
    })

    return apiResponse({ message: "Learning journey deleted" })
  } catch (error) {
    console.warn("[LEARNING_DELETE] DB unavailable, using data store", error)
    const fallback = getAdminLearning()
    removeFromCollection("learning", id, fallback)
    return apiResponse({ message: "Learning journey deleted" })
  }
}
