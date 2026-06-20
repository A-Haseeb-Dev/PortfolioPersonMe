"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Karachi",
    location: "Karachi, Pakistan",
    year: "2020 — 2024",
    description:
      "Focused on software engineering, data structures, and human-computer interaction. Dean's list recipient and active member of the computer science society.",
  },
  {
    degree: "Intermediate in Computer Science",
    institution: "Government College",
    location: "Karachi, Pakistan",
    year: "2018 — 2020",
    description:
      "Completed pre-engineering with a focus on mathematics and computer fundamentals. Built first web projects during this time.",
  },
  {
    degree: "Matriculation in Computer Science",
    institution: "The Educators School",
    location: "Karachi, Pakistan",
    year: "2016 — 2018",
    description:
      "Foundation in programming basics, HTML, and CSS. Participated in inter-school coding competitions.",
  },
]

export default function Education() {
  return (
    <Section title="Education" subtitle="The academic foundation that shaped my journey.">
      <div className="mt-10 space-y-0">
        {education.map((item, index) => (
          <EducationEntry key={item.year} item={item} index={index} isLast={index === education.length - 1} />
        ))}
      </div>
    </Section>
  )
}

function EducationEntry({
  item,
  index,
  isLast,
}: {
  item: (typeof education)[number]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className="relative flex gap-6 pb-8">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <GraduationCap size={16} className="text-zinc-600 dark:text-zinc-400" />
        </motion.div>
        {!isLast && (
          <div className="mt-0 h-full w-px bg-gradient-to-b from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900" />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="flex-1 pb-4"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {item.degree}
            </h3>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {item.institution}
            </p>
          </div>
          <Badge variant="outline" className="mt-1 shrink-0 gap-1.5 sm:mt-0">
            <Calendar size={12} />
            {item.year}
          </Badge>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {item.description}
        </p>
        <div className="mt-2 flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
          <MapPin size={12} />
          {item.location}
        </div>
      </motion.div>
    </div>
  )
}
