import { catchError } from "@/lib/utils"

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 400,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export function apiResponse<T>(data: T, status = 200, headers?: Record<string, string>): Response {
  return Response.json(data, {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  })
}

export function apiError(message: string, status = 400): Response {
  return Response.json({ error: message }, { status })
}

export function apiValidationError(errors: Record<string, string[]>): Response {
  return Response.json({ error: "Validation failed", details: errors }, { status: 422 })
}

export async function handleServerAction<T>(action: () => Promise<T>): Promise<{
  data?: T
  error?: string
}> {
  try {
    const data = await action()
    return { data }
  } catch (error) {
    const { message } = catchError(error)
    return { error: message }
  }
}

export async function handleServerActionWithValidation<TInput, TOutput>(
  action: (validatedData: TInput) => Promise<TOutput>,
  schema: { safeParse: (data: unknown) => { success: boolean; data?: TInput; error?: { format: () => Record<string, string[]> } } },
  formData: unknown,
): Promise<{
  data?: TOutput
  error?: string
  errors?: Record<string, string[]>
}> {
  const result = schema.safeParse(formData)
  if (!result.success) {
    return { error: "Validation failed", errors: result.error?.format() }
  }
  return handleServerAction(() => action(result.data as TInput))
}

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const { headers, ...rest } = options || {}
  const isFormData = rest.body instanceof FormData

  const res = await fetch(url, {
    ...rest,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(headers as Record<string, string>),
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "An error occurred" }))
    throw new ApiError(error.error || `Request failed with status ${res.status}`, res.status)
  }

  return res.json()
}

export async function apiPost<T>(url: string, data: unknown): Promise<T> {
  return fetcher<T>(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function apiPut<T>(url: string, data: unknown): Promise<T> {
  return fetcher<T>(url, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function apiPatch<T>(url: string, data: unknown): Promise<T> {
  return fetcher<T>(url, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function apiDelete<T>(url: string): Promise<T> {
  return fetcher<T>(url, {
    method: "DELETE",
  })
}

export function buildQueryString(params: Record<string, string | number | boolean | undefined | null>): string {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value))
    }
  }
  const qs = searchParams.toString()
  return qs ? `?${qs}` : ""
}
