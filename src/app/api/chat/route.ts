import { getResponse } from "@/lib/chat-engine"

export async function POST(request: Request) {
  try {
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
