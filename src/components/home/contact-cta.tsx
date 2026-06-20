"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/animated-text"
import { siteConfig } from "@/lib/constants"

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-black" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.03)_0%,transparent_50%)]" />

      <Container className="relative z-10">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Let&apos;s Build Something Amazing Together
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-300">
              Have a project in mind or just want to chat? I&apos;m always open to discussing new
              opportunities, innovative ideas, and exciting collaborations.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                asChild
              >
                <a href="/contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-zinc-500 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                asChild
              >
                <a href={`mailto:${siteConfig.links.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  {siteConfig.links.email}
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
