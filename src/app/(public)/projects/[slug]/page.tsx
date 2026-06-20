"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FolderOpen } from "lucide-react"
import { ProjectDetail, type ProjectDetailData } from "@/components/projects/project-detail"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <EmptyState
          icon={<FolderOpen className="h-6 w-6" />}
          title="Project not found"
          description="The project you are looking for does not exist."
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          }
        />
      </Container>
    )
  }

  return <ProjectDetail project={project} />
}

const projects: ProjectDetailData[] = [
  {
    id: "1",
    title: "AI-Powered Analytics Dashboard",
    slug: "ai-analytics-dashboard",
    description:
      "A real-time analytics platform leveraging machine learning to provide actionable insights and predictive trends for business intelligence.",
    content: null,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"],
    techStack: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Docker", "Redis", "GraphQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "AI",
    featured: true,
    status: "completed",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-06-01"),
    highlights: [
      "98% prediction accuracy on test data",
      "Handles 1M+ data points daily",
      "Real-time visualization with sub-second latency",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    problem:
      "Businesses struggled to make sense of massive amounts of operational data. Traditional analytics tools provided retrospective reports but lacked predictive capabilities. Decision-makers had to wait days for insights, missing critical market shifts and operational bottlenecks.",
    solution:
      "Built an end-to-end analytics platform that ingests streaming data, applies ML models for forecasting, and presents insights through interactive dashboards. The system uses TensorFlow for predictive modeling and provides real-time alerts for anomalies.",
    architecture:
      "The platform follows a microservices architecture with event-driven data ingestion. Next.js handles the frontend with Server-Sent Events for real-time updates. A Python-based ML service runs TensorFlow models, while PostgreSQL stores historical data and Redis caches frequent queries.",
    features: [
      "Real-time data streaming and visualization",
      "ML-powered trend prediction and anomaly detection",
      "Customizable dashboard builder with drag-and-drop",
      "Automated report scheduling and email delivery",
      "Role-based access control with team collaboration",
      "REST and GraphQL APIs for external integrations",
    ],
    videoUrl: "https://example.com/demo",
    results:
      "The platform processed over 10 million data points in the first month, with 98% prediction accuracy. Clients reported a 40% reduction in time-to-insight and were able to proactively address operational issues before they escalated.",
    lessonsLearned: [
      "Event-driven architecture was critical for handling real-time data at scale without compromising performance.",
      "Investing in comprehensive testing of ML model behavior in production saved weeks of debugging.",
      "Early user feedback sessions helped prioritize the dashboard customization features that became the most loved capability.",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop",
    ],
    relatedProjects: [
      { id: "6", title: "AI Content Generator", slug: "ai-content-generator", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop", category: "AI" },
      { id: "2", title: "E-Commerce Platform", slug: "ecommerce-platform", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop", category: "Web" },
    ],
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    description:
      "A full-featured e-commerce solution with multi-vendor support, real-time inventory management, and seamless payment integration.",
    content: null,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"],
    techStack: ["Next.js", "TypeScript", "Stripe", "Prisma", "Tailwind CSS", "PostgreSQL", "AWS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "Web",
    featured: true,
    status: "completed",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-08-15"),
    highlights: [
      "50+ vendors onboarded in first quarter",
      "99.9% uptime since launch",
      "40% faster checkout than industry average",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    problem:
      "Small and medium businesses needed an affordable, feature-rich e-commerce platform that could handle multi-vendor operations without requiring extensive technical knowledge. Existing solutions were either too expensive or lacked essential features like real-time inventory tracking.",
    solution:
      "Developed a multi-tenant e-commerce platform with a vendor dashboard, real-time inventory sync, Stripe payment integration, and an intuitive admin panel. The platform is fully customizable through themes and plugins.",
    architecture:
      "Built with Next.js for SSR and optimal SEO, Prisma as the ORM layer over PostgreSQL, and Stripe for payment processing. The platform uses AWS S3 for media storage and CloudFront for CDN delivery. Real-time inventory updates are handled via WebSocket connections.",
    features: [
      "Multi-vendor marketplace with individual storefronts",
      "Real-time inventory management across warehouses",
      "Secure payment processing with Stripe integration",
      "Advanced search with filtering and faceted navigation",
      "Order management with tracking and notifications",
      "Analytics dashboard for sales and customer insights",
    ],
    videoUrl: null,
    results:
      "The platform onboarded 50 vendors in the first three months and processed over $2M in transactions. Average checkout time was reduced by 40% compared to industry benchmarks, and customer satisfaction scores averaged 4.8/5.",
    lessonsLearned: [
      "Multi-tenancy required careful database schema design to ensure data isolation without sacrificing query performance.",
      "Real-time inventory sync across vendors was the most technically challenging feature and required multiple iterations.",
      "Providing comprehensive onboarding documentation significantly reduced support tickets from new vendors.",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800&h=600&fit=crop",
    ],
    relatedProjects: [
      { id: "4", title: "SaaS Boilerplate Kit", slug: "saas-boilerplate", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=200&fit=crop", category: "SaaS" },
      { id: "1", title: "AI-Powered Analytics Dashboard", slug: "ai-analytics-dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop", category: "AI" },
    ],
  },
  {
    id: "3",
    title: "HealthTrack Mobile App",
    slug: "healthtrack-mobile",
    description:
      "A cross-platform mobile health tracking application with workout logging, nutrition planning, and AI-powered recommendations.",
    content: null,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop"],
    techStack: ["React Native", "Expo", "Firebase", "Node.js", "GraphQL", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: null,
    category: "Mobile",
    featured: false,
    status: "in-progress",
    startDate: new Date("2024-09-01"),
    endDate: null,
    highlights: [
      "Cross-platform iOS & Android from single codebase",
      "Real-time workout sync across devices",
      "AI-powered nutrition recommendations",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    problem:
      "Fitness enthusiasts struggled to find a single app that combined workout tracking, nutrition planning, and intelligent recommendations. Most apps excelled in one area but lacked integration with others, forcing users to juggle multiple tools.",
    solution:
      "Building a unified health and fitness app that tracks workouts, logs nutrition, and uses AI to provide personalized recommendations. The app syncs across devices and integrates with popular wearables.",
    architecture:
      "React Native with Expo for cross-platform deployment. Firebase handles authentication, real-time database, and push notifications. A Node.js/GraphQL backend orchestrates business logic, while a Python ML service generates personalized recommendations.",
    features: [
      "Custom workout builder with exercise library",
      "Nutrition tracking with barcode scanning",
      "AI-powered meal and workout recommendations",
      "Progress tracking with visual charts",
      "Wearable device integration (Apple Watch, Fitbit)",
      "Social features: challenges, leaderboards, sharing",
    ],
    videoUrl: null,
    results:
      "The app is currently in beta with 500+ testers. Early metrics show 4.2/5 App Store rating and 70% weekly retention rate.",
    lessonsLearned: [
      "React Native with Expo provided excellent DX but required native modules for some health APIs.",
      "Offline-first architecture was essential for gym environments with poor connectivity.",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
    ],
    relatedProjects: [
      { id: "1", title: "AI-Powered Analytics Dashboard", slug: "ai-analytics-dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop", category: "AI" },
    ],
  },
  {
    id: "4",
    title: "SaaS Boilerplate Kit",
    slug: "saas-boilerplate",
    description:
      "A production-ready SaaS starter kit with authentication, billing, teams, and admin dashboard out of the box.",
    content: null,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop"],
    techStack: ["Next.js", "TypeScript", "Stripe", "Supabase", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "SaaS",
    featured: true,
    status: "completed",
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-02-28"),
    highlights: [
      "500+ GitHub stars within first month",
      "Used by 200+ developers in production",
      "100% open source with MIT license",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    problem:
      "Developers building SaaS products spent weeks on repetitive boilerplate code — authentication, billing, team management, and admin dashboards. This delayed time-to-market and diverted focus from core product value.",
    solution:
      "Created a comprehensive SaaS starter kit that includes everything needed to launch a SaaS product: authentication (magic link, OAuth), Stripe billing, team/workspace management, admin dashboard, and API rate limiting.",
    architecture:
      "Next.js App Router with server components for performance. Supabase for auth and real-time features, Prisma as ORM, Stripe for subscription management. The kit includes both B2C and B2B patterns with role-based access control.",
    features: [
      "Authentication with email, Google, GitHub OAuth",
      "Subscription billing with Stripe (plans, trials, coupons)",
      "Team/workspace management with invitations",
      "Admin dashboard with user management",
      "API rate limiting and webhook handling",
      "Email templates for transactional emails",
    ],
    videoUrl: null,
    results:
      "The kit gained 500+ GitHub stars within the first month and is used by over 200 developers in production. Average time-to-first-deployment for users dropped from weeks to under 2 hours.",
    lessonsLearned: [
      "Comprehensive documentation was as important as the code itself — it cut support questions by 80%.",
      "Supporting multiple authentication providers from day one was critical for adoption.",
      "Open-sourcing the kit created a community that contributes improvements and catches edge cases.",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1668906094520-b5245f3d9c99?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&h=600&fit=crop",
    ],
    relatedProjects: [
      { id: "2", title: "E-Commerce Platform", slug: "ecommerce-platform", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop", category: "Web" },
      { id: "5", title: "Open Source Component Library", slug: "component-library", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop", category: "Open Source" },
    ],
  },
  {
    id: "5",
    title: "Open Source Component Library",
    slug: "component-library",
    description:
      "A comprehensive React component library with accessibility-first design, dark mode support, and extensive documentation.",
    content: null,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=600&fit=crop"],
    techStack: ["React", "TypeScript", "Storybook", "Tailwind CSS", "Vitest", "Rollup"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "Open Source",
    featured: false,
    status: "completed",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-07-30"),
    highlights: [
      "40+ production-ready components",
      "100% WCAG 2.1 AA accessibility score",
      "Full unit and integration test coverage",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    problem:
      "Teams within the organization were building similar UI components independently, leading to inconsistent design, duplicated effort, and maintenance overhead. There was no shared design system or component library.",
    solution:
      "Built a comprehensive React component library with a focus on accessibility, theming, and developer experience. The library includes form elements, layouts, data display, and navigation components with full Storybook documentation.",
    architecture:
      "Monorepo managed with Turborepo. Components built with React and TypeScript, styled with Tailwind CSS, and bundled with Rollup. Storybook for documentation and visual testing, Vitest for unit tests, and Playwright for E2E tests.",
    features: [
      "40+ components with consistent API design",
      "Dark mode support with Tailwind CSS classes",
      "Full keyboard navigation and screen reader support",
      "Comprehensive Storybook documentation with examples",
      "Tree-shakeable for optimized production bundles",
      "Theme customization via CSS variables",
    ],
    videoUrl: null,
    results:
      "The library achieved 100% WCAG AA compliance, reduced UI development time by 60%, and was adopted by 4 product teams within the first month. The Storybook documentation serves as the single source of truth for design.",
    lessonsLearned: [
      "Starting with a small, well-designed set of components (20) was better than trying to build 50 mediocre ones.",
      "Investing in accessibility from the start was far cheaper than retrofitting it later.",
      "Storybook stories doubled as integration tests and design review artifacts, creating huge efficiency gains.",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    relatedProjects: [
      { id: "4", title: "SaaS Boilerplate Kit", slug: "saas-boilerplate", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=200&fit=crop", category: "SaaS" },
    ],
  },
  {
    id: "6",
    title: "AI Content Generator",
    slug: "ai-content-generator",
    description:
      "An AI-powered content generation tool that creates SEO-optimized blog posts, social media content, and marketing copy.",
    content: null,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop"],
    techStack: ["Next.js", "OpenAI", "LangChain", "Redis", "PostgreSQL", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: null,
    category: "AI",
    featured: false,
    status: "in-progress",
    startDate: new Date("2024-10-01"),
    endDate: null,
    highlights: [
      "50+ content templates for various use cases",
      "Multi-language support across 20+ languages",
      "Built-in SEO scoring and optimization",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    problem:
      "Content creators and marketers spent hours writing and optimizing content for different platforms. Maintaining consistent brand voice across channels was challenging, and SEO optimization required specialized expertise.",
    solution:
      "Developing an AI-powered content platform that generates, optimizes, and manages content across multiple channels. The tool integrates with OpenAI and LangChain for content generation and provides SEO scoring, brand voice customization, and content scheduling.",
    architecture:
      "Next.js frontend with serverless API routes. LangChain orchestrates LLM calls with prompt templates, Redis caches generated content, and PostgreSQL stores user data and content history. The system supports streaming responses for real-time generation.",
    features: [
      "AI content generation with customizable tone and style",
      "50+ templates for blogs, social, emails, ads",
      "SEO analysis and optimization suggestions",
      "Brand voice configuration and consistency checks",
      "Content calendar with scheduling and publishing",
      "Multi-language support with translation quality scoring",
    ],
    videoUrl: null,
    results:
      "Beta users report 4x faster content creation and 35% improvement in SEO rankings for AI-generated posts.",
    lessonsLearned: [],
    screenshots: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504711434969-e33886168d8c?w=800&h=600&fit=crop",
    ],
    relatedProjects: [
      { id: "1", title: "AI-Powered Analytics Dashboard", slug: "ai-analytics-dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop", category: "AI" },
    ],
  },
]
