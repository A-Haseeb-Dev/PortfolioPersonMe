import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

export async function GET() {
  try {
    const [repos, profile] = await Promise.all([
      db.gitHubRepo.findMany({ orderBy: { stars: "desc" } }),
      db.gitHubProfile.findFirst(),
    ])

    return apiResponse({ repos, profile })
  } catch (error) {
    console.error("[OPENSOURCE_GET] Failed to fetch open source data", error)
    return apiError("Failed to fetch open source data", 500)
  }
}

export async function PUT(request: Request) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const body = await request.json()

  try {
    if (!body.username || typeof body.username !== "string") {
      return apiError("Username is required", 400)
    }

    const existing = await db.gitHubProfile.findFirst()

    const profile = existing
      ? await db.gitHubProfile.update({
          where: { id: existing.id },
          data: {
            username: body.username,
            name: body.name ?? null,
            avatar: body.avatar ?? null,
            bio: body.bio ?? null,
            totalStars: typeof body.totalStars === "number" ? body.totalStars : 0,
            totalForks: typeof body.totalForks === "number" ? body.totalForks : 0,
            totalRepos: typeof body.totalRepos === "number" ? body.totalRepos : 0,
          },
        })
      : await db.gitHubProfile.create({
          data: {
            username: body.username,
            name: body.name ?? null,
            avatar: body.avatar ?? null,
            bio: body.bio ?? null,
            totalStars: typeof body.totalStars === "number" ? body.totalStars : 0,
            totalForks: typeof body.totalForks === "number" ? body.totalForks : 0,
            totalRepos: typeof body.totalRepos === "number" ? body.totalRepos : 0,
          },
        })

    return apiResponse({ profile })
  } catch (error) {
    console.error("[OPENSOURCE_PUT] Failed to update profile", error)
    return apiError("Failed to update profile", 500)
  }
}
