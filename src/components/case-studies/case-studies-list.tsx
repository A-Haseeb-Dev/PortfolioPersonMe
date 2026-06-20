"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Clock, Zap, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import type { CaseStudy } from "@/types"

interface CaseStudiesListProps {
  studies: CaseStudy[]
  isLoading?: boolean
}

const gradients = [
  "from-blue-600 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-purple-600 to-pink-500",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-red-600",
  "from-cyan-500 to-blue-600",
]

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const router = useRouter()
  const gradient = gradients[index % gradients.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div
        onClick={() => router.push(`/case-studies/${study.slug}`)}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-border/60 bg-[var(--card-bg-80)] shadow-sm transition-all duration-300 hover:shadow-lg"
      >
        <div className="relative aspect-[2/1] overflow-hidden bg-muted sm:aspect-[16/9]">
          {study.image ? (
            <img
              src={study.image}
              alt={study.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={cn("flex h-full w-full items-center justify-center bg-gradient-to-br", gradient)}>
              <div className="flex flex-col items-center gap-2 text-white/30">
                <Zap className="h-16 w-16" />
                <span className="text-xs font-medium tracking-widest uppercase">Case Study</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {study.featured && (
            <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 shadow-sm backdrop-blur-sm dark:bg-zinc-900/80 dark:text-zinc-300">
              Featured
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="secondary" className="text-[11px]">
              {study.client}
            </Badge>
            {study.duration && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {study.duration}
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-muted-foreground">
            {study.title}
          </h3>

          {study.metrics && study.metrics.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-muted p-3">
              {study.metrics.slice(0, 4).map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">{metric.value}</span>
                  <span className="text-[11px] text-muted-foreground">{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          {study.techStack && study.techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {study.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {study.techStack.length > 4 && (
                <span className="text-[10px] text-muted-foreground/60">
                  +{study.techStack.length - 4}
                </span>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-foreground">
            Read Case Study
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[var(--card-bg-80)]">
      <Skeleton className="aspect-[16/9] rounded-none" />
      <div className="space-y-3 p-5 sm:p-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-3/4" />
        <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted p-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}

export function CaseStudiesList({ studies, isLoading }: CaseStudiesListProps) {
  if (isLoading) {
    return (
      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    )
  }

  if (studies.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<BarChart3 className="h-6 w-6" />}
          title="No case studies yet"
          description="Case studies are coming soon. Check back for detailed project analyses."
        />
      </Container>
    )
  }

  return (
    <Container className="py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studies.map((study, index) => (
          <CaseStudyCard key={study.id} study={study} index={index} />
        ))}
      </div>
    </Container>
  )
}
