"use client"

import { motion } from "framer-motion"

export default function ResourcesHeader() {
  return (
    <section className="relative overflow-hidden pb-8 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-100/60 to-transparent blur-3xl dark:from-violet-950/40" />
        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-amber-100/50 to-transparent blur-3xl dark:from-amber-950/30" />
      </div>
      <div className="relative mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-4 py-1.5 text-xs font-medium text-zinc-600 backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-900/50 dark:text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            Free downloads & references
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl"
        >
          Resources &{" "}
          <span className="bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-zinc-50 dark:to-zinc-400">
            Downloads
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400"
        >
          Resumes, certificates, cheat sheets, and guides — everything you need to level up your development career.
        </motion.p>
      </div>
    </section>
  )
}
