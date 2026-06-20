"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  FileText,
  FolderGit2,
  BookOpen,
  Briefcase,
  MessageSquare,
  Settings,
  Users,
  ChevronDown,
  PanelRightOpen,
  PanelRightClose,
  BarChart3,
  Code2,
  GraduationCap,
  Lightbulb,
  Trophy,
  Star,
  Library,
  BookMarked,
  Network,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItem {
  label: string
  icon: typeof LayoutDashboard
  href?: string
  children?: { label: string; href: string }[]
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  {
    label: "Content",
    icon: FileText,
    children: [
      { label: "Blog Posts", href: "/admin/blog" },
      { label: "Projects", href: "/admin/projects" },
      { label: "Case Studies", href: "/admin/case-studies" },
      { label: "Services", href: "/admin/services" },
    ],
  },
  {
    label: "Skills & Tech",
    icon: Code2,
    children: [
      { label: "Skills", href: "/admin/skills" },
      { label: "Technologies", href: "/admin/technologies" },
      { label: "Learning", href: "/admin/learning" },
    ],
  },
  {
    label: "Portfolio",
    icon: Briefcase,
    children: [
      { label: "Testimonials", href: "/admin/testimonials" },
      { label: "Achievements", href: "/admin/achievements" },
      { label: "Startup Ideas", href: "/admin/startup-ideas" },
      { label: "Resources", href: "/admin/resources" },
    ],
  },
  { label: "Messages", icon: MessageSquare, href: "/admin/messages" },
  { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { label: "Users", icon: Users, href: "/admin/users" },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { label: "General", href: "/admin/settings" },
    ],
  },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    const item = sidebarItems.find((item) =>
      item.children?.some((child) => pathname === child.href)
    )
    return item ? [item.label] : []
  })

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    )
  }

  const isActive = (href?: string) => pathname === href
  const isChildActive = (children: { href: string }[]) =>
    children.some((child) => pathname === child.href)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 flex h-full flex-col border-r border-border bg-background/80 backdrop-blur-2xl transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-2 font-semibold tracking-tight text-foreground",
            collapsed && "justify-center"
          )}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground text-xs font-bold text-background">
            H
          </span>
          {!collapsed && <span className="text-sm">Admin</span>}
        </Link>
        <button
          onClick={onToggle}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {collapsed ? (
            <PanelRightClose size={16} />
          ) : (
            <PanelRightOpen size={16} />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const hasChildren = !!item.children
            const expanded = expandedItems.includes(item.label)
            const active = isActive(item.href) || isChildActive(item.children || [])

            if (collapsed && hasChildren) {
              return null
            }

            return (
              <li key={item.label}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon size={18} className="shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          <ChevronDown
                            size={14}
                            className={cn(
                              "transition-transform duration-200",
                              expanded && "rotate-180"
                            )}
                          />
                        </>
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && !collapsed && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 mt-1 border-l border-border pl-3">
                            {item.children?.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    "block rounded-lg px-3 py-2 text-sm transition-all duration-200",
                                    isActive(child.href)
                                      ? "bg-foreground text-background dark:bg-foreground dark:text-background"
                                      : "text-muted-foreground hover:text-foreground"
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-foreground text-background shadow-sm dark:bg-foreground dark:text-background"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon size={18} className="shrink-0" />
                    {!collapsed && item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
