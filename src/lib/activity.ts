import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function logActivity(
  action: "create" | "update" | "delete",
  entityType: string,
  entityId: string,
  entity: string,
) {
  try {
    const session = await auth()
    if (!session?.user?.id) return

    await db.activity.create({
      data: {
        action,
        entity,
        entityType,
        entityId,
        userId: session.user.id,
      },
    })
  } catch (error) {
    console.error("[logActivity] Failed:", error)
  }
}
