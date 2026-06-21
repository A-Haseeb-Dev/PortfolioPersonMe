"use client"

import { motion } from "framer-motion"
import { Star, GitFork, AlertCircle, ExternalLink } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"

interface Repo {
  id: string
  name: string
  description: string | null
  stars: number
  forks: number
  issues: number
  language: string | null
  languageColor: string | null
  url: string | null
  topics: string[] | null
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function OpensourceRepos({ repos }: { repos: Repo[] }) {
  return (
    <section className="py-16 sm:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Repositories
          </h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Open source projects I maintain and contribute to
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {repos.map((repo, index) => (
            <motion.div key={repo.id} variants={cardVariants}>
              <a
                href={repo.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <GlassCard
                  intensity="light"
                  className="group relative overflow-hidden p-5 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                          {repo.name}
                          <ExternalLink
                            size={12}
                            className="text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600"
                          />
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {repo.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(repo.topics || []).slice(0, 4).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-[10px]">
                          {topic}
                        </Badge>
                      ))}
                      {(repo.topics || []).length > 4 && (
                        <Badge variant="outline" className="text-[10px]">
                          +{(repo.topics || []).length - 4}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: repo.languageColor || "#888" }}
                        />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={12} />
                        {repo.forks}
                      </span>
                      <span className="flex items-center gap-1">
                        <AlertCircle size={12} />
                        {repo.issues}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
