"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, ExternalLink, Calendar, ChevronRight, Shield } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2025",
    credentialUrl: "#",
    category: "Cloud",
    gradient: "from-orange-500 to-amber-500",
    description: "Validates expertise in designing distributed systems on AWS. Covers architecture patterns, security, cost optimization, and operational excellence.",
    skills: ["AWS Architecture", "Cloud Security", "Cost Optimization", "High Availability"],
  },
  {
    title: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "2025",
    credentialUrl: "#",
    category: "Cloud",
    gradient: "from-blue-500 to-cyan-500",
    description: "Demonstrates ability to build scalable, secure, and highly available applications using Google Cloud Platform services and best practices.",
    skills: ["GCP Services", "Kubernetes", "Cloud Functions", "Data Engineering"],
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    date: "2024",
    credentialUrl: "#",
    category: "Frontend",
    gradient: "from-blue-600 to-indigo-600",
    description: "Professional certification covering modern front-end development with React, responsive design, version control, and cross-platform principles.",
    skills: ["React", "JavaScript", "CSS/HTML", "Responsive Design"],
  },
  {
    title: "Deep Learning Specialization",
    issuer: "deeplearning.ai",
    date: "2024",
    credentialUrl: "#",
    category: "AI/ML",
    gradient: "from-violet-500 to-purple-500",
    description: "Comprehensive deep learning specialization covering neural networks, CNNs, RNNs, transformers, and practical applications using TensorFlow.",
    skills: ["Neural Networks", "CNNs", "RNNs", "TensorFlow"],
  },
  {
    title: "Kubernetes Administrator (CKA)",
    issuer: "CNCF",
    date: "2024",
    credentialUrl: "#",
    category: "DevOps",
    gradient: "from-blue-400 to-sky-500",
    description: "Certified Kubernetes Administrator credential validating skills in cluster installation, configuration, management, and troubleshooting.",
    skills: ["Kubernetes", "Container Orchestration", "Cluster Management", "Monitoring"],
  },
  {
    title: "Scrum Master Certified",
    issuer: "Scrum Alliance",
    date: "2023",
    credentialUrl: "#",
    category: "Management",
    gradient: "from-emerald-500 to-teal-500",
    description: "Professional Scrum Master certification covering agile methodologies, sprint planning, team facilitation, and agile project management.",
    skills: ["Agile", "Scrum", "Sprint Planning", "Team Facilitation"],
  },
]

export default function Certifications() {
  const [selected, setSelected] = React.useState(0)

  return (
    <Section
      title="Certifications"
      subtitle="Professional certifications and credentials that validate my expertise."
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="w-full shrink-0 space-y-1 lg:w-72 xl:w-80 lg:max-h-[600px] lg:overflow-y-auto">
          {certifications.map((cert, index) => (
            <button
              key={cert.title}
              onClick={() => setSelected(index)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                selected === index
                  ? "bg-zinc-100 text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br",
                selected === index ? cert.gradient : "from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600"
              )}>
                <Award className={cn("h-4 w-4", selected === index ? "text-white" : "text-zinc-400 dark:text-zinc-500")} />
              </div>
              <div className="flex-1 truncate">
                <div className="truncate">{cert.title}</div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500">{cert.issuer}</div>
              </div>
              <ChevronRight className={cn(
                "h-4 w-4 shrink-0 transition-all duration-200",
                selected === index ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
              )} />
            </button>
          ))}
        </div>
        <div className="relative min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {(() => {
                const cert = certifications[selected]
                return (
                  <GlassCard intensity="light" hover={false} className="h-full overflow-hidden">
                    <div className="p-6 sm:p-8">
                      <div className="mb-6 flex items-start gap-5">
                        <div className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm", cert.gradient)}>
                          <Award className="h-8 w-8 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                            {cert.title}
                          </h3>
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{cert.issuer}</p>
                          <div className="mt-2 flex items-center gap-3">
                            <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[10px] font-medium">
                              {cert.category}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
                              <Calendar className="h-3.5 w-3.5" />
                              {cert.date}
                            </span>
                          </div>
                        </div>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {cert.description}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                        <VerifiedIcon className="h-4 w-4" />
                        <span className="font-medium">Verified Credential</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50/50 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/30 dark:text-zinc-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                )
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}

function VerifiedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
