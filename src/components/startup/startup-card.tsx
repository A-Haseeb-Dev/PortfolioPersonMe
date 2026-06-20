"use client"

import { motion } from "framer-motion"
import {
  Lightbulb,
  Search,
  Construction,
  Rocket,
  Skull,
  Target,
  Wrench,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import type { StartupIdea } from "@/data/startup-ideas"

const statusConfig: Record<StartupIdea["status"], { label: string; icon: typeof Lightbulb; variant: "warning" | "info" | "success" | "default" | "danger" }> = {
  idea: { label: "Idea", icon: Lightbulb, variant: "warning" },
  validating: { label: "Validating", icon: Search, variant: "info" },
  building: { label: "Building", icon: Construction, variant: "success" },
  launched: { label: "Launched", icon: Rocket, variant: "default" },
  failed: { label: "Failed", icon: Skull, variant: "danger" },
}

interface StartupCardProps {
  idea: StartupIdea
  index: number
}

export default function StartupCard({ idea, index }: StartupCardProps) {
  const status = statusConfig[idea.status]
  const StatusIcon = status.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <GlassCard intensity="light" className="group relative overflow-hidden p-6">
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            "bg-gradient-to-br",
            idea.color
          )}
          style={{ maskImage: "radial-gradient(circle at 0% 0%, black, transparent 70%)" }}
        />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm transition-transform duration-300 group-hover:scale-110",
                idea.color,
                "text-white"
              )}
            >
              {index % 2 === 0 ? <Lightbulb size={20} /> : <Rocket size={20} />}
            </div>
            <Badge variant={status.variant} dot>
              <StatusIcon size={10} className="mr-1" />
              {status.label}
            </Badge>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {idea.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {idea.tagline}
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-2">
              <Target size={14} className="mt-0.5 shrink-0 text-zinc-400" />
              <div>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Problem</span>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{idea.problem}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Wrench size={14} className="mt-0.5 shrink-0 text-zinc-400" />
              <div>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Solution</span>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{idea.solution}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp size={14} className="mt-0.5 shrink-0 text-zinc-400" />
              <div>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Market</span>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{idea.market}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <DollarSign size={14} className="mt-0.5 shrink-0 text-zinc-400" />
              <div>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Revenue Model</span>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{idea.revenueModel}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {idea.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <div className="flex flex-wrap gap-1">
              {idea.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
            <ArrowUpRight
              size={14}
              className="text-zinc-300 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-zinc-600"
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
