"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { DataTable, useTableSearch, useTablePagination, type Column } from "@/components/admin/data-table"
import { getAdminLearning } from "@/lib/admin-data"
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

interface LearningItem {
  id: string
  title: string
  description: string
  category: string
  status: "not-started" | "in-progress" | "completed" | "on-hold"
  startedAt: Date | null
  order: number
  createdAt: Date
}

const statusColors = {
  "not-started": "secondary" as const,
  "in-progress": "info" as const,
  completed: "success" as const,
  "on-hold": "warning" as const,
}

export default function AdminLearning() {
  const [learning, setLearning] = useState<LearningItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editing, setEditing] = useState<LearningItem | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ title: "", description: "", category: "", status: "not-started" as LearningItem["status"] })

  useEffect(() => {
    fetchAdminData<LearningItem>("/api/learning", getAdminLearning()).then((data) => {
      setLearning(data)
      setLoading(false)
    })
  }, [])

  const { search, setSearch, filtered } = useTableSearch(learning, ["title", "description", "category"])
  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)

  const resetForm = () => setForm({ title: "", description: "", category: "", status: "not-started" })

  const handleCreate = async () => {
    if (!form.title.trim()) return
    const item: LearningItem = { id: `l${Date.now()}`, ...form, startedAt: null, order: learning.length, createdAt: new Date() }
    setLearning([...learning, item])
    resetForm()
    setShowNew(false)
    await apiAction("POST", "/api/learning", item)
  }

  const handleEdit = async () => {
    if (!editing) return
    setLearning(learning.map((l) => l.id === editing.id ? editing : l))
    setEditing(null)
    await apiAction("PUT", `/api/learning/${editing.id}`, editing)
  }

  const handleDelete = async () => {
    if (deleteId) {
      const id = deleteId
      setLearning(learning.filter((l) => l.id !== id))
      setDeleteId(null)
      await apiAction("DELETE", `/api/learning/${id}`)
    }
  }

  const columns: Column<LearningItem>[] = [
    { key: "title", label: "Topic", render: (l) => <span className="font-medium text-foreground">{l.title}</span> },
    { key: "category", label: "Category", render: (l) => <Badge variant="secondary">{l.category}</Badge> },
    {
      key: "status",
      label: "Status",
      render: (l) => <Badge variant={statusColors[l.status]} dot>{l.status.replace("-", " ")}</Badge>,
    },
    {
      key: "startedAt",
      label: "Started",
      render: (l) => l.startedAt ? <span className="text-muted-foreground">{formatDate(l.startedAt)}</span> : <span className="text-muted-foreground">—</span>,
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (l) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" onClick={() => setEditing(l)}><Edit3 className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(l.id)}><Trash2 className="h-3.5 w-3.5 text-red-500" /></Button>
        </div>
      ),
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Learning Journey</h1>
          <p className="text-sm text-muted-foreground">Track your learning progress</p>
        </div>
        <Button onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" />
          Add Topic
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
          emptyTitle="No learning topics"
          emptyDescription="Add your first learning topic."
        />
      )}

      <Dialog open={showNew} onOpenChange={(o) => { if (!o) { setShowNew(false); resetForm() } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Learning Topic</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as LearningItem["status"] })}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
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
              <DialogTitle>Edit Topic</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input label="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              <Textarea label="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              <Input label="Category" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
              <Select value={editing.status} onValueChange={(v) => setEditing({ ...editing, status: v as LearningItem["status"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
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
            <DialogTitle>Delete Topic</DialogTitle>
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
