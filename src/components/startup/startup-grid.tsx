"use client"

import { motion } from "framer-motion"
import { useData } from "@/hooks/use-data"
import StartupCard from "./startup-card"

interface StartupIdea {
  id: string
  title: string
  slug: string
  problem: string
  solution: string
  market: string
  revenueModel: string
  status: string
  published: boolean
  createdAt: string
  updatedAt: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export default function StartupGrid() {
  const startupIdeas = useData<StartupIdea>("/api/startup-ideas", [])
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {startupIdeas.map((idea, index) => (
        <StartupCard key={idea.id} idea={idea} index={index} />
      ))}
    </motion.div>
  )
}
