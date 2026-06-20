import { blogPosts } from "@/data/blog"
import { caseStudies } from "@/data/case-studies"
import { currentCourses } from "@/data/learning"
import { achievements } from "@/data/achievements"
import { resources } from "@/data/resources"
import { startupIdeas } from "@/data/startup-ideas"
import { skillCategories, technologies as allTechnologies } from "@/data/skills"

export function getAdminBlogPosts() {
  return blogPosts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
    status: "published" as "published" | "draft",
    createdAt: p.date,
  }))
}

export function getAdminProjects() {
  return [
    { id: "1", title: "AI-Powered Analytics Dashboard", slug: "ai-analytics-dashboard", category: "AI", featured: true, status: "published" as const, createdAt: new Date("2024-06-01") },
    { id: "2", title: "E-Commerce Platform", slug: "ecommerce-platform", category: "Web", featured: true, status: "published" as const, createdAt: new Date("2024-08-15") },
    { id: "3", title: "HealthTrack Mobile App", slug: "healthtrack-mobile", category: "Mobile", featured: false, status: "in-progress" as const, createdAt: new Date("2024-09-01") },
    { id: "4", title: "SaaS Boilerplate Kit", slug: "saas-boilerplate", category: "SaaS", featured: true, status: "published" as const, createdAt: new Date("2024-02-28") },
    { id: "5", title: "Open Source Component Library", slug: "component-library", category: "Open Source", featured: false, status: "published" as const, createdAt: new Date("2024-07-30") },
    { id: "6", title: "AI Content Generator", slug: "ai-content-generator", category: "AI", featured: false, status: "in-progress" as const, createdAt: new Date("2024-10-01") },
  ]
}

export function getAdminCaseStudies() {
  return caseStudies.map((cs) => ({
    id: cs.id,
    title: cs.title,
    slug: cs.slug,
    client: cs.client,
    featured: cs.featured,
    status: "published" as const,
    completedDate: cs.completedDate || null,
    createdAt: cs.createdAt,
  }))
}

export function getAdminServices() {
  return [
    { id: "web-dev", title: "Web Development", description: "Full-stack web applications with Next.js, React, and Node.js", price: "$5,000+", category: "Development", order: 0, createdAt: new Date("2025-01-01") },
    { id: "mobile-dev", title: "Mobile App Development", description: "Cross-platform mobile apps with React Native and Flutter", price: "$8,000+", category: "Mobile", order: 1, createdAt: new Date("2025-01-15") },
    { id: "saas-dev", title: "SaaS Development", description: "Build and launch scalable SaaS platforms from idea to production", price: "$10,000+", category: "SaaS", order: 2, createdAt: new Date("2025-02-01") },
    { id: "api-dev", title: "API Development", description: "RESTful and GraphQL API design, development, and documentation", price: "$3,000+", category: "Development", order: 3, createdAt: new Date("2025-03-01") },
    { id: "db-design", title: "Database Design", description: "Schema design, query optimization, and database architecture", price: "$2,500+", category: "Development", order: 4, createdAt: new Date("2025-03-15") },
    { id: "ai-solutions", title: "AI Solutions", description: "LLM integration, RAG pipelines, and custom AI agent development", price: "$7,000+", category: "AI", order: 5, createdAt: new Date("2025-04-01") },
    { id: "consulting", title: "Technical Consulting", description: "Architecture review, code audits, and technology strategy", price: "$200/hr", category: "Consulting", order: 6, createdAt: new Date("2025-04-15") },
  ]
}

export function getAdminSkills() {
  return skillCategories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    technologies: allTechnologies
      .filter((t) => t.categoryId === cat.id)
      .map((t) => ({
        id: t.id,
        name: t.name,
        category: cat.name,
        proficiency: t.proficiency,
        order: t.yearsExperience,
      })),
  }))
}

export function getAdminLearning() {
  return currentCourses.map((course) => {
    const statusMap: Record<string, "not-started" | "in-progress" | "completed" | "on-hold"> = {
      "0": "not-started",
      "25": "in-progress",
      "35": "in-progress",
      "40": "in-progress",
      "65": "in-progress",
      "100": "completed",
    }
    const progressKey = String(course.progress)
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      status: statusMap[Object.keys(statusMap).find((k) => Number(k) <= course.progress) || "in-progress"] || "in-progress",
      startedAt: course.startDate,
      order: Number(course.id),
      createdAt: course.startDate,
    }
  })
}

export function getAdminTestimonials() {
  return [
    { id: "t1", name: "Sarah Ahmed", role: "CTO", company: "TechFlow Inc.", content: "Working with Abdul Haseeb was transformative for our platform. His deep understanding of modern web architecture and ability to deliver complex solutions on time made him an invaluable partner.", rating: 5, featured: true, createdAt: new Date("2025-01-15") },
    { id: "t2", name: "Imran Khan", role: "Founder & CEO", company: "ShopGlobal", content: "Haseeb redesigned our entire e-commerce infrastructure. Our page load times dropped by 60% and conversions increased by 35%. He's the kind of developer every startup needs.", rating: 5, featured: true, createdAt: new Date("2025-03-20") },
    { id: "t3", name: "Fatima Zaidi", role: "VP of Engineering", company: "DataVue Analytics", content: "Exceptional technical skills combined with great communication. Haseeb doesn't just write code — he solves problems. He led our migration to microservices seamlessly.", rating: 5, featured: true, createdAt: new Date("2025-06-10") },
    { id: "t4", name: "Usman Malik", role: "Product Lead", company: "NextGen Solutions", content: "I've worked with many freelance developers, and Haseeb stands out for his professionalism, code quality, and ability to understand product goals beyond just technical requirements.", rating: 4, featured: false, createdAt: new Date("2025-08-05") },
  ]
}

export function getAdminAchievements() {
  return achievements.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    date: new Date(a.date),
    category: a.category,
    issuer: a.issuer,
    featured: a.featured,
    createdAt: new Date(a.date),
  }))
}

export function getAdminResources() {
  return resources.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    type: r.type,
    category: r.category,
    url: r.fileUrl,
    free: true,
    createdAt: new Date(),
  }))
}

export function getAdminStartupIdeas() {
  return startupIdeas.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.tagline + ". " + s.problem.substring(0, 80),
    problem: s.problem,
    solution: s.solution,
    status: s.status,
    featured: s.status === "building" || s.status === "launched",
    createdAt: new Date(),
  }))
}
