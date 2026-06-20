import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"

const DEFAULT_SETTINGS = {
  site_config: {
    name: "Muhammad Anas Siddiqui",
    title: "Full Stack Developer & Tech Innovator",
    description: "Full Stack Developer specializing in Next.js, TypeScript, and modern web technologies. Building innovative solutions for complex problems with cutting-edge tools.",
    logo: "",
    url: "https://anas-portfolio.vercel.app",
  },
  hero: {
    name: "Muhammad Anas Siddiqui",
    titles: ["Full Stack Developer", "Software Engineer", "Tech Entrepreneur", "AI Enthusiast"],
    subtitle: "Crafting digital experiences with modern technologies. Passionate about building products that make a difference and solving complex problems with elegant solutions.",
    availability: "Available for opportunities",
    showStats: true,
    showSocialLinks: true,
  },
  social_links: [
    { platform: "WhatsApp", url: "https://wa.me/923XXXXXXXXX", icon: "message-circle", label: "Chat on WhatsApp" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", label: "Connect on LinkedIn" },
    { platform: "GitHub", url: "https://github.com", icon: "github", label: "Follow on GitHub" },
    { platform: "Facebook", url: "https://facebook.com", icon: "facebook", label: "Friend on Facebook" },
    { platform: "Instagram", url: "https://instagram.com", icon: "instagram", label: "Follow on Instagram" },
    { platform: "Email", url: "mailto:anas@example.com", icon: "mail", label: "Send an email" },
  ],
  nav_items: [
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
  ],
  stats: [
    { label: "Projects Completed", value: "50+", description: "Successful deliveries across various domains" },
    { label: "Technologies Used", value: "30+", description: "Modern tools and frameworks mastered" },
    { label: "Years Experience", value: "5+", description: "Professional software development" },
    { label: "Happy Clients", value: "20+", description: "Satisfied clients worldwide" },
  ],
  seo: {
    title: "Muhammad Anas Siddiqui — Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, TypeScript, React, and modern web technologies. Building innovative solutions for complex problems.",
    keywords: "full-stack developer, portfolio, web development, react, next.js, typescript",
    ogImage: "/og-image.png",
  },
  theme: {
    mode: "system",
    accentColor: "zinc",
    animationsEnabled: true,
  },
  footer: {
    tagline: "Building premium digital experiences with modern technologies.",
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Skills", href: "/skills" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    copyright: "All rights reserved.",
  },
  tech_categories: [
    { name: "Frontend", icon: "monitor", technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux", "Zustand"] },
    { name: "Backend", icon: "server", technologies: ["Node.js", "Express", "NestJS", "Python", "FastAPI", "GraphQL", "REST APIs"] },
    { name: "Database", icon: "database", technologies: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Drizzle", "Redis", "Supabase"] },
    { name: "DevOps", icon: "cloud", technologies: ["Docker", "AWS", "Vercel", "GitHub Actions", "Nginx", "Linux", "CI/CD"] },
    { name: "Mobile", icon: "smartphone", technologies: ["React Native", "Expo", "Flutter", "Firebase", "Appwrite"] },
    { name: "Tools", icon: "tool", technologies: ["Git", "VS Code", "Figma", "Postman", "Webpack", "Vite", "ESLint"] },
  ],
  tech_radar_categories: [
    { name: "Frontend", ring: "adopt", description: "Technologies we actively use and recommend", items: [{ name: "Next.js", description: "React framework for production", category: "frontend" }, { name: "TypeScript", description: "Typed superset of JavaScript", category: "frontend" }, { name: "Tailwind CSS", description: "Utility-first CSS framework", category: "frontend" }, { name: "Framer Motion", description: "Animation library for React", category: "frontend" }] },
    { name: "Backend", ring: "trial", description: "Technologies we're exploring with confidence", items: [{ name: "tRPC", description: "End-to-end typesafe APIs", category: "backend" }, { name: "Hono", description: "Lightweight web framework", category: "backend" }, { name: "Bun", description: "All-in-one JavaScript runtime", category: "backend" }] },
    { name: "Infrastructure", ring: "assess", description: "Technologies worth investigating", items: [{ name: "Kubernetes", description: "Container orchestration", category: "infrastructure" }, { name: "Terraform", description: "Infrastructure as code", category: "infrastructure" }] },
    { name: "Legacy", ring: "hold", description: "Technologies to avoid or phase out", items: [{ name: "jQuery", description: "Legacy DOM manipulation", category: "legacy" }, { name: "PHP", description: "Server-side scripting", category: "legacy" }] },
  ],
  technology_graph_nodes: [
    { id: "nextjs", name: "Next.js", category: "frontend", proficiency: 92, color: "#000000", connections: ["react", "typescript", "tailwind", "node"] },
    { id: "react", name: "React", category: "frontend", proficiency: 90, color: "#61DAFB", connections: ["nextjs", "typescript", "redux"] },
    { id: "typescript", name: "TypeScript", category: "language", proficiency: 95, color: "#3178C6", connections: ["nextjs", "react", "node"] },
    { id: "tailwind", name: "Tailwind CSS", category: "frontend", proficiency: 90, color: "#06B6D4", connections: ["nextjs", "react"] },
    { id: "node", name: "Node.js", category: "backend", proficiency: 85, color: "#339933", connections: ["typescript", "express", "nextjs"] },
    { id: "express", name: "Express", category: "backend", proficiency: 80, color: "#000000", connections: ["node", "typescript"] },
    { id: "prisma", name: "Prisma", category: "database", proficiency: 85, color: "#2D3748", connections: ["typescript", "node", "postgres"] },
    { id: "postgres", name: "PostgreSQL", category: "database", proficiency: 80, color: "#336791", connections: ["prisma", "node"] },
    { id: "docker", name: "Docker", category: "devops", proficiency: 75, color: "#2496ED", connections: ["node", "postgres"] },
    { id: "redux", name: "Redux", category: "frontend", proficiency: 80, color: "#764ABC", connections: ["react", "typescript"] },
  ],
}

export type SiteSettings = typeof DEFAULT_SETTINGS

async function getOrCreateSettings(key: string) {
  let setting = await db.settings.findUnique({ where: { key } })
  if (!setting) {
    setting = await db.settings.create({
      data: {
        key,
        value: (DEFAULT_SETTINGS as Record<string, unknown>)[key] ?? {},
      },
    })
  }
  return setting
}

export async function GET() {
  try {
    const allSettings = await db.settings.findMany()
    const settingsMap: Record<string, unknown> = {}

    for (const [key, defaultValue] of Object.entries(DEFAULT_SETTINGS)) {
      const existing = allSettings.find((s) => s.key === key)
      settingsMap[key] = existing?.value ?? defaultValue
    }

    return apiResponse({ settings: settingsMap })
  } catch (error) {
    console.error("[SETTINGS_GET]", error)
    return apiResponse({ settings: DEFAULT_SETTINGS, fallback: true })
  }
}

export async function PUT(request: Request) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"])

    const body = await request.json()
    const { key, value } = body

    if (!key || typeof key !== "string") {
      return apiError("Setting key is required", 400)
    }

    if (!(key in DEFAULT_SETTINGS)) {
      return apiError(`Invalid setting key: ${key}`, 400)
    }

    const updated = await db.settings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })

    return apiResponse({ setting: updated })
  } catch (error) {
    console.error("[SETTINGS_PUT]", error)
    return apiError("Failed to update settings", 500)
  }
}
