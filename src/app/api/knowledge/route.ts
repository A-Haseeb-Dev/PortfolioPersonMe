import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

export async function GET() {
  try {
    const categories = await db.knowledgeCategory.findMany({
      include: {
        notes: {
          where: { deletedAt: null },
          include: {
            tags: { include: { tag: true } },
          },
        },
      },
      orderBy: { name: "asc" },
    })

    return apiResponse({ categories })
  } catch (error) {
    console.error("[KNOWLEDGE_GET] Failed to fetch knowledge", error)
    return apiError("Failed to fetch knowledge", 500)
  }
}

export async function POST(request: Request) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const body = await request.json()
  const { title, slug, excerpt, content, categoryId, readingTime } = body

  try {
    if (!title || typeof title !== "string") {
      return apiError("Title is required", 400)
    }
    if (!slug || typeof slug !== "string") {
      return apiError("Slug is required", 400)
    }
    if (!content || typeof content !== "string") {
      return apiError("Content is required", 400)
    }
    if (!categoryId || typeof categoryId !== "string") {
      return apiError("Category is required", 400)
    }

    const note = await db.knowledgeNote.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        readingTime: typeof readingTime === "number" ? readingTime : null,
        categoryId,
      },
    })

    return apiResponse({ note }, 201)
  } catch (error) {
    console.error("[KNOWLEDGE_POST] Failed to create note", error)
    return apiError("Failed to create note", 500)
  }
}
