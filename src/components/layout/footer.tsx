"use client"

import Link from "next/link"
import {
  Heart,
  MessageCircle,
  Users,
  Code2,
  Globe,
  Camera,
  ArrowUpRight,
} from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const resourceLinks = [
  { label: "Knowledge Base", href: "/knowledge" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
]

const socialLinks = [
  { label: "WhatsApp", href: "https://wa.me/your-number", icon: MessageCircle },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-profile", icon: Users },
  { label: "GitHub", href: "https://github.com/your-username", icon: Code2 },
  { label: "Facebook", href: "https://facebook.com/your-profile", icon: Globe },
  { label: "Instagram", href: "https://instagram.com/your-username", icon: Camera },
]

export default function Footer() {
  return (
    <footer className="footer-bg relative border-t" style={{ borderColor: "var(--footer-border)" }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-900">
                H
              </span>
              Haseeb
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Building premium digital experiences with modern technologies.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-all duration-200 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-all duration-200 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Get In Touch
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Have a project in mind? Let&apos;s work together to bring your ideas to life.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Start a Project
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row" style={{ borderColor: "var(--footer-border)" }}>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Haseeb. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
            Built with
            <Heart size={10} className="fill-current text-red-500" />
            using{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
