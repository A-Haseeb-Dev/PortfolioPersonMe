"use client"

import * as React from "react"
import type { Project } from "@/types"
import { ProjectsHeader } from "@/components/projects/projects-header"
import { ProjectsGrid } from "@/components/projects/projects-grid"

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = React.useState("all")
  const [isLoading] = React.useState(false)

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory)

  return (
    <div>
      <ProjectsHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        totalProjects={projects.length}
      />
      <ProjectsGrid projects={filtered} isLoading={isLoading} />
    </div>
  )
}

const projects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Analytics Dashboard",
    slug: "ai-analytics-dashboard",
    description:
      "A real-time analytics platform leveraging machine learning to provide actionable insights and predictive trends for business intelligence.",
    content: null,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"],
    techStack: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "AI",
    featured: true,
    status: "completed",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-06-01"),
    highlights: ["98% prediction accuracy", "Handles 1M+ data points daily", "Real-time visualization"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    description:
      "A full-featured e-commerce solution with multi-vendor support, real-time inventory management, and seamless payment integration.",
    content: null,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"],
    techStack: ["Next.js", "TypeScript", "Stripe", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "Web",
    featured: true,
    status: "completed",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-08-15"),
    highlights: ["50+ vendors onboarded", "99.9% uptime", "40% faster checkout"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "HealthTrack Mobile App",
    slug: "healthtrack-mobile",
    description:
      "A cross-platform mobile health tracking application with workout logging, nutrition planning, and AI-powered recommendations.",
    content: null,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop"],
    techStack: ["React Native", "Expo", "Firebase", "Node.js", "GraphQL"],
    githubUrl: "https://github.com",
    liveUrl: null,
    category: "Mobile",
    featured: false,
    status: "in-progress",
    startDate: new Date("2024-09-01"),
    endDate: null,
    highlights: ["Cross-platform iOS & Android", "Real-time sync", "AI nutrition planner"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "SaaS Boilerplate Kit",
    slug: "saas-boilerplate",
    description:
      "A production-ready SaaS starter kit with authentication, billing, teams, and admin dashboard out of the box.",
    content: null,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"],
    techStack: ["Next.js", "TypeScript", "Stripe", "Supabase", "Prisma"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "SaaS",
    featured: true,
    status: "completed",
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-02-28"),
    highlights: ["500+ GitHub stars", "Used by 200+ developers", "Open source"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Open Source Component Library",
    slug: "component-library",
    description:
      "A comprehensive React component library with accessibility-first design, dark mode support, and extensive documentation.",
    content: null,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=600&fit=crop"],
    techStack: ["React", "TypeScript", "Storybook", "Tailwind CSS", "Vitest"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "Open Source",
    featured: false,
    status: "completed",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-07-30"),
    highlights: ["40+ components", "100% accessibility score", "Full test coverage"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    title: "AI Content Generator",
    slug: "ai-content-generator",
    description:
      "An AI-powered content generation tool that creates SEO-optimized blog posts, social media content, and marketing copy.",
    content: null,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop"],
    techStack: ["Next.js", "OpenAI", "LangChain", "Redis", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: null,
    category: "AI",
    featured: false,
    status: "in-progress",
    startDate: new Date("2024-10-01"),
    endDate: null,
    highlights: ["50+ content templates", "Multi-language support", "SEO scoring"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
