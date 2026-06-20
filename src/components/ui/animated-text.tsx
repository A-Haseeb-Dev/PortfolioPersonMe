"use client"

import * as React from "react"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursor?: boolean
}

const Typewriter = ({
  text,
  speed = 50,
  delay = 0,
  className,
  cursor = true,
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = React.useState("")
  const [showCursor, setShowCursor] = React.useState(cursor)
  const [started, setStarted] = React.useState(false)

  React.useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(delayTimer)
  }, [delay])

  React.useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayedText(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        if (cursor) {
          setTimeout(() => setShowCursor(false), 2000)
        }
      }
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed, cursor])

  return (
    <span className={cn("font-mono", className)}>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block ml-0.5 h-[1em] w-[2px] bg-current align-middle"
        />
      )}
    </span>
  )
}

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

const TextReveal = ({
  children,
  className,
  delay = 0,
  duration = 0.05,
  once = true,
}: TextRevealProps) => {
  const words = children.split(" ")

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: duration,
        delayChildren: delay,
      },
    },
  }

  const child: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.span
      className={cn("inline", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block" variants={child}>
          {word}
          {index < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface CharRevealProps {
  children: string
  className?: string
  delay?: number
  once?: boolean
}

const CharReveal = ({
  children,
  className,
  delay = 0,
  once = true,
}: CharRevealProps) => {
  const chars = children.split("")

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  }

  const child: Variants = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.span
      className={cn("inline", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      aria-label={children}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={child}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  once?: boolean
  distance?: number
}

const FadeIn = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
  distance = 24,
}: FadeInProps) => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
    >
      {children}
    </motion.div>
  )
}

export { Typewriter, TextReveal, CharReveal, FadeIn }
