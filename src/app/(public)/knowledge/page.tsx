"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useData } from "@/hooks/use-data"
import KnowledgeHeader from "@/components/knowledge/knowledge-header"
import KnowledgeCategories from "@/components/knowledge/knowledge-categories"
import KnowledgeCard from "@/components/knowledge/knowledge-card"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"
import { SearchX } from "lucide-react"

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

interface KnowledgeCategory {
  id: string
  name: string
  description: string
  icon: string
  noteCount: number
  color: string
}

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

interface ApiCategory {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  noteCount: number
  notes: ApiNote[]
}

function transformNotes(data: Record<string, unknown>): KnowledgeNote[] {
  const cats = (data.categories as ApiCategory[]) || []
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

function extractCategories(raw: ApiCategory[]): KnowledgeCategory[] {
  return raw.map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description || "",
    icon: cat.icon || "",
    noteCount: cat.noteCount,
    color: cat.color || "",
  }))
}

function searchNotes(notes: KnowledgeNote[], query: string): KnowledgeNote[] {
  const q = query.toLowerCase()
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q)) ||
      n.category.toLowerCase().includes(q),
  )
}

export default function KnowledgePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState("all")
  const [viewMode, setViewMode] = React.useState<"categories" | "notes">("categories")

  const rawNotes = useData<KnowledgeNote>("/api/knowledge", [], transformNotes)
  const [rawCategories, setRawCategories] = React.useState<ApiCategory[]>([])

  React.useEffect(() => {
    fetch("/api/knowledge")
      .then((r) => r.json())
      .then((json) => {
        const cats = (json.categories as ApiCategory[]) || []
        setRawCategories(cats)
      })
      .catch(() => {})
  }, [])

  const notes = React.useMemo(() => {
    let result = rawNotes
    if (activeCategory !== "all") {
      result = rawNotes.filter((n) => n.categoryId === activeCategory)
    }
    if (searchQuery) {
      result = searchNotes(result, searchQuery)
    }
    return result
  }, [rawNotes, searchQuery, activeCategory])

  const categories = React.useMemo(() => extractCategories(rawCategories), [rawCategories])

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id)
    if (id !== "all") {
      setViewMode("notes")
    } else {
      setViewMode("categories")
    }
  }

  const handleNoteSelect = (slug: string) => {
    router.push(`/knowledge/${slug}`)
  }

  const searchActive = searchQuery.length > 0
  const showCategories = viewMode === "categories" && !searchActive && notes.length === 0

  return (
    <div className="min-h-screen bg-background">
      <KnowledgeHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories.map((c) => ({ id: c.id, name: c.name.replace(" Notes", ""), color: c.color }))}
      />

      <Container className="py-10">
        {searchActive && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-sm text-muted-foreground"
          >
            Found {notes.length} result{notes.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
          </motion.p>
        )}

        {notes.length === 0 && !showCategories ? (
          <EmptyState
            icon={<SearchX className="h-6 w-6" />}
            title="No notes found"
            description="Try adjusting your search or filter criteria."
          />
        ) : showCategories ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <KnowledgeCategories
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={(id) => {
                setActiveCategory(id)
                setViewMode(id === "all" ? "categories" : "notes")
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {activeCategory !== "all" && (
              <div className="mb-6">
                <button
                  onClick={() => {
                    setActiveCategory("all")
                    setViewMode("categories")
                  }}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  ← All categories
                </button>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note, index) => (
                <KnowledgeCard
                  key={note.id}
                  note={note}
                  index={index}
                  onSelect={handleNoteSelect}
                />
              ))}
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  )
}
