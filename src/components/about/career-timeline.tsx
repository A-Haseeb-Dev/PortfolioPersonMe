"use client"

import { useRef } from "react"
import { useSettings } from "@/contexts/settings-context"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar, ArrowUpRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const defaultExperiences = [
  {
    role: "Senior Frontend Engineer",
    company: "TechCorp",
    location: "Remote",
    period: "2024 — Present",
    description:
      "Leading the frontend architecture for a SaaS platform serving 50K+ users. Mentoring a team of 4 engineers, driving adoption of modern React patterns, and reducing bundle size by 40%.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "Karachi, Pakistan",
    period: "2022 — 2024",
    description:
      "Built and shipped 3 major product features end-to-end. Designed the component library, implemented CI/CD pipelines, and improved Lighthouse scores from 60 to 95.",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    role: "Junior Developer",
    company: "DevAgency",
    location: "Karachi, Pakistan",
    period: "2021 — 2022",
    description:
      "Developed responsive web applications for 10+ clients across e-commerce, education, and healthcare. Collaborated with designers to pixel-perfect implementations.",
    tags: ["JavaScript", "React", "SCSS", "Firebase"],
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "2019 — 2021",
    description:
      "Delivered 20+ freelance projects for small businesses and startups. Built custom WordPress themes, landing pages, and web applications from scratch.",
    tags: ["HTML/CSS", "JavaScript", "WordPress", "PHP"],
  },
]

export default function CareerTimeline() {
  const { settings } = useSettings()
  const experiences = settings.about?.career ?? defaultExperiences

  return (
    <Section
      title="Career Timeline"
      subtitle="From freelance beginnings to leading engineering teams."
    >
      <div className="relative mt-12">
        <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 sm:left-1/2 sm:-translate-x-px" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <CareerEntry key={exp.period} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function CareerEntry({
  experience,
  index,
}: {
  experience: { role: string; company: string; location: string; period: string; description: string; tags: string[] }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative sm:grid sm:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "absolute left-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-zinc-200 bg-white shadow-sm sm:left-1/2 dark:border-zinc-700 dark:bg-zinc-900",
          isLeft ? "sm:-translate-x-[calc(50%+1.5rem)]" : "sm:translate-x-[calc(50%+1.5rem)]"
        )}
      >
        <Briefcase size={16} className="text-zinc-600 dark:text-zinc-400" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
        className={cn(
          "pl-16 sm:pl-0",
          isLeft ? "sm:pr-12 sm:text-right" : "sm:col-start-2 sm:pl-12"
        )}
      >
        <GlassCard intensity="light" className="p-6">
          <div className="flex flex-col gap-1">
            <div className={cn("flex items-center gap-2", isLeft && "sm:flex-row-reverse")}>
              <Badge variant="outline" className="gap-1.5 text-xs">
                <Calendar size={11} />
                {experience.period}
              </Badge>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {experience.role}
            </h3>
            <div className={cn("flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400", isLeft && "sm:flex-row-reverse")}>
              <span>at {experience.company}</span>
              <span className="text-zinc-300 dark:text-zinc-600">·</span>
              <span>{experience.location}</span>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {experience.description}
          </p>
          <div className={cn("mt-4 flex flex-wrap gap-2", isLeft && "sm:justify-end")}>
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
