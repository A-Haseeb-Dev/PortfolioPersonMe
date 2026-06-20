"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import KnowledgeDetail from "@/components/knowledge/knowledge-detail"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"
import { getNoteBySlug } from "@/data/knowledge"

export default function KnowledgeNotePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const note = getNoteBySlug(slug)

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

  return <KnowledgeDetail note={note} onBack={() => router.push("/knowledge")} />
}
