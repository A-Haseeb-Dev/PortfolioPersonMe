"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, GripVertical, ChevronDown, ChevronRight, Loader2 } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Technology {
  id: string
  name: string
  category: string
  proficiency: number
  order: number
}

interface Category {
  id: string
  name: string
  technologies: Technology[]
}

const proficiencyLevels = [
  { value: 20, label: "Beginner" },
  { value: 40, label: "Elementary" },
  { value: 60, label: "Intermediate" },
  { value: 80, label: "Advanced" },
  { value: 100, label: "Expert" },
]

export default function AdminSkills() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string[]>([])
  const [deleteTarget, setDeleteTarget] = useState<{ type: "category" | "tech"; id: string } | null>(null)
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null)
  const [editingTech, setEditingTech] = useState<Technology | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newTech, setNewTech] = useState({ name: "", proficiency: 60 })
  const [showNewTech, setShowNewTech] = useState<string | null>(null)

  useEffect(() => {
    fetchAdminData<Category>("/api/skills").then(data => {
      setCategories(data)
      setExpanded(data.map((c) => c.id))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const addCategory = () => {
    if (!newCategoryName.trim()) return
    const id = `c${Date.now()}`
    const category = { id, name: newCategoryName, technologies: [] }
    setCategories([...categories, category])
    apiAction("POST", "/api/skills", category)
    setNewCategoryName("")
    setShowNewCategory(false)
  }

  const updateCategory = () => {
    if (!editingCategory) return
    setCategories(categories.map((c) =>
      c.id === editingCategory.id ? { ...c, name: editingCategory.name } : c
    ))
    apiAction("PUT", `/api/skills/${editingCategory.id}`, editingCategory)
    setEditingCategory(null)
  }

  const deleteCategory = () => {
    if (!deleteTarget || deleteTarget.type !== "category") return
    setCategories(categories.filter((c) => c.id !== deleteTarget.id))
    apiAction("DELETE", `/api/skills/${deleteTarget.id}`)
    setDeleteTarget(null)
  }

  const addTech = (categoryId: string) => {
    if (!newTech.name.trim()) return
    const category = categories.find((c) => c.id === categoryId)
    if (!category) return
    const tech: Technology = {
      id: `t${Date.now()}`,
      name: newTech.name,
      category: category.name,
      proficiency: newTech.proficiency,
      order: category.technologies.length,
    }
    setCategories(categories.map((c) =>
      c.id === categoryId ? { ...c, technologies: [...c.technologies, tech] } : c
    ))
    apiAction("POST", "/api/skills/technologies", tech)
    setNewTech({ name: "", proficiency: 60 })
    setShowNewTech(null)
  }

  const updateTech = () => {
    if (!editingTech) return
    setCategories(categories.map((c) => ({
      ...c,
      technologies: c.technologies.map((t: Technology) =>
        t.id === editingTech.id ? editingTech : t
      ),
    })))
    apiAction("PUT", `/api/skills/technologies/${editingTech.id}`, editingTech)
    setEditingTech(null)
  }

  const deleteTech = () => {
    if (!deleteTarget || deleteTarget.type !== "tech") return
    setCategories(categories.map((c) => ({
      ...c,
      technologies: c.technologies.filter((t: Technology) => t.id !== deleteTarget.id),
    })))
    apiAction("DELETE", `/api/skills/technologies/${deleteTarget.id}`)
    setDeleteTarget(null)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Skills & Technologies</h1>
          <p className="text-sm text-muted-foreground">Manage skill categories and technologies</p>
        </div>
        <Button onClick={() => setShowNewCategory(true)}>
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <GlassCard key={category.id} intensity="light" className="overflow-hidden">
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer select-none"
                onClick={() => toggleExpand(category.id)}
              >
                <div className="flex items-center gap-3">
                  {expanded.includes(category.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-semibold text-foreground">{category.name}</span>
                  <Badge variant="secondary">{category.technologies.length}</Badge>
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" onClick={() => setEditingCategory({ id: category.id, name: category.name })}>
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteTarget({ type: "category", id: category.id })}>
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </Button>
                </div>
              </div>

              {expanded.includes(category.id) && (
                <>
                  <Separator />
                  <div className="p-6">
                    {category.technologies.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No technologies in this category yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {category.technologies.map((tech) => (
                          <div
                            key={tech.id}
                            className="flex items-center gap-3 rounded-xl border-border border px-4 py-3"
                          >
                            <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground cursor-grab" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{tech.name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-foreground transition-all"
                                  style={{ width: `${tech.proficiency}%` }}
                                />
                              </div>
                              <Badge variant={
                                tech.proficiency >= 80 ? "success" :
                                tech.proficiency >= 60 ? "info" :
                                tech.proficiency >= 40 ? "warning" : "secondary"
                              }>
                                {tech.proficiency}%
                              </Badge>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setEditingTech(tech)}>
                              <Edit3 className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget({ type: "tech", id: tech.id })}>
                              <Trash2 className="h-3.5 w-3.5 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {showNewTech === category.id ? (
                      <div className="mt-4 flex items-end gap-3">
                        <div className="flex-1">
                          <Input
                            label="Technology Name"
                            value={newTech.name}
                            onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                            placeholder="e.g. Vue.js"
                          />
                        </div>
                        <div className="w-32">
                          <Select
                            value={String(newTech.proficiency)}
                            onValueChange={(v) => setNewTech({ ...newTech, proficiency: Number(v) })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {proficiencyLevels.map((l) => (
                                <SelectItem key={l.value} value={String(l.value)}>{l.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button size="sm" onClick={() => addTech(category.id)}>Add</Button>
                        <Button variant="ghost" size="sm" onClick={() => setShowNewTech(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4 gap-1"
                        onClick={() => setShowNewTech(category.id)}
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add Technology
                      </Button>
                    )}
                  </div>
                </>
              )}
            </GlassCard>
          ))}
        </div>
      )}

      {showNewCategory && (
        <Dialog open onOpenChange={(o) => { if (!o) setShowNewCategory(false) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>Create a new skill category</DialogDescription>
            </DialogHeader>
            <Input label="Category Name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="e.g. DevOps" />
            <DialogFooter>
              <Button variant="ghost" onClick={() => setShowNewCategory(false)}>Cancel</Button>
              <Button onClick={addCategory}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingCategory && (
        <Dialog open onOpenChange={(o) => { if (!o) setEditingCategory(null) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <Input label="Category Name" value={editingCategory.name} onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })} />
            <DialogFooter>
              <Button variant="ghost" onClick={() => setEditingCategory(null)}>Cancel</Button>
              <Button onClick={updateCategory}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingTech && (
        <Dialog open onOpenChange={(o) => { if (!o) setEditingTech(null) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Technology</DialogTitle>
            </DialogHeader>
            <Input label="Technology Name" value={editingTech.name} onChange={(e) => setEditingTech({ ...editingTech, name: e.target.value })} />
            <div className="w-full">
              <Select value={String(editingTech.proficiency)} onValueChange={(v) => setEditingTech({ ...editingTech, proficiency: Number(v) })}>
                <SelectTrigger>
                  <SelectValue placeholder="Proficiency" />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map((l) => (
                    <SelectItem key={l.value} value={String(l.value)}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setEditingTech(null)}>Cancel</Button>
              <Button onClick={updateTech}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={!!deleteTarget} onOpenChange={(o) => { if (!o) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {deleteTarget?.type === "category" ? "Category" : "Technology"}</DialogTitle>
            <DialogDescription>Are you sure? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" onClick={deleteTarget?.type === "category" ? deleteCategory : deleteTech}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
