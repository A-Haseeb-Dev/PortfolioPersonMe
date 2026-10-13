export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; icon: string; description: string }[]
}

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Blog", href: "/blog", icon: "PenLine", description: "Articles, insights and tutorials" },
      { label: "Knowledge", href: "/knowledge", icon: "Layers", description: "Documentation and guides" },
      { label: "Case Studies", href: "/case-studies", icon: "FileText", description: "Real-world projects" },
    ],
  },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Learning", href: "/learning", icon: "BookOpen", description: "My learning journey" },
      { label: "Services", href: "/services", icon: "Sparkles", description: "What I offer" },
      { label: "Achievements", href: "/achievements", icon: "Award", description: "Milestones & awards" },
      { label: "Open Source", href: "/opensource", icon: "Code2", description: "Open source contributions" },
      { label: "Startup Ideas", href: "/startup-ideas", icon: "Building2", description: "Ideas & validation" },
      { label: "Resources", href: "/resources", icon: "FileText", description: "Downloads & guides" },
    ],
  },
]

import type { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Muhammad Haseeb Khalid",
  title: "Full Stack Developer & Tech Innovator",
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, and modern web technologies. Building innovative solutions for complex problems with cutting-edge tools.",
  url: "https://muhammadhaseebkhalid.vercel.app",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/923XXXXXXXXX",
    email: "anas@example.com",
  },
}
