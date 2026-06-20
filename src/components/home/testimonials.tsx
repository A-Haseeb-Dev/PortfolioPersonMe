"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface TestimonialItem {
  id: string
  name: string
  role: string | null
  company: string | null
  content: string
  rating: number
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = React.useState<TestimonialItem[]>([])
  const [current, setCurrent] = React.useState(0)
  const [direction, setDirection] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("/api/testimonials?limit=10")
      .then((r) => r.json())
      .then((json) => {
        const items = json.testimonials || json.data || []
        if (items.length > 0) {
          setTestimonials(items.map((t: Record<string, unknown>) => ({
            id: t.id as string,
            name: t.name as string,
            role: t.title as string | null,
            company: t.company as string | null,
            content: t.content as string,
            rating: (t.rating as number) || 5,
          })))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  React.useEffect(() => {
    if (testimonials.length < 2) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const goNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  }

  if (loading) {
    return (
      <Section title="What People Say" subtitle="Loading testimonials...">
        <Skeleton className="h-80 rounded-xl max-w-3xl mx-auto" />
      </Section>
    )
  }

  if (testimonials.length === 0) return null

  const t = testimonials[current]

  return (
    <Section
      title="What People Say"
      subtitle="Feedback from clients and colleagues I've had the pleasure of working with."
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/50 backdrop-blur-xl dark:border-zinc-700/50 dark:bg-zinc-900/50">
          <Quote className="absolute left-6 top-6 h-8 w-8 text-zinc-200 dark:text-zinc-700" />

          <div className="flex min-h-[280px] items-center px-8 py-12 sm:px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700"
                      )}
                    />
                  ))}
                </div>

                <blockquote className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-zinc-100 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{t.name}</div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500">
                      {[t.role, t.company].filter(Boolean).join(", ")}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 && (
            <>
              <div className="absolute bottom-6 right-8 flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={goPrev} className="h-8 w-8 rounded-full" aria-label="Previous testimonial">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={goNext} className="h-8 w-8 rounded-full" aria-label="Next testimonial">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === current ? "w-8 bg-zinc-900 dark:bg-zinc-50" : "w-2 bg-zinc-300 dark:bg-zinc-700"
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
