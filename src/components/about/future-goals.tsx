"use client"

import { motion } from "framer-motion"
import { useSettings } from "@/contexts/settings-context"
import {
  Lightbulb,
  Globe,
  BookOpen,
  Layout,
  Users,
  Rocket,
  type LucideIcon,
} from "lucide-react"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { IconBox } from "@/components/ui/icon-box"
import { FadeIn } from "@/components/ui/animated-text"

const iconMap: Record<string, LucideIcon> = {
  Lightbulb, Globe, BookOpen, Layout, Users, Rocket,
}

const defaultGoals = [
  {
    title: "Open Source Impact",
    description:
      "Build and maintain a widely adopted open-source library that solves a real pain point for developers worldwide.",
    icon: "Globe",
    variant: "primary",
  },
  {
    title: "Design System Authority",
    description:
      "Create a comprehensive, accessible design system that empowers teams to ship beautiful UIs faster.",
    icon: "Layout",
    variant: "info",
  },
  {
    title: "Technical Writing",
    description:
      "Write a book or extensive documentation series sharing hard-won lessons about modern web development.",
    icon: "BookOpen",
    variant: "success",
  },
  {
    title: "Community Building",
    description:
      "Launch and nurture a developer community focused on mentorship, collaboration, and knowledge sharing.",
    icon: "Users",
    variant: "warning",
  },
  {
    title: "Startup Founder",
    description:
      "Found a product company that solves a meaningful problem, with a strong emphasis on developer experience and craft.",
    icon: "Rocket",
    variant: "danger",
  },
  {
    title: "Continuous Learning",
    description:
      "Deep-dive into systems programming, AI/ML, or whatever technology sparks curiosity next — staying a perpetual student.",
    icon: "Lightbulb",
    variant: "primary",
  },
]

export default function FutureGoals() {
  const { settings } = useSettings()
  const goalsData = settings.about?.goals ?? defaultGoals

  return (
    <Section
      title="Future Goals"
      subtitle="Ambitions that keep me coding, learning, and building."
    >
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {goalsData.map((goal, index) => {
          const GoalIcon = iconMap[goal.icon] ?? Lightbulb
          return (
            <FadeIn key={goal.title} delay={0.05 * index}>
              <GlassCard
                intensity="light"
                className="group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-zinc-100 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-zinc-800" />
                <div className="relative">
                  <IconBox icon={<GoalIcon size={18} />} variant="primary" size="md" />
                  <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {goal.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {goal.description}
                  </p>
                </div>
              </GlassCard>
            </FadeIn>
          )
        })}
      </div>
    </Section>
  )
}
