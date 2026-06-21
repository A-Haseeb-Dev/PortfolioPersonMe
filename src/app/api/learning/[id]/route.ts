import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

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

function safeDate(value: unknown): Date | undefined {
  if (!value) return undefined
  const d = new Date(value as string)
  return isNaN(d.getTime()) ? undefined : d
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
    console.error("[LEARNING_GET] Failed to fetch learning journey", error)
    return apiError("Failed to fetch learning journey", 500)
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const body = await req.json()

  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])
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
    if (body.startDate !== undefined) data.startDate = safeDate(body.startDate)
    if (body.endDate !== undefined) data.endDate = safeDate(body.endDate)
    if (body.certificate !== undefined) data.certificate = body.certificate
    if (body.notes !== undefined) data.notes = body.notes

    const journey = await db.learningJourney.update({
      where: { id },
      data,
    })

    return apiResponse({ journey })
  } catch (error) {
    console.error("[LEARNING_PUT] Failed to update learning journey", error)
    return apiError("Failed to update learning journey", 500)
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])
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
    console.error("[LEARNING_DELETE] Failed to delete learning journey", error)
    return apiError("Failed to delete learning journey", 500)
  }
}
