import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { getAdminAchievements } from "@/lib/admin-data"
import { requireRole } from "@/lib/api-utils"
import { getCollection, addToCollection } from "@/lib/data-store"
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
  } catch (prismaError) {
    console.warn("[ACHIEVEMENTS_GET] DB unavailable, using data store", prismaError)
    const data = getCollection("achievements", getAdminAchievements())
    return apiResponse({ data, total: data.length, fallback: true })
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
  } catch (prismaError) {
    console.warn("[ACHIEVEMENTS_POST] DB unavailable, using data store", prismaError)
    const fallback = getAdminAchievements()
    const newItem = { id: `store_${Date.now()}`, ...body, createdAt: new Date() }
    const data = addToCollection("achievements", newItem, fallback)
    return apiResponse({ data, item: newItem }, 201)
  }
}
