import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
  interface User {
    role: string
  }
}

export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR"

export interface User {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  password: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface Account {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
}

export interface Session {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  user?: User
}

export interface VerificationToken {
  identifier: string
  token: string
  expires: Date
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string | null
  image: string | null
  images: string[]
  techStack: string[]
  githubUrl: string | null
  liveUrl: string | null
  category: string
  featured: boolean
  status: "completed" | "in-progress" | "planned"
  startDate: Date | null
  endDate: Date | null
  highlights: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  tags: string[]
  category: string
  published: boolean
  featured: boolean
  readingTime: number | null
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  price: string | null
  features: string[]
  category: string | null
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string | null
  rating: number | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Resource {
  id: string
  title: string
  description: string
  url: string
  type: "article" | "video" | "course" | "tool" | "book" | "podcast" | "other"
  category: string
  tags: string[]
  free: boolean
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface StartupIdea {
  id: string
  title: string
  slug: string
  description: string
  problem: string
  solution: string
  targetAudience: string
  marketSize: string | null
  businessModel: string | null
  techStack: string[]
  status: "idea" | "validating" | "in-progress" | "launched" | "pivoted"
  featured: boolean
  image: string | null
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  client: string
  overview: string
  challenge: string
  approach: string
  solution: string
  results: string
  techStack: string[]
  image: string | null
  images: string[]
  testimonial: string | null
  metrics: Metric[]
  featured: boolean
  completedDate: Date | null
  duration: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Metric {
  label: string
  value: string
}

export interface Technology {
  id: string
  name: string
  category: string
  icon: string | null
  proficiency: number | null
  color: string | null
  url: string | null
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface LearningJourney {
  id: string
  title: string
  description: string
  category: string
  status: "not-started" | "in-progress" | "completed" | "on-hold"
  resources: string[]
  startedAt: Date | null
  completedAt: Date | null
  certificate: string | null
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: Date
  category: "certification" | "award" | "publication" | "competition" | "other"
  issuer: string
  credentialUrl: string | null
  image: string | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface NavItem {
  title: string
  href: string
  icon?: string
  external?: boolean
  disabled?: boolean
  children?: NavItem[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  label: string
}

export interface StatItem {
  label: string
  value: string
  icon?: string
  description?: string
}

export interface TechnologyGraphNode {
  id: string
  name: string
  category: string
  proficiency: number
  color: string
  connections: string[]
}

export interface TechRadarCategory {
  name: string
  ring: "adopt" | "trial" | "assess" | "hold"
  description: string
  items: {
    name: string
    description?: string
    category: string
  }[]
}

export interface DashboardStats {
  totalProjects: number
  totalBlogs: number
  totalServices: number
  totalTestimonials: number
  totalMessages: number
  totalResources: number
  totalTechnologies: number
  totalStartupIdeas: number
  totalCaseStudies: number
  totalAchievements: number
  totalUsers: number
  totalViews: number
}

export interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  topPages: { path: string; views: number }[]
  trafficSources: { source: string; count: number }[]
  dailyViews: { date: string; views: number }[]
  deviceBreakdown: { device: string; percentage: number }[]
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  ogImage: string
  links: Record<string, string>
}

export interface SiteSettings {
  site_config: { name: string; title: string; description: string; logo: string; url: string }
  hero: { name: string; titles: string[]; subtitle: string; availability: string; showStats: boolean; showSocialLinks: boolean }
  social_links: { platform: string; url: string; icon: string; label: string }[]
  nav_items: { label: string; href: string; children?: { label: string; href: string; icon: string; description: string }[] }[]
  stats: { label: string; value: string; description: string }[]
  seo: { title: string; description: string; keywords: string; ogImage: string }
  theme: { mode: string; accentColor: string; animationsEnabled: boolean }
  footer: { tagline: string; quickLinks: { label: string; href: string }[]; resourceLinks: { label: string; href: string }[]; copyright: string }
  tech_categories: { name: string; icon: string; technologies: string[] }[]
  tech_radar_categories: { name: string; ring: string; description: string; items: { name: string; description?: string; category: string }[] }[]
  technology_graph_nodes: { id: string; name: string; category: string; proficiency: number; color: string; connections: string[] }[]
  about: {
    name: string
    title: string
    subtitle: string
    bio: string
    location: string
    availability: string
    resumeUrl: string
    avatar: string
    stats: { label: string; value: number; suffix: string }[]
    story: { year: string; title: string; description: string }[]
    mission: { text: string; bullets: string[] }
    vision: { text: string; bullets: string[] }
    education: { degree: string; institution: string; location: string; year: string; description: string }[]
    career: { role: string; company: string; location: string; period: string; description: string; tags: string[] }[]
    goals: { title: string; description: string; icon: string }[]
  }
  home_sections: { id: string; label: string; enabled: boolean }[]
  [key: string]: unknown
}
