import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { logActivity } from "@/lib/activity"
type AchievementType = "AWARD" | "CERTIFICATION" | "MILESTONE" | "PROJECT"

const TYPE_MAP: Record<string, AchievementType> = {
  award: "AWARD",
  certification: "CERTIFICATION",
  milestone: "MILESTONE",
  project: "PROJECT",
}

function mapType(type?: string): AchievementType {
  if (!type) return "MILESTONE"
  return TYPE_MAP[type.toLowerCase()] ?? "MILESTONE"
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const achievement = await db.achievement.findUnique({
      where: { id },
    })

    if (!achievement) {
      return apiError("Achievement not found", 404)
    }

    return apiResponse({ achievement })
  } catch (error) {
    console.error("[ACHIEVEMENT_GET] Failed to fetch achievement", error)
    return apiError("Failed to fetch achievement", 500)
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
    const existing = await db.achievement.findUnique({
      where: { id },
    })

    if (!existing) {
      return apiError("Achievement not found", 404)
    }

    const data: Record<string, unknown> = {}

    if (body.title !== undefined) data.title = body.title
    if (body.description !== undefined) data.description = body.description || null
    if (body.date !== undefined) data.date = body.date ? new Date(body.date) : null
    if (body.type !== undefined) data.type = mapType(body.type)
    if (body.icon !== undefined) data.icon = body.icon || null
    if (body.url !== undefined) data.url = body.url || null

    const achievement = await db.achievement.update({
      where: { id },
      data,
    })

    logActivity("update", "achievement", id, existing.title)

    return apiResponse({ achievement })
  } catch (error) {
    console.error("[ACHIEVEMENT_PUT] Failed to update achievement", error)
    return apiError("Failed to update achievement", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.achievement.findUnique({
      where: { id },
    })

    if (!existing) {
      return apiError("Achievement not found", 404)
    }

    await db.achievement.delete({ where: { id } })

    logActivity("delete", "achievement", id, existing.title)

    return apiResponse({ message: "Achievement deleted successfully" })
  } catch (error) {
    console.error("[ACHIEVEMENT_DELETE] Failed to delete achievement", error)
    return apiError("Failed to delete achievement", 500)
  }
}
