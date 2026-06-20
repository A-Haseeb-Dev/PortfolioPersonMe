"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRightLeft, BarChart3, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { technologies, type Technology } from "@/data/skills"

export default function TechComparison() {
  const [techA, setTechA] = useState<string>(technologies[2]?.id || "")
  const [techB, setTechB] = useState<string>(technologies[3]?.id || "")

  const tech1 = technologies.find((t) => t.id === techA)
  const tech2 = technologies.find((t) => t.id === techB)

  const comparisonFields: {
    label: string
    renderA: () => React.ReactNode
    renderB: () => React.ReactNode
  }[] = [
    {
      label: "Experience Level",
      renderA: () => (
        <Badge
          variant={
            tech1?.experienceLevel === "expert"
              ? "success"
              : tech1?.experienceLevel === "advanced"
                ? "info"
                : tech1?.experienceLevel === "intermediate"
                  ? "warning"
                  : "outline"
          }
          className="capitalize"
        >
          {tech1?.experienceLevel}
        </Badge>
      ),
      renderB: () => (
        <Badge
          variant={
            tech2?.experienceLevel === "expert"
              ? "success"
              : tech2?.experienceLevel === "advanced"
                ? "info"
                : tech2?.experienceLevel === "intermediate"
                  ? "warning"
                  : "outline"
          }
          className="capitalize"
        >
          {tech2?.experienceLevel}
        </Badge>
      ),
    },
    {
      label: "Years Experience",
      renderA: () => (
        <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {tech1?.yearsExperience}
        </span>
      ),
      renderB: () => (
        <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {tech2?.yearsExperience}
        </span>
      ),
    },
    {
      label: "Proficiency",
      renderA: () => (
        <div className="space-y-1.5">
          <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <motion.div
              key={tech1?.id}
              initial={{ width: 0 }}
              animate={{ width: `${tech1?.proficiency || 0}%` }}
              className="h-full rounded-full"
              style={{ backgroundColor: tech1?.color }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {tech1?.proficiency}%
          </span>
        </div>
      ),
      renderB: () => (
        <div className="space-y-1.5">
          <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <motion.div
              key={tech2?.id}
              initial={{ width: 0 }}
              animate={{ width: `${tech2?.proficiency || 0}%` }}
              className="h-full rounded-full"
              style={{ backgroundColor: tech2?.color }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {tech2?.proficiency}%
          </span>
        </div>
      ),
    },
    {
      label: "Use Cases",
      renderA: () => (
        <div className="flex flex-wrap gap-1.5">
          {tech1?.useCases.map((uc) => (
            <span
              key={uc}
              className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {uc}
            </span>
          ))}
        </div>
      ),
      renderB: () => (
        <div className="flex flex-wrap gap-1.5">
          {tech2?.useCases.map((uc) => (
            <span
              key={uc}
              className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {uc}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Key Features",
      renderA: () => (
        <ul className="space-y-1.5">
          {tech1?.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: tech1?.color }} />
              {f}
            </li>
          ))}
        </ul>
      ),
      renderB: () => (
        <ul className="space-y-1.5">
          {tech2?.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: tech2?.color }} />
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Projects",
      renderA: () => (
        <div className="space-y-1.5">
          {tech1?.projects.map((p) => (
            <div
              key={p}
              className="rounded-md border border-zinc-100 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            >
              {p}
            </div>
          ))}
        </div>
      ),
      renderB: () => (
        <div className="space-y-1.5">
          {tech2?.projects.map((p) => (
            <div
              key={p}
              className="rounded-md border border-zinc-100 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            >
              {p}
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <GlassCard intensity="light" className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
            <ArrowRightLeft size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Technology Comparison</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Compare features, experience, and use cases</p>
          </div>
        </div>
        <Badge variant="secondary" className="gap-1 text-xs">
          <BarChart3 size={11} />
          Side by Side
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 px-6">
        <Select value={techA} onValueChange={setTechA}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select technology" />
          </SelectTrigger>
          <SelectContent>
            {technologies.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                <span className="flex items-center gap-2">
                  <span>{t.icon}</span>
                  {t.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={techB} onValueChange={setTechB}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select technology" />
          </SelectTrigger>
          <SelectContent>
            {technologies.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                <span className="flex items-center gap-2">
                  <span>{t.icon}</span>
                  {t.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence mode="wait">
        {tech1 && tech2 ? (
          <motion.div
            key={`${tech1.id}-${tech2.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 border-t border-zinc-100 dark:border-zinc-800"
          >
            <div className="grid grid-cols-[120px_1fr_1fr] gap-px bg-zinc-100 dark:bg-zinc-800">
              <div className="bg-zinc-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                Field
              </div>
              <div
                className="bg-white px-4 py-3 text-sm font-semibold dark:bg-zinc-950"
                style={{ color: tech1.color }}
              >
                <span className="mr-2">{tech1.icon}</span>
                {tech1.name}
              </div>
              <div
                className="bg-white px-4 py-3 text-sm font-semibold dark:bg-zinc-950"
                style={{ color: tech2.color }}
              >
                <span className="mr-2">{tech2.icon}</span>
                {tech2.name}
              </div>

              {comparisonFields.map((field) => (
                <div key={field.label} className="contents">
                  <div className="flex items-center bg-zinc-50 px-4 py-4 text-xs font-medium text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                    {field.label}
                  </div>
                  <div className="bg-white px-4 py-4 dark:bg-zinc-950">
                    {field.renderA()}
                  </div>
                  <div className="bg-white px-4 py-4 dark:bg-zinc-950">
                    {field.renderB()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <ArrowRightLeft size={40} className="mb-4 text-zinc-300 dark:text-zinc-600" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Select two technologies to compare
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  )
}
