import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
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

export async function GET() {
  try {
    const achievements = await db.achievement.findMany({
      orderBy: { createdAt: "desc" },
    })

    return apiResponse({ achievements })
  } catch (error) {
    console.error("[ACHIEVEMENTS_GET] Failed to fetch achievements", error)
    return apiError("Failed to fetch achievements", 500)
  }
}

export async function POST(request: Request) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const body = await request.json()
  const { title, description, date, type, icon, url } = body

  try {
    if (!title || typeof title !== "string") {
      return apiError("Title is required", 400)
    }

    const achievement = await db.achievement.create({
      data: {
        title,
        description: description || null,
        date: date ? new Date(date) : null,
        type: mapType(type),
        icon: icon || null,
        url: url || null,
      },
    })

    return apiResponse({ achievement }, 201)
  } catch (error) {
    console.error("[ACHIEVEMENTS_POST] Failed to create achievement", error)
    return apiError("Failed to create achievement", 500)
  }
}
