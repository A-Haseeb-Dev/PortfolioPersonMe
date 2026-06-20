"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LogOut, Bell, User, ChevronDown, Shield, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import Sidebar from "./sidebar"

type UserRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR"

interface AdminUser {
  name: string
  email: string
  image?: string
  role: UserRole
}

const roleMenus: Record<UserRole, string[]> = {
  SUPER_ADMIN: [
    "/admin",
    "/admin/blog",
    "/admin/projects",
    "/admin/case-studies",
    "/admin/services",
    "/admin/skills",
    "/admin/technologies",
    "/admin/learning",
    "/admin/testimonials",
    "/admin/achievements",
    "/admin/startup-ideas",
    "/admin/resources",
    "/admin/messages",
    "/admin/analytics",
    "/admin/users",
    "/admin/settings",
    "/admin/projects/create",
  ],
  ADMIN: [
    "/admin",
    "/admin/blog",
    "/admin/projects",
    "/admin/case-studies",
    "/admin/services",
    "/admin/skills",
    "/admin/technologies",
    "/admin/learning",
    "/admin/testimonials",
    "/admin/achievements",
    "/admin/startup-ideas",
    "/admin/resources",
    "/admin/messages",
    "/admin/analytics",
    "/admin/settings",
    "/admin/projects/create",
  ],
  EDITOR: [
    "/admin",
    "/admin/blog",
    "/admin/projects",
    "/admin/case-studies",
    "/admin/services",
    "/admin/skills",
    "/admin/learning",
    "/admin/testimonials",
    "/admin/achievements",
    "/admin/resources",
    "/admin/messages",
    "/admin/projects/create",
  ],
}

interface AdminLayoutProps {
  children: ReactNode
  user: AdminUser
  onLogout?: () => void
}

export default function AdminLayout({ children, user, onLogout }: AdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const allowedPaths = roleMenus[user.role] || []
  const isAuthorized = allowedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  )

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <Shield size={48} className="mx-auto mb-4 text-red-400" />
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Access Denied
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            You do not have permission to access this area.
          </p>
          <Link
            href="/admin"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <header className="sticky top-0 z-10 border-b border-white/10 bg-white/70 backdrop-blur-2xl dark:bg-zinc-950/70 dark:border-zinc-800/50">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Welcome back, {user.name}
              </h2>
              <p className="text-xs text-zinc-400">
                {user.role === "SUPER_ADMIN"
                  ? "Super Admin"
                  : user.role === "ADMIN"
                  ? "Administrator"
                  : "Editor"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-950" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span className="hidden text-sm font-medium text-zinc-700 sm:inline dark:text-zinc-200">
                    {user.name}
                  </span>
                  <ChevronDown
                    size={14}
                    className={cn(
                      "hidden text-zinc-400 transition-transform sm:inline",
                      userMenuOpen && "rotate-180"
                    )}
                  />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      className="absolute right-0 top-full z-20 mt-1.5 w-56 overflow-hidden rounded-2xl border border-white/20 bg-white/80 backdrop-blur-2xl shadow-xl dark:border-zinc-800/50 dark:bg-zinc-950/80"
                    >
                      <div className="p-2">
                        <div className="border-b border-zinc-200/50 px-3 py-2 dark:border-zinc-800/50">
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                            {user.name}
                          </p>
                          <p className="text-xs text-zinc-400">{user.email}</p>
                        </div>
                        <Link
                          href="/admin/settings"
                          onClick={() => setUserMenuOpen(false)}
                          className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        >
                          <Settings size={16} />
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false)
                            onLogout?.()
                          }}
                          className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
