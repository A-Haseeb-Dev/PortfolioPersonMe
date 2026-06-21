"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import { useData } from "@/hooks/use-data"
import KnowledgeDetail from "@/components/knowledge/knowledge-detail"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"

interface ApiTag {
  tag: { name: string }
}

interface ApiNote {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  readingTime: number | null
  categoryId: string
  createdAt: string
  updatedAt: string
  tags: ApiTag[]
}

interface KnowledgeNote {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  categoryId: string
  tags: string[]
  readingTime: number
  lastUpdated: Date
  createdAt: Date
}

function transformNotes(data: Record<string, unknown>): KnowledgeNote[] {
  const cats = ((data.categories as { name: string; notes: ApiNote[] }[]) || [])
  return cats.flatMap((cat) =>
    (cat.notes || []).map((note) => ({
      id: note.id,
      title: note.title,
      slug: note.slug,
      excerpt: note.excerpt || "",
      content: note.content,
      category: cat.name,
      categoryId: note.categoryId,
      tags: note.tags.map((t) => t.tag.name),
      readingTime: note.readingTime ?? 0,
      lastUpdated: new Date(note.updatedAt),
      createdAt: new Date(note.createdAt),
    })),
  )
}

export default function KnowledgeNotePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const allNotes = useData<KnowledgeNote>("/api/knowledge", [], transformNotes)

  const note = React.useMemo(
    () => allNotes.find((n) => n.slug === slug),
    [allNotes, slug],
  )

  const relatedNotes = React.useMemo(
    () => {
      if (!note) return []
      return allNotes
        .filter((n) => n.id !== note.id)
        .map((n) => ({ item: n, score: n.tags.filter((t) => note.tags.includes(t)).length }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((s) => s.item)
    },
    [allNotes, note],
  )

  if (!note) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <EmptyState
          icon={<BookOpen className="h-6 w-6" />}
          title="Note not found"
          description="The knowledge note you are looking for does not exist."
          action={
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Knowledge Base
            </Link>
          }
        />
      </Container>
    )
  }

  return <KnowledgeDetail note={note} onBack={() => router.push("/knowledge")} relatedNotes={relatedNotes} />
}
