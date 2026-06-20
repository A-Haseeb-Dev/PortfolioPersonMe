import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { getAdminTestimonials } from "@/lib/admin-data"
import { getCollection, updateInCollection, removeFromCollection } from "@/lib/data-store"

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
    console.warn("[TESTIMONIAL_GET] DB unavailable, using data store", error)
    const data = getCollection("testimonials", getAdminTestimonials())
    const item = data.find((i: any) => i.id === id)
    if (!item) return apiError("Not found", 404)
    return apiResponse({ testimonial: item })
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
    console.warn("[TESTIMONIAL_PUT] DB unavailable, using data store", error)
    const fallback = getAdminTestimonials()
    const collection = updateInCollection("testimonials", id, body, fallback)
    const item = collection.find((i: any) => i.id === id)
    if (!item) return apiError("Not found", 404)
    return apiResponse({ testimonial: item })
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
    console.warn("[TESTIMONIAL_DELETE] DB unavailable, using data store", error)
    const fallback = getAdminTestimonials()
    removeFromCollection("testimonials", id, fallback)
    return apiResponse({ message: "Testimonial deleted successfully" })
  }
}
