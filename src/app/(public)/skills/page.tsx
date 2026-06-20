"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Command, Sparkles, X, Calendar, BarChart3, Award, BookOpen, ExternalLink, GraduationCap, Layers, MonitorPlay, FileText, FileJson, FileType, Terminal, Atom, Globe, Server, Zap, Palette, Database, Box, Smartphone, Code2, GitBranch, PenTool, Brain, Flame, Link, Share2, Cloud, Shield, Move, ClipboardList, Plug, Wrench, Cpu } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { skillCategories as staticCategories, technologies as staticTechnologies, type Technology } from "@/data/skills"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const techIconMap: Record<string, LucideIcon> = {
  javascript: FileJson,
  typescript: FileType,
  python: Terminal,
  react: Atom,
  nextjs: Globe,
  nodejs: Server,
  express: Zap,
  tailwindcss: Palette,
  mongodb: Database,
  postgresql: Box,
  prisma: Database,
  reactnative: Smartphone,
  django: Code2,
  docker: Box,
  kubernetes: Box,
  githubactions: GitBranch,
  git: GitBranch,
  figma: PenTool,
  tensorflow: Brain,
  pytorch: Flame,
  solidity: Link,
  graphql: Share2,
  aws: Cloud,
  nextauth: Shield,
  framer: Move,
  linux: Terminal,
  "project-management": ClipboardList,
  seo: BarChart3,
  restapi: Plug,
  "html-css": Code2,
}

const experienceBadge = (level: string) => {
  if (level === "expert") return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
  if (level === "advanced") return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
  if (level === "intermediate") return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
  return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
}

function TechDetail({ tech, onClose, onTechSelect, allTechnologies, allCategories }: { tech: Technology | null; onClose: () => void; onTechSelect: (t: Technology) => void; allTechnologies: Technology[]; allCategories: { id: string; name: string; icon: React.ComponentType<{ size?: number }>; color: string }[] }) {
  if (!tech) return null

  const related = allTechnologies.filter((t) => tech.relatedTechnologies.includes(t.id))

  const resourceIcons: Record<string, React.ReactNode> = {
    Documentation: <FileText size={14} />,
    Course: <MonitorPlay size={14} />,
    Book: <BookOpen size={14} />,
    Tutorial: <FileText size={14} />,
    Guide: <FileText size={14} />,
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm dark:bg-black/40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="surface-solid fixed inset-x-4 top-[10%] z-50 mx-auto max-w-2xl overflow-hidden rounded-2xl border shadow-2xl shadow-black/5 dark:border-zinc-700/40"
        style={{ borderColor: "var(--card-header-border)" }}
      >
        <div className="surface-card-header flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-300">
              {(() => {
                const Icon = techIconMap[tech.id]
                return Icon ? <Icon size={18} /> : <span className="text-lg">{tech.icon}</span>
              })()}
            </span>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{tech.name}</h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                {allCategories.find((c) => c.id === tech.categoryId)?.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            <X size={16} />
          </button>
        </div>

        <ScrollArea className="max-h-[65vh]">
          <div className="p-6 space-y-6">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{tech.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="surface-card-header rounded-xl border p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  <BarChart3 size={13} />
                  Proficiency
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${tech.proficiency}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{tech.proficiency}%</span>
                </div>
              </div>

              <div className="surface-card-header rounded-xl border p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  <Calendar size={13} />
                  Experience
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className={cn("rounded-md px-2 py-0.5 text-xs font-semibold capitalize", experienceBadge(tech.experienceLevel))}>
                    {tech.experienceLevel}
                  </span>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{tech.yearsExperience}+ years</span>
                </div>
              </div>
            </div>

            {tech.useCases.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Use Cases</h4>
                <div className="flex flex-wrap gap-1.5">
                  {tech.useCases.map((uc) => (
                    <Badge key={uc} variant="secondary" className="text-xs">{uc}</Badge>
                  ))}
                </div>
              </div>
            )}

            {tech.features.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Key Features</h4>
                <ul className="grid grid-cols-2 gap-1.5">
                  {tech.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {related.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Related Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {related.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => onTechSelect(r)}
                      className="surface-elevated inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                      style={{ borderColor: "var(--card-header-border)" }}
                    >
                      <span className="flex h-5 w-5 items-center justify-center">
                        {(() => {
                          const Icon = techIconMap[r.id]
                          return Icon ? <Icon size={13} /> : <span className="text-xs">{r.icon}</span>
                        })()}
                      </span>
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tech.projects.length > 0 && (
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  <Layers size={14} /> Projects
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {tech.projects.map((p) => (
                    <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                  ))}
                </div>
              </div>
            )}

            {tech.certificates.length > 0 && (
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  <Award size={14} /> Certificates
                </h4>
                <div className="space-y-1.5">
                  {tech.certificates.map((c, i) => (
                    <div key={i} className="surface-card-header flex items-center gap-2 rounded-lg border px-3 py-2">
                      <GraduationCap size={14} className="shrink-0 text-zinc-400" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{c.name}</span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">— {c.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tech.learningResources.length > 0 && (
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  <BookOpen size={14} /> Learning Resources
                </h4>
                <div className="space-y-1.5">
                  {tech.learningResources.map((r, i) => (
                    <a
                      key={i}
                      href={r.url}
                      className="surface-card-header flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900/50"
                    >
                      {resourceIcons[r.type] || <FileText size={14} />}
                      <span className="flex-1">{r.name}</span>
                      <span className="text-xs text-zinc-400">{r.type}</span>
                      <ExternalLink size={12} className="shrink-0 text-zinc-300" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </motion.div>
    </AnimatePresence>
  )
}

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [liveCategories, setLiveCategories] = useState(staticCategories)
  const [liveTechnologies, setLiveTechnologies] = useState(staticTechnologies)

  useEffect(() => {
    fetch("/api/skills")
      .then(r => r.json())
      .then(res => {
        if (res.categories?.length) setLiveCategories(res.categories)
        if (res.technologies?.length) setLiveTechnologies(res.technologies)
      })
      .catch(() => {})
  }, [])

  const categoryCounts = useMemo(() => {
    return liveTechnologies.reduce<Record<string, number>>((acc, t) => {
      acc[t.categoryId] = (acc[t.categoryId] || 0) + 1
      return acc
    }, {})
  }, [liveTechnologies])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const filtered = useMemo(() => {
    let result = liveTechnologies
    if (activeCategory) result = result.filter((t) => t.categoryId === activeCategory)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.categoryId.toLowerCase().includes(q)
      )
    }
    return result
  }, [searchQuery, activeCategory, liveTechnologies])

  const filteredCategories = useMemo(() => {
    let cats = liveCategories
    if (activeCategory) cats = cats.filter((c) => c.id === activeCategory)
    if (searchQuery) {
      cats = cats.filter((c) => filtered.some((t) => t.categoryId === c.id))
    }
    return cats
  }, [activeCategory, searchQuery, filtered, liveCategories])

  const filterTabs = [
    { id: null as string | null, name: "All" },
    ...liveCategories.map((c) => ({ id: c.id, name: c.name })),
  ]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <section className="relative overflow-hidden border-b border-zinc-200/50 pb-16 pt-20 sm:pb-20 sm:pt-24 dark:border-zinc-800/50">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-zinc-200/40 to-transparent blur-3xl dark:from-zinc-800/30" />
          <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-zinc-200/30 to-transparent blur-3xl dark:from-zinc-800/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200/50 px-4 py-1.5 text-xs font-medium text-zinc-500 backdrop-blur-sm dark:border-zinc-700/50 dark:text-zinc-400"
              style={{ backgroundColor: "var(--card-bg-50)" }}>
              <Sparkles size={12} />
              Technical Expertise
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
              Skills &{" "}
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-zinc-50 dark:to-zinc-400">
                Technologies
              </span>
            </h1>

            <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
              {liveCategories.length} categories · {liveTechnologies.length} technologies — from frontend to AI, DevOps to mobile
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mx-auto mt-10 max-w-xl"
          >
            <div
              className={cn(
                "flex items-center rounded-2xl border-2 backdrop-blur-xl transition-all duration-300",
                focused
                  ? "border-zinc-900 shadow-lg shadow-zinc-900/10 dark:border-zinc-50 dark:shadow-zinc-900/30"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
              )}
              style={{ backgroundColor: "var(--card-bg-60)" }}
            >
              <Search
                size={17}
                className={cn(
                  "ml-4 shrink-0 transition-colors",
                  focused ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400"
                )}
              />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search technologies..."
                className="h-12 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              />
              <div className="mr-3 hidden items-center gap-1 rounded-md border border-zinc-200 px-1.5 py-0.5 text-[11px] text-zinc-400 dark:border-zinc-700 sm:flex"
                style={{ backgroundColor: "var(--card-bg-50)" }}>
                <Command size={11} />
                <span>K</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-1.5"
          >
            {filterTabs.map((tab, i) => {
              const isActive = activeCategory === tab.id
              const count = tab.id ? categoryCounts[tab.id] || 0 : liveTechnologies.length
              return (
                <button
                  key={tab.id ?? "all"}
                  onClick={() => {
                    if (isActive && tab.id !== null) {
                      setActiveCategory(null)
                    } else {
                      setActiveCategory(tab.id)
                    }
                  }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-50 dark:text-zinc-900"
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                  )}
                  style={!isActive ? { backgroundColor: "var(--card-bg-60)" } : undefined}
                >
                  {tab.name}
                  <span
                    className={cn(
                      "rounded px-1 py-0.5 text-[10px] font-medium",
                      isActive
                        ? "bg-zinc-800 text-zinc-300 dark:bg-zinc-700 dark:text-zinc-400"
                        : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {filteredCategories.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <Search size={32} className="text-zinc-200 dark:text-zinc-700" />
              <p className="mt-4 text-sm text-zinc-400 dark:text-zinc-500">No technologies found for &ldquo;{searchQuery}&rdquo;</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory(null) }}
                className="mt-3 text-xs font-medium text-zinc-500 underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCategories.map((cat, ci) => {
                const Icon = cat.icon
                const techs = liveTechnologies.filter(
                  (t) =>
                    t.categoryId === cat.id &&
                    (!searchQuery ||
                      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      t.description.toLowerCase().includes(searchQuery.toLowerCase()))
                ).sort((a, b) => b.proficiency - a.proficiency)

                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.05, duration: 0.4 }}
                    className="surface-card rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:shadow-md hover:shadow-zinc-900/5 dark:hover:shadow-black/20"
                  >
                    <div className="surface-card-header flex items-center gap-3 border-b px-5 py-4">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm"
                        style={{ backgroundColor: cat.color }}
                      >
                        <Icon size={16} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500">
                          {techs.length} {techs.length === 1 ? "technology" : "technologies"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <button
                            key={tech.id}
                            onClick={() => setSelectedTech(tech)}
                            className="surface-elevated group relative inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-left transition-all duration-150 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700/50 dark:hover:border-zinc-600"
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 dark:text-zinc-400">
                              {(() => {
                                const Icon = techIconMap[tech.id]
                                return Icon ? <Icon size={15} /> : <span className="text-sm">{tech.icon}</span>
                              })()}
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                {tech.name}
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                <div className="h-1 flex-1 min-w-[3rem] overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                                  <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${tech.proficiency}%`, backgroundColor: tech.color }}
                                  />
                                </div>
                                <span className="text-[10px] font-medium text-zinc-400">{tech.proficiency}%</span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TechDetail
        tech={selectedTech}
        onClose={() => setSelectedTech(null)}
        onTechSelect={(t) => setSelectedTech(t)}
        allTechnologies={liveTechnologies}
        allCategories={liveCategories}
      />
    </div>
  )
}
