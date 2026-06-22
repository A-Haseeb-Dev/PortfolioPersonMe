import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { logActivity } from "@/lib/activity"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const caseStudy = await db.caseStudy.findFirst({
      where: { id, deletedAt: null },
    })

    if (!caseStudy) {
      return apiError("Case study not found", 404)
    }

    return apiResponse({ caseStudy })
  } catch (error) {
    console.error("[CASE_STUDY_GET] Failed to fetch case study", error)
    return apiError("Failed to fetch case study", 500)
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
    const existing = await db.caseStudy.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Case study not found", 404)
    }

    const data: Record<string, unknown> = {}

    if (body.title !== undefined) {
      data.title = body.title
      data.slug = body.slug || slugify(body.title)
    }
    if (body.client !== undefined) data.client = body.client
    if (body.industry !== undefined) data.industry = body.industry
    if (body.duration !== undefined) data.duration = body.duration
    if (body.role !== undefined) data.role = body.role
    if (body.team !== undefined) data.team = body.team
    if (body.problem !== undefined) data.problem = body.problem
    if (body.research !== undefined) data.research = body.research
    if (body.planning !== undefined) data.planning = body.planning
    if (body.design !== undefined) data.design = body.design
    if (body.architecture !== undefined) data.architecture = body.architecture
    if (body.development !== undefined) data.development = body.development
    if (body.testing !== undefined) data.testing = body.testing
    if (body.deployment !== undefined) data.deployment = body.deployment
    if (body.results !== undefined) data.results = body.results
    if (body.coverImage !== undefined) data.coverImage = body.coverImage
    if (body.published !== undefined) data.published = body.published
    if (body.featured !== undefined) data.featured = body.featured
    if (body.technologies !== undefined) data.technologies = body.technologies

    const caseStudy = await db.caseStudy.update({
      where: { id },
      data,
    })

    logActivity("update", "case-study", id, existing.title)

    return apiResponse({ caseStudy })
  } catch (error) {
    console.error("[CASE_STUDY_PUT] Failed to update case study", error)
    return apiError("Failed to update case study", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.caseStudy.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Case study not found", 404)
    }

    await db.caseStudy.update({
      where: { id },
      data: { deletedAt: new Date() },
    })

    logActivity("delete", "case-study", id, existing.title)

    return apiResponse({ message: "Case study deleted successfully" })
  } catch (error) {
    console.error("[CASE_STUDY_DELETE] Failed to delete case study", error)
    return apiError("Failed to delete case study", 500)
  }
}
