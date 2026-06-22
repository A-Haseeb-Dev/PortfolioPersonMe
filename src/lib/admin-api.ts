const ADMIN_DATA_KEYS = [
  "data", "posts", "projects", "caseStudies", "services",
  "testimonials", "achievements", "resources", "startupIdeas",
  "learning", "categories", "items", "messages", "skills",
] as const

export async function fetchAdminData<T>(endpoint: string): Promise<T[]> {
  try {
    const res = await fetch(endpoint)
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const json: Record<string, unknown> = await res.json()
    if (!json || typeof json !== "object") return []
    for (const key of ADMIN_DATA_KEYS) {
      const value = json[key]
      if (Array.isArray(value)) return value as T[]
    }
    return []
  } catch (error) {
    console.error(`[fetchAdminData] Failed to fetch ${endpoint}:`, error)
    return []
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
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Request failed" }))
      console.error(`[apiAction] ${method} ${url}:`, err)
    }
    return res.ok
  } catch (error) {
    console.error(`[apiAction] ${method} ${url}:`, error)
    return false
  }
}
