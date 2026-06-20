import { db } from "@/lib/db"
import { projectSchema } from "@/lib/validations"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const project = await db.project.findFirst({
      where: { id, deletedAt: null },
      include: {
        technologies: {
          include: { technology: true },
        },
        images: true,
      },
    })

    if (!project) {
      return apiError("Project not found", 404)
    }

    return apiResponse({ project })
  } catch (error) {
    console.error("[PROJECT_GET]", error)
    return apiError("Failed to fetch project", 500)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const { id } = await params
    const existing = await db.project.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Project not found", 404)
    }

    const body = await request.json()
    const parsed = projectSchema.partial().safeParse(body)
    if (!parsed.success) {
      return apiError("Validation failed", 422)
    }

    const data: Record<string, unknown> = {}
    if (parsed.data.title !== undefined) {
      data.title = parsed.data.title
      data.slug = parsed.data.slug || slugify(parsed.data.title)
    }
    if (parsed.data.description !== undefined) data.description = parsed.data.description
    if (parsed.data.problem !== undefined) data.problem = parsed.data.problem
    if (parsed.data.solution !== undefined) data.solution = parsed.data.solution
    if (parsed.data.architecture !== undefined) data.architecture = parsed.data.architecture
    if (parsed.data.features !== undefined) data.features = parsed.data.features
    if (parsed.data.results !== undefined) data.results = parsed.data.results
    if (parsed.data.lessonsLearned !== undefined) data.lessonsLearned = parsed.data.lessonsLearned
    if (parsed.data.image !== undefined) data.coverImage = parsed.data.image || null
    if (parsed.data.featured !== undefined) data.featured = parsed.data.featured
    if (parsed.data.githubUrl !== undefined) data.githubUrl = parsed.data.githubUrl || null
    if (parsed.data.liveUrl !== undefined) data.liveUrl = parsed.data.liveUrl || null
    if (parsed.data.videoDemo !== undefined) data.videoDemo = parsed.data.videoDemo || null
    if (parsed.data.status !== undefined) data.published = parsed.data.status === "completed"

    const project = await db.project.update({
      where: { id },
      data,
      include: {
        technologies: { include: { technology: true } },
        images: true,
      },
    })

    if (parsed.data.techStack) {
      await db.projectTechnology.deleteMany({ where: { projectId: id } })
      for (const techId of parsed.data.techStack) {
        await db.projectTechnology.create({
          data: { projectId: id, technologyId: techId },
        }).catch(() => {})
      }
    }

    return apiResponse({ project })
  } catch (error) {
    console.error("[PROJECT_PUT]", error)
    return apiError("Failed to update project", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const { id } = await params
    const existing = await db.project.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Project not found", 404)
    }

    await db.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    })

    return apiResponse({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("[PROJECT_DELETE]", error)
    return apiError("Failed to delete project", 500)
  }
}
