import { db } from "@/lib/db"
import { contactFormSchema } from "@/lib/validations"
import { apiResponse, apiError } from "@/lib/api"

export async function POST(request: Request) {
  try {
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
    return apiError("Failed to send message", 500)
  }
}
