import { auth } from "@/lib/auth"
import { getAnalytics } from "@/lib/analytics"

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "user") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const daysParam = searchParams.get("days")
    const days = daysParam ? Math.min(Math.max(parseInt(daysParam), 1), 365) : 30

    const data = await getAnalytics(days)

    return Response.json(data)
  } catch {
    return Response.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
