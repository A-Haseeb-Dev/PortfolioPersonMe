import { db } from "@/lib/db"
import { headers } from "next/headers"

type BatchItem = {
  type: "pageview" | "visitor" | "download" | "contact"
  data: Record<string, unknown>
  timestamp: Date
}

let batchQueue: BatchItem[] = []
let batchTimeout: ReturnType<typeof setTimeout> | null = null

const BATCH_INTERVAL = 5000
const BATCH_MAX_SIZE = 25

function flushBatch() {
  if (batchTimeout) {
    clearTimeout(batchTimeout)
    batchTimeout = null
  }
  const items = batchQueue.splice(0, BATCH_MAX_SIZE)
  if (items.length === 0) return

  processBatch(items).catch(() => {})
  if (batchQueue.length > 0) scheduleBatch()
}

function scheduleBatch() {
  if (batchTimeout) return
  batchTimeout = setTimeout(() => {
    batchTimeout = null
    flushBatch()
  }, BATCH_INTERVAL)
}

async function processBatch(items: BatchItem[]) {
  for (const item of items) {
    try {
      switch (item.type) {
        case "pageview": {
          const { page, ip, userAgent, referrer, country, device, browser } = item.data as Record<string, string>
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          await db.analytics.upsert({
            where: { date_page: { date: today, page } },
            update: { views: { increment: 1 } },
            create: { date: today, page, views: 1, uniqueVisitors: 0 },
          })

          await db.visitor.create({
            data: {
              ip: ip || null,
              page,
              referrer: referrer || null,
              device: device || null,
              browser: browser || null,
              country: country || null,
              timestamp: new Date(),
            },
          })
          break
        }
        case "visitor": {
          const { page, ip, userAgent, referrer, country, device, browser } = item.data as Record<string, string>
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          await db.analytics.upsert({
            where: { date_page: { date: today, page } },
            update: { uniqueVisitors: { increment: 1 } },
            create: { date: today, page, views: 0, uniqueVisitors: 1 },
          })

          await db.visitor.create({
            data: {
              ip: ip || null,
              page,
              referrer: referrer || null,
              device: device || null,
              browser: browser || null,
              country: country || null,
              timestamp: new Date(),
            },
          })
          break
        }
        case "download": {
          const { resourceId, ip } = item.data as Record<string, string>
          await db.download.create({
            data: {
              resourceId,
              ip: ip || null,
              timestamp: new Date(),
            },
          })
          break
        }
        case "contact": {
          const { contactId } = item.data as Record<string, string>
          await db.contactMessage.update({
            where: { id: contactId },
            data: { replied: true },
          })
          break
        }
      }
    } catch {
      // Silently fail for analytics — never break the app
    }
  }
}

function queue(type: BatchItem["type"], data: Record<string, unknown>) {
  batchQueue.push({ type, data, timestamp: new Date() })
  if (batchQueue.length >= BATCH_MAX_SIZE) {
    flushBatch()
  } else {
    scheduleBatch()
  }
}

async function getClientInfo() {
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
             headersList.get("x-real-ip") ||
             "unknown"
  const userAgent = headersList.get("user-agent") || ""
  const referrer = headersList.get("referer") || headersList.get("referrer") || ""
  const country = headersList.get("x-vercel-ip-country") ||
                  headersList.get("cf-ipcountry") ||
                  "unknown"
  const device = detectDevice(userAgent)
  const browser = detectBrowser(userAgent)

  return { ip, userAgent, referrer, country, device, browser }
}

function detectDevice(userAgent: string): string {
  if (/mobile|android|iphone|ipad|ipod/i.test(userAgent)) {
    if (/tablet|ipad/i.test(userAgent)) return "tablet"
    return "mobile"
  }
  return "desktop"
}

function detectBrowser(userAgent: string): string {
  if (userAgent.includes("Firefox")) return "Firefox"
  if (userAgent.includes("Chrome")) return "Chrome"
  if (userAgent.includes("Safari")) return "Safari"
  if (userAgent.includes("Edge")) return "Edge"
  if (userAgent.includes("Opera")) return "Opera"
  return "Other"
}

export async function trackPageView(page: string) {
  try {
    const info = await getClientInfo()
    queue("pageview", { page, ...info })
  } catch {
    // fail silently
  }
}

export async function trackVisitor() {
  try {
    const info = await getClientInfo()
    queue("visitor", { page: info.referrer || "/", ...info })
  } catch {
    // fail silently
  }
}

export async function trackDownload(resourceId: string) {
  try {
    const info = await getClientInfo()
    queue("download", { resourceId, ip: info.ip })
  } catch {
    // fail silently
  }
}

export function trackContact(contactId: string) {
  try {
    queue("contact", { contactId })
  } catch {
    // fail silently
  }
}

export interface AnalyticsSummary {
  totalVisitors: number
  todayVisitors: number
  activeVisitors: number
  totalPageViews: number
  totalDownloads: number
  totalContacts: number
  pageViewsChart: { date: string; views: number; visitors: number }[]
  topPages: { page: string; views: number; visitors: number }[]
  topReferrers: { referrer: string; count: number }[]
  countries: { country: string; count: number }[]
  devices: { device: string; count: number }[]
  browsers: { browser: string; count: number }[]
  downloadsOverTime: { date: string; count: number }[]
  contactsOverTime: { date: string; count: number }[]
}

export async function getAnalytics(days: number = 30): Promise<AnalyticsSummary> {
  const since = new Date()
  since.setDate(since.getDate() - days)
  since.setHours(0, 0, 0, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000)

  const [
    analyticsRecords,
    totalVisitors,
    todayVisitors,
    activeVisitors,
    topReferrers,
    countries,
    devices,
    browsers,
    downloads,
    contacts,
  ] = await Promise.all([
    db.analytics.findMany({
      where: { date: { gte: since } },
      orderBy: { date: "asc" },
    }),

    db.visitor.count({
      where: { createdAt: { gte: since } },
    }),

    db.visitor.count({
      where: { createdAt: { gte: today } },
    }),

    db.visitor.count({
      where: { timestamp: { gte: thirtyMinAgo } },
    }),

    db.visitor.groupBy({
      by: ["referrer"],
      where: {
        referrer: { not: null },
        createdAt: { gte: since },
      },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),

    db.visitor.groupBy({
      by: ["country"],
      where: {
        country: { not: null },
        createdAt: { gte: since },
      },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),

    db.visitor.groupBy({
      by: ["device"],
      where: {
        device: { not: null },
        createdAt: { gte: since },
      },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),

    db.visitor.groupBy({
      by: ["browser"],
      where: {
        browser: { not: null },
        createdAt: { gte: since },
      },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),

    db.download.findMany({
      where: { timestamp: { gte: since } },
      orderBy: { timestamp: "asc" },
    }),

    db.contactMessage.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    }),
  ])

  const totalPageViews = analyticsRecords.reduce((sum: number, r) => sum + r.views, 0)
  const totalDownloads = downloads.length

  const pageViewsChart = aggregateByDate(analyticsRecords.map((r: { date: Date; views: number; uniqueVisitors: number }) => ({
    date: r.date.toISOString().split("T")[0],
    views: r.views,
    visitors: r.uniqueVisitors,
  })))

  const topPagesMap = new Map<string, { views: number; visitors: number }>()
  for (const r of analyticsRecords) {
    const existing = topPagesMap.get(r.page) || { views: 0, visitors: 0 }
    existing.views += r.views
    existing.visitors += r.uniqueVisitors
    topPagesMap.set(r.page, existing)
  }
  const topPages = Array.from(topPagesMap.entries())
    .map(([page, data]) => ({ page, ...data }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)

  const downloadsOverTime = aggregateByDate(
    downloads.map((d: { timestamp: Date }) => ({ date: d.timestamp.toISOString().split("T")[0], count: 1 }))
  )

  const contactsOverTime = aggregateByDate(
    contacts.map((c: { createdAt: Date }) => ({ date: c.createdAt.toISOString().split("T")[0], count: 1 }))
  )

  return {
    totalVisitors,
    todayVisitors,
    activeVisitors,
    totalPageViews,
    totalDownloads,
    totalContacts: contacts.length,
    pageViewsChart,
    topPages,
    topReferrers: topReferrers.map((r: { referrer: string | null; _count: { id: number } }) => ({
      referrer: r.referrer || "direct",
      count: r._count.id,
    })),
    countries: countries.map((c: { country: string | null; _count: { id: number } }) => ({
      country: c.country || "unknown",
      count: c._count.id,
    })),
    devices: devices.map((d: { device: string | null; _count: { id: number } }) => ({
      device: d.device || "unknown",
      count: d._count.id,
    })),
    browsers: browsers.map((b: { browser: string | null; _count: { id: number } }) => ({
      browser: b.browser || "unknown",
      count: b._count.id,
    })),
    downloadsOverTime,
    contactsOverTime,
  }
}

function aggregateByDate<T extends { date: string }>(items: T[]): any[] {
  const map = new Map<string, any>()
  for (const item of items) {
    const existing = map.get(item.date) || {}
    Object.assign(existing, item)
    map.set(item.date, existing)
  }
  return Array.from(map.entries())
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => a.date.localeCompare(b.date))
}
