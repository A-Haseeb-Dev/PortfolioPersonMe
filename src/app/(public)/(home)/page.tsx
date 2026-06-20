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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <FeaturedServices />
      <FeaturedCaseStudies />
      <TechStackPreview />
      <Certifications />
      <Testimonials />
      <ClientsSection />
      <FeaturedBlogs />
      <ContactCTA />
    </>
  )
}
