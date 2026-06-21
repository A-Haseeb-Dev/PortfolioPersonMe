"use client"

import { motion } from "framer-motion"
import { useSettings } from "@/contexts/settings-context"
import { Target, Eye, Sparkles } from "lucide-react"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { FadeIn } from "@/components/ui/animated-text"
import { IconBox } from "@/components/ui/icon-box"

const defaultMission = {
  text: "To craft digital experiences that are not just functional but delightful — bridging the gap between aesthetic design and robust engineering. I believe great software should feel invisible, intuitive, and leave users better off than they were before.",
  bullets: [
    "Ship clean, maintainable code that stands the test of time",
    "Champion accessibility and inclusive design in every project",
    "Share knowledge openly and lift the next generation of developers",
  ],
}

const defaultVision = {
  text: "To build a future where technology amplifies human potential. I envision a world where software adapts to people — not the other way around — and where developers have the tools and community support to create meaningful impact.",
  bullets: [
    "Create tools that empower creators and solve real-world problems",
    "Build a legacy of open-source contributions that outlast any single project",
    "Inspire a culture of craftsmanship, curiosity, and kindness in tech",
  ],
}

export default function MissionVision() {
  const { settings } = useSettings()
  const about = settings.about
  const mission = about?.mission ?? defaultMission
  const vision = about?.vision ?? defaultVision

  return (
    <Section title="Mission & Vision" subtitle="What drives me and where I'm headed.">
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <FadeIn direction="left" delay={0.1}>
          <GlassCard intensity="medium" className="relative overflow-hidden p-8 sm:p-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-zinc-100 to-transparent opacity-50 dark:from-zinc-800" />
            <div className="relative">
              <IconBox icon={<Target size={20} />} variant="primary" size="md" />
              <h3 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Mission
              </h3>
              <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">
                {mission.text}
              </p>
              <ul className="mt-6 space-y-3">
                {mission.bullets.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    <Sparkles size={14} className="mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn direction="right" delay={0.2}>
          <GlassCard intensity="medium" className="relative overflow-hidden p-8 sm:p-10">
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-tr from-zinc-100 to-transparent opacity-50 dark:from-zinc-800" />
            <div className="relative">
              <IconBox icon={<Eye size={20} />} variant="primary" size="md" />
              <h3 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Vision
              </h3>
              <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">
                {vision.text}
              </p>
              <ul className="mt-6 space-y-3">
                {vision.bullets.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    <Sparkles size={14} className="mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </Section>
  )
}
