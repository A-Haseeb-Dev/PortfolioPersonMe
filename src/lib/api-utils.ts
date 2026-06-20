import { auth } from "@/lib/auth"
import { ApiError, apiError as _apiError, apiResponse as _apiResponse } from "@/lib/api"
import type { Role } from "@/types"

export { ApiError }

export async function getAuthSession() {
  return await auth()
}

export async function requireAuth() {
  const session = await getAuthSession()
  if (!session?.user?.id) {
    throw new ApiError("Unauthorized", 401)
  }
  return session
}

export async function requireRole(roles: (Role | "SUPER_ADMIN" | "ADMIN" | "EDITOR")[]) {
  const session = await requireAuth()
  if (!roles.includes(session.user.role as Role)) {
    throw new ApiError("Forbidden", 403)
  }
  return session
}

export function apiResponse<T>(data: T, status = 200) {
  return _apiResponse(data, status)
}

export function apiError(message: string, status = 400) {
  return _apiError(message, status)
}
