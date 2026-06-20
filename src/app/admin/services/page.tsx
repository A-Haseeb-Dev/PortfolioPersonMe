"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, ArrowUp, ArrowDown, Loader2 } from "lucide-react"
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

interface Service {
  id: string
  title: string
  description: string
  price: string | null
  category: string
  order: number
  createdAt: Date
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Service | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "" })

  useEffect(() => {
    fetchAdminData<Service>("/api/services").then((data) => {
      setServices(data)
      setLoading(false)
    })
  }, [])

  const { search, setSearch, filtered } = useTableSearch(services, ["title", "description", "category"])
  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)

  const resetForm = () => setForm({ title: "", description: "", price: "", category: "" })

  const handleCreate = () => {
    if (!form.title.trim()) return
    const newService = {
      id: `s${Date.now()}`,
      title: form.title,
      description: form.description,
      price: form.price || null,
      category: form.category || "General",
      order: services.length,
      createdAt: new Date(),
    }
    apiAction("POST", "/api/services", newService)
    setServices([...services, newService as Service])
    resetForm()
    setShowNew(false)
  }

  const handleEdit = () => {
    if (!editing) return
    apiAction("PUT", `/api/services/${editing.id}`, editing)
    setServices(services.map((s) => s.id === editing.id ? editing : s))
    setEditing(null)
  }

  const handleDelete = () => {
    if (!deleteId) return
    apiAction("DELETE", `/api/services/${deleteId}`)
    setServices(services.filter((s) => s.id !== deleteId))
    setDeleteId(null)
  }

  const moveItem = (id: string, dir: "up" | "down") => {
    const idx = services.findIndex((s) => s.id === id)
    if (dir === "up" && idx === 0) return
    if (dir === "down" && idx === services.length - 1) return
    const next = [...services]
    const swap = dir === "up" ? idx - 1 : idx + 1
    ;[next[idx], next[swap]] = [next[swap], next[idx]]
    const reordered = next.map((s, i) => ({ ...s, order: i }))
    apiAction("PUT", "/api/services/reorder", { services: reordered })
    setServices(reordered)
  }

  const columns: Column<Service>[] = [
    {
      key: "order",
      label: "#",
      render: (s) => (
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); moveItem(s.id, "up") }}>
            <ArrowUp className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); moveItem(s.id, "down") }}>
            <ArrowDown className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      key: "title",
      label: "Service",
      render: (s) => (
        <div>
          <p className="font-medium text-foreground">{s.title}</p>
          <p className="text-xs text-muted-foreground">{s.description}</p>
        </div>
      ),
    },
    { key: "category", label: "Category", render: (s) => <Badge variant="secondary">{s.category}</Badge> },
    { key: "price", label: "Price", render: (s) => <span className="font-medium text-foreground">{s.price || "—"}</span> },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (s) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" onClick={() => setEditing(s)}><Edit3 className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(s.id)}><Trash2 className="h-3.5 w-3.5 text-red-500" /></Button>
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
          <h1 className="text-xl font-semibold text-foreground">Services</h1>
          <p className="text-sm text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

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
        emptyTitle="No services yet"
        emptyDescription="Add your first service offering."
      />

      <Dialog open={showNew} onOpenChange={(o) => { if (!o) { setShowNew(false); resetForm() } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Web Development" />
            <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input label="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. $5,000+" />
            <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Development" />
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
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input label="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              <Textarea label="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              <Input label="Price" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: e.target.value || null })} />
              <Input label="Category" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
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
            <DialogTitle>Delete Service</DialogTitle>
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
