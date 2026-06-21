"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DataTable, useTableSearch, useTablePagination, type Column } from "@/components/admin/data-table"
import { fetchAdminData, apiAction } from "@/lib/admin-api"
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

interface Client {
  id: string
  name: string
  industry: string | null
  featured: boolean
  order: number
}

export default function AdminClients() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchAdminData<Client>("/api/clients").then((data) => {
      setClients(data)
      setLoading(false)
    })
  }, [])

  const { search, setSearch, filtered } = useTableSearch(clients, ["name", "industry"])

  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)

  const handleDelete = () => {
    if (!deleteId) return
    apiAction("DELETE", `/api/clients/${deleteId}`)
    setClients(clients.filter((c) => c.id !== deleteId))
    setDeleteId(null)
  }

  const columns: Column<Client>[] = [
    {
      key: "name",
      label: "Name",
      render: (c) => <span className="font-medium text-foreground">{c.name}</span>,
    },
    {
      key: "industry",
      label: "Industry",
      render: (c) => c.industry ? <Badge variant="secondary">{c.industry}</Badge> : <span className="text-muted-foreground">—</span>,
    },
    {
      key: "featured",
      label: "Featured",
      render: (c) => (
        <Badge variant={c.featured ? "success" : "secondary"}>
          {c.featured ? "Featured" : "Standard"}
        </Badge>
      ),
    },
    {
      key: "order",
      label: "Order",
      render: (c) => <span className="text-muted-foreground">{c.order}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (c) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/clients?id=${c.id}`)}>
            <Edit3 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(c.id)}>
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
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
          <h1 className="text-xl font-semibold text-foreground">Clients</h1>
          <p className="text-sm text-muted-foreground">Manage your client portfolio</p>
        </div>
        <Button asChild>
          <Link href="/admin/clients/create">
            <Plus className="h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..." />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={paginated}
        keyField="id"
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyTitle="No clients found"
        emptyDescription="Add your first client to get started."
        emptyAction={
          <Button asChild>
            <Link href="/admin/clients/create">
              <Plus className="h-4 w-4" />
              Add Client
            </Link>
          </Button>
        }
      />

      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Client</DialogTitle>
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
