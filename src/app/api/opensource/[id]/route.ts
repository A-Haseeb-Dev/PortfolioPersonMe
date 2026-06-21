import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params
  const body = await request.json()

  try {
    const existing = await db.gitHubRepo.findUnique({ where: { id } })

    if (!existing) {
      return apiError("Repository not found", 404)
    }

    const data: Record<string, unknown> = {}

    if (body.name !== undefined) data.name = body.name
    if (body.description !== undefined) data.description = body.description || null
    if (body.stars !== undefined) data.stars = body.stars
    if (body.forks !== undefined) data.forks = body.forks
    if (body.issues !== undefined) data.issues = body.issues
    if (body.language !== undefined) data.language = body.language || null
    if (body.languageColor !== undefined) data.languageColor = body.languageColor || null
    if (body.url !== undefined) data.url = body.url || null
    if (body.topics !== undefined) data.topics = body.topics

    const repo = await db.gitHubRepo.update({ where: { id }, data })

    return apiResponse({ repo })
  } catch (error) {
    console.error("[OPENSOURCE_PUT] Failed to update repository", error)
    return apiError("Failed to update repository", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.gitHubRepo.findUnique({ where: { id } })

    if (!existing) {
      return apiError("Repository not found", 404)
    }

    await db.gitHubRepo.delete({ where: { id } })

    return apiResponse({ message: "Repository deleted successfully" })
  } catch (error) {
    console.error("[OPENSOURCE_DELETE] Failed to delete repository", error)
    return apiError("Failed to delete repository", 500)
  }
}
