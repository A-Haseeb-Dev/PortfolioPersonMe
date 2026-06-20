"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, Lightbulb, Loader2 } from "lucide-react"
import { DataTable, useTableSearch, useTablePagination, type Column } from "@/components/admin/data-table"
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

interface StartupIdea {
  id: string
  title: string
  description: string
  problem: string
  solution: string
  status: "idea" | "validating" | "building" | "launched" | "failed"
  featured: boolean
  createdAt: Date
}

const statusColors = {
  idea: "secondary" as const,
  validating: "warning" as const,
  building: "info" as const,
  launched: "success" as const,
  failed: "danger" as const,
}

export default function AdminStartupIdeas() {
  const [ideas, setIdeas] = useState<StartupIdea[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editing, setEditing] = useState<StartupIdea | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ title: "", description: "", problem: "", solution: "", status: "idea" as StartupIdea["status"] })

  useEffect(() => {
    fetchAdminData<StartupIdea>("/api/startup-ideas").then(setIdeas).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const { search, setSearch, filtered } = useTableSearch(ideas, ["title", "description", "problem", "solution"])
  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)

  const resetForm = () => setForm({ title: "", description: "", problem: "", solution: "", status: "idea" })

  const handleCreate = () => {
    if (!form.title.trim()) return
    const idea = { id: `si${Date.now()}`, ...form, featured: false, createdAt: new Date() }
    setIdeas([...ideas, idea])
    apiAction("POST", "/api/startup-ideas", idea)
    resetForm()
    setShowNew(false)
  }

  const handleEdit = () => {
    if (!editing) return
    setIdeas(ideas.map((i) => i.id === editing.id ? editing : i))
    apiAction("PUT", `/api/startup-ideas/${editing.id}`, editing)
    setEditing(null)
  }

  const handleDelete = () => {
    if (deleteId) {
      setIdeas(ideas.filter((i) => i.id !== deleteId))
      apiAction("DELETE", `/api/startup-ideas/${deleteId}`)
      setDeleteId(null)
    }
  }

  const columns: Column<StartupIdea>[] = [
    {
      key: "title",
      label: "Idea",
      render: (i) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Lightbulb size={14} />
          </div>
          <div>
            <p className="font-medium text-foreground">{i.title}</p>
            <p className="text-xs text-muted-foreground">{i.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (i) => <Badge variant={statusColors[i.status]} dot>{i.status.replace("-", " ")}</Badge>,
    },
    {
      key: "featured",
      label: "Featured",
      render: (i) => i.featured ? <Badge variant="info" dot>Featured</Badge> : <span className="text-muted-foreground">—</span>,
    },
    { key: "createdAt", label: "Created", render: (i) => <span className="text-muted-foreground">{formatDate(i.createdAt)}</span> },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (i) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" onClick={() => setEditing(i)}><Edit3 className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(i.id)}><Trash2 className="h-3.5 w-3.5 text-red-500" /></Button>
        </div>
      ),
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Startup Ideas</h1>
          <p className="text-sm text-muted-foreground">Track and manage startup ideas</p>
        </div>
        <Button onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" />
          New Idea
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
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
          emptyTitle="No startup ideas"
          emptyDescription="Add your first startup idea."
        />
      )}

      <Dialog open={showNew} onOpenChange={(o) => { if (!o) { setShowNew(false); resetForm() } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Startup Idea</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Textarea label="Problem" value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} />
            <Textarea label="Solution" value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} />
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as StartupIdea["status"] })}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idea">Idea</SelectItem>
                <SelectItem value="validating">Validating</SelectItem>
                <SelectItem value="building">Building</SelectItem>
                <SelectItem value="launched">Launched</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
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
              <DialogTitle>Edit Idea</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input label="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              <Textarea label="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              <Textarea label="Problem" value={editing.problem} onChange={(e) => setEditing({ ...editing, problem: e.target.value })} />
              <Textarea label="Solution" value={editing.solution} onChange={(e) => setEditing({ ...editing, solution: e.target.value })} />
              <Select value={editing.status} onValueChange={(v) => setEditing({ ...editing, status: v as StartupIdea["status"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="validating">Validating</SelectItem>
                  <SelectItem value="building">Building</SelectItem>
                  <SelectItem value="launched">Launched</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="h-4 w-4 rounded border-border" />
                <span className="text-sm text-secondary-foreground">Featured</span>
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
            <DialogTitle>Delete Idea</DialogTitle>
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
