import { trackPageView, trackVisitor, trackDownload, trackContact } from "@/lib/analytics"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, page, resourceId, contactId } = body

    if (!type || typeof type !== "string") {
      return Response.json({ error: "Missing type" }, { status: 400 })
    }

    switch (type) {
      case "pageview":
        if (!page) return Response.json({ error: "Missing page" }, { status: 400 })
        trackPageView(page)
        break
      case "visitor":
        trackVisitor()
        break
      case "download":
        if (!resourceId) return Response.json({ error: "Missing resourceId" }, { status: 400 })
        trackDownload(resourceId)
        break
      case "contact":
        if (!contactId) return Response.json({ error: "Missing contactId" }, { status: 400 })
        trackContact(contactId)
        break
      default:
        return Response.json({ error: "Invalid type" }, { status: 400 })
    }

    return Response.json({ success: true })
  } catch {
    return Response.json({ success: true })
  }
}
