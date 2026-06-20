"use client"

export async function fetchAdminData<T>(endpoint: string, fallback: T[]): Promise<T[]> {
  try {
    const res = await fetch(endpoint)
    if (!res.ok) throw new Error("API unavailable")
    const json = await res.json()
    return json.data || json.posts || json.projects || json.caseStudies || json.services || json.testimonials || json.achievements || json.resources || json.startupIdeas || json.learning || json.categories || json.items || json.messages || fallback
  } catch {
    return fallback
  }
}

export async function apiAction(
  method: "POST" | "PUT" | "DELETE",
  url: string,
  body?: unknown,
): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    })
    return res.ok
  } catch {
    return false
  }
}
