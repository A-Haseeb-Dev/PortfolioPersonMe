import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "user") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "20")))

    const activities = await db.activity.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    })

    return NextResponse.json({ activities })
  } catch (error) {
    console.error("[ACTIVITY_GET] Failed to fetch activities", error)
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}
