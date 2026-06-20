"use client"

import { motion } from "framer-motion"
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

interface ServiceItem {
  id: string
  title: string
  tagline: string
  icon: React.ComponentType<{ size?: number }>
  color: string
  description: string
  features: string[]
  price: string
}

interface ServicesGridProps {
  services: ServiceItem[]
  onSelect: (service: ServiceItem | null) => void
  selectedId?: string | null
}

export default function ServicesGrid({ services, onSelect, selectedId }: ServicesGridProps) {
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
