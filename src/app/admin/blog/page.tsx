"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, Eye, Search, Filter, Loader2 } from "lucide-react"
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

interface Post {
  id: string
  title: string
  slug: string
  category: string | { name: string }
  status: "draft" | "published"
  createdAt: Date
}

function getCategoryName(cat: string | { name: string }): string {
  return typeof cat === "string" ? cat : cat.name
}

const categories = ["All", "JavaScript", "React", "Next.js", "AI", "Flutter", "Development", "Career", "Tutorial"]

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    fetchAdminData<Post>("/api/blog").then((data) => {
      setPosts(data)
      setLoading(false)
    })
  }, [])

  const { search, setSearch, filtered: searched } = useTableSearch(posts, ["title"])

  const filtered = searched.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false
    if (categoryFilter !== "all" && getCategoryName(p.category) !== categoryFilter) return false
    return true
  })

  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)

  const handleDelete = () => {
    if (!deleteId) return
    apiAction("DELETE", `/api/blog/${deleteId}`)
    setPosts(posts.filter((p) => p.id !== deleteId))
    setDeleteId(null)
  }

  const columns: Column<Post>[] = [
    {
      key: "title",
      label: "Title",
      render: (p) => <span className="font-medium text-foreground">{p.title}</span>,
    },
    {
      key: "category",
      label: "Category",
      render: (p) => <Badge variant="secondary">{getCategoryName(p.category)}</Badge>,
    },
    {
      key: "status",
      label: "Status",
      render: (p) => (
        <Badge variant={p.status === "published" ? "success" : "warning"}>{p.status}</Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (p) => <span className="text-muted-foreground">{formatDate(p.createdAt)}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (p) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm">
            <Edit3 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(p.id)}>
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/blog/${p.slug}`} target="_blank">
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
          <h1 className="text-xl font-semibold text-foreground">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">Manage your blog content</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/create">
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="pl-9" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px]">
            <Filter className="h-3.5 w-3.5 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={paginated}
        keyField="id"
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyTitle="No posts found"
        emptyDescription="Create your first blog post to get started."
        emptyAction={
          <Button asChild>
            <Link href="/admin/blog/create">
              <Plus className="h-4 w-4" />
              Create Post
            </Link>
          </Button>
        }
      />

      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
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
