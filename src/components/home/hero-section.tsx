"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  Camera,
  Code2,
  Download,
  ExternalLink,
  Globe,
  Link2,
  MessageCircle,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GradientText } from "@/components/ui/gradient-text"
import { FadeIn } from "@/components/ui/animated-text"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { socialLinks, stats } from "@/lib/constants"

const rotatingTitles = [
  "Full Stack Developer",
  "Software Engineer",
  "Tech Entrepreneur",
  "AI Enthusiast",
]

const socialIconMap: Record<string, React.ReactNode> = {
  "message-circle": <MessageCircle className="h-4 w-4" />,
  linkedin: <Link2 className="h-4 w-4" />,
  github: <Code2 className="h-4 w-4" />,
  facebook: <Globe className="h-4 w-4" />,
  instagram: <Camera className="h-4 w-4" />,
}

const statIconMap: Record<string, string> = {
  "Projects Completed": "50+",
  "Technologies Used": "30+",
  "Years Experience": "5+",
  "Happy Clients": "20+",
}

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = React.useState(0)
  const [displayText, setDisplayText] = React.useState("")
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const currentTitle = rotatingTitles[titleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText.length < currentTitle.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.slice(0, displayText.length + 1))
      }, 80)
    } else if (!isDeleting && displayText.length === currentTitle.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1))
      }, 40)
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, titleIndex])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <ParticleBackground variant="particles" particleCount={40} speed={0.3} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <Container className="relative z-10 pt-24">
        <div className="flex flex-col items-center text-center">
          <FadeIn delay={0.1}>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Available for opportunities
            </Badge>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-zinc-900 dark:text-zinc-50">Hi, I&apos;m </span>
              <GradientText
                from="from-zinc-900"
                via="via-zinc-600"
                to="to-zinc-400"
                className="dark:from-zinc-50 dark:via-zinc-300 dark:to-zinc-500"
              >
                Abdul Haseeb
              </GradientText>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-xl text-zinc-500 dark:text-zinc-400 sm:text-2xl md:text-3xl">
                I&apos;m a{" "}
              </span>
              <span className="relative text-xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-2xl md:text-3xl">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute -right-1 top-0 h-full w-[2px] bg-zinc-900 dark:bg-zinc-50"
                />
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-6 max-w-2xl">
            <p className="text-base text-zinc-500 dark:text-zinc-400 sm:text-lg">
              Crafting digital experiences with modern technologies. Passionate about building
              products that make a difference and solving complex problems with elegant solutions.
            </p>
          </FadeIn>

          <FadeIn delay={0.5} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" asChild>
              <a href="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">
                Contact Me
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </FadeIn>

          <FadeIn delay={0.6} className="mt-8">
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    "border border-zinc-200 bg-white/50 text-zinc-600 backdrop-blur-sm",
                    "transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:text-zinc-900 hover:shadow-lg",
                    "dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400",
                    "dark:hover:border-zinc-500 dark:hover:text-zinc-50"
                  )}
                >
                  {socialIconMap[link.icon] || <ExternalLink className="h-4 w-4" />}
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.7} className="mt-12 w-full">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    "rounded-2xl border border-zinc-200/50 bg-white/40 p-4 backdrop-blur-md",
                    "transition-all duration-300 hover:border-zinc-300 hover:shadow-lg",
                    "dark:border-zinc-700/50 dark:bg-zinc-900/40 dark:hover:border-zinc-600"
                  )}
                >
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
      </motion.div>
    </section>
  )
}
