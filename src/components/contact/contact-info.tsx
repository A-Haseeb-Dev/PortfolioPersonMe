"use client"

import { motion } from "framer-motion"
import {
  MessageCircle,
  Briefcase,
  Code2,
  Share2,
  Camera,
  Mail,
  Send,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"

interface ContactLink {
  name: string
  icon: LucideIcon
  url: string
  label: string
  color: string
  gradient: string
}

const contactLinks: ContactLink[] = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/923XXXXXXXXX",
    label: "Chat on WhatsApp",
    color: "text-emerald-500",
    gradient: "from-emerald-500 to-emerald-400",
  },
  {
    name: "LinkedIn",
    icon: Briefcase,
    url: "https://linkedin.com/in/abdul-haseeb",
    label: "Connect on LinkedIn",
    color: "text-blue-600",
    gradient: "from-blue-500 to-blue-400",
  },
  {
    name: "GitHub",
    icon: Code2,
    url: "https://github.com/abdulhaseeb",
    label: "Follow on GitHub",
    color: "text-zinc-900 dark:text-zinc-50",
    gradient: "from-zinc-700 to-zinc-500",
  },
  {
    name: "Facebook",
    icon: Share2,
    url: "https://facebook.com/abdul.haseeb",
    label: "Friend on Facebook",
    color: "text-blue-600",
    gradient: "from-blue-600 to-blue-500",
  },
  {
    name: "Instagram",
    icon: Camera,
    url: "https://instagram.com/abdul.haseeb",
    label: "Follow on Instagram",
    color: "text-pink-600",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:haseeb@example.com",
    label: "Send an email",
    color: "text-amber-600",
    gradient: "from-amber-500 to-orange-400",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function ContactInfo() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-5"
    >
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Connect With Me
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Reach out directly through any of these platforms
        </p>
      </div>

      {contactLinks.map((link) => {
        const Icon = link.icon
        return (
          <motion.div key={link.name} variants={itemVariants}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <GlassCard
                intensity="light"
                className="relative overflow-hidden p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${link.gradient.replace("from-", "").split(" to")[0].trim()}, ${link.gradient.replace("to-", "").split(" ")[1]?.trim() || "transparent"})`,
                    opacity: 0.08,
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon
                        size={20}
                        className="text-zinc-700 dark:text-zinc-300"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {link.name}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {link.label}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="gap-1 text-xs">
                    Send
                    <ArrowUpRight size={12} />
                  </Button>
                </div>
              </GlassCard>
            </a>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
