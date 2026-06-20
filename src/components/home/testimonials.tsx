"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "CTO",
    company: "TechFlow Inc.",
    content:
      "Working with Abdul Haseeb was a game-changer for our platform. His deep technical expertise and ability to translate complex requirements into elegant solutions exceeded our expectations. The performance improvements alone transformed our user experience.",
    rating: 5,
  },
  {
    name: "Imran Khan",
    role: "Founder & CEO",
    company: "ShopGlobal",
    content:
      "I've worked with many developers over the years, but Abdul stands out for his professionalism and technical excellence. He delivered our e-commerce migration ahead of schedule, and the results in terms of performance and conversion rates speak for themselves.",
    rating: 5,
  },
  {
    name: "Fatima Zaidi",
    role: "Product Director",
    company: "DataVue Analytics",
    content:
      "Abdul brought our AI analytics dashboard to life with remarkable precision. His understanding of both frontend aesthetics and backend architecture is rare. He's the kind of developer every product team dreams of having.",
    rating: 5,
  },
  {
    name: "Usman Malik",
    role: "Engineering Manager",
    company: "NextGen Solutions",
    content:
      "Exceptional problem-solving skills and a genuine passion for technology. Abdul consistently delivers clean, maintainable code and is always thinking several steps ahead about potential improvements. A true asset to any project.",
    rating: 4,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = React.useState(0)
  const [direction, setDirection] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {t.name}
                    </div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-6 right-8 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={goPrev}
              className="h-8 w-8 rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goNext}
              className="h-8 w-8 rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current
                  ? "w-8 bg-zinc-900 dark:bg-zinc-50"
                  : "w-2 bg-zinc-300 dark:bg-zinc-700"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
