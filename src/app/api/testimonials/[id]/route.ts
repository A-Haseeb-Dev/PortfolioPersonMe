import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const testimonial = await db.testimonial.findUnique({
      where: { id },
    })

    if (!testimonial) {
      return apiError("Testimonial not found", 404)
    }

    return apiResponse({ testimonial })
  } catch (error) {
    console.error("[TESTIMONIAL_GET] Failed to fetch testimonial", error)
    return apiError("Failed to fetch testimonial", 500)
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
    const existing = await db.testimonial.findUnique({
      where: { id },
    })

    if (!existing) {
      return apiError("Testimonial not found", 404)
    }

    const data: Record<string, unknown> = {}

    if (body.name !== undefined) data.name = body.name
    if (body.title !== undefined) data.title = body.title || null
    if (body.company !== undefined) data.company = body.company || null
    if (body.avatar !== undefined) data.avatar = body.avatar || null
    if (body.content !== undefined) data.content = body.content
    if (body.rating !== undefined) data.rating = body.rating
    if (body.featured !== undefined) data.featured = body.featured
    if (body.order !== undefined) data.order = body.order

    const testimonial = await db.testimonial.update({
      where: { id },
      data,
    })

    return apiResponse({ testimonial })
  } catch (error) {
    console.error("[TESTIMONIAL_PUT] Failed to update testimonial", error)
    return apiError("Failed to update testimonial", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.testimonial.findUnique({
      where: { id },
    })

    if (!existing) {
      return apiError("Testimonial not found", 404)
    }

    await db.testimonial.delete({ where: { id } })

    return apiResponse({ message: "Testimonial deleted successfully" })
  } catch (error) {
    console.error("[TESTIMONIAL_DELETE] Failed to delete testimonial", error)
    return apiError("Failed to delete testimonial", 500)
  }
}
