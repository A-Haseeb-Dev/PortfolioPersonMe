"use client"

import * as React from "react"
import { motion, useAnimationFrame } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParticleBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "particles" | "grid" | "dots"
  particleCount?: number
  speed?: number
  color?: string
}

const ParticleBackground = ({
  className,
  variant = "particles",
  particleCount = 30,
  speed = 0.5,
  color,
  ...props
}: ParticleBackgroundProps) => {
  if (variant === "grid") {
    return <GridBackground className={className} {...props} />
  }
  if (variant === "dots") {
    return <DotGrid className={className} {...props} />
  }
  return <Particles count={particleCount} speed={speed} color={color} className={className} {...props} />
}

const Particles = ({
  count,
  speed,
  color,
  className,
  ...props
}: {
  count: number
  speed: number
  color?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i * 37 + 13) % 100,
      y: (i * 73 + 7) % 100,
      size: ((i * 17) % 3) + 1,
      opacity: 0.3 + ((i * 11) % 5) * 0.04,
      xSpeed: (((i * 23) % 7) - 3) * speed * 0.05,
      ySpeed: (((i * 29) % 7) - 3) * speed * 0.05,
      animDuration: 3 + (i % 5),
    }))
  }, [count, speed])

  const [positions, setPositions] = React.useState(particles.map(p => ({ x: p.x, y: p.y })))

  useAnimationFrame(() => {
    if (!mounted) return
    setPositions(prev =>
      prev.map((pos, i) => ({
        x: (pos.x + particles[i].xSpeed + 100) % 100,
        y: (pos.y + particles[i].ySpeed + 100) % 100,
      }))
    )
  })

  if (!mounted) {
    return <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} {...props} />
  }

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} {...props}>
      {particles.map((p, i) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            backgroundColor: color || "currentColor",
            left: `${positions[i].x}%`,
            top: `${positions[i].y}%`,
          }}
          animate={{ opacity: [p.opacity, p.opacity * 1.5, p.opacity] }}
          transition={{ duration: p.animDuration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

const GridBackground = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "pointer-events-none absolute inset-0",
      "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]",
      "dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]",
      "bg-[size:40px_40px]",
      className
    )}
    {...props}
  />
)

const DotGrid = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "pointer-events-none absolute inset-0",
      "bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)]",
      "dark:bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]",
      "bg-[size:20px_20px]",
      className
    )}
    {...props}
  />
)

export { ParticleBackground }
