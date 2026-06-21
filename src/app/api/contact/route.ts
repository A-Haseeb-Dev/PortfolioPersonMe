import { db } from "@/lib/db"
import { contactFormSchema } from "@/lib/validations"
import { apiResponse, apiError } from "@/lib/api"

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }
  entry.count++
  return entry.count <= RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               request.headers.get("x-real-ip") ||
               "unknown"
    if (!checkRateLimit(ip)) {
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
    return apiError("Failed to send message", 500)
  }
}
