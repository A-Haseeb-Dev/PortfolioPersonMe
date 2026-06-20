"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Users,
  FolderGit2,
  FileText,
  MessageSquare,
  Download,
  Eye,
  TrendingUp,
  Plus,
  ExternalLink,
  Sparkles,
  Activity,
  ArrowRight,
  BookOpen,
  Code2,
  Lightbulb,
  Trophy,
  Briefcase,
  Star,
  Library,
  BookMarked,
  Network,
  GraduationCap,
  Settings,
  BarChart3,
  ShieldCheck,
  PenSquare,
} from "lucide-react"
import Link from "next/link"
import { StatsCards } from "@/components/admin/stats-cards"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { fetchAdminData } from "@/lib/admin-api"

interface Activity {
  id: string
  type: "create" | "update" | "delete" | "message"
  entity: string
  entityType: string
  timestamp: Date
  user: string
}

interface SiteSection {
  label: string
  description: string
  href: string
  icon: typeof BookOpen
  color: string
  bgColor: string
}

const siteSections: SiteSection[] = [
  { label: "Blog Posts", description: "Articles, tutorials & guides", href: "/admin/blog", icon: FileText, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { label: "Projects", description: "Portfolio projects & case work", href: "/admin/projects", icon: FolderGit2, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { label: "Case Studies", description: "Client success stories", href: "/admin/case-studies", icon: BookMarked, color: "text-violet-500", bgColor: "bg-violet-500/10" },
  { label: "Services", description: "What I offer", href: "/admin/services", icon: Briefcase, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { label: "Skills", description: "Technical proficiencies", href: "/admin/skills", icon: Code2, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
  { label: "Technologies", description: "Tech stack & graph", href: "/admin/technologies", icon: Network, color: "text-rose-500", bgColor: "bg-rose-500/10" },
  { label: "Learning", description: "Learning journey & roadmap", href: "/admin/learning", icon: GraduationCap, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { label: "Testimonials", description: "Client & peer feedback", href: "/admin/testimonials", icon: Star, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { label: "Achievements", description: "Awards & certifications", href: "/admin/achievements", icon: Trophy, color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { label: "Startup Ideas", description: "Ideas & validation tracker", href: "/admin/startup-ideas", icon: Lightbulb, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { label: "Resources", description: "Downloads & files", href: "/admin/resources", icon: Library, color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
  { label: "Messages", description: "Contact form inquiries", href: "/admin/messages", icon: MessageSquare, color: "text-sky-500", bgColor: "bg-sky-500/10" },
]

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState("Welcome back")
  const [stats, setStats] = useState({ posts: 0, projects: 0, caseStudies: 0, services: 0, skills: 0, learning: 0, achievements: 0, resources: 0, startupIdeas: 0, testimonials: 0, messages: 0, loading: true })

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  useEffect(() => {
    async function loadStats() {
      const endpoints = ["/api/blog", "/api/projects", "/api/case-studies", "/api/services", "/api/skills", "/api/learning", "/api/achievements", "/api/resources", "/api/startup-ideas", "/api/testimonials", "/api/messages"]
      const results = await Promise.allSettled(endpoints.map(e => fetchAdminData(e, [])))
      const counts = results.map(r => r.status === "fulfilled" ? r.value.length : 0)
      setStats({
        posts: counts[0],
        projects: counts[1],
        caseStudies: counts[2],
        services: counts[3],
        skills: counts[4],
        learning: counts[5],
        achievements: counts[6],
        resources: counts[7],
        startupIdeas: counts[8],
        testimonials: counts[9],
        messages: counts[10],
        loading: false,
      })
    }
    loadStats()
  }, [])

  const statsData = [
    { label: "Blog Posts", value: stats.posts, icon: <FileText size={18} /> },
    { label: "Projects", value: stats.projects, icon: <FolderGit2 size={18} /> },
    { label: "Case Studies", value: stats.caseStudies, icon: <BookMarked size={18} /> },
    { label: "Services", value: stats.services, icon: <Briefcase size={18} /> },
    { label: "Skills", value: stats.skills, icon: <Code2 size={18} /> },
    { label: "Learning", value: stats.learning, icon: <GraduationCap size={18} /> },
    { label: "Achievements", value: stats.achievements, icon: <Trophy size={18} /> },
    { label: "Resources", value: stats.resources, icon: <Library size={18} /> },
    { label: "Startup Ideas", value: stats.startupIdeas, icon: <Lightbulb size={18} /> },
    { label: "Testimonials", value: stats.testimonials, icon: <Star size={18} /> },
    { label: "Messages", value: stats.messages, icon: <MessageSquare size={18} /> },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-foreground"
          >
            {greeting}, Abdul Haseeb
          </motion.h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your portfolio today.
          </p>
        </div>
        <Badge variant="info" className="gap-1.5">
          <ShieldCheck size={12} />
          Super Admin
        </Badge>
      </div>

      <StatsCards stats={statsData} />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenSquare className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Manage Your Website</h2>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            View Site
            <ExternalLink size={14} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {siteSections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.href} href={section.href}>
                <GlassCard
                  intensity="light"
                  className="group p-4 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", section.bgColor, section.color)}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{section.label}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{section.description}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                  </div>
                </GlassCard>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard intensity="light" className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
            </div>
            <Link href="/admin/analytics" className="text-xs font-medium text-muted-foreground hover:text-foreground">
              View all
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="space-y-1">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
              >
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  activity.type === "create" && "bg-emerald-500/15 text-emerald-500",
                  activity.type === "update" && "bg-blue-500/15 text-blue-500",
                  activity.type === "delete" && "bg-red-500/15 text-red-500",
                  activity.type === "message" && "bg-amber-500/15 text-amber-500",
                )}>
                  {activity.type === "create" && <Plus size={14} />}
                  {activity.type === "update" && <Sparkles size={14} />}
                  {activity.type === "delete" && <TrendingUp size={14} />}
                  {activity.type === "message" && <MessageSquare size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {activity.entity}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.entityType} &middot; {activity.user}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard intensity="light" className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Page Views</h2>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">1,899</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
              <Sparkline data={pageViewsSparkline} className="text-blue-500" />
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1">
              {pageViewsSparkline.map((d) => (
                <div key={d.label} className="text-center">
                  <div
                    className="mx-auto w-full rounded-sm bg-blue-500/15"
                    style={{ height: `${(d.value / 401) * 40}px` }}
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground">{d.label.slice(0, 2)}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard intensity="light" className="p-6">
            <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-center transition-all hover:border-muted-foreground/30 hover:shadow-sm"
                  >
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", action.color)}>
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-medium text-foreground">{action.label}</span>
                  </Link>
                )
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  )
}

const recentActivity: Activity[] = [
  { id: "1", type: "create", entity: "AI-Powered Analytics Dashboard", entityType: "project", timestamp: new Date(Date.now() - 1000 * 60 * 15), user: "Abdul Haseeb" },
  { id: "2", type: "update", entity: "Getting Started with Next.js", entityType: "blog", timestamp: new Date(Date.now() - 1000 * 60 * 45), user: "Abdul Haseeb" },
  { id: "3", type: "message", entity: "Project Inquiry from Ahmed", entityType: "message", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), user: "Ahmed Khan" },
  { id: "4", type: "create", entity: "E-Commerce Platform Redesign", entityType: "case-study", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), user: "Abdul Haseeb" },
  { id: "5", type: "delete", entity: "Old Portfolio Draft", entityType: "project", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), user: "Abdul Haseeb" },
]

const pageViewsSparkline = [
  { value: 120, label: "Mon" },
  { value: 245, label: "Tue" },
  { value: 189, label: "Wed" },
  { value: 312, label: "Thu" },
  { value: 276, label: "Fri" },
  { value: 401, label: "Sat" },
  { value: 356, label: "Sun" },
]

const quickActions = [
  { label: "New Project", href: "/admin/projects/create", icon: Plus, color: "text-blue-500 bg-blue-500/10" },
  { label: "New Blog Post", href: "/admin/blog", icon: FileText, color: "text-emerald-500 bg-emerald-500/10" },
  { label: "New Service", href: "/admin/services", icon: Briefcase, color: "text-violet-500 bg-violet-500/10" },
  { label: "View Site", href: "/", icon: ExternalLink, color: "text-amber-500 bg-amber-500/10" },
]

interface SparklineData {
  value: number
  label: string
}

function Sparkline({ data, className }: { data: SparklineData[]; className?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  const h = 32
  const w = 80
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - (d.value / max) * h
    return `${x},${y}`
  })
  const pathD = `M${points.join(" L")}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-8 w-20", className)}>
      <path d={pathD} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
