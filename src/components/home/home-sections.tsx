"use client"

import { useSettings } from "@/contexts/settings-context"
import type { ReactNode } from "react"
import HeroSection from "@/components/home/hero-section"
import FeaturedProjects from "@/components/home/featured-projects"
import FeaturedServices from "@/components/home/featured-services"
import FeaturedBlogs from "@/components/home/featured-blogs"
import FeaturedCaseStudies from "@/components/home/featured-case-studies"
import Testimonials from "@/components/home/testimonials"
import TechStackPreview from "@/components/home/tech-stack-preview"
import ContactCTA from "@/components/home/contact-cta"
import ClientsSection from "@/components/home/clients-section"
import Certifications from "@/components/home/certifications"

const sections = [
  { id: "hero", node: <HeroSection /> },
  { id: "featured-projects", node: <FeaturedProjects /> },
  { id: "featured-services", node: <FeaturedServices /> },
  { id: "featured-case-studies", node: <FeaturedCaseStudies /> },
  { id: "tech-stack", node: <TechStackPreview /> },
  { id: "certifications", node: <Certifications /> },
  { id: "testimonials", node: <Testimonials /> },
  { id: "clients", node: <ClientsSection /> },
  { id: "featured-blogs", node: <FeaturedBlogs /> },
  { id: "contact-cta", node: <ContactCTA /> },
] as const

const sectionMap = new Map<string, ReactNode>(sections.map((s) => [s.id, s.node]))

export default function HomeSections() {
  const { settings } = useSettings()

  const configured = settings.home_sections
  const enabled =
    configured && configured.length > 0
      ? configured.filter((s) => s.enabled).map((s) => s.id)
      : sections.map((s) => s.id)

  return (
    <>
      {enabled.map((id) => {
        const node = sectionMap.get(id)
        return node ? <div key={id}>{node}</div> : null
      })}
    </>
  )
}
