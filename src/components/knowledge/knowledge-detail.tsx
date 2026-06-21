"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import { ArrowLeft, Clock, Calendar, Tag, BookOpen } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
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

interface KnowledgeDetailProps {
  note: KnowledgeNote
  onBack: () => void
  relatedNotes: KnowledgeNote[]
}

export default function KnowledgeDetail({ note, onBack, relatedNotes }: KnowledgeDetailProps) {
  const [activeHeading, setActiveHeading] = React.useState<string>("")
  const headingsRef = React.useRef<Map<string, IntersectionObserverEntry>>(new Map())

  const tocItems = React.useMemo(() => {
    const lines = note.content.split("\n")
    const headings: { level: number; text: string; id: string }[] = []
    for (const line of lines) {
      const match = line.match(/^(#{2,4})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        const text = match[2].replace(/`/g, "")
        const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").trim()
        headings.push({ level, text, id })
      }
    }
    return headings
  }, [note.content])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          headingsRef.current.set(entry.target.id, entry)
        })
        const visible = Array.from(headingsRef.current.values()).find((e) => e.isIntersecting)
        if (visible) {
          setActiveHeading(visible.target.id)
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    )

    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [tocItems])

  return (
    <Container className="py-8">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Knowledge Base
      </motion.button>

      <div className="grid gap-8 lg:grid-cols-[1fr_250px]">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{note.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {note.readingTime} min read
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(note.lastUpdated)}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {note.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {note.excerpt}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-6 shadow-sm sm:p-8 [&_pre]:rounded-xl [&_pre]:bg-zinc-950 [&_pre]:p-4 [&_code]:text-sm [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
              >
                {note.content}
              </ReactMarkdown>
            </div>
          </div>

          {relatedNotes.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Related Notes
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedNotes.map((related) => (
                  <button
                    key={related.id}
                    onClick={() => onBack()}
                    className="group rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-4 text-left transition-all hover:border-foreground/30 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                      <Badge variant="secondary" className="text-[10px]">
                        {related.category.replace(" Notes", "")}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-foreground group-hover:text-muted-foreground">
                      {related.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {related.excerpt}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-4">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                On this page
              </h4>
              <nav className="space-y-1">
                {tocItems.map(({ level, text, id }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`block text-sm transition-colors hover:text-foreground ${
                      activeHeading === id
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                    style={{ paddingLeft: `${(level - 1) * 12}px` }}
                  >
                    {text}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  )
}
