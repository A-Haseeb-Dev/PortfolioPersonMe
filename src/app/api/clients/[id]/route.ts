import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { logActivity } from "@/lib/activity"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const client = await db.client.findUnique({
      where: { id },
    })

    if (!client) {
      return apiError("Client not found", 404)
    }

    return apiResponse({ client })
  } catch (error) {
    console.error("[CLIENT_GET] Failed to fetch client", error)
    return apiError("Failed to fetch client", 500)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params
  const body = await request.json()

  try {
    const existing = await db.client.findUnique({
      where: { id },
    })

    if (!existing) {
      return apiError("Client not found", 404)
    }

    const data: Record<string, unknown> = {}

    if (body.name !== undefined) data.name = body.name
    if (body.industry !== undefined) data.industry = body.industry || null
    if (body.logo !== undefined) data.logo = body.logo || null
    if (body.url !== undefined) data.url = body.url || null
    if (body.featured !== undefined) data.featured = body.featured
    if (body.order !== undefined) data.order = body.order

    const client = await db.client.update({
      where: { id },
      data,
    })

    logActivity("update", "client", id, existing.name)

    return apiResponse({ client })
  } catch (error) {
    console.error("[CLIENT_PUT] Failed to update client", error)
    return apiError("Failed to update client", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.client.findUnique({
      where: { id },
    })

    if (!existing) {
      return apiError("Client not found", 404)
    }

    await db.client.delete({ where: { id } })

    logActivity("delete", "client", id, existing.name)

    return apiResponse({ message: "Client deleted successfully" })
  } catch (error) {
    console.error("[CLIENT_DELETE] Failed to delete client", error)
    return apiError("Failed to delete client", 500)
  }
}
