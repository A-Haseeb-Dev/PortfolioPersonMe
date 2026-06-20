"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Globe,
  Smartphone,
  Cloud,
  Database,
  Cpu,
  BrainCircuit,
  Code2,
  ChevronRight,
  X,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const services = [
  {
    id: "web-development",
    title: "Web Development",
    tagline: "Full-stack apps that ship fast and scale hard",
    icon: Globe,
    color: "from-blue-500 to-cyan-400",
    description:
      "Production-grade web applications built with Next.js, React, Node.js, and modern frameworks. Performance-obsessed, SEO-optimized, and accessible by default.",
    features: [
      "Single-page & server-rendered apps",
      "REST & GraphQL APIs",
      "Authentication & authorization",
      "Database design & optimization",
      "CI/CD & deployment",
      "Performance auditing",
    ],
    price: "Starting at $500",
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    tagline: "Cross-platform native experiences",
    icon: Smartphone,
    color: "from-purple-500 to-pink-400",
    description:
      "Cross-platform mobile applications using React Native and Expo. One codebase, native feel on both iOS and Android.",
    features: [
      "iOS & Android from one codebase",
      "Push notifications",
      "Offline-first architecture",
      "App store deployment",
      "Real-time sync",
      "Custom animations",
    ],
    price: "Starting at $800",
  },
  {
    id: "saas-development",
    title: "SaaS Development",
    tagline: "Build your product, not infrastructure",
    icon: Cloud,
    color: "from-emerald-500 to-teal-400",
    description:
      "End-to-end SaaS platforms with multi-tenancy, subscription billing, and scalable cloud infrastructure.",
    features: [
      "Multi-tenant architecture",
      "Subscription & billing (Stripe)",
      "Team collaboration features",
      "Analytics dashboards",
      "Scalable cloud deployment",
      "Admin portals",
    ],
    price: "Starting at $2,000",
  },
  {
    id: "api-development",
    title: "API Development",
    tagline: "APIs that developers love to use",
    icon: Code2,
    color: "from-amber-500 to-orange-400",
    description:
      "Robust, type-safe APIs with automatic documentation, rate limiting, and monitoring out of the box.",
    features: [
      "RESTful & GraphQL APIs",
      "Type-safe with tRPC / OpenAPI",
      "Auto-generated docs",
      "Rate limiting & caching",
      "WebSocket support",
      "Monitoring & logging",
    ],
    price: "Starting at $400",
  },
  {
    id: "database-design",
    title: "Database Design",
    tagline: "Data architecture that just works",
    icon: Database,
    color: "from-sky-500 to-indigo-400",
    description:
      "Schema design, query optimization, and data modeling for relational and NoSQL databases.",
    features: [
      "ERD & data modeling",
      "Query optimization",
      "Migration strategies",
      "Replication & sharding",
      "Backup & recovery",
      "Performance tuning",
    ],
    price: "Starting at $300",
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    tagline: "Intelligence baked into your product",
    icon: BrainCircuit,
    color: "from-rose-500 to-red-400",
    description:
      "Integrate LLMs, chatbots, recommendation engines, and automation into your workflow.",
    features: [
      "Chatbots & virtual assistants",
      "Content generation pipelines",
      "Data extraction & analysis",
      "Recommendation engines",
      "Process automation",
      "Model fine-tuning",
    ],
    price: "Starting at $600",
  },
  {
    id: "consulting",
    title: "Consulting",
    tagline: "Strategic technical guidance",
    icon: Cpu,
    color: "from-zinc-600 to-zinc-400",
    description:
      "Code reviews, architecture design, tech stack planning, and best-practice guidance for your team.",
    features: [
      "Architecture review",
      "Code quality audits",
      "Tech stack evaluation",
      "Performance consulting",
      "Security assessments",
      "Team mentoring",
    ],
    price: "$200 / hr",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

interface ServicesGridProps {
  onSelect: (service: (typeof services)[0] | null) => void
  selectedId?: string | null
}

export { services }

export default function ServicesGrid({ onSelect, selectedId }: ServicesGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {services.map((service) => {
        const Icon = service.icon
        const isSelected = selectedId === service.id
        return (
          <motion.div key={service.id} variants={cardVariants} layout>
            <GlassCard
              intensity="light"
              className={cn(
                "group relative cursor-pointer overflow-hidden p-6",
                isSelected && "ring-2 ring-zinc-900 dark:ring-zinc-50"
              )}
              onClick={() => onSelect(isSelected ? null : service)}
            >
              <div
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  "bg-gradient-to-br",
                  service.color
                )}
                style={{ maskImage: "radial-gradient(circle at 0% 0%, black, transparent 70%)" }}
              />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm transition-transform duration-300 group-hover:scale-110",
                      service.color,
                      "text-white"
                    )}
                  >
                    <Icon size={22} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 text-zinc-300 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-zinc-600"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  {service.tagline}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.features.slice(0, 3).map((f) => (
                    <Badge key={f} variant="secondary" className="text-xs">
                      {f}
                    </Badge>
                  ))}
                  {service.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{service.features.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {service.price}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-50 dark:group-hover:text-zinc-300">
                    View details
                    <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
