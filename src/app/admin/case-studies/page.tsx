"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import { DataTable, useTableSearch, useTablePagination, type Column } from "@/components/admin/data-table"
import { getAdminCaseStudies } from "@/lib/admin-data"
import { fetchAdminData, apiAction } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { formatDate } from "@/lib/utils"

interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  featured: boolean
  status: "draft" | "published"
  completedDate: Date | null
  createdAt: Date
}

export default function AdminCaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchAdminData<CaseStudy>("/api/case-studies", getAdminCaseStudies()).then((data) => {
      setStudies(data)
      setLoading(false)
    })
  }, [])

  const { search, setSearch, filtered } = useTableSearch(studies, ["title", "client"])
  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)

  const handleDelete = () => {
    if (!deleteId) return
    apiAction("DELETE", `/api/case-studies/${deleteId}`)
    setStudies(studies.filter((s) => s.id !== deleteId))
    setDeleteId(null)
  }

  const columns: Column<CaseStudy>[] = [
    { key: "title", label: "Title", render: (s) => <span className="font-medium text-zinc-900 text-foreground">{s.title}</span> },
    { key: "client", label: "Client", render: (s) => <Badge variant="secondary">{s.client}</Badge> },
    {
      key: "status",
      label: "Status",
      render: (s) => (
        <Badge variant={s.status === "published" ? "success" : "warning"}>{s.status}</Badge>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (s) => s.featured ? <Badge variant="info" dot>Featured</Badge> : <span className="text-zinc-400">—</span>,
    },
    {
      key: "completedDate",
      label: "Completed",
      render: (s) => s.completedDate ? <span className="text-zinc-500">{formatDate(s.completedDate)}</span> : <span className="text-zinc-400">—</span>,
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (s) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm"><Edit3 className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(s.id)}><Trash2 className="h-3.5 w-3.5 text-red-500" /></Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/case-studies/${s.slug}`} target="_blank"><Eye className="h-3.5 w-3.5" /></Link>
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
          <h1 className="text-xl font-semibold text-zinc-900 text-foreground">Case Studies</h1>
          <p className="text-sm text-zinc-500 text-muted-foreground">Manage portfolio case studies</p>
        </div>
        <Button asChild>
          <Link href="/admin/case-studies/create">
            <Plus className="h-4 w-4" />
            New Case Study
          </Link>
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
        emptyTitle="No case studies"
        emptyDescription="Create your first case study."
      />

      <Dialog open={!!deleteId} onOpenChange={(o) => { if (!o) setDeleteId(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Case Study</DialogTitle>
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
