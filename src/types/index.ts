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

export type Role = "admin" | "editor" | "user"

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
