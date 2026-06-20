"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, Star, Loader2 } from "lucide-react"
import { DataTable, useTableSearch, useTablePagination, type Column } from "@/components/admin/data-table"
import { fetchAdminData, apiAction } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "@/components/ui/glass-card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { formatDate, cn } from "@/lib/utils"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  featured: boolean
  createdAt: Date
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ name: "", role: "", company: "", content: "", rating: 5 })

  useEffect(() => {
    fetchAdminData<Testimonial>("/api/testimonials").then(setTestimonials).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const { search, setSearch, filtered } = useTableSearch(testimonials, ["name", "company", "content"])
  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)

  const resetForm = () => setForm({ name: "", role: "", company: "", content: "", rating: 5 })

  const handleCreate = () => {
    if (!form.name.trim() || !form.content.trim()) return
    const testimonial = {
      id: `t${Date.now()}`,
      ...form,
      featured: false,
      createdAt: new Date(),
    }
    setTestimonials([...testimonials, testimonial])
    apiAction("POST", "/api/testimonials", testimonial)
    resetForm()
    setShowNew(false)
  }

  const handleEdit = () => {
    if (!editing) return
    setTestimonials(testimonials.map((t) => t.id === editing.id ? editing : t))
    apiAction("PUT", `/api/testimonials/${editing.id}`, editing)
    setEditing(null)
  }

  const handleDelete = () => {
    if (deleteId) {
      setTestimonials(testimonials.filter((t) => t.id !== deleteId))
      apiAction("DELETE", `/api/testimonials/${deleteId}`)
      setDeleteId(null)
    }
  }

  const columns: Column<Testimonial>[] = [
    {
      key: "name",
      label: "Client",
      render: (t) => (
        <div>
          <p className="font-medium text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
        </div>
      ),
    },
    {
      key: "content",
      label: "Content",
      render: (t) => (
        <p className="max-w-xs truncate text-muted-foreground">{t.content}</p>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (t) => (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("h-3.5 w-3.5", i < t.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
          ))}
        </div>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (t) => t.featured ? <Badge variant="info" dot>Featured</Badge> : <span className="text-muted-foreground">—</span>,
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (t) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" onClick={() => setEditing(t)}><Edit3 className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(t.id)}><Trash2 className="h-3.5 w-3.5 text-red-500" /></Button>
        </div>
      ),
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Testimonials</h1>
          <p className="text-sm text-muted-foreground">Manage client testimonials</p>
        </div>
        <Button onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" />
          Add Testimonial
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
          emptyTitle="No testimonials"
          emptyDescription="Add your first client testimonial."
        />
      )}

      <Dialog open={showNew} onOpenChange={(o) => { if (!o) { setShowNew(false); resetForm() } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Testimonial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <Textarea label="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} />
            <div>
              <p className="text-sm font-medium text-secondary-foreground mb-2">Rating</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => setForm({ ...form, rating: r })}>
                    <Star className={cn("h-6 w-6 transition-colors", r <= form.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
                  </button>
                ))}
              </div>
            </div>
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
              <DialogTitle>Edit Testimonial</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input label="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              <Input label="Role" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} />
              <Input label="Company" value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} />
              <Textarea label="Content" value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={3} />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="h-4 w-4 rounded border-border" />
                  <span className="text-sm text-secondary-foreground">Featured</span>
                </label>
              </div>
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
            <DialogTitle>Delete Testimonial</DialogTitle>
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
