"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: "h-8 w-14",
  md: "h-10 w-18",
  lg: "h-12 w-22",
}

const iconSizeMap = {
  sm: 14,
  md: 16,
  lg: 20,
}

const thumbSizeMap = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
}

const translateMap = {
  sm: "translate-x-6",
  md: "translate-x-8",
  lg: "translate-x-10",
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, size = "md", ...props }, ref) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    if (!mounted) {
      return (
        <div
          className={cn(
            "rounded-full bg-zinc-200 dark:bg-zinc-700",
            sizeMap[size],
            className
          )}
        />
      )
    }

    const isDark = theme === "dark"

    return (
      <button
        ref={ref}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-zinc-200 bg-zinc-100 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800",
          sizeMap[size],
          className
        )}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        {...props}
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 m-1 flex items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 dark:bg-zinc-900",
            thumbSizeMap[size],
            isDark && translateMap[size]
          )}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? (
                <Moon size={iconSizeMap[size]} className="text-zinc-50" />
              ) : (
                <Sun size={iconSizeMap[size]} className="text-amber-500" />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
    )
  }
)
ThemeToggle.displayName = "ThemeToggle"

export { ThemeToggle }
