"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Edit3, Trash2, Save, Loader2, GitBranch } from "lucide-react"
import { DataTable, type Column } from "@/components/admin/data-table"
import { fetchAdminData, apiAction } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface Repo extends Record<string, unknown> {
  id: string
  name: string
  description: string | null
  stars: number
  forks: number
  issues: number
  language: string | null
  languageColor: string | null
  url: string | null
  topics: string[] | null
}

interface Profile {
  id: string
  username: string
  name: string | null
  avatar: string | null
  bio: string | null
  totalStars: number
  totalForks: number
  totalRepos: number
}

export default function AdminOpensource() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    username: "",
    name: "",
    avatar: "",
    bio: "",
    totalStars: 0,
    totalForks: 0,
    totalRepos: 0,
  })

  useEffect(() => {
    fetch("/api/opensource")
      .then((res) => res.json())
      .then((data) => {
        if (data.repos) setRepos(data.repos)
        if (data.profile) {
          setProfile(data.profile)
          setForm({
            username: data.profile.username || "",
            name: data.profile.name || "",
            avatar: data.profile.avatar || "",
            bio: data.profile.bio || "",
            totalStars: data.profile.totalStars || 0,
            totalForks: data.profile.totalForks || 0,
            totalRepos: data.profile.totalRepos || 0,
          })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSaveProfile = async () => {
    setSaving(true)
    const ok = await apiAction("PUT", "/api/opensource", form)
    if (ok) {
      setProfile({ id: profile?.id || "", ...form })
    }
    setSaving(false)
  }

  const handleDelete = () => {
    if (!deleteId) return
    apiAction("DELETE", `/api/opensource/${deleteId}`)
    setRepos(repos.filter((r) => r.id !== deleteId))
    setDeleteId(null)
  }

  const columns: Column<Repo>[] = [
    {
      key: "name",
      label: "Name",
      render: (r) => <span className="font-medium text-foreground">{r.name}</span>,
    },
    {
      key: "stars",
      label: "Stars",
      render: (r) => <span>{r.stars}</span>,
    },
    {
      key: "forks",
      label: "Forks",
      render: (r) => <span>{r.forks}</span>,
    },
    {
      key: "language",
      label: "Language",
      render: (r) => r.language ? (
        <div className="flex items-center gap-1.5">
          {r.languageColor && (
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.languageColor }} />
          )}
          <span>{r.language}</span>
        </div>
      ) : <span className="text-muted-foreground">—</span>,
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (r) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm">
            <Edit3 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(r.id)}>
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
          <h1 className="text-xl font-semibold text-foreground">Open Source</h1>
          <p className="text-sm text-muted-foreground">Manage GitHub profile and repositories</p>
        </div>
      </div>

      <GlassCard intensity="light" className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-base font-semibold text-foreground">GitHub Profile</h2>
        </div>
        <Separator className="mb-4" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="github username" />
          <Input label="Display Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
          <Input label="Avatar URL" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="https://avatars.githubusercontent.com/..." />
          <Input label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Short bio" />
          <Input label="Total Stars" type="number" value={String(form.totalStars)} onChange={(e) => setForm({ ...form, totalStars: Number(e.target.value) })} />
          <Input label="Total Forks" type="number" value={String(form.totalForks)} onChange={(e) => setForm({ ...form, totalForks: Number(e.target.value) })} />
          <Input label="Total Repos" type="number" value={String(form.totalRepos)} onChange={(e) => setForm({ ...form, totalRepos: Number(e.target.value) })} />
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSaveProfile} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Profile
          </Button>
        </div>
      </GlassCard>

      <div>
        <h2 className="mb-4 text-base font-semibold text-foreground">Repositories ({repos.length})</h2>
        <DataTable
          columns={columns}
          data={repos}
          keyField="id"
          emptyTitle="No repositories"
          emptyDescription="Repositories from GitHub will appear here."
        />
      </div>

      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Repository</DialogTitle>
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
