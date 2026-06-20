"use client"

import { useCallback, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import {
  X,
  Sun,
  Moon,
  Home,
  User,
  Code2,
  FolderGit2,
  BookOpen,
  BrainCircuit,
  Building2,
  Mail,
  Phone,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Skills", href: "/skills", icon: Code2 },
  { label: "Projects", href: "/projects", icon: FolderGit2 },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Knowledge", href: "/knowledge", icon: BrainCircuit },
  { label: "Contact", href: "/contact", icon: Phone },
]

const socialLinks = [
  { label: "WhatsApp", href: "https://wa.me/your-number", icon: Phone },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-profile", icon: Building2 },
  { label: "GitHub", href: "https://github.com/your-username", icon: FolderGit2 },
]

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, damping: 28, stiffness: 300 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { type: "spring" as const, damping: 28, stiffness: 300 },
  },
}

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.05, type: "spring" as const, damping: 25, stiffness: 300 },
  }),
}

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, handleKeyDown])

  useEffect(() => {
    onClose()
  }, [pathname])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-white/10 bg-white/80 backdrop-blur-2xl dark:bg-zinc-950/80"
          >
            <div className="flex items-center justify-between border-b border-zinc-200/50 px-5 py-4 dark:border-zinc-800/50">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
                onClick={onClose}
              >
                Haseeb
              </Link>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <motion.li
                      key={item.href}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                        )}
                      >
                        <Icon
                          size={18}
                          className={cn(
                            "shrink-0 transition-colors",
                            isActive
                              ? "text-white dark:text-zinc-900"
                              : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                          )}
                        />
                        {item.label}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            <div className="border-t border-zinc-200/50 px-5 py-4 dark:border-zinc-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    >
                      <link.icon size={16} />
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                  <Sun size={16} className="hidden dark:block" />
                  <Moon size={16} className="block dark:hidden" />
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
