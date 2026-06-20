"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, ExternalLink } from "lucide-react"
import { DataTable, useTableSearch, useTablePagination, type Column } from "@/components/admin/data-table"
import { getAdminResources } from "@/lib/admin-data"
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

interface Resource {
  id: string
  title: string
  description: string
  url: string
  type: "portfolio" | "certificate" | "resume" | "cheatsheet" | "guide"
  category: string
  free: boolean
  createdAt: Date
}

const resourceTypes: Resource["type"][] = ["portfolio", "certificate", "resume", "cheatsheet", "guide"]

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Resource | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ title: "", description: "", url: "", type: "portfolio" as Resource["type"], category: "", free: true })

  useEffect(() => {
    fetchAdminData<Resource>("/api/resources", getAdminResources()).then((data) => {
      setResources(data)
      setLoading(false)
    })
  }, [])

  const { search, setSearch, filtered } = useTableSearch(resources, ["title", "description", "category", "type"])
  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)

  const resetForm = () => setForm({ title: "", description: "", url: "", type: "portfolio", category: "", free: true })

  const handleCreate = async () => {
    if (!form.title.trim() || !form.url.trim()) return
    const item: Resource = { id: `r${Date.now()}`, ...form, createdAt: new Date() }
    setResources([...resources, item])
    resetForm()
    setShowNew(false)
    await apiAction("POST", "/api/resources", item)
  }

  const handleEdit = async () => {
    if (!editing) return
    setResources(resources.map((r) => r.id === editing.id ? editing : r))
    setEditing(null)
    await apiAction("PUT", `/api/resources/${editing.id}`, editing)
  }

  const handleDelete = async () => {
    if (deleteId) {
      const id = deleteId
      setResources(resources.filter((r) => r.id !== id))
      setDeleteId(null)
      await apiAction("DELETE", `/api/resources/${id}`)
    }
  }

  const columns: Column<Resource>[] = [
    { key: "title", label: "Title", render: (r) => <span className="font-medium text-foreground">{r.title}</span> },
    { key: "type", label: "Type", render: (r) => <Badge variant="secondary">{r.type}</Badge> },
    { key: "category", label: "Category", render: (r) => <Badge variant="outline">{r.category || "—"}</Badge> },
    {
      key: "free",
      label: "Free",
      render: (r) => r.free ? <Badge variant="success" dot>Free</Badge> : <Badge variant="warning">Paid</Badge>,
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (r) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" asChild>
            <a href={r.url} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-3.5 w-3.5" /></a>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setEditing(r)}><Edit3 className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(r.id)}><Trash2 className="h-3.5 w-3.5 text-red-500" /></Button>
        </div>
      ),
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Resources</h1>
          <p className="text-sm text-muted-foreground">Manage learning resources and links</p>
        </div>
        <Button onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" />
          Add Resource
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
          emptyTitle="No resources"
          emptyDescription="Add your first resource."
        />
      )}

      <Dialog open={showNew} onOpenChange={(o) => { if (!o) { setShowNew(false); resetForm() } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Resource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input label="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as Resource["type"] })}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.free} onChange={(e) => setForm({ ...form, free: e.target.checked })} className="h-4 w-4 rounded border-border" />
              <span className="text-sm text-foreground">Free resource</span>
            </label>
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
              <DialogTitle>Edit Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input label="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              <Textarea label="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              <Input label="URL" value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} />
              <Select value={editing.type} onValueChange={(v) => setEditing({ ...editing, type: v as Resource["type"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {resourceTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input label="Category" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.free} onChange={(e) => setEditing({ ...editing, free: e.target.checked })} className="h-4 w-4 rounded border-border" />
                <span className="text-sm text-foreground">Free</span>
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
            <DialogTitle>Delete Resource</DialogTitle>
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
