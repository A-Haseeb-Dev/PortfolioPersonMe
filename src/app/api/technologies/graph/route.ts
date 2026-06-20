import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

export async function GET() {
  try {
    const technologies = await db.technology.findMany({
      where: { deletedAt: null },
      include: { category: true },
    })

    const relations = await db.technologyRelation.findMany({
      include: {
        fromTechnology: { select: { id: true, name: true } },
        toTechnology: { select: { id: true, name: true } },
      },
    })

    const nodes = technologies.map((t: { id: string; name: string; category: { name: string }; experienceLevel: string; icon: string | null }) => ({
      id: t.id,
      name: t.name,
      category: t.category.name,
      experienceLevel: t.experienceLevel,
      icon: t.icon,
    }))

    const edges = relations.map((r: { id: string; fromTechnologyId: string; toTechnologyId: string; fromTechnology: { name: string }; toTechnology: { name: string }; relationType: string | null }) => ({
      id: r.id,
      source: r.fromTechnologyId,
      target: r.toTechnologyId,
      sourceName: r.fromTechnology.name,
      targetName: r.toTechnology.name,
      relationType: r.relationType,
    }))

    return apiResponse({ nodes, edges })
  } catch (error) {
    console.error("[TECH_GRAPH_GET]", error)
    return apiError("Failed to fetch technology graph", 500)
  }
}

export async function POST(request: Request) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const body = await request.json()
    const { fromTechnologyId, toTechnologyId, relationType } = body

    if (!fromTechnologyId || !toTechnologyId) {
      return apiError("fromTechnologyId and toTechnologyId are required", 400)
    }

    const existingRelation = await db.technologyRelation.findFirst({
      where: {
        fromTechnologyId,
        toTechnologyId,
      },
    })
    if (existingRelation) {
      return apiError("This relation already exists", 409)
    }

    const relation = await db.technologyRelation.create({
      data: {
        fromTechnologyId,
        toTechnologyId,
        relationType: relationType || null,
      },
      include: {
        fromTechnology: { select: { id: true, name: true } },
        toTechnology: { select: { id: true, name: true } },
      },
    })

    return apiResponse({ relation }, 201)
  } catch (error) {
    console.error("[TECH_GRAPH_POST]", error)
    return apiError("Failed to create relation", 500)
  }
}

export async function DELETE(request: Request) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const fromId = searchParams.get("from")
    const toId = searchParams.get("to")

    if (id) {
      const relation = await db.technologyRelation.findUnique({ where: { id } })
      if (!relation) {
        return apiError("Relation not found", 404)
      }
      await db.technologyRelation.delete({ where: { id } })
    } else if (fromId && toId) {
      const relation = await db.technologyRelation.findFirst({
        where: { fromTechnologyId: fromId, toTechnologyId: toId },
      })
      if (!relation) {
        return apiError("Relation not found", 404)
      }
      await db.technologyRelation.delete({ where: { id: relation.id } })
    } else {
      return apiError("Provide id or (from & to) parameters", 400)
    }

    return apiResponse({ message: "Relation deleted successfully" })
  } catch (error) {
    console.error("[TECH_GRAPH_DELETE]", error)
    return apiError("Failed to delete relation", 500)
  }
}
