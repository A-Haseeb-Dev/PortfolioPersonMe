"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, TrendingUp, Users, Clock, DollarSign, ArrowRight, ChevronRight, AlertCircle, Route, Target, Quote } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

const caseStudies = [
  {
    title: "SaaS Platform Redesign & Optimization",
    client: "TechFlow Inc.",
    industry: "SaaS",
    description:
      "Complete platform overhaul resulting in significant performance improvements and user engagement growth.",
    metrics: [
      { label: "Performance", value: "3.2x", icon: TrendingUp },
      { label: "Users", value: "+156%", icon: Users },
      { label: "Revenue", value: "+89%", icon: DollarSign },
    ],
    slug: "/case-studies/techflow-redesign",
    accent: "from-blue-500 to-cyan-500",
    accentLight: "bg-blue-50 dark:bg-blue-950/30",
    accentText: "text-blue-600 dark:text-blue-400",
    challenge: "The existing platform suffered from slow load times, poor mobile experience, and a 45% bounce rate. Users complained about complex navigation and outdated UI patterns.",
    approach: "Conducted user research with 200+ users, built a new design system with reusable components, migrated from REST to GraphQL for faster data fetching, and implemented server-side rendering.",
    results: "Page load time improved 3.2x, mobile traffic increased 89%, and the bounce rate dropped from 45% to 18% within three months of launch.",
    testimonial: {
      text: "The redesign completely transformed our platform. Our users love the new experience, and the performance gains have directly impacted our bottom line.",
      author: "Sarah Chen",
      role: "CTO, TechFlow Inc.",
    },
  },
  {
    title: "E-Commerce Migration & Scaling",
    client: "ShopGlobal",
    industry: "E-Commerce",
    description:
      "Migrated monolithic architecture to microservices, enabling seamless scaling across 12 new markets.",
    metrics: [
      { label: "Load Time", value: "-78%", icon: Clock },
      { label: "Conversion", value: "+43%", icon: TrendingUp },
      { label: "Markets", value: "12", icon: Users },
    ],
    slug: "/case-studies/shopglobal-migration",
    accent: "from-emerald-500 to-teal-500",
    accentLight: "bg-emerald-50 dark:bg-emerald-950/30",
    accentText: "text-emerald-600 dark:text-emerald-400",
    challenge: "The monolithic PHP platform couldn't handle traffic spikes during sales events. Checkout failures peaked at 12% during Black Friday, costing significant revenue.",
    approach: "Decomposed the monolith into 12 microservices, implemented event-driven architecture with message queues, and set up auto-scaling Kubernetes clusters across three regions.",
    results: "Zero downtime during the next Black Friday (3M+ visitors), 78% faster page loads, and expansion into 12 new international markets within six months.",
    testimonial: {
      text: "Migrating to microservices was a daunting task, but the results speak for themselves. We haven't had a single outage since deployment.",
      author: "Marcus Rodriguez",
      role: "VP of Engineering, ShopGlobal",
    },
  },
  {
    title: "AI-Powered Analytics Dashboard",
    client: "DataVue Analytics",
    industry: "Analytics",
    description:
      "Built real-time analytics platform with AI-driven insights, processing 2M+ events daily with sub-second latency.",
    metrics: [
      { label: "Events/Day", value: "2M+", icon: TrendingUp },
      { label: "Latency", value: "<1s", icon: Clock },
      { label: "Uptime", value: "99.99%", icon: Users },
    ],
    slug: "/case-studies/datavue-analytics",
    accent: "from-violet-500 to-purple-500",
    accentLight: "bg-violet-50 dark:bg-violet-950/30",
    accentText: "text-violet-600 dark:text-violet-400",
    challenge: "The client needed a real-time analytics dashboard that could process millions of events while providing AI-driven insights without requiring a data science team.",
    approach: "Architected a streaming data pipeline using Kafka and Flink, built custom anomaly detection models, and created an intuitive drag-and-drop dashboard builder.",
    results: "Processing 2M+ events daily with sub-second query latency, 99.99% uptime over 12 months, and anomaly detection that catches 94% of issues before they impact users.",
    testimonial: {
      text: "This platform has become the central nervous system of our operations. The AI insights alone have saved us countless hours.",
      author: "Emily Nakamura",
      role: "Head of Data, DataVue Analytics",
    },
  },
]

const metricIcons: Record<string, React.ElementType> = {
  TrendingUp,
  Users,
  Clock,
  DollarSign,
}

export default function FeaturedCaseStudies() {
  const [selected, setSelected] = React.useState(0)

  return (
    <Section
      title="Case Studies"
      subtitle="Real projects, real results. See how I've helped businesses transform their digital presence."
      action={
        <Button variant="ghost" size="sm" asChild>
          <a href="/case-studies">
            View All Case Studies
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      }
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="w-full shrink-0 space-y-1 lg:w-72 xl:w-80 lg:max-h-[600px] lg:overflow-y-auto">
          {caseStudies.map((study, index) => (
            <button
              key={study.title}
              onClick={() => setSelected(index)}
              className={cn(
                "group relative flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-200",
                selected === index
                  ? "bg-muted shadow-sm"
                  : "hover:bg-muted"
              )}
            >
              <div className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200",
                selected === index
                  ? cn("bg-gradient-to-br shadow-sm text-white", study.accent)
                  : "bg-muted text-muted-foreground"
              )}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "text-sm font-medium truncate transition-colors duration-200",
                  selected === index
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}>
                  {study.title}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{study.client}</div>
              </div>
              <ChevronRight className={cn(
                "h-4 w-4 shrink-0 transition-all duration-200",
                selected === index
                  ? "translate-x-0 opacity-100 text-muted-foreground"
                  : "-translate-x-1 opacity-0"
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
              transition={{ duration: 0.25 }}
            >
              {(() => {
                const study = caseStudies[selected]
                return (
                  <GlassCard intensity="light" hover={false} className="relative h-full overflow-hidden">
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.02]", study.accent)} />
                    <div className="relative h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <div className={cn("h-2 w-full bg-gradient-to-r", study.accent)} />
                        <div className="px-6 sm:px-8 pt-6 sm:pt-8">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", study.accentLight)}>
                                <Target className={cn("h-5 w-5", study.accentText)} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider">
                                    {study.industry}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{study.client}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h3 className="mt-4 text-xl font-bold leading-snug text-foreground sm:text-2xl">
                            {study.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {study.description}
                          </p>
                        </div>
                      </div>
                      <div className="px-6 sm:px-8 mt-6">
                        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-muted">
                          {study.metrics.map((metric) => {
                            const Icon = metricIcons[metric.label] || TrendingUp
                            return (
                              <div key={metric.label} className="flex flex-col items-center justify-center gap-1 bg-card px-4 py-4">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                                <div className={cn("text-xl font-bold tracking-tight", study.accentText)}>
                                  {metric.value}
                                </div>
                                <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                                  {metric.label}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="px-6 sm:px-8 mt-6 space-y-5 pb-6 sm:pb-8">
                          <div className="flex gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/30">
                            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-foreground">The Challenge</h4>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{study.challenge}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", study.accentLight)}>
                            <Route className={cn("h-4 w-4", study.accentText)} />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-foreground">The Approach</h4>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{study.approach}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                            <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-foreground">The Results</h4>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{study.results}</p>
                          </div>
                        </div>
                        <div className="relative rounded-xl border border-border bg-muted/50 px-5 py-4">
                          <Quote className="h-5 w-5 text-muted-foreground/40" />
                          <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
                            &ldquo;{study.testimonial.text}&rdquo;
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                              {study.testimonial.author.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-foreground">{study.testimonial.author}</p>
                              <p className="text-[10px] text-muted-foreground">{study.testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-border pt-4">
                          <a
                            href={study.slug}
                            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                          >
                            Read full case study
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                          </a>
                        </div>
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
