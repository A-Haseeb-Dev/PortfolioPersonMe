import { db } from "@/lib/db"
import { projectSchema } from "@/lib/validations"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10")))
    const published = searchParams.get("published")
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const where: Record<string, unknown> = { deletedAt: null }
    if (published === "true") where.published = true
    if (published === "false") where.published = false
    if (featured === "true") where.featured = true
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const [projects, total] = await Promise.all([
      db.project.findMany({
        where: where as any,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          technologies: {
            include: { technology: true },
          },
          images: true,
        },
      }),
      db.project.count({ where: where as any }),
    ])

    return apiResponse({
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[PROJECTS_GET]", error)
    return apiError("Failed to fetch projects", 500)
  }
}

export async function POST(request: Request) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const body = await request.json()
    const parsed = projectSchema.safeParse(body)
    if (!parsed.success) {
      return apiError("Validation failed", 422)
    }

    const slug = parsed.data.slug || slugify(parsed.data.title)
    const existing = await db.project.findUnique({ where: { slug } })
    if (existing) {
      return apiError("A project with this slug already exists", 409)
    }

    const project = await db.project.create({
      data: {
        title: parsed.data.title,
        slug,
        description: parsed.data.description,
        problem: parsed.data.problem || null,
        solution: parsed.data.solution || null,
        architecture: parsed.data.architecture || null,
        features: parsed.data.features || undefined,
        results: parsed.data.results || null,
        lessonsLearned: parsed.data.lessonsLearned || null,
        coverImage: parsed.data.image || null,
        featured: parsed.data.featured,
        githubUrl: parsed.data.githubUrl || null,
        liveUrl: parsed.data.liveUrl || null,
        videoDemo: parsed.data.videoDemo || null,
        published: parsed.data.status === "completed",
      },
    })

    if (parsed.data.techStack?.length) {
      for (const techId of parsed.data.techStack) {
        await db.projectTechnology.create({
          data: { projectId: project.id, technologyId: techId },
        }).catch(() => {})
      }
    }

    return apiResponse({ project }, 201)
  } catch (error) {
    console.error("[PROJECTS_POST]", error)
    return apiError("Failed to create project", 500)
  }
}
