import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "./container"

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  action?: React.ReactNode
  containerSize?: "sm" | "md" | "lg" | "xl" | "full"
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, description, breadcrumbs, action, containerSize, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-b border-zinc-200 bg-white pb-8 pt-6 dark:border-zinc-800 dark:bg-zinc-950", className)}
      {...props}
    >
      <Container size={containerSize}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center space-x-1 text-sm text-zinc-500 dark:text-zinc-400">
            <a
              href="/"
              className="flex items-center transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Home</span>
            </a>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="h-3.5 w-3.5" />
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-zinc-900 dark:text-zinc-50">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </Container>
    </div>
  )
)
PageHeader.displayName = "PageHeader"

export { PageHeader, type Breadcrumb }
