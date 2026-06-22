import { db } from "@/lib/db"
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

const sectionMap: Record<string, React.ReactNode> = {
  hero: <HeroSection />,
  "featured-projects": <FeaturedProjects />,
  "featured-services": <FeaturedServices />,
  "featured-case-studies": <FeaturedCaseStudies />,
  "tech-stack": <TechStackPreview />,
  certifications: <Certifications />,
  testimonials: <Testimonials />,
  clients: <ClientsSection />,
  "featured-blogs": <FeaturedBlogs />,
  "contact-cta": <ContactCTA />,
}

async function getEnabledSections(): Promise<string[]> {
  try {
    const settingsRows = await db.settings.findMany({ where: { key: "home_sections" } })
    if (settingsRows.length === 0) return Object.keys(sectionMap)
    const sections = settingsRows[0].value as { id: string; enabled: boolean }[] | null
    if (!sections) return Object.keys(sectionMap)
    return sections.filter((s) => s.enabled).map((s) => s.id)
  } catch {
    return Object.keys(sectionMap)
  }
}

export default async function HomePage() {
  const enabled = await getEnabledSections()

  return (
    <>
      {enabled.map((id) => (
        <div key={id}>{sectionMap[id]}</div>
      ))}
    </>
  )
}
