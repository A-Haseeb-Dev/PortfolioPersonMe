"use client"

import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function ServicesHeader() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-zinc-200/40 to-transparent blur-3xl dark:from-zinc-800/40" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-zinc-200/30 to-transparent blur-3xl dark:from-zinc-800/30" />
      </div>
      <motion.div variants={itemVariants} className="relative mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-4 py-1.5 text-xs font-medium text-zinc-600 backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-900/50 dark:text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Available for projects
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
          Services I{" "}
          <span className="bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-zinc-50 dark:to-zinc-400">
            Provide
          </span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-xl">
          End-to-end development solutions — from idea to deployment. Every service is
          crafted with modern tech, clean architecture, and obsession for quality.
        </p>
      </motion.div>
    </motion.div>
  )
}
