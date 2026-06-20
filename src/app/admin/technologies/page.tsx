"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, GitBranch, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface GraphNode {
  id: string
  name: string
  category: string
  color: string
}

interface GraphEdge {
  id: string
  from: string
  to: string
  label: string
}

const nodeColors: Record<string, string> = {
  Frontend: "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  Backend: "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  Database: "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  DevOps: "border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
  Mobile: "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
}

const defaultNodes: GraphNode[] = [
  { id: "n1", name: "React", category: "Frontend", color: "border-blue-500" },
  { id: "n2", name: "Next.js", category: "Frontend", color: "border-blue-500" },
  { id: "n3", name: "Node.js", category: "Backend", color: "border-emerald-500" },
  { id: "n4", name: "PostgreSQL", category: "Database", color: "border-amber-500" },
  { id: "n5", name: "Prisma", category: "Backend", color: "border-emerald-500" },
  { id: "n6", name: "TypeScript", category: "Frontend", color: "border-blue-500" },
  { id: "n7", name: "Docker", category: "DevOps", color: "border-violet-500" },
  { id: "n8", name: "React Native", category: "Mobile", color: "border-rose-500" },
]

const defaultEdges: GraphEdge[] = [
  { id: "e1", from: "n1", to: "n2", label: "builds on" },
  { id: "e2", from: "n2", to: "n3", label: "backend" },
  { id: "e3", from: "n2", to: "n5", label: "orm" },
  { id: "e4", from: "n5", to: "n4", label: "connects" },
  { id: "e5", from: "n6", to: "n1", label: "types" },
  { id: "e6", from: "n3", to: "n7", label: "containers" },
  { id: "e7", from: "n1", to: "n8", label: "mobile" },
]

const categories = ["Frontend", "Backend", "Database", "DevOps", "Mobile"]

export default function AdminTechnologies() {
  const [nodes, setNodes] = useState(defaultNodes)
  const [edges, setEdges] = useState(defaultEdges)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [editingNode, setEditingNode] = useState<GraphNode | null>(null)
  const [newNode, setNewNode] = useState({ name: "", category: "Frontend" })
  const [showNewNode, setShowNewNode] = useState(false)
  const [editingEdge, setEditingEdge] = useState<GraphEdge | null>(null)
  const [newEdge, setNewEdge] = useState({ from: "", to: "", label: "" })
  const [showNewEdge, setShowNewEdge] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ type: "node" | "edge"; id: string } | null>(null)

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  const connections = (nodeId: string) =>
    edges.filter((e) => e.from === nodeId || e.to === nodeId)

  const addNode = () => {
    if (!newNode.name.trim()) return
    const id = `n${Date.now()}`
    const color = nodeColors[newNode.category] || "border-zinc-500"
    setNodes([...nodes, { id, ...newNode, color }])
    setNewNode({ name: "", category: "Frontend" })
    setShowNewNode(false)
  }

  const addEdge = () => {
    if (!newEdge.from || !newEdge.to || !newEdge.label.trim()) return
    setEdges([...edges, { id: `e${Date.now()}`, ...newEdge }])
    setNewEdge({ from: "", to: "", label: "" })
    setShowNewEdge(false)
  }

  const updateNode = () => {
    if (!editingNode) return
    setNodes(nodes.map((n) => (n.id === editingNode.id ? editingNode : n)))
    setEditingNode(null)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    if (deleteTarget.type === "node") {
      setNodes(nodes.filter((n) => n.id !== deleteTarget.id))
      setEdges(edges.filter((e) => e.from !== deleteTarget.id && e.to !== deleteTarget.id))
    } else {
      setEdges(edges.filter((e) => e.id !== deleteTarget.id))
    }
    setDeleteTarget(null)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 text-foreground">Technology Graph</h1>
          <p className="text-sm text-zinc-500 text-muted-foreground">Visualize connections between technologies</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowNewEdge(true)}>
            <GitBranch className="h-4 w-4" />
            Add Connection
          </Button>
          <Button onClick={() => setShowNewNode(true)}>
            <Plus className="h-4 w-4" />
            Add Node
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard intensity="light" className="p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Network className="h-5 w-5 text-zinc-500" />
            <h2 className="text-base font-semibold text-zinc-900 text-foreground">Graph View</h2>
          </div>
          <div className="relative min-h-[500px] rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 p-8 border-border bg-[var(--card-bg-30)]">
            <svg className="absolute inset-0 h-full w-full">
              {edges.map((edge) => {
                const from = nodeMap.get(edge.from)
                const to = nodeMap.get(edge.to)
                if (!from || !to) return null
                return (
                  <g key={edge.id}>
                    <line
                      x1={0} y1={0} x2={0} y2={0}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="text-zinc-300 text-muted-foreground"
                    />
                  </g>
                )
              })}
            </svg>
            <div className="relative flex flex-wrap gap-4">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className={cn(
                    "group relative rounded-xl border-2 px-4 py-3 text-sm font-medium shadow-sm transition-all cursor-pointer hover:shadow-md",
                    nodeColors[node.category] || "bg-zinc-50 text-zinc-700 border-zinc-300 bg-muted text-muted-foreground",
                    selectedNode === node.id && "ring-2 ring-zinc-900 ring-foreground"
                  )}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                >
                  <p>{node.name}</p>
                  <span className="text-[10px] opacity-60">{node.category}</span>
                  <div className="absolute -right-1.5 -top-1.5 hidden gap-0.5 group-hover:flex">
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full bg-white shadow-sm bg-muted"
                      onClick={(e) => { e.stopPropagation(); setEditingNode(node) }}>
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full bg-white shadow-sm bg-muted"
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: "node", id: node.id }) }}>
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-xs text-zinc-400 mb-3">Connections ({edges.length})</p>
              <div className="space-y-2">
                {edges.map((edge) => {
                  const from = nodeMap.get(edge.from)
                  const to = nodeMap.get(edge.to)
                  if (!from || !to) return null
                  return (
                    <div key={edge.id} className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm border-border">
                      <Badge variant="secondary">{from.name}</Badge>
                      <span className="text-xs text-zinc-400">{edge.label}</span>
                      <Badge variant="secondary">{to.name}</Badge>
                      <div className="ml-auto flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setDeleteTarget({ type: "edge", id: edge.id })}>
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard intensity="light" className="p-5">
            <h3 className="text-sm font-semibold text-zinc-900 text-foreground mb-3">Legend</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center gap-2 text-sm">
                  <div className={cn(
                    "h-3 w-3 rounded-full border-2",
                    cat === "Frontend" && "border-blue-500 bg-blue-50 bg-blue-500/10",
                    cat === "Backend" && "border-emerald-500 bg-emerald-50 bg-emerald-500/10",
                    cat === "Database" && "border-amber-500 bg-amber-50 bg-amber-500/10",
                    cat === "DevOps" && "border-violet-500 bg-violet-50 bg-violet-500/10",
                    cat === "Mobile" && "border-rose-500 bg-rose-50 bg-rose-500/10",
                  )} />
                  {cat}
                </div>
              ))}
            </div>
          </GlassCard>

          {selectedNode && (() => {
            const node = nodeMap.get(selectedNode)
            if (!node) return null
            const conns = connections(selectedNode)
            return (
              <GlassCard intensity="light" className="p-5">
                <h3 className="text-sm font-semibold text-zinc-900 text-foreground mb-3">{node.name} Connections</h3>
                <div className="space-y-2">
                  {conns.length === 0 && <p className="text-xs text-zinc-400">No connections</p>}
                  {conns.map((conn) => {
                    const connected = nodeMap.get(conn.from === selectedNode ? conn.to : conn.from)
                    if (!connected) return null
                    return (
                      <div key={conn.id} className="flex items-center gap-2 text-sm">
                        <Badge variant="secondary" className="text-xs">{conn.label}</Badge>
                        <span className="text-zinc-500">{connected.name}</span>
                      </div>
                    )
                  })}
                </div>
              </GlassCard>
            )
          })()}
        </div>
      </div>

      <Dialog open={showNewNode} onOpenChange={(o) => { if (!o) setShowNewNode(false) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Technology Node</DialogTitle>
          </DialogHeader>
          <Input label="Name" value={newNode.name} onChange={(e) => setNewNode({ ...newNode, name: e.target.value })} placeholder="e.g. GraphQL" />
          <Select value={newNode.category} onValueChange={(v) => setNewNode({ ...newNode, category: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowNewNode(false)}>Cancel</Button>
            <Button onClick={addNode}>Add Node</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewEdge} onOpenChange={(o) => { if (!o) setShowNewEdge(false) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Connection</DialogTitle>
          </DialogHeader>
          <Select value={newEdge.from} onValueChange={(v) => setNewEdge({ ...newEdge, from: v })}>
            <SelectTrigger>
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              {nodes.map((n) => <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={newEdge.to} onValueChange={(v) => setNewEdge({ ...newEdge, to: v })}>
            <SelectTrigger>
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              {nodes.map((n) => <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input label="Relationship Label" value={newEdge.label} onChange={(e) => setNewEdge({ ...newEdge, label: e.target.value })} placeholder="e.g. depends on" />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowNewEdge(false)}>Cancel</Button>
            <Button onClick={addEdge}>Add Connection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {editingNode && (
        <Dialog open onOpenChange={(o) => { if (!o) setEditingNode(null) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Node</DialogTitle>
            </DialogHeader>
            <Input label="Name" value={editingNode.name} onChange={(e) => setEditingNode({ ...editingNode, name: e.target.value })} />
            <Select value={editingNode.category} onValueChange={(v) => setEditingNode({ ...editingNode, category: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setEditingNode(null)}>Cancel</Button>
              <Button onClick={updateNode}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={!!deleteTarget} onOpenChange={(o) => { if (!o) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {deleteTarget?.type === "node" ? "Node" : "Connection"}</DialogTitle>
            <DialogDescription>Are you sure? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
