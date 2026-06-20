"use client"

import { motion } from "framer-motion"
import { useData } from "@/hooks/use-data"
import { startupIdeas as staticIdeas } from "@/data/startup-ideas"
import StartupCard from "./startup-card"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export default function StartupGrid() {
  const startupIdeas = useData("/api/startup-ideas", staticIdeas)
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
