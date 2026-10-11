import { db } from "@/lib/db"
import { contactFormSchema } from "@/lib/validations"
import { apiResponse, apiError, toApiError } from "@/lib/api"
import { rateLimitIp } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    if (!rateLimitIp(request, { windowMs: 60_000, max: 5 })) {
      return apiError("Too many requests. Please try again later.", 429)
    }

    const body = await request.json()
    const parsed = contactFormSchema.safeParse(body)
    if (!parsed.success) {
      return apiError(
        "Validation failed",
        422,
      )
    }

    const contact = await db.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    })

    return apiResponse({ message: "Message sent successfully", id: contact.id }, 201)
  } catch (error) {
    console.error("[CONTACT_POST]", error)
    return toApiError(error, "Failed to send message")
  }
}