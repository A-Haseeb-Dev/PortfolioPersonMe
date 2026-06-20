"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"

interface Heading {
  id: string
  text: string
  level: number
}

interface BlogTableOfContentsProps {
  content: string
}

export default function BlogTableOfContents({ content }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("")
  const headings = React.useMemo(() => extractHeadings(content), [content])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <GlassCard intensity="light" border className="p-4">
      <h3 className="mb-3 px-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </h3>
      <nav className="space-y-0.5">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollTo(heading.id)}
            className={cn(
              "flex w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors",
              heading.level === 2 && "pl-3",
              heading.level === 3 && "pl-7",
              heading.level === 4 && "pl-10",
              activeId === heading.id
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </GlassCard>
  )
}

function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const headings: Heading[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length as 2 | 3 | 4
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "")

    headings.push({ id, text, level })
  }

  return headings
}
