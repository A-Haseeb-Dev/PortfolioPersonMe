"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "light" | "medium" | "heavy"
  border?: boolean
  hover?: boolean
}

const intensityStyles = {
  light: "bg-[var(--card-bg-30)] backdrop-blur-md",
  medium: "bg-[var(--card-bg-50)] backdrop-blur-xl",
  heavy: "bg-[var(--card-bg-70)] backdrop-blur-2xl",
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = "medium", border = true, hover = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl shadow-lg",
        intensityStyles[intensity],
        border && "border border-border/20",
        hover && "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
