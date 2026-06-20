"use client"

import * as React from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, type CardProps } from "./card"

interface StatsCardProps extends CardProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  icon?: React.ReactNode
  decimals?: number
  duration?: number
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ value, label, suffix = "", prefix = "", icon, decimals = 0, duration = 2, className, variant = "default", ...props }, ref) => {
    const localRef = React.useRef<HTMLDivElement>(null)
    const combinedRef = (ref as React.RefObject<HTMLDivElement>) || localRef
    const isInView = useInView(combinedRef as React.RefObject<Element>, { once: true, margin: "-50px" })
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, { duration: duration * 1000, damping: 30, stiffness: 50 })
    const displayValue = useTransform(springValue, (latest) =>
      `${prefix}${latest.toFixed(decimals)}${suffix}`
    )

    React.useEffect(() => {
      if (isInView) {
        motionValue.set(value)
      }
    }, [isInView, value, motionValue])

    return (
      <Card ref={combinedRef} variant={variant} className={cn("p-6 text-center", className)} {...props}>
        {icon && (
          <div className="mb-4 flex justify-center text-zinc-500 dark:text-zinc-400">
            {icon}
          </div>
        )}
        <motion.div className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {displayValue}
        </motion.div>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      </Card>
    )
  }
)
StatsCard.displayName = "StatsCard"

export { StatsCard }
