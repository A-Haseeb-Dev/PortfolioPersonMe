import * as React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: string
  via?: string
  to?: string
  animate?: boolean
}

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, from, via, to, animate = false, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "bg-clip-text text-transparent",
        from || "from-zinc-900 dark:from-zinc-50",
        via ? `via-${via}` : "",
        to || "to-zinc-500 dark:to-zinc-400",
        "bg-gradient-to-r",
        animate && "animate-gradient motion-safe:bg-gradient-to-r motion-safe:bg-[length:200%_auto]",
        className
      )}
      {...props}
    >
      {children}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </span>
  )
)
GradientText.displayName = "GradientText"

export { GradientText }
