"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Calendar,
  BarChart3,
  Link,
  Award,
  BookOpen,
  Layers,
  ExternalLink,
  FileText,
  MonitorPlay,
  GraduationCap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
interface Technology {
  id: string
  name: string
  categoryId: string
  icon: string
  description: string
  experienceLevel: string
  yearsExperience: number
  proficiency: number
  color: string
  relatedTechnologies: string[]
  projects: string[]
  certificates: { name: string; issuer: string; url?: string }[]
  learningResources: { name: string; type: string; url: string }[]
  useCases: string[]
  features: string[]
}

interface TechDetailProps {
  tech: Technology | null
  onClose: () => void
  onTechSelect: (tech: Technology) => void
  technologies: Technology[]
}

const experienceColors: Record<string, string> = {
  beginner: "bg-blue-500",
  intermediate: "bg-amber-500",
  advanced: "bg-emerald-500",
  expert: "bg-purple-500",
}

const resourceIcons: Record<string, React.ReactNode> = {
  Documentation: <FileText size={14} />,
  Course: <MonitorPlay size={14} />,
  Book: <BookOpen size={14} />,
  Tutorial: <FileText size={14} />,
  Guide: <FileText size={14} />,
}

export default function TechDetail({ tech, onClose, onTechSelect, technologies }: TechDetailProps) {
  if (!tech) return null

  const relatedTechs = technologies.filter((t) => tech.relatedTechnologies.includes(t.id))

  return (
    <AnimatePresence>
      {tech && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xl border-l border-border bg-background shadow-2xl"
          >
            <ScrollArea className="h-full">
              <div className="relative p-6 sm:p-8">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X size={16} />
                </button>

                <div className="mb-8 flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted text-3xl">
                    {tech.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-foreground">
                      {tech.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tech.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs capitalize",
                          tech.experienceLevel === "expert" && "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                          tech.experienceLevel === "advanced" && "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
                          tech.experienceLevel === "intermediate" && "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                          tech.experienceLevel === "beginner" && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        )}
                      >
                        {tech.experienceLevel}
                      </Badge>
                      <Badge variant="outline" className="gap-1.5 text-xs">
                        <Calendar size={11} />
                        {tech.yearsExperience} year{tech.yearsExperience !== 1 ? "s" : ""}
                      </Badge>
                      <Badge variant="outline" className="gap-1.5 text-xs">
                        <BarChart3 size={11} />
                        {tech.proficiency}% proficiency
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">Proficiency</span>
                    <span className="text-muted-foreground">{tech.proficiency}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${tech.proficiency}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Layers size={15} />
                    Use Cases
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tech.useCases.map((uc) => (
                      <span
                        key={uc}
                        className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Link size={15} />
                    Related Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedTechs.map((rt) => (
                      <button
                        key={rt.id}
                        onClick={() => onTechSelect(rt)}
                        className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-zinc-300 hover:shadow-sm dark:hover:border-zinc-600"
                      >
                        <span>{rt.icon}</span>
                        <span>{rt.name}</span>
                        <ExternalLink size={10} className="opacity-0 transition-opacity group-hover:opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <FileText size={15} />
                    Projects
                  </h3>
                  <div className="space-y-2">
                    {tech.projects.map((project) => (
                      <div
                        key={project}
                        className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm"
                      >
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tech.color }} />
                        <span className="text-muted-foreground">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {tech.certificates.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Award size={15} />
                      Certificates
                    </h3>
                    <div className="space-y-2">
                      {tech.certificates.map((cert) => (
                        <div
                          key={cert.name}
                          className="flex items-center gap-3 rounded-lg border border-amber-100 bg-amber-50/50 px-4 py-2.5 text-sm dark:border-amber-900/30 dark:bg-amber-900/10"
                        >
                          <GraduationCap size={15} className="shrink-0 text-amber-600 dark:text-amber-400" />
                          <div>
                            <span className="font-medium text-foreground">{cert.name}</span>
                            <span className="ml-1.5 text-muted-foreground">by {cert.issuer}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <BookOpen size={15} />
                    Learning Resources
                  </h3>
                  <div className="space-y-2">
                    {tech.learningResources.map((resource) => (
                      <a
                        key={resource.name}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm transition-colors hover:bg-muted"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          {resourceIcons[resource.type] || <BookOpen size={14} />}
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-foreground">{resource.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{resource.type}</span>
                        </div>
                        <ExternalLink size={13} className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Layers size={15} />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {tech.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center border-t border-border pt-6">
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
