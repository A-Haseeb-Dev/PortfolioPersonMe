"use client"

import { Download, Code2, Link, Hash, Globe, Mail, MapPin } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import { GradientText } from "@/components/ui/gradient-text"
import { FadeIn } from "@/components/ui/animated-text"
import { cn } from "@/lib/utils"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/abdulhaseeb", icon: Code2 },
  { label: "LinkedIn", href: "https://linkedin.com/in/abdulhaseeb", icon: Link },
  { label: "Twitter", href: "https://twitter.com/abdulhaseeb", icon: Hash },
  { label: "Website", href: "https://abdulhaseeb.dev", icon: Globe },
  { label: "Email", href: "mailto:hello@abdulhaseeb.dev", icon: Mail },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/80 to-transparent dark:from-zinc-950/80" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-zinc-200/40 to-transparent blur-3xl dark:from-zinc-800/20" />
      </div>

      <Container>
        <div className="flex flex-col items-center text-center">
          <FadeIn delay={0.1}>
            <div className="relative mb-8">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-400 opacity-50 blur-sm dark:from-zinc-600 dark:to-zinc-400" />
              <Avatar className="relative h-32 w-32 border-2 border-white shadow-xl dark:border-zinc-800 sm:h-40 sm:w-40">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" alt="Abdul Haseeb" />
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-700 text-white dark:from-zinc-50 dark:to-zinc-300 dark:text-zinc-900">
                  AH
                </AvatarFallback>
              </Avatar>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <GradientText from="from-zinc-900" to="to-zinc-500" animate>
                Abdul Haseeb
              </GradientText>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400 sm:text-xl">
              Full-Stack Developer & Creative Technologist — building elegant digital experiences
              that live at the intersection of design and engineering.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                <MapPin size={14} />
                Karachi, Pakistan
              </Badge>
              <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                Available for work
              </Badge>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              I craft high-performance web applications with modern frameworks, turning complex
              problems into intuitive user experiences. Passionate about open-source, design
              systems, and developer tooling.
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Download size={16} />
                Download Resume
              </Button>
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="mt-10 flex items-center gap-2.5">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      "text-zinc-400 transition-all duration-200",
                      "hover:bg-zinc-100 hover:text-zinc-900",
                      "dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    )}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
