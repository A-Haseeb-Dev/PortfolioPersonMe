import { db } from "@/lib/db"
import { blogSchema } from "@/lib/validations"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import { slugify } from "@/lib/utils"
import { getCollection, addToCollection } from "@/lib/data-store"
import { getAdminBlogPosts } from "@/lib/admin-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10")))
    const published = searchParams.get("published")
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")

    const where: Record<string, unknown> = { deletedAt: null }
    if (published === "true") where.published = true
    if (published === "false") where.published = false
    if (featured === "true") where.featured = true
    if (category) where.categoryId = category
    if (tag) {
      where.tags = { some: { tag: { slug: tag } } }
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
        { excerpt: { contains: search } },
      ]
    }

    const [posts, total] = await Promise.all([
      db.blog.findMany({
        where: where as any,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          tags: {
            include: { tag: true },
          },
          category: true,
          author: {
            select: { id: true, name: true, image: true },
          },
        },
      }),
      db.blog.count({ where: where as any }),
    ])

    return apiResponse({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (prismaError) {
    console.warn("[BLOG_GET] DB unavailable, using data store", prismaError)
    const data = getCollection("blog", getAdminBlogPosts())
    return apiResponse({ data, total: data.length, fallback: true })
  }
}

export async function POST(request: Request) {
  let body: any
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN", "EDITOR"])

    body = await request.json()
    const parsed = blogSchema.safeParse(body)
    if (!parsed.success) {
      return apiError("Validation failed", 422)
    }

    const session = await requireRole(["ADMIN", "SUPER_ADMIN", "EDITOR"])
    const slug = parsed.data.slug || slugify(parsed.data.title)

    const existing = await db.blog.findUnique({ where: { slug } })
    if (existing) {
      return apiError("A post with this slug already exists", 409)
    }

    let categoryId = parsed.data.category
    const existingCategory = await db.blogCategory.findUnique({
      where: { slug: slugify(parsed.data.category) },
    })
    if (!existingCategory) {
      const cat = await db.blogCategory.create({
        data: { name: parsed.data.category, slug: slugify(parsed.data.category) },
      })
      categoryId = cat.id
    } else {
      categoryId = existingCategory.id
    }

    const post = await db.blog.create({
      data: {
        title: parsed.data.title,
        slug,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        coverImage: parsed.data.coverImage || null,
        published: parsed.data.published,
        featured: parsed.data.featured,
        readingTime: parsed.data.readingTime,
        categoryId,
        authorId: session.user.id,
      },
    })

    if (parsed.data.tags?.length) {
      for (const tagName of parsed.data.tags) {
        const tagSlug = slugify(tagName)
        let tag = await db.blogTag.findUnique({ where: { slug: tagSlug } })
        if (!tag) {
          tag = await db.blogTag.create({ data: { name: tagName, slug: tagSlug } })
        }
        await db.blogTags.create({ data: { blogId: post.id, tagId: tag.id } }).catch(() => {})
      }
    }

    return apiResponse({ post }, 201)
  } catch (prismaError) {
    console.warn("[BLOG_POST] DB unavailable, using data store", prismaError)
    const newItem = { id: `store_${Date.now()}`, ...body, createdAt: new Date() }
    const data = addToCollection("blog", newItem, getAdminBlogPosts())
    return apiResponse({ data, item: newItem }, 201)
  }
}
