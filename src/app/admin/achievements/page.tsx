"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, Trophy, Award, BookOpen, Medal, Sparkles } from "lucide-react"
import { DataTable, useTableSearch, useTablePagination, type Column } from "@/components/admin/data-table"
import { getAdminAchievements } from "@/lib/admin-data"
import { fetchAdminData, apiAction } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/utils"

interface Achievement {
  id: string
  title: string
  description: string
  date: Date
  category: "award" | "certification" | "milestone" | "project"
  issuer: string
  featured: boolean
  createdAt: Date
}

const categoryIcons: Record<string, typeof BookOpen> = {
  certification: BookOpen,
  award: Trophy,
  milestone: Sparkles,
  project: Award,
}

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Achievement | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ title: "", description: "", date: "", category: "certification" as Achievement["category"], issuer: "" })

  useEffect(() => {
    fetchAdminData<Achievement>("/api/achievements", getAdminAchievements()).then((data) => {
      setAchievements(data)
      setLoading(false)
    })
  }, [])

  const { search, setSearch, filtered } = useTableSearch(achievements, ["title", "description", "issuer"])
  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)

  const resetForm = () => setForm({ title: "", description: "", date: "", category: "certification", issuer: "" })

  const handleCreate = async () => {
    if (!form.title.trim() || !form.date) return
    const item: Achievement = { id: `a${Date.now()}`, ...form, date: new Date(form.date), featured: false, createdAt: new Date() }
    setAchievements([...achievements, item])
    resetForm()
    setShowNew(false)
    await apiAction("POST", "/api/achievements", item)
  }

  const handleEdit = async () => {
    if (!editing) return
    setAchievements(achievements.map((a) => a.id === editing.id ? editing : a))
    setEditing(null)
    await apiAction("PUT", `/api/achievements/${editing.id}`, editing)
  }

  const handleDelete = async () => {
    if (deleteId) {
      const id = deleteId
      setAchievements(achievements.filter((a) => a.id !== id))
      setDeleteId(null)
      await apiAction("DELETE", `/api/achievements/${id}`)
    }
  }

  const columns: Column<Achievement>[] = [
    {
      key: "title",
      label: "Achievement",
      render: (a) => {
        const Icon = categoryIcons[a.category]
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-foreground">
              <Icon size={14} />
            </div>
            <div>
              <p className="font-medium text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.issuer}</p>
            </div>
          </div>
        )
      },
    },
    { key: "category", label: "Category", render: (a) => <Badge variant="secondary">{a.category}</Badge> },
    {
      key: "featured",
      label: "Featured",
      render: (a) => a.featured ? <Badge variant="info" dot>Featured</Badge> : <span className="text-muted-foreground">—</span>,
    },
    { key: "date", label: "Date", render: (a) => <span className="text-muted-foreground">{formatDate(a.date)}</span> },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (a) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" onClick={() => setEditing(a)}><Edit3 className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(a.id)}><Trash2 className="h-3.5 w-3.5 text-red-500" /></Button>
        </div>
      ),
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Achievements</h1>
          <p className="text-sm text-muted-foreground">Manage certifications, awards, and achievements</p>
        </div>
        <Button onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-foreground" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={paginated}
          keyField="id"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          searchable
          searchValue={search}
          onSearch={setSearch}
          emptyTitle="No achievements yet"
          emptyDescription="Add your first achievement."
        />
      )}

      <Dialog open={showNew} onOpenChange={(o) => { if (!o) { setShowNew(false); resetForm() } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Achievement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input label="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} />
            <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Achievement["category"] })}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="certification">Certification</SelectItem>
                <SelectItem value="award">Award</SelectItem>
                <SelectItem value="publication">Publication</SelectItem>
                <SelectItem value="competition">Competition</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setShowNew(false); resetForm() }}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {editing && (
        <Dialog open onOpenChange={(o) => { if (!o) setEditing(null) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Achievement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input label="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              <Textarea label="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              <Input label="Issuer" value={editing.issuer} onChange={(e) => setEditing({ ...editing, issuer: e.target.value })} />
              <Input label="Date" type="date" value={editing.date.toISOString().split("T")[0]} onChange={(e) => setEditing({ ...editing, date: new Date(e.target.value) })} />
              <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v as Achievement["category"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="certification">Certification</SelectItem>
                  <SelectItem value="award">Award</SelectItem>
                  <SelectItem value="publication">Publication</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="h-4 w-4 rounded border-border" />
                <span className="text-sm text-foreground">Featured</span>
              </label>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={handleEdit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={!!deleteId} onOpenChange={(o) => { if (!o) setDeleteId(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Achievement</DialogTitle>
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
