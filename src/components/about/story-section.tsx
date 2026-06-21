"use client"

import { useRef } from "react"
import { useSettings } from "@/contexts/settings-context"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"

const defaultMilestones = [
  {
    year: "2018",
    title: "First Line of Code",
    description:
      "Wrote my first HTML page and fell in love with the web. What started as curiosity quickly turned into an obsession with building things on the internet.",
  },
  {
    year: "2019",
    title: "First Freelance Project",
    description:
      "Built a landing page for a local business. The thrill of turning ideas into reality for someone else cemented my decision to pursue development full-time.",
  },
  {
    year: "2020",
    title: "Open Source Contribution",
    description:
      "Made my first open source contribution during the pandemic. Discovered the power of community-driven development and collaborative problem-solving.",
  },
  {
    year: "2021",
    title: "Professional Leap",
    description:
      "Joined a fast-growing startup as a junior developer. Learned production engineering, code reviews, and what it takes to ship reliable software at scale.",
  },
  {
    year: "2022",
    title: "Full-Stack Mastery",
    description:
      "Led the frontend architecture of a major product rewrite. Deep-dived into React, Next.js, and modern design systems to deliver a world-class user experience.",
  },
  {
    year: "2023",
    title: "Tech Lead",
    description:
      "Stepped into a tech lead role, mentoring junior developers and driving technical strategy. Shipped three major projects and spoke at two local meetups.",
  },
  {
    year: "2024",
    title: "Building in Public",
    description:
      "Started documenting my journey publicly — writing about code, design, and the craft of software. Launched several side projects and grew a following.",
  },
]

export default function StorySection() {
  const { settings } = useSettings()
  const milestones = settings.about?.story ?? defaultMilestones

  return (
    <Section
      title="The Story So Far"
      subtitle="Every developer has a journey. Here's mine — from curious beginner to seasoned builder."
    >
      <div className="relative mt-12">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-zinc-200 via-zinc-300 to-transparent dark:from-zinc-800 dark:via-zinc-700 sm:left-1/2 sm:-translate-x-px" />

        <div className="space-y-16">
          {milestones.map((milestone, index) => (
            <TimelineEntry
              key={milestone.year}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

function TimelineEntry({
  milestone,
  index,
}: {
  milestone: { year: string; title: string; description: string }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className="relative pl-12 sm:pl-0"
    >
      <div
        className={`sm:flex sm:items-start sm:gap-8 ${
          isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`absolute left-4 top-1 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-zinc-300 bg-white text-xs font-bold text-zinc-600 sm:left-1/2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 ${
            isLeft ? "sm:-translate-x-8" : "sm:translate-x-8"
          }`}
        >
          {milestone.year.slice(2)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
          className={`sm:w-[calc(50%-2rem)] ${
            isLeft ? "sm:text-right" : "sm:text-left"
          }`}
        >
          <GlassCard intensity="light" className="p-6">
            <div className="mb-1 flex items-center gap-2 sm:hidden">
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                {milestone.year}
              </span>
            </div>
            <div className="mb-2 hidden text-xs font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500 sm:block">
              {milestone.year}
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {milestone.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {milestone.description}
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
