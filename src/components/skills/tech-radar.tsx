"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Radar } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
interface RadarItem {
  name: string
  ring: "mastered" | "advanced" | "learning" | "future"
  category: string
  description?: string
}

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
}

interface SkillCategory {
  id: string
  name: string
  icon: React.ComponentType<{ size?: number }>
  color: string
  description: string
}

interface TechRadarProps {
  technologies: Technology[]
  skillCategories: SkillCategory[]
}

const rings = [
  { key: "mastered", label: "Mastered", radius: 0.25, color: "#22c55e", description: "Expert-level proficiency" },
  { key: "advanced", label: "Advanced", radius: 0.5, color: "#3b82f6", description: "Strong working knowledge" },
  { key: "learning", label: "Learning", radius: 0.75, color: "#f59e0b", description: "Currently developing skills" },
  { key: "future", label: "Future Learning", radius: 1, color: "#ef4444", description: "Planned for future" },
]

export default function TechRadar({ technologies, skillCategories }: TechRadarProps) {
  const [hoveredItem, setHoveredItem] = useState<RadarItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const cx = 250
  const cy = 250
  const maxRadius = 200

  const radarData = useMemo<RadarItem[]>(
    () => [
      ...technologies
        .filter((t) => t.experienceLevel === "expert")
        .map((t) => ({ name: t.name, ring: "mastered" as const, category: t.categoryId, description: t.description })),
      ...technologies
        .filter((t) => t.experienceLevel === "advanced")
        .map((t) => ({ name: t.name, ring: "advanced" as const, category: t.categoryId, description: t.description })),
      ...technologies
        .filter((t) => t.experienceLevel === "intermediate")
        .map((t) => ({ name: t.name, ring: "learning" as const, category: t.categoryId, description: t.description })),
      ...technologies
        .filter((t) => t.experienceLevel === "beginner")
        .map((t) => ({ name: t.name, ring: "future" as const, category: t.categoryId, description: t.description })),
    ],
    [technologies]
  )

  const categorizedData = useMemo(() => {
    const cats = skillCategories.map((c) => ({
      ...c,
      angle: (skillCategories.findIndex((sc) => sc.id === c.id) * 2 * Math.PI) / skillCategories.length,
    }))

    const items = radarData
      .filter((item) => !selectedCategory || item.category === selectedCategory)
      .map((item) => {
        const ring = rings.find((r) => r.key === item.ring) || rings[3]
        const catIndex = skillCategories.findIndex((c) => c.id === item.category)
        const baseAngle = (catIndex * 2 * Math.PI) / skillCategories.length
        const jitter = (Math.random() - 0.5) * (Math.PI / 8)
        const angle = baseAngle + jitter

        const r = ring.radius * maxRadius
        const x = cx + r * Math.sin(angle)
        const y = cy - r * Math.cos(angle)

        return { ...item, x, y, ringColor: ring.color, angle }
      })

    return items
  }, [selectedCategory, radarData, skillCategories])

  return (
    <GlassCard intensity="light" className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-600 text-white shadow-sm">
            <Radar size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Tech Radar</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Technology proficiency overview</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 px-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            !selectedCategory
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          )}
        >
          All Categories
        </button>
        {skillCategories.slice(0, 8).map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              selectedCategory === cat.id
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-4 flex items-center justify-center">
        <svg viewBox="0 0 500 500" className="h-[500px] w-full max-w-[500px]">
          {rings.map((ring) => (
            <circle
              key={ring.key}
              cx={cx}
              cy={cy}
              r={ring.radius * maxRadius}
              fill="none"
              stroke={ring.color}
              strokeWidth={1}
              strokeOpacity={0.3}
              className="dark:opacity-20"
            />
          ))}

          {rings.map((ring) => {
            const labelRadius = ring.radius * maxRadius
            return (
              <text
                key={`label-${ring.key}`}
                x={cx + labelRadius + 8}
                y={cy}
                fontSize={10}
                fill={ring.color}
                fontWeight={600}
                className="dark:opacity-70"
                style={{ fontFamily: "system-ui" }}
              >
                {ring.label}
              </text>
            )
          })}

          {categorizedData.map((item, i) => (
            <g
              key={`${item.name}-${i}`}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className="cursor-pointer"
            >
              <motion.circle
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: hoveredItem?.name === item.name ? 10 : 6, opacity: 1 }}
                transition={{ delay: i * 0.01, duration: 0.3 }}
                cx={item.x}
                cy={item.y}
                fill={item.ringColor}
                stroke="#fff"
                strokeWidth={2}
                className="drop-shadow-sm transition-all duration-200"
              />
              <text
                x={item.x}
                y={item.y + (hoveredItem?.name === item.name ? 20 : 16)}
                textAnchor="middle"
                fontSize={hoveredItem?.name === item.name ? 10 : 8}
                fill="#71717a"
                fontWeight={500}
                style={{
                  fontFamily: "system-ui",
                  opacity: hoveredItem?.name === item.name ? 1 : 0.7,
                  transition: "all 0.2s",
                }}
              >
                {item.name}
              </text>
            </g>
          ))}
        </svg>

        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white/90 px-5 py-3 shadow-xl backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/90"
          >
            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{hoveredItem.name}</p>
              <Badge
                variant={
                  hoveredItem.ring === "mastered"
                    ? "success"
                    : hoveredItem.ring === "advanced"
                      ? "info"
                      : hoveredItem.ring === "learning"
                        ? "warning"
                        : "outline"
                }
                className="mt-1 text-[10px]"
              >
                {rings.find((r) => r.key === hoveredItem.ring)?.label}
              </Badge>
              {hoveredItem.description && (
                <p className="mt-1 max-w-xs text-xs text-zinc-500 dark:text-zinc-400">
                  {hoveredItem.description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
        {rings.map((ring) => (
          <div key={ring.key} className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ring.color }} />
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{ring.label}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
