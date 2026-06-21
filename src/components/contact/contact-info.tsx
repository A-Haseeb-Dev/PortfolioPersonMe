"use client"

import { motion } from "framer-motion"
import {
  MessageCircle,
  Briefcase,
  Code2,
  Globe,
  Camera,
  Mail,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/contexts/settings-context"

const iconMap: Record<string, LucideIcon> = {
  whatsapp: MessageCircle,
  linkedin: Briefcase,
  github: Code2,
  facebook: Globe,
  instagram: Camera,
  email: Mail,
  "message-circle": MessageCircle,
  briefcase: Briefcase,
  code2: Code2,
  globe: Globe,
  camera: Camera,
  mail: Mail,
  share2: Globe,
  send: Mail,
}

const colorMap: Record<string, string> = {
  whatsapp: "text-emerald-500",
  linkedin: "text-blue-600",
  github: "text-zinc-900 dark:text-zinc-50",
  facebook: "text-blue-600",
  instagram: "text-pink-600",
  email: "text-amber-600",
}

const gradientMap: Record<string, string> = {
  whatsapp: "from-emerald-500 to-emerald-400",
  linkedin: "from-blue-500 to-blue-400",
  github: "from-zinc-700 to-zinc-500",
  facebook: "from-blue-600 to-blue-500",
  instagram: "from-pink-500 to-rose-400",
  email: "from-amber-500 to-orange-400",
}

interface SocialLink {
  platform: string
  url: string
  label: string
  icon: string
}

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
  const { settings } = useSettings()
  const contactLinks: SocialLink[] = settings.social_links.length > 0
    ? settings.social_links
    : [
        { platform: "whatsapp", url: "https://wa.me/923XXXXXXXXX", label: "Chat on WhatsApp", icon: "whatsapp" },
        { platform: "linkedin", url: "https://linkedin.com/in/abdul-haseeb", label: "Connect on LinkedIn", icon: "linkedin" },
        { platform: "github", url: "https://github.com/abdulhaseeb", label: "Follow on GitHub", icon: "github" },
        { platform: "facebook", url: "https://facebook.com/abdul.haseeb", label: "Friend on Facebook", icon: "facebook" },
        { platform: "instagram", url: "https://instagram.com/abdul.haseeb", label: "Follow on Instagram", icon: "instagram" },
        { platform: "email", url: "mailto:haseeb@example.com", label: "Send an email", icon: "email" },
      ]

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
        const Icon = iconMap[link.icon?.toLowerCase()] || Mail
        const colorClass = colorMap[link.platform?.toLowerCase()] || "text-zinc-500"
        const gradient = gradientMap[link.platform?.toLowerCase()] || "from-zinc-500 to-zinc-400"
        return (
          <motion.div key={link.platform || link.label} variants={itemVariants}>
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
                    background: `linear-gradient(135deg, transparent, transparent)`,
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
                        {link.label || link.platform}
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
