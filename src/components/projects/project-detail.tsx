"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Code2,
  Play,
  CheckCircle2,
  Lightbulb,
  Siren,
  Building2,
  ListChecks,
  BookOpen,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GlassCard } from "@/components/ui/glass-card"
import type { Project } from "@/types"

export interface ProjectDetailData extends Project {
  problem?: string
  solution?: string
  architecture?: string
  features?: string[]
  videoUrl?: string | null
  results?: string
  lessonsLearned?: string[]
  screenshots?: string[]
  relatedProjects?: Pick<Project, "id" | "title" | "slug" | "image" | "category">[]
}

interface ProjectDetailProps {
  project: ProjectDetailData
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02)_0%,transparent_50%)]" />

      <Container className="relative pt-8">
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </motion.div>
      </Container>

      <Container className="relative pt-8">
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <motion.div {...fadeUp} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant="outline">{project.category}</Badge>
                <Badge
                  variant={
                    project.status === "completed"
                      ? "success"
                      : project.status === "in-progress"
                        ? "warning"
                        : "secondary"
                  }
                >
                  {project.status === "completed"
                    ? "Completed"
                    : project.status === "in-progress"
                      ? "In Progress"
                      : "Planned"}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Code2 className="h-4 w-4" />
                    Source Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.videoUrl && (
                <Button variant="secondary" asChild>
                  <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Play className="h-4 w-4" />
                    Video Demo
                  </a>
                </Button>
              )}
            </motion.div>
          </div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="lg:col-span-1"
          >
            <GlassCard intensity="light" border className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Tech Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <>
                  <Separator className="my-5" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Highlights
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </Container>

      <Container className="relative pt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="overflow-hidden rounded-2xl border-border bg-muted"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[21/9] items-center justify-center bg-muted">
              <span className="text-6xl font-bold text-muted-foreground/50">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>
      </Container>

      <Container className="relative pt-16">
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2 lg:max-w-3xl">
            <div className="space-y-16">
              {project.problem && (
                <DetailSection
                  icon={<Siren className="h-5 w-5" />}
                  title="The Problem"
                  content={project.problem}
                />
              )}

              {project.solution && (
                <DetailSection
                  icon={<Lightbulb className="h-5 w-5" />}
                  title="The Solution"
                  content={project.solution}
                />
              )}

              {project.architecture && (
                <DetailSection
                  icon={<Building2 className="h-5 w-5" />}
                  title="Architecture"
                  content={project.architecture}
                />
              )}

              {project.features && project.features.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <ListChecks className="h-4.5 w-4.5" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      Key Features
                    </h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex items-start gap-3 rounded-xl border-border bg-card p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {project.screenshots && project.screenshots.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <BookOpen className="h-4.5 w-4.5" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      Screenshots
                    </h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.screenshots.map((src, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="overflow-hidden rounded-xl border-border"
                      >
                        <img
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {project.results && (
                <DetailSection
                  icon={<ArrowUpRight className="h-5 w-5" />}
                  title="Results"
                  content={project.results}
                />
              )}

              {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <BookOpen className="h-4.5 w-4.5" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      Lessons Learned
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {project.lessonsLearned.map((lesson, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        className="flex items-start gap-3 rounded-xl border-border bg-card p-4"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {lesson}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <GlassCard intensity="light" border className="p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Project Info
                </h3>
                <div className="mt-4 space-y-3">
                  <InfoRow label="Category" value={project.category} />
                  <InfoRow label="Status" value={project.status} />
                  {project.startDate && (
                    <InfoRow
                      label="Started"
                      value={new Date(project.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    />
                  )}
                  {project.endDate && (
                    <InfoRow
                      label="Completed"
                      value={new Date(project.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    />
                  )}
                </div>
              </GlassCard>

              {project.relatedProjects && project.relatedProjects.length > 0 && (
                <GlassCard intensity="light" border className="p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Related Projects
                  </h3>
                  <div className="mt-3 space-y-3">
                    {project.relatedProjects.map((rp) => (
                      <Link
                        key={rp.id}
                        href={`/projects/${rp.slug}`}
                        className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
                          {rp.title.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground">
                            {rp.title}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {rp.category}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

function DetailSection({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode
  title: string
  content: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon}
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">{content}</p>
    </motion.div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  )
}
