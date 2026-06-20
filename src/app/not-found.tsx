import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

const suggestions = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
      <div className="mx-auto max-w-lg text-center">
        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl border border-border bg-card shadow-lg">
            <span className="bg-gradient-to-br from-foreground to-accent bg-clip-text text-6xl font-bold text-transparent">
              404
            </span>
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mb-8 text-balance text-muted-foreground">
          The page you are looking for does not exist or has been moved. Let us
          help you find what you are looking for.
        </p>

        <div className="mb-8">
          <div className="relative mx-auto max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search pages..."
              className="w-full rounded-xl border border-border bg-card px-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion) => (
            <Link
              key={suggestion.href}
              href={suggestion.href}
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary hover:text-secondary-foreground"
            >
              {suggestion.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
