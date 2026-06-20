import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    })

    return apiResponse({ testimonials })
  } catch (error) {
    console.error("[TESTIMONIALS_GET] Failed to fetch testimonials", error)
    return apiError("Failed to fetch testimonials", 500)
  }
}

export async function POST(request: Request) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const body = await request.json()
  const { name, title, company, avatar, content, rating, featured, order } = body

  try {

    if (!name || typeof name !== "string") {
      return apiError("Name is required", 400)
    }

    if (!content || typeof content !== "string") {
      return apiError("Content is required", 400)
    }

    const testimonial = await db.testimonial.create({
      data: {
        name,
        title: title || null,
        company: company || null,
        avatar: avatar || null,
        content,
        rating: typeof rating === "number" ? rating : 5,
        featured: typeof featured === "boolean" ? featured : false,
        order: typeof order === "number" ? order : 0,
      },
    })

    return apiResponse({ testimonial }, 201)
  } catch (error) {
    console.error("[TESTIMONIALS_POST] Failed to create testimonial", error)
    return apiError("Failed to create testimonial", 500)
  }
}
