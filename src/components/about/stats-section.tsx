"use client"

import { Code2, Users, Building2, Award } from "lucide-react"
import { Section } from "@/components/ui/section"
import { StatsCard } from "@/components/ui/stats-card"
import { FadeIn } from "@/components/ui/animated-text"

const stats = [
  {
    value: 6,
    label: "Years of Experience",
    suffix: "+",
    icon: <Code2 size={20} />,
  },
  {
    value: 50,
    label: "Projects Delivered",
    suffix: "+",
    icon: <Building2 size={20} />,
  },
  {
    value: 20,
    label: "Happy Clients",
    suffix: "+",
    icon: <Users size={20} />,
  },
  {
    value: 5,
    label: "Open Source Contributions",
    suffix: "+",
    icon: <Award size={20} />,
  },
]

export default function StatsSection() {
  return (
    <Section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <FadeIn key={stat.label} delay={0.1 * index}>
            <StatsCard
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              icon={stat.icon}
              variant="glass"
              duration={2}
              className="p-6"
            />
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
