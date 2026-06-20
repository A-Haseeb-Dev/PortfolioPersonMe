"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  CheckCircle2,
  Clock,
  DollarSign,
  X,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ServiceData {
  id: string
  title: string
  tagline: string
  icon: React.ComponentType<{ size?: number }>
  color: string
  description: string
  features: string[]
  price: string
}

interface ServiceDetailProps {
  service: ServiceData
  onClose: () => void
  onInquire: () => void
}

export default function ServiceDetail({ service, onClose, onInquire }: ServiceDetailProps) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-xl"
    >
      <div className={cn("absolute inset-0 opacity-[0.03]", `bg-gradient-to-br ${service.color}`)} />
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-muted"
      >
        <X size={14} />
      </button>
      <div className="relative p-8 sm:p-10">
        <div className="flex items-start gap-5">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm",
              service.color,
              "text-white"
            )}
          >
            <Icon size={28} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {service.title}
            </h2>
            <p className="mt-1 text-base text-muted-foreground">
              {service.tagline}
            </p>
          </div>
        </div>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <Separator className="my-8" />

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            What&apos;s Included
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Est. <strong className="text-foreground">{service.price}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Timeline: <strong className="text-foreground">2-8 weeks</strong>
            </span>
          </div>
          </div>
          <Button onClick={onInquire} size="lg">
            Inquire about this service
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
