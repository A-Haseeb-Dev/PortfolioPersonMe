import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { logActivity } from "@/lib/activity"

export async function GET(request: Request) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20")))
    const read = searchParams.get("read")
    const replied = searchParams.get("replied")

    const where: Record<string, unknown> = {}
    if (read === "true") where.read = true
    if (read === "false") where.read = false
    if (replied === "true") where.replied = true
    if (replied === "false") where.replied = false

    const [messages, total] = await Promise.all([
      db.contactMessage.findMany({
        where: where as any,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.contactMessage.count({ where: where as any }),
    ])

    return apiResponse({
      messages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[MESSAGES_GET]", error)
    return apiError("Failed to fetch messages", 500)
  }
}

export async function PUT(request: Request) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const body = await request.json()
    const { id, read, replied } = body

    if (!id) {
      return apiError("Message id is required", 400)
    }

    const existing = await db.contactMessage.findUnique({ where: { id } })
    if (!existing) {
      return apiError("Message not found", 404)
    }

    const data: Record<string, unknown> = {}
    if (typeof read === "boolean") data.read = read
    if (typeof replied === "boolean") data.replied = replied

    const message = await db.contactMessage.update({
      where: { id },
      data,
    })

    logActivity("update", "message", id, existing.subject || existing.name)

    return apiResponse({ message })
  } catch (error) {
    console.error("[MESSAGES_PUT]", error)
    return apiError("Failed to update message", 500)
  }
}
