"use client"

import { useSettings } from "@/contexts/settings-context"
import { Code2, Users, Building2, Award, type LucideIcon } from "lucide-react"
import { Section } from "@/components/ui/section"
import { StatsCard } from "@/components/ui/stats-card"
import { FadeIn } from "@/components/ui/animated-text"

const defaultIcons: LucideIcon[] = [Code2, Building2, Users, Award]

const defaultStats = [
  { value: 6, label: "Years of Experience", suffix: "+" },
  { value: 50, label: "Projects Delivered", suffix: "+" },
  { value: 20, label: "Happy Clients", suffix: "+" },
  { value: 5, label: "Open Source Contributions", suffix: "+" },
]

export default function StatsSection() {
  const { settings } = useSettings()
  const stats = settings.about?.stats ?? defaultStats

  return (
    <Section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const IconComponent = defaultIcons[index % defaultIcons.length]
          return (
            <FadeIn key={stat.label} delay={0.1 * index}>
              <StatsCard
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                icon={<IconComponent size={20} />}
                variant="glass"
                duration={2}
                className="p-6"
              />
            </FadeIn>
          )
        })}
      </div>
    </Section>
  )
}
