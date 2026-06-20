import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

export async function GET(request: Request) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const period = searchParams.get("period") || "day"

    const endDate = to ? new Date(to) : new Date()
    const startDate = from ? new Date(from) : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000)

    const pageViews = await db.analytics.aggregate({
      _sum: { views: true, uniqueVisitors: true },
      where: {
        date: { gte: startDate, lte: endDate },
      },
    })

    const dailyViews = await db.analytics.findMany({
      where: {
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: "asc" },
    })

    const topPages = await db.analytics.groupBy({
      by: ["page"],
      _sum: { views: true },
      where: {
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { _sum: { views: "desc" } },
      take: 10,
    })

    const totalVisitors = await db.visitor.count({
      where: {
        timestamp: { gte: startDate, lte: endDate },
      },
    })

    const deviceBreakdown = await db.visitor.groupBy({
      by: ["device"],
      _count: { id: true },
      where: {
        timestamp: { gte: startDate, lte: endDate },
        device: { not: null },
      },
      orderBy: { _count: { id: "desc" } },
    })

    const trafficSources = await db.visitor.groupBy({
      by: ["referrer"],
      _count: { id: true },
      where: {
        timestamp: { gte: startDate, lte: endDate },
        referrer: { not: null },
      },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    })

    const aggregatedDaily = dailyViews.reduce(
      (acc: Record<string, { date: string; views: number; uniqueVisitors: number }>, curr) => {
        const key = curr.date.toISOString().split("T")[0]
        if (!acc[key]) acc[key] = { date: key, views: 0, uniqueVisitors: 0 }
        acc[key].views += curr.views
        acc[key].uniqueVisitors += curr.uniqueVisitors
        return acc
      },
      {} as Record<string, { date: string; views: number; uniqueVisitors: number }>,
    )

    return apiResponse({
      period,
      from: startDate.toISOString(),
      to: endDate.toISOString(),
      summary: {
        totalPageViews: pageViews._sum.views || 0,
        totalUniqueVisitors: pageViews._sum.uniqueVisitors || 0,
        totalVisitors: totalVisitors,
      },
      dailyViews: Object.values(aggregatedDaily).sort(
        (a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date),
      ),
      topPages: topPages.map((p: { page: string; _sum: { views: number | null } }) => ({
        page: p.page,
        views: p._sum.views || 0,
      })),
      deviceBreakdown: deviceBreakdown.map((d: { device: string | null; _count: { id: number } }) => ({
        device: d.device || "unknown",
        count: d._count.id,
      })),
      trafficSources: trafficSources.map((s: { referrer: string | null; _count: { id: number } }) => ({
        source: s.referrer || "direct",
        count: s._count.id,
      })),
    })
  } catch (error) {
    console.error("[ANALYTICS_GET]", error)
    return apiError("Failed to fetch analytics", 500)
  }
}
