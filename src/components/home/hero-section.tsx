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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GradientText } from "@/components/ui/gradient-text"
import { FadeIn } from "@/components/ui/animated-text"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { useSettings } from "@/contexts/settings-context"

const socialIconMap: Record<string, React.ReactNode> = {
  "message-circle": <MessageCircle className="h-4 w-4" />,
  linkedin: <Link2 className="h-4 w-4" />,
  github: <Code2 className="h-4 w-4" />,
  facebook: <Globe className="h-4 w-4" />,
  instagram: <Camera className="h-4 w-4" />,
  mail: <ExternalLink className="h-4 w-4" />,
}

export default function HeroSection() {
  const { settings } = useSettings()
  const { site_config, hero, social_links, stats } = settings
  const [titleIndex, setTitleIndex] = React.useState(0)
  const [displayText, setDisplayText] = React.useState("")
  const [isDeleting, setIsDeleting] = React.useState(false)
  const rotatingTitles = hero.titles.length > 0 ? hero.titles : ["Full Stack Developer"]

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
  }, [displayText, isDeleting, titleIndex, rotatingTitles])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <ParticleBackground variant="particles" particleCount={40} speed={0.3} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <Container className="relative z-10 pt-24">
        <div className="flex flex-col items-center text-center">
          <FadeIn delay={0.1}>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
              {hero.availability || "Available for opportunities"}
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
                {hero.name || site_config.name}
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
              {hero.subtitle || site_config.description}
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
          </FadeIn>

          {hero.showSocialLinks !== false && (
            <FadeIn delay={0.6} className="mt-8">
              <div className="flex items-center gap-4">
                {(social_links.length > 0 ? social_links : []).map((link: Record<string, string>) => (
                  <a
                    key={link.platform || link.label || link.url}
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
                    {socialIconMap[(link.icon || "").toLowerCase()] || <ExternalLink className="h-4 w-4" />}
                  </a>
                ))}
              </div>
            </FadeIn>
          )}

          {hero.showStats !== false && (
            <FadeIn delay={0.7} className="mt-12 w-full">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {(stats.length > 0 ? stats : []).map((stat: Record<string, string>) => (
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
          )}
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
