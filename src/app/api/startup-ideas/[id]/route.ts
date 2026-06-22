import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { logActivity } from "@/lib/activity"

const statusMap: Record<string, "IDEA" | "VALIDATING" | "BUILDING" | "LAUNCHED" | "FAILED"> = {
  idea: "IDEA",
  validating: "VALIDATING",
  "in-progress": "BUILDING",
  launched: "LAUNCHED",
  pivoted: "FAILED",
  failed: "FAILED",
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const startupIdea = await db.startupIdea.findFirst({
      where: { id, deletedAt: null },
    })

    if (!startupIdea) {
      return apiError("Startup idea not found", 404)
    }

    return apiResponse({ startupIdea })
  } catch (error) {
    console.error("[STARTUP_IDEA_GET] Failed to fetch startup idea", error)
    return apiError("Failed to fetch startup idea", 500)
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
    const existing = await db.startupIdea.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Startup idea not found", 404)
    }

    const { title, slug, problem, solution, market, revenueModel, status, published } = body

    const data: Record<string, unknown> = {}
    if (title !== undefined) {
      data.title = title
      data.slug = slug || slugify(title)
    }
    if (problem !== undefined) data.problem = problem
    if (solution !== undefined) data.solution = solution
    if (market !== undefined) data.market = market
    if (revenueModel !== undefined) data.revenueModel = revenueModel
    if (status !== undefined) data.status = statusMap[status] || "IDEA"
    if (published !== undefined) data.published = published === true

    const startupIdea = await db.startupIdea.update({
      where: { id },
      data,
    })

    logActivity("update", "startup-idea", id, existing.title)

    return apiResponse({ startupIdea })
  } catch (error) {
    console.error("[STARTUP_IDEA_PUT] Failed to update startup idea", error)
    return apiError("Failed to update startup idea", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.startupIdea.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Startup idea not found", 404)
    }

    await db.startupIdea.update({
      where: { id },
      data: { deletedAt: new Date() },
    })

    logActivity("delete", "startup-idea", id, existing.title)

    return apiResponse({ message: "Startup idea deleted successfully" })
  } catch (error) {
    console.error("[STARTUP_IDEA_DELETE] Failed to delete startup idea", error)
    return apiError("Failed to delete startup idea", 500)
  }
}
