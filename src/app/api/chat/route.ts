import { getResponse } from "@/lib/chat-engine"
import { rateLimitIp } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    if (!rateLimitIp(request, { windowMs: 60_000, max: 20 })) {
      return Response.json(
        { response: "Too many messages. Please slow down and try again in a minute." },
        { status: 429 },
      )
    }

    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return Response.json(
        { response: "Please send a valid message." },
        { status: 400 },
      )
    }

    const response = getResponse(message)

    return Response.json({ response })
  } catch {
    return Response.json(
      { response: "Sorry, I encountered an error processing your message." },
      { status: 500 },
    )
  }
}