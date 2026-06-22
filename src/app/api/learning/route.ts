import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { logActivity } from "@/lib/activity"

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

export async function GET() {
  try {
    const learning = await db.learningJourney.findMany({
      orderBy: { createdAt: "desc" },
      include: { milestones: true },
    })
    return apiResponse({ learning })
  } catch (error) {
    console.error("[LEARNING_GET] Failed to fetch learning journeys", error)
    return apiError("Failed to fetch learning journeys", 500)
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const {
    title,
    description,
    status,
    category,
    resource,
    startDate,
    endDate,
    certificate,
    notes,
  } = body

  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])
    if (!title) {
      return apiError("Title is required", 400)
    }

    const journey = await db.learningJourney.create({
      data: {
        title,
        description,
        status: mapStatus(status ?? "planned"),
        category,
        resource,
        startDate: safeDate(startDate),
        endDate: safeDate(endDate),
        certificate,
        notes,
      },
    })

    logActivity("create", "learning", journey.id, journey.title)

    return apiResponse({ journey }, 201)
  } catch (error) {
    console.error("[LEARNING_POST] Failed to create learning journey", error)
    return apiError("Failed to create learning journey", 500)
  }
}
