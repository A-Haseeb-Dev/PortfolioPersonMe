import { db } from "@/lib/db"
import { blogSchema } from "@/lib/validations"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { logActivity } from "@/lib/activity"

const postIncludes = {
  tags: { include: { tag: true } },
  category: true,
  author: { select: { id: true, name: true, image: true } },
} as const

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const post = await db.blog.findFirst({
      where: { id, deletedAt: null },
      include: postIncludes,
    })

    if (!post) {
      return apiError("Post not found", 404)
    }

    return apiResponse({ post })
  } catch (error) {
    console.error("[BLOG_GET] Failed to fetch blog post", error)
    return apiError("Failed to fetch blog post", 500)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN", "EDITOR"])
  const { id } = await params
  const body = await request.json()

  try {
    const existing = await db.blog.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Post not found", 404)
    }

    const parsed = blogSchema.partial().safeParse(body)
    if (!parsed.success) {
      return apiError("Validation failed", 422)
    }

    const data: Record<string, unknown> = {}
    if (parsed.data.title !== undefined) {
      data.title = parsed.data.title
      data.slug = parsed.data.slug || slugify(parsed.data.title)
    }
    if (parsed.data.excerpt !== undefined) data.excerpt = parsed.data.excerpt
    if (parsed.data.content !== undefined) data.content = parsed.data.content
    if (parsed.data.coverImage !== undefined) data.coverImage = parsed.data.coverImage || null
    if (parsed.data.published !== undefined) data.published = parsed.data.published
    if (parsed.data.featured !== undefined) data.featured = parsed.data.featured
    if (parsed.data.readingTime !== undefined) data.readingTime = parsed.data.readingTime
    if (parsed.data.category !== undefined) {
      const catSlug = slugify(parsed.data.category)
      let category = await db.blogCategory.findUnique({ where: { slug: catSlug } })
      if (!category) {
        category = await db.blogCategory.create({
          data: { name: parsed.data.category, slug: catSlug },
        })
      }
      data.categoryId = category.id
    }

    const post = await db.blog.update({
      where: { id },
      data,
      include: postIncludes,
    })

    if (parsed.data.tags) {
      await db.blogTags.deleteMany({ where: { blogId: id } })
      for (const tagName of parsed.data.tags) {
        const tagSlug = slugify(tagName)
        let tag = await db.blogTag.findUnique({ where: { slug: tagSlug } })
        if (!tag) {
          tag = await db.blogTag.create({ data: { name: tagName, slug: tagSlug } })
        }
        await db.blogTags.create({ data: { blogId: id, tagId: tag.id } }).catch(() => {})
      }
    }

    logActivity("update", "blog", id, existing.title)

    return apiResponse({ post })
  } catch (error) {
    console.error("[BLOG_PUT] Failed to update blog post", error)
    return apiError("Failed to update blog post", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireRole(["ADMIN", "SUPER_ADMIN"])
  const { id } = await params

  try {
    const existing = await db.blog.findFirst({
      where: { id, deletedAt: null },
    })
    if (!existing) {
      return apiError("Post not found", 404)
    }

    await db.blog.update({
      where: { id },
      data: { deletedAt: new Date() },
    })

    logActivity("delete", "blog", id, existing.title)

    return apiResponse({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("[BLOG_DELETE] Failed to delete blog post", error)
    return apiError("Failed to delete blog post", 500)
  }
}
