"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import {
  Menu,
  Sun,
  Moon,
  ChevronDown,
  BookOpen,
  BrainCircuit,
  Building2,
  ChevronRight,
  ArrowUp,
  Sparkles,
  FileText,
  Layers,
  PenLine,
} from "lucide-react"
import { cn } from "@/lib/utils"
import MobileNav from "./mobile-nav"

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Blog", href: "/blog", icon: PenLine, description: "Articles, insights and tutorials" },
      { label: "Knowledge", href: "/knowledge", icon: Layers, description: "Documentation and guides" },
      { label: "Case Studies", href: "/case-studies", icon: FileText, description: "Real-world projects" },
    ],
  },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Learning", href: "/learning", icon: BookOpen, description: "My learning journey" },
    ],
  },
]

const linkVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
}

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [reveal, setReveal] = useState(false)
  const lastScrollY = useRef(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      setScrolled(currentScrollY > 20)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? currentScrollY / docHeight : 0)

      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const atTop = window.scrollY <= 80
      if (atTop) {
        setReveal(false)
        return
      }
      if (e.clientY < 80) {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
        setReveal(true)
      } else if (e.clientY > 120) {
        if (!hideTimeoutRef.current) {
          hideTimeoutRef.current = setTimeout(() => {
            setReveal(false)
            hideTimeoutRef.current = null
          }, 200)
        }
      }
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isActive = (href: string) => pathname === href
  const show = visible || reveal

  return (
    <>
      <div
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-30"
      >
        <motion.header
          initial={false}
          animate={{
            y: show ? 0 : -120,
            opacity: show ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative mt-3">
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl transition-all duration-500",
                  "border",
                  scrolled
                    ? "border-zinc-200/70 bg-white/80 shadow-lg shadow-black/[0.03] backdrop-blur-2xl dark:border-zinc-700/50 dark:bg-zinc-950/85 dark:shadow-zinc-950/50"
                    : "border-transparent bg-white/30 backdrop-blur-xl dark:bg-zinc-950/30"
                )}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/50 to-transparent dark:from-white/[0.02]" />
              </div>

              {scrolled && (
                <div className="pointer-events-none absolute -bottom-[1px] left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent dark:via-zinc-400/20" />
              )}

              <div className="relative flex h-14 items-center justify-between px-4">
                <Link
                  href="/"
                  className="group flex items-center gap-2.5"
                >
                  <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-zinc-900 text-xs font-bold tracking-tight text-white shadow-sm transition-transform duration-200 group-hover:scale-105 dark:bg-white dark:text-zinc-900">
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent" />
                    H
                  </span>
                  <div className="hidden sm:block">
                    <span className="text-sm font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-50 dark:group-hover:text-zinc-300">
                      Muhammad Haseeb
                    </span>
                    <span className="block text-[10px] font-medium tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                      Full-Stack Developer
                    </span>
                  </div>
                </Link>

                <nav className="hidden md:flex md:items-center md:gap-1" ref={dropdownRef}>
                  {navItems.map((item) => {
                    const active = !item.children && isActive(item.href)
                    const hasChildren = !!item.children
                    const isOpen = openDropdown === item.label

                    return (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link
                          href={item.href}
                          onFocus={() => hasChildren && handleMouseEnter(item.label)}
                          className={cn(
                            "relative flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all duration-150",
                            active
                              ? "text-zinc-900 dark:text-zinc-50"
                              : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                          )}
                        >
                          {active && (
                            <motion.span
                              layoutId="nav-active"
                              className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-zinc-800/60"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                          <motion.span
                            className="relative z-10"
                            variants={linkVariants}
                            initial="rest"
                            whileHover="hover"
                          >
                            {item.label}
                          </motion.span>
                          {hasChildren && (
                            <ChevronDown
                              size={12}
                              className={cn(
                                "relative z-10 transition-transform duration-150",
                                isOpen && "rotate-180"
                              )}
                            />
                          )}
                        </Link>

                        <AnimatePresence>
                          {hasChildren && isOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.96 }}
                              transition={{ type: "spring", damping: 24, stiffness: 320 }}
                              className="absolute left-0 top-full mt-1.5 w-64 overflow-hidden rounded-xl border border-zinc-200/60 bg-white/90 shadow-xl shadow-black/[0.02] backdrop-blur-2xl dark:border-zinc-700/40 dark:bg-zinc-950/90"
                            >
                              <div className="p-1.5">
                                {item.children?.map((child) => {
                                  const Icon = child.icon
                                  const childActive = isActive(child.href)
                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150",
                                        childActive
                                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-50"
                                      )}
                                    >
                                      <div
                                        className={cn(
                                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors",
                                          childActive
                                            ? "border-zinc-700 bg-zinc-800 text-white dark:border-zinc-300 dark:bg-zinc-100 dark:text-zinc-900"
                                            : "border-zinc-200 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                                        )}
                                      >
                                        <Icon size={15} />
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium">{child.label}</span>
                                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                                          {child.description}
                                        </span>
                                      </div>
                                      <ChevronRight
                                        size={13}
                                        className="ml-auto shrink-0 text-zinc-300 dark:text-zinc-600"
                                      />
                                    </Link>
                                  )
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}

                  <div className="ml-3 pl-3 border-l border-zinc-200 dark:border-zinc-700/50">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-1.5 text-[13px] font-medium text-white transition-all duration-150 hover:bg-zinc-800 hover:shadow-sm active:scale-[0.97] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                    >
                      Let&apos;s Talk
                      <ArrowUp size={13} className="rotate-45" />
                    </Link>
                  </div>
                </nav>

                <div className="flex items-center gap-1">
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-all duration-150 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                      aria-label="Toggle theme"
                    >
                      <Sun size={15} className="hidden dark:block" />
                      <Moon size={15} className="block dark:hidden" />
                    </button>
                  )}

                  <button
                    onClick={() => setMobileOpen(true)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-all duration-150 hover:bg-zinc-100 hover:text-zinc-700 md:hidden dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                    aria-label="Open menu"
                  >
                    <Menu size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-zinc-900/30 via-zinc-600/40 to-transparent dark:from-zinc-400/30 dark:via-zinc-200/25 dark:to-transparent"
            style={{ width: `${scrollProgress * 100}%` }}
            initial={false}
          />
        </motion.header>
      </div>

      <AnimatePresence>
        {!show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/50 bg-white/80 text-zinc-500 shadow-lg shadow-black/[0.02] backdrop-blur-xl transition-all duration-150 hover:border-zinc-300 hover:bg-white hover:text-zinc-800 active:scale-95 dark:border-zinc-700/50 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="h-20" />
    </>
  )
}
