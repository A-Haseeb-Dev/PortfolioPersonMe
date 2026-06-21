"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, Eye, Search, Loader2, Clock } from "lucide-react"
import Link from "next/link"
import { DataTable, useTableSearch, useTablePagination, type Column } from "@/components/admin/data-table"
import { apiAction } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { formatDate } from "@/lib/utils"

interface KnowledgeNoteItem {
  id: string
  title: string
  slug: string
  excerpt: string | null
  readingTime: number | null
  categoryName: string
  createdAt: string
}

export default function AdminKnowledge() {
  const [notes, setNotes] = useState<KnowledgeNoteItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/knowledge")
      .then((r) => r.json())
      .then((json) => {
        const categories: { name: string; notes?: { id: string; title: string; slug: string; excerpt: string | null; readingTime: number | null; createdAt: string }[] }[] = json.categories || []
        const allNotes = categories.flatMap((cat) =>
          (cat.notes || []).map((note) => ({
            ...note,
            categoryName: cat.name,
          })),
        )
        setNotes(allNotes)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const { search, setSearch, filtered: searched } = useTableSearch(notes, ["title"])

  const { page, setPage, totalPages, paginated } = useTablePagination(searched, 10)

  const handleDelete = () => {
    if (!deleteId) return
    apiAction("DELETE", `/api/knowledge/${deleteId}`)
    setNotes(notes.filter((n) => n.id !== deleteId))
    setDeleteId(null)
  }

  const columns: Column<KnowledgeNoteItem>[] = [
    {
      key: "title",
      label: "Title",
      render: (n) => <span className="font-medium text-foreground">{n.title}</span>,
    },
    {
      key: "categoryName",
      label: "Category",
      render: (n) => <Badge variant="secondary">{n.categoryName.replace(" Notes", "")}</Badge>,
    },
    {
      key: "readingTime",
      label: "Read",
      render: (n) => (
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          {n.readingTime ?? "—"} min
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (n) => <span className="text-muted-foreground">{formatDate(n.createdAt)}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (n) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm">
            <Edit3 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(n.id)}>
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/knowledge/${n.slug}`} target="_blank">
              <Eye className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground">Manage your knowledge notes</p>
        </div>
        <Button asChild>
          <Link href="/admin/knowledge/create">
            <Plus className="h-4 w-4" />
            New Note
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes..." className="pl-9" />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={paginated}
        keyField="id"
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyTitle="No notes found"
        emptyDescription="Create your first knowledge note to get started."
        emptyAction={
          <Button asChild>
            <Link href="/admin/knowledge/create">
              <Plus className="h-4 w-4" />
              Create Note
            </Link>
          </Button>
        }
      />

      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>Are you sure? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
