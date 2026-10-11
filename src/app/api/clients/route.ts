import { db } from "@/lib/db"
import { apiResponse, apiError, toApiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { logActivity } from "@/lib/activity"

export async function GET() {
  try {
    const clients = await db.client.findMany({
      orderBy: { order: "asc" },
    })

    return apiResponse({ clients })
  } catch (error) {
    console.error("[CLIENTS_GET] Failed to fetch clients", error)
    return toApiError(error, "Failed to fetch clients")
  }
}

export async function POST(request: Request) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const body = await request.json()
  const { name, industry, logo, url, featured, order } = body

  try {
    if (!name || typeof name !== "string") {
      return apiError("Name is required", 400)
    }

    const client = await db.client.create({
      data: {
        name,
        industry: industry || null,
        logo: logo || null,
        url: url || null,
        featured: typeof featured === "boolean" ? featured : false,
        order: typeof order === "number" ? order : 0,
      },
    })

    logActivity("create", "client", client.id, client.name)

    return apiResponse({ client }, 201)
  } catch (error) {
    console.error("[CLIENTS_POST] Failed to create client", error)
    return toApiError(error, "Failed to create client")
  }
}
