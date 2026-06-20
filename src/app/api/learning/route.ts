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
  await requireRole(["ADMIN", "SUPER_ADMIN"])
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
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        certificate,
        notes,
      },
    })

    return apiResponse({ journey }, 201)
  } catch (error) {
    console.error("[LEARNING_POST] Failed to create learning journey", error)
    return apiError("Failed to create learning journey", 500)
  }
}
