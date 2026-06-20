import * as React from "react"
import { cn } from "@/lib/utils"
import { Container } from "./container"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
  containerSize?: "sm" | "md" | "lg" | "xl" | "full"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, title, subtitle, action, containerSize, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("py-16 sm:py-24", className)}
      {...props}
    >
      <Container size={containerSize}>
        {(title || subtitle || action) && (
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              {title && (
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
)
Section.displayName = "Section"

export { Section }
