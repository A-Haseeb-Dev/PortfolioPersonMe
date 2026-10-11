type RateLimitOptions = {
  windowMs: number
  max: number
}

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

/** Best-effort client IP from proxy headers. */
export function getClientIp(headers: Headers): string {
  const viaForwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const viaRealIp = headers.get("x-real-ip")
  return viaForwarded || viaRealIp || "unknown"
}

/** Increment a bucket for `key`. Returns `true` while under the limit. */
export function rateLimit(key: string, { windowMs, max }: RateLimitOptions): boolean {
  const now = Date.now()
  const entry = buckets.get(key)

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= max) return false
  entry.count += 1
  return true
}

/** Rate limit by client IP. */
export function rateLimitIp(
  request: Request,
  options: RateLimitOptions,
): boolean {
  return rateLimit(`ip:${getClientIp(request.headers)}`, options)
}

/* istanbul ignore next */
const timer = setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of buckets) {
    if (now > entry.resetAt) buckets.delete(key)
  }
}, 60_000)
timer.unref?.()