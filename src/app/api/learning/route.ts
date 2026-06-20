import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { getAdminLearning } from "@/lib/admin-data"
import { requireRole } from "@/lib/api-utils"
import { getCollection, addToCollection } from "@/lib/data-store"

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
  } catch (prismaError) {
    console.warn("[LEARNING_GET] DB unavailable, using data store", prismaError)
    const data = getCollection("learning", getAdminLearning())
    return apiResponse({ data, total: data.length, fallback: true })
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
  } catch (prismaError) {
    console.warn("[LEARNING_POST] DB unavailable, using data store", prismaError)
    const fallback = getAdminLearning()
    const newItem = { id: `store_${Date.now()}`, ...body, createdAt: new Date() }
    const data = addToCollection("learning", newItem, fallback)
    return apiResponse({ data, item: newItem }, 201)
  }
}
