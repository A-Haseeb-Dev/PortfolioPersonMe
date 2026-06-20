"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, Shield, ShieldCheck, ShieldAlert } from "lucide-react"
import { DataTable, useTableSearch, useTablePagination, type Column } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate, cn } from "@/lib/utils"

type UserRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR"

interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}

const roleIcons = {
  SUPER_ADMIN: ShieldAlert,
  ADMIN: ShieldCheck,
  EDITOR: Shield,
}

const initialUsers: AdminUser[] = [
  { id: "u1", name: "Abdul Haseeb", email: "abdul@example.com", role: "SUPER_ADMIN", createdAt: new Date("2024-01-01") },
  { id: "u2", name: "Ahmed Khan", email: "ahmed@example.com", role: "ADMIN", createdAt: new Date("2025-03-15") },
  { id: "u3", name: "Sara Ali", email: "sara@example.com", role: "EDITOR", createdAt: new Date("2025-05-01") },
]

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editing, setEditing] = useState<AdminUser | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "EDITOR" as UserRole })

  const { search, setSearch, filtered } = useTableSearch(users, ["name", "email", "role"])
  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)

  const resetForm = () => setForm({ name: "", email: "", password: "", role: "EDITOR" })

  const handleCreate = () => {
    if (!form.name.trim() || !form.email.trim()) return
    setUsers([...users, { id: `u${Date.now()}`, name: form.name, email: form.email, role: form.role, createdAt: new Date() }])
    resetForm()
    setShowNew(false)
  }

  const handleEdit = () => {
    if (!editing) return
    setUsers(users.map((u) => u.id === editing.id ? editing : u))
    setEditing(null)
  }

  const handleDelete = () => {
    if (deleteId) {
      setUsers(users.filter((u) => u.id !== deleteId))
      setDeleteId(null)
    }
  }

  const columns: Column<AdminUser>[] = [
    {
      key: "name",
      label: "User",
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium text-zinc-700 bg-muted text-foreground">
            {u.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-foreground">{u.name}</p>
            <p className="text-xs text-muted-foreground">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (u) => {
        const Icon = roleIcons[u.role]
        return (
          <Badge
            variant={
              u.role === "SUPER_ADMIN" ? "default" :
              u.role === "ADMIN" ? "info" : "secondary"
            }
            className="gap-1"
          >
            <Icon size={12} />
            {u.role === "SUPER_ADMIN" ? "Super Admin" : u.role === "ADMIN" ? "Admin" : "Editor"}
          </Badge>
        )
      },
    },
    { key: "createdAt", label: "Created", render: (u) => <span className="text-muted-foreground">{formatDate(u.createdAt)}</span> },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (u) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" onClick={() => setEditing(u)}><Edit3 className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(u.id)}><Trash2 className="h-3.5 w-3.5 text-red-500" /></Button>
        </div>
      ),
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-zinc-900 text-foreground">Users</h1>
            <Badge variant="info" className="gap-1">
              <ShieldAlert size={12} />
              Super Admin Only
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Manage admin users and roles</p>
        </div>
        <Button onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <GlassCard intensity="light" className="p-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <ShieldAlert size={16} className="text-muted-foreground" />
          Only Super Admins can manage users. Changes are applied immediately.
        </div>
      </GlassCard>

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
        emptyTitle="No users found"
        emptyDescription="Add your first admin user."
      />

      <Dialog open={showNew} onOpenChange={(o) => { if (!o) { setShowNew(false); resetForm() } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>Create a new admin user with role-based access</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Set initial password" />
            <div>
              <p className="text-sm font-medium text-zinc-700 text-muted-foreground mb-1.5">Role</p>
              <div className="grid grid-cols-3 gap-2">
                {(["EDITOR", "ADMIN", "SUPER_ADMIN"] as UserRole[]).map((role) => {
                  const Icon = roleIcons[role]
                  return (
                    <button
                      key={role}
                      onClick={() => setForm({ ...form, role })}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-xs transition-all",
                        form.role === role
                          ? "border-zinc-900 bg-zinc-50 border-foreground bg-muted"
                          : "border-zinc-200 hover:border-zinc-300 border-border hover:border-foreground"
                      )}
                    >
                      <Icon size={16} className={cn(
                        form.role === role && "text-foreground",
                        "text-muted-foreground"
                      )} />
                      <span className="font-medium text-muted-foreground">
                        {role === "SUPER_ADMIN" ? "Super" : role.charAt(0) + role.slice(1).toLowerCase()}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setShowNew(false); resetForm() }}>Cancel</Button>
            <Button onClick={handleCreate}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {editing && (
        <Dialog open onOpenChange={(o) => { if (!o) setEditing(null) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input label="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              <Input label="Email" type="email" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1.5">Role</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["EDITOR", "ADMIN", "SUPER_ADMIN"] as UserRole[]).map((role) => {
                    const Icon = roleIcons[role]
                    return (
                      <button
                        key={role}
                        onClick={() => setEditing({ ...editing, role })}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-xs transition-all",
                          editing.role === role
                            ? "border-zinc-900 bg-zinc-50 border-foreground bg-muted"
                            : "border-zinc-200 hover:border-zinc-300 border-border hover:border-foreground"
                        )}
                      >
                        <Icon size={16} className="text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">
                          {role === "SUPER_ADMIN" ? "Super" : role.charAt(0) + role.slice(1).toLowerCase()}
                        </span>
                      </button>
                    )
                  })}
                </div>
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
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>Are you sure? This action cannot be undone. The user will lose all access.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
