"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import KnowledgeHeader from "@/components/knowledge/knowledge-header"
import KnowledgeCategories from "@/components/knowledge/knowledge-categories"
import KnowledgeCard from "@/components/knowledge/knowledge-card"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"
import { SearchX } from "lucide-react"
import { knowledgeCategories, knowledgeNotes, searchNotes } from "@/data/knowledge"

export default function KnowledgePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState("all")
  const [viewMode, setViewMode] = React.useState<"categories" | "notes">("categories")

  const filteredNotes = React.useMemo(() => {
    let notes = knowledgeNotes
    if (activeCategory !== "all") {
      notes = notes.filter((n) => n.categoryId === activeCategory)
    }
    if (searchQuery) {
      notes = searchNotes(searchQuery)
      if (activeCategory !== "all") {
        notes = notes.filter((n) => n.categoryId === activeCategory)
      }
    }
    return notes
  }, [searchQuery, activeCategory])

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
  const showCategories = viewMode === "categories" && !searchActive

  return (
    <div className="min-h-screen bg-background">
      <KnowledgeHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        categories={knowledgeCategories.map((c) => ({ id: c.id, name: c.name.replace(" Notes", ""), color: c.color }))}
      />

      <Container className="py-10">
        {searchActive && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-sm text-muted-foreground"
          >
            Found {filteredNotes.length} result{filteredNotes.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
          </motion.p>
        )}

        {filteredNotes.length === 0 ? (
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
              categories={knowledgeCategories}
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
              {filteredNotes.map((note, index) => (
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
