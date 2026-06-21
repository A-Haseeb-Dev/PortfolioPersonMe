"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Search,
  PencilRuler,
  Building2,
  Code2,
  Bug,
  Rocket,
  BarChart3,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"

interface CaseStudy {
  id: string
  title: string
  slug: string
  client: string
  overview: string
  challenge: string
  approach: string
  solution: string
  results: string
  techStack: string[]
  image: string | null
  images: string[]
  testimonial: string | null
  metrics: { label: string; value: string }[]
  featured: boolean
  completedDate: string | null
  duration: string | null
  createdAt: string
  updatedAt: string
  research?: string
  planning?: string
  design?: string
  architecture?: string
  development?: string
  testing?: string
  deployment?: string
  technologies?: string[]
}

interface CaseStudyDetailProps {
  study: CaseStudy
}

const defaultSections = [
  { id: "research", label: "Research", icon: <Search className="h-4 w-4" /> },
  { id: "planning", label: "Planning", icon: <ClipboardList className="h-4 w-4" /> },
  { id: "design", label: "Design", icon: <PencilRuler className="h-4 w-4" /> },
  { id: "architecture", label: "Architecture", icon: <Building2 className="h-4 w-4" /> },
  { id: "development", label: "Development", icon: <Code2 className="h-4 w-4" /> },
  { id: "testing", label: "Testing", icon: <Bug className="h-4 w-4" /> },
  { id: "deployment", label: "Deployment", icon: <Rocket className="h-4 w-4" /> },
]

const sectionIcons: Record<string, React.ReactNode> = {
  research: <Search className="h-5 w-5" />,
  planning: <ClipboardList className="h-5 w-5" />,
  design: <PencilRuler className="h-5 w-5" />,
  architecture: <Building2 className="h-5 w-5" />,
  development: <Code2 className="h-5 w-5" />,
  testing: <Bug className="h-5 w-5" />,
  deployment: <Rocket className="h-5 w-5" />,
}

export function CaseStudyDetail({ study }: CaseStudyDetailProps) {
  const [activeSection, setActiveSection] = React.useState<string>("overview")
  const sectionRefs = React.useRef<Record<string, HTMLDivElement | null>>({})

  const sections = defaultSections.filter((s) => study[s.id as keyof CaseStudy])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )

    for (const ref of Object.values(sectionRefs.current)) {
      if (ref) observer.observe(ref)
    }

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--muted)_0%,transparent_50%)]" />

      <Container className="relative pt-8">
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>
        </motion.div>
      </Container>

      <Container className="relative pt-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{study.client}</Badge>
            {study.duration && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {study.duration}
              </span>
            )}
            {study.completedDate && (
              <span className="text-sm text-muted-foreground">
                {new Date(study.completedDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {study.overview}
          </p>
        </motion.div>
      </Container>

      {study.image && (
        <Container className="relative pt-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="overflow-hidden rounded-2xl border border-border"
          >
            <img src={study.image} alt={study.title} className="w-full object-cover" />
          </motion.div>
        </Container>
      )}

      {study.metrics && study.metrics.length > 0 && (
        <Container className="relative pt-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {study.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-5 text-center shadow-sm"
              >
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </Container>
      )}

      <Container className="relative pt-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <nav className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-4 shadow-sm">
                <h3 className="mb-3 px-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Sections
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => scrollTo("overview")}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activeSection === "overview"
                        ? "bg-foreground font-medium text-background"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <BarChart3 className="h-4 w-4" />
                    Overview
                  </button>
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        activeSection === s.id
                          ? "bg-foreground font-medium text-background"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {s.icon}
                      {s.label}
                    </button>
                  ))}
                  <button
                    onClick={() => scrollTo("results")}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activeSection === "results"
                        ? "bg-foreground font-medium text-background"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <BarChart3 className="h-4 w-4" />
                    Results
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <div className="space-y-20 lg:col-span-3">
            <SectionBlock id="overview" icon={<BarChart3 className="h-5 w-5" />} title="Overview" sectionRefs={sectionRefs}>
              <p className="text-base leading-relaxed text-muted-foreground">
                {study.overview}
              </p>
              {study.challenge && (
                <div className="mt-6 rounded-xl border border-amber-200/60 bg-amber-50/50 p-5 dark:border-amber-900/30 dark:bg-amber-900/10">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-semibold text-amber-800 dark:text-amber-300">
                        The Challenge
                      </h4>
                      <p className="text-sm leading-relaxed text-amber-700/80 dark:text-amber-300/70">
                        {study.challenge}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SectionBlock>

            {study.research && (
              <SectionBlock id="research" icon={sectionIcons.research!} title="Research" sectionRefs={sectionRefs}>
                <ContentBlock content={study.research} />
              </SectionBlock>
            )}

            {study.planning && (
              <SectionBlock id="planning" icon={sectionIcons.planning!} title="Planning" sectionRefs={sectionRefs}>
                <ContentBlock content={study.planning} />
              </SectionBlock>
            )}

            {study.design && (
              <SectionBlock id="design" icon={sectionIcons.design!} title="Design" sectionRefs={sectionRefs}>
                <ContentBlock content={study.design} />
              </SectionBlock>
            )}

            {study.architecture && (
              <SectionBlock id="architecture" icon={sectionIcons.architecture!} title="Architecture" sectionRefs={sectionRefs}>
                <ContentBlock content={study.architecture} />
              </SectionBlock>
            )}

            {study.approach && (
              <SectionBlock id="approach" icon={<Code2 className="h-5 w-5" />} title="Approach" sectionRefs={sectionRefs}>
                <ContentBlock content={study.approach} />
              </SectionBlock>
            )}

            {study.development && (
              <SectionBlock id="development" icon={sectionIcons.development!} title="Development" sectionRefs={sectionRefs}>
                <ContentBlock content={study.development} />
              </SectionBlock>
            )}

            {study.testing && (
              <SectionBlock id="testing" icon={sectionIcons.testing!} title="Testing" sectionRefs={sectionRefs}>
                <ContentBlock content={study.testing} />
              </SectionBlock>
            )}

            {study.deployment && (
              <SectionBlock id="deployment" icon={sectionIcons.deployment!} title="Deployment" sectionRefs={sectionRefs}>
                <ContentBlock content={study.deployment} />
              </SectionBlock>
            )}

            {study.solution && (
              <SectionBlock id="solution" icon={<CheckCircle2 className="h-5 w-5" />} title="Solution" sectionRefs={sectionRefs}>
                <ContentBlock content={study.solution} />
              </SectionBlock>
            )}

            <SectionBlock id="results" icon={<BarChart3 className="h-5 w-5" />} title="Results" sectionRefs={sectionRefs}>
              {study.results && (
                <p className="text-base leading-relaxed text-muted-foreground">
                  {study.results}
                </p>
              )}
              {study.metrics && study.metrics.length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {study.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-5 shadow-sm"
                    >
                      <p className="text-2xl font-bold tracking-tight text-foreground">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </SectionBlock>

            {study.technologies && study.technologies.length > 0 && (
              <div className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Technologies Used
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {study.images && study.images.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Gallery
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {study.images.map((src, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-xl border border-border"
                    >
                      <img src={src} alt={`${study.title} ${i + 1}`} className="w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {study.testimonial && (
              <div className="relative rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-6 shadow-sm sm:p-8">
                <div className="absolute -left-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
                  <Quote className="h-5 w-5" />
                </div>
                <div className="pl-2 pt-6 sm:pl-6 sm:pt-4">
                  <p className="text-base italic leading-relaxed text-muted-foreground">
                    &ldquo;{study.testimonial}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-border/40 pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-[10px] font-bold text-white">
                      {study.client.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {study.client}
                      </p>
                      <p className="text-xs text-muted-foreground">Client</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

function SectionBlock({
  id,
  icon,
  title,
  children,
  sectionRefs,
}: {
  id: string
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  sectionRefs?: React.MutableRefObject<Record<string, HTMLDivElement | null>>
}) {
  return (
    <motion.div
      id={id}
      ref={(el) => {
        if (sectionRefs) sectionRefs.current[id] = el
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon}
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
      </div>
      {children}
    </motion.div>
  )
}

function ContentBlock({ content }: { content: string }) {
  return <p className="text-base leading-relaxed text-muted-foreground">{content}</p>
}
