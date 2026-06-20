"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  Filter,
  ArrowUpDown,
  Loader2,
} from "lucide-react"
import Link from "next/link"
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
import { formatDate } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Project {
  id: string
  title: string
  slug: string
  status: "draft" | "published" | "in-progress"
  featured: boolean
  category: string
  createdAt: Date
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortKey, setSortKey] = useState("createdAt")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    fetchAdminData<Project>("/api/projects").then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  const { search, setSearch, filtered: searched } = useTableSearch(projects, ["title", "category"])

  const filtered = searched.filter((p) => {
    if (statusFilter === "all") return true
    return p.status === statusFilter
  })

  const sorted = [...filtered].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1
    if (sortKey === "title") return a.title.localeCompare(b.title) * dir
    if (sortKey === "createdAt") return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir
    if (sortKey === "status") return a.status.localeCompare(b.status) * dir
    return 0
  })

  const { page, setPage, totalPages, paginated } = useTablePagination(sorted, 5)

  const handleDelete = () => {
    if (!deleteId) return
    apiAction("DELETE", `/api/projects/${deleteId}`)
    setProjects((prev) => prev.filter((p) => p.id !== deleteId))
    setDeleteId(null)
  }

  const columns: Column<Project>[] = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (p) => (
        <span className="font-medium text-foreground">{p.title}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (p) => (
        <Badge variant={p.status === "published" ? "success" : "warning"}>
          {p.status}
        </Badge>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (p) => (
        p.featured ? (
          <Badge variant="info" dot>Featured</Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (p) => (
        <span className="text-muted-foreground">{formatDate(p.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (p) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/projects/create?id=${p.id}`}>
              <Edit3 className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(p.id)}>
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/projects/${p.slug}`} target="_blank">
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
          <h1 className="text-xl font-semibold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/create">
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <Filter className="h-3.5 w-3.5 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSortKey("createdAt")
            setSortDir(sortDir === "asc" ? "desc" : "asc")
          }}
          className="gap-1"
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          Sort
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={paginated}
        keyField="id"
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyTitle="No projects found"
        emptyDescription="Get started by creating your first project."
        emptyAction={
          <Button asChild>
            <Link href="/admin/projects/create">
              <Plus className="h-4 w-4" />
              Create Project
            </Link>
          </Button>
        }
      />

      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
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
