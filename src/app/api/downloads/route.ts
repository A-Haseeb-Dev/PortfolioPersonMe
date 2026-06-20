import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { resourceId } = body

    if (!resourceId) {
      return apiError("resourceId is required", 400)
    }

    const resource = await db.resource.findFirst({
      where: { id: resourceId, deletedAt: null, published: true },
    })
    if (!resource) {
      return apiError("Resource not found", 404)
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null

    const download = await db.download.create({
      data: {
        resourceId,
        ip,
      },
    })

    await db.resource.update({
      where: { id: resourceId },
      data: { downloadCount: { increment: 1 } },
    })

    return apiResponse({ download, fileUrl: resource.fileUrl }, 201)
  } catch (error) {
    console.error("[DOWNLOADS_POST]", error)
    return apiError("Failed to record download", 500)
  }
}

export async function GET() {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const resources = await db.resource.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        title: true,
        slug: true,
        type: true,
        downloadCount: true,
        createdAt: true,
      },
      orderBy: { downloadCount: "desc" },
    })

    const totalDownloads = resources.reduce((sum, r) => sum + r.downloadCount, 0)

    const recentDownloads = await db.download.findMany({
      orderBy: { timestamp: "desc" },
      take: 20,
      include: {
        resource: { select: { title: true, slug: true } },
      },
    })

    return apiResponse({
      totalDownloads,
      resources,
      recentDownloads,
    })
  } catch (error) {
    console.error("[DOWNLOADS_GET]", error)
    return apiError("Failed to fetch download stats", 500)
  }
}
