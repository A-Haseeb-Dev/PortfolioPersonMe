"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, MailOpen, Trash2, Reply, Search, Filter, Loader2 } from "lucide-react"
import { DataTable, useTableSearch, useTablePagination, type Column } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate, cn } from "@/lib/utils"
import { fetchAdminData, apiAction } from "@/lib/admin-api"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [selected, setSelected] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState("")
  const [readFilter, setReadFilter] = useState("all")

  useEffect(() => {
    fetchAdminData<Message>("/api/messages", []).then(data => {
      setMessages(data)
      setLoading(false)
    })
  }, [])

  const { search, setSearch, filtered: searched } = useTableSearch(messages, ["name", "email", "subject", "message"])

  const filtered = searched.filter((m) => {
    if (readFilter === "read") return m.read
    if (readFilter === "unread") return !m.read
    return true
  })

  const { page, setPage, totalPages, paginated } = useTablePagination(filtered, 5)
  const unreadCount = messages.filter((m) => !m.read).length

  const markRead = async (id: string) => {
    await apiAction("PUT", `/api/messages/${id}`, { read: true })
    setMessages(messages.map((m) => m.id === id ? { ...m, read: true } : m))
  }

  const handleDelete = async () => {
    if (deleteId) {
      if (await apiAction("DELETE", `/api/messages/${deleteId}`)) {
        setMessages(messages.filter((m) => m.id !== deleteId))
        if (selected?.id === deleteId) setSelected(null)
        setDeleteId(null)
      }
    }
  }

  const columns: Column<Message>[] = [
    {
      key: "read",
      label: "",
      render: (m) => (
        <div className="flex items-center">
          {m.read ? (
            <MailOpen className="h-4 w-4 text-muted-foreground/60" />
          ) : (
            <Mail className="h-4 w-4 text-blue-500" />
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "From",
      render: (m) => (
        <div>
          <p className={cn("text-sm", !m.read && "font-semibold text-foreground")}>{m.name}</p>
          <p className="text-xs text-muted-foreground">{m.email}</p>
        </div>
      ),
    },
    { key: "subject", label: "Subject", render: (m) => <span className={cn(!m.read && "font-medium text-foreground")}>{m.subject}</span> },
    { key: "createdAt", label: "Date", render: (m) => <span className="text-muted-foreground text-sm">{formatDate(m.createdAt)}</span> },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (m) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" onClick={() => { setSelected(m); if (!m.read) markRead(m.id) }}>
            <Reply className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteId(m.id)}>
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
          </Button>
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">Messages</h1>
            {unreadCount > 0 && (
              <Badge variant="info" dot>{unreadCount} unread</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Manage contact form submissions</p>
        </div>
        <Select value={readFilter} onValueChange={setReadFilter}>
          <SelectTrigger className="w-[130px]">
            <Filter className="h-3.5 w-3.5 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
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
          onRowClick={(m) => { setSelected(m); if (!m.read) markRead(m.id) }}
          emptyTitle="No messages"
          emptyDescription="No contact messages yet."
          className="lg:col-span-1"
        />

        {selected ? (
          <GlassCard intensity="light" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">{selected.subject}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>Close</Button>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-foreground">{selected.name}</p>
              <a href={`mailto:${selected.email}`} className="text-sm text-blue-500 hover:underline">{selected.email}</a>
              <p className="text-xs text-muted-foreground mt-1">{formatDate(selected.createdAt)}</p>
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selected.message}</p>
            <Separator className="my-4" />
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Reply</p>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                rows={4}
              />
              <div className="flex items-center justify-between">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Open in mail client
                </a>
                <Button size="sm" disabled={!replyText.trim()}>
                  <Reply className="h-3.5 w-3.5" />
                  Send Reply
                </Button>
              </div>
            </div>
          </GlassCard>
        ) : (
          <GlassCard intensity="light" className="flex items-center justify-center p-12">
            <div className="text-center">
              <Mail className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">Select a message to read it</p>
            </div>
          </GlassCard>
        )}
      </div>

      <Dialog open={!!deleteId} onOpenChange={(o) => { if (!o) setDeleteId(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
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
