import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const note = await db.knowledgeNote.findUnique({
      where: { id },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    })

    if (!note) {
      return apiError("Knowledge note not found", 404)
    }

    return apiResponse({ note })
  } catch (error) {
    console.error("[KNOWLEDGE_NOTE_GET] Failed to fetch note", error)
    return apiError("Failed to fetch note", 500)
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
    const existing = await db.knowledgeNote.findUnique({
      where: { id },
    })

    if (!existing) {
      return apiError("Knowledge note not found", 404)
    }

    const data: Record<string, unknown> = {}

    if (body.title !== undefined) data.title = body.title
    if (body.slug !== undefined) data.slug = body.slug
    if (body.excerpt !== undefined) data.excerpt = body.excerpt || null
    if (body.content !== undefined) data.content = body.content
    if (body.readingTime !== undefined) data.readingTime = body.readingTime
    if (body.categoryId !== undefined) data.categoryId = body.categoryId

    const note = await db.knowledgeNote.update({
      where: { id },
      data,
    })

    return apiResponse({ note })
  } catch (error) {
    console.error("[KNOWLEDGE_NOTE_PUT] Failed to update note", error)
    return apiError("Failed to update note", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.knowledgeNote.findUnique({
      where: { id },
    })

    if (!existing) {
      return apiError("Knowledge note not found", 404)
    }

    await db.knowledgeNote.update({
      where: { id },
      data: { deletedAt: new Date() },
    })

    return apiResponse({ message: "Knowledge note deleted successfully" })
  } catch (error) {
    console.error("[KNOWLEDGE_NOTE_DELETE] Failed to delete note", error)
    return apiError("Failed to delete note", 500)
  }
}
