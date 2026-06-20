import * as React from "react"
import { cn } from "@/lib/utils"

interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
  size?: "sm" | "md" | "lg" | "xl"
}

const variantStyles = {
  primary: "from-zinc-900 to-zinc-700 text-zinc-50 dark:from-zinc-50 dark:to-zinc-300 dark:text-zinc-900",
  secondary: "from-zinc-100 to-zinc-200 text-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-300",
  success: "from-emerald-500 to-emerald-400 text-white",
  warning: "from-amber-500 to-amber-400 text-white",
  danger: "from-red-500 to-red-400 text-white",
  info: "from-blue-500 to-blue-400 text-white",
}

const sizeStyles = {
  sm: "h-8 w-8 [&>svg]:h-4 [&>svg]:w-4",
  md: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
  lg: "h-12 w-12 [&>svg]:h-6 [&>svg]:w-6",
  xl: "h-16 w-16 [&>svg]:h-8 [&>svg]:w-8",
}

const IconBox = React.forwardRef<HTMLDivElement, IconBoxProps>(
  ({ className, icon, variant = "primary", size = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-gradient-to-br shadow-sm",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon}
    </div>
  )
)
IconBox.displayName = "IconBox"

export { IconBox }
