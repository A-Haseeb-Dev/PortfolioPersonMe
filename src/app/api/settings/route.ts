import { db } from "@/lib/db"
import { apiResponse, apiError } from "@/lib/api"
import { requireRole } from "@/lib/api-utils"
import type { SiteSettings } from "@/types"

const DEFAULT_SETTINGS = {
  site_config: {
    name: "Muhammad Haseeb Khalid",
    title: "Full Stack Developer & Tech Innovator",
    description: "Full Stack Developer specializing in Next.js, TypeScript, and modern web technologies. Building innovative solutions for complex problems with cutting-edge tools.",
    logo: "",
    url: "https://muhammadhaseebkhalid.vercel.app",
  },
  hero: {
    name: "Muhammad Haseeb Khalid",
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
    title: "Muhammad Haseeb Khalid — Full Stack Developer",
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
    resourceLinks: [
      { label: "Knowledge Base", href: "/knowledge" },
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
  about: {
    name: "Muhammad Haseeb Khalid",
    title: "Full Stack Developer & Creative Technologist",
    subtitle: "Crafting digital experiences that live at the intersection of design and engineering.",
    bio: "I craft high-performance web applications with modern frameworks, turning complex problems into intuitive user experiences. Passionate about open-source, design systems, and developer tooling.",
    location: "Karachi, Pakistan",
    availability: "Available for work",
    resumeUrl: "",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    stats: [
      { label: "Years of Experience", value: 6, suffix: "+" },
      { label: "Projects Delivered", value: 50, suffix: "+" },
      { label: "Happy Clients", value: 20, suffix: "+" },
      { label: "Open Source Contributions", value: 5, suffix: "+" },
    ],
    story: [
      { year: "2018", title: "First Line of Code", description: "Wrote my first HTML page and fell in love with the web." },
      { year: "2019", title: "First Freelance Project", description: "Built a landing page for a local business." },
      { year: "2020", title: "Open Source Contribution", description: "Made my first open source contribution during the pandemic." },
      { year: "2021", title: "Professional Leap", description: "Joined a fast-growing startup as a junior developer." },
      { year: "2022", title: "Full-Stack Mastery", description: "Led the frontend architecture of a major product rewrite." },
      { year: "2023", title: "Tech Lead", description: "Stepped into a tech lead role, mentoring junior developers." },
      { year: "2024", title: "Building in Public", description: "Started documenting my journey publicly." },
    ],
    mission: {
      text: "To craft digital experiences that are not just functional but delightful — bridging the gap between aesthetic design and robust engineering.",
      bullets: [
        "Ship clean, maintainable code that stands the test of time",
        "Champion accessibility and inclusive design in every project",
        "Share knowledge openly and lift the next generation of developers",
      ],
    },
    vision: {
      text: "To build a future where technology amplifies human potential. I envision a world where software adapts to people — not the other way around.",
      bullets: [
        "Create tools that empower creators and solve real-world problems",
        "Build a legacy of open-source contributions that outlast any single project",
        "Inspire a culture of craftsmanship, curiosity, and kindness in tech",
      ],
    },
    education: [
      { degree: "Bachelor of Science in Computer Science", institution: "University of Karachi", location: "Karachi, Pakistan", year: "2020 — 2024", description: "Focused on software engineering, data structures, and human-computer interaction." },
      { degree: "Intermediate in Computer Science", institution: "Government College", location: "Karachi, Pakistan", year: "2018 — 2020", description: "Completed pre-engineering with a focus on mathematics and computer fundamentals." },
      { degree: "Matriculation in Computer Science", institution: "The Educators School", location: "Karachi, Pakistan", year: "2016 — 2018", description: "Foundation in programming basics, HTML, and CSS." },
    ],
    career: [
      { role: "Senior Frontend Engineer", company: "TechCorp", location: "Remote", period: "2024 — Present", description: "Leading the frontend architecture for a SaaS platform serving 50K+ users.", tags: ["React", "Next.js", "TypeScript", "Tailwind"] },
      { role: "Full-Stack Developer", company: "StartupXYZ", location: "Karachi, Pakistan", period: "2022 — 2024", description: "Built and shipped 3 major product features end-to-end.", tags: ["React", "Node.js", "PostgreSQL", "Docker"] },
      { role: "Junior Developer", company: "DevAgency", location: "Karachi, Pakistan", period: "2021 — 2022", description: "Developed responsive web applications for 10+ clients.", tags: ["JavaScript", "React", "SCSS", "Firebase"] },
      { role: "Freelance Web Developer", company: "Self-Employed", location: "Remote", period: "2019 — 2021", description: "Delivered 20+ freelance projects for small businesses and startups.", tags: ["HTML/CSS", "JavaScript", "WordPress", "PHP"] },
    ],
    goals: [
      { title: "Open Source Impact", description: "Build and maintain a widely adopted open-source library.", icon: "Globe" },
      { title: "Design System Authority", description: "Create a comprehensive design system that empowers teams.", icon: "Layout" },
      { title: "Technical Writing", description: "Write a book or extensive documentation series.", icon: "BookOpen" },
      { title: "Community Building", description: "Launch a developer community focused on mentorship.", icon: "Users" },
      { title: "Startup Founder", description: "Found a product company that solves a meaningful problem.", icon: "Rocket" },
      { title: "Continuous Learning", description: "Deep-dive into new technologies — staying a perpetual student.", icon: "Lightbulb" },
    ],
  },
  home_sections: [
    { id: "hero", label: "Hero Section", enabled: true },
    { id: "featured-projects", label: "Featured Projects", enabled: true },
    { id: "featured-services", label: "Featured Services", enabled: true },
    { id: "featured-case-studies", label: "Featured Case Studies", enabled: true },
    { id: "tech-stack", label: "Tech Stack Preview", enabled: true },
    { id: "certifications", label: "Certifications", enabled: true },
    { id: "testimonials", label: "Testimonials", enabled: true },
    { id: "clients", label: "Clients Section", enabled: true },
    { id: "featured-blogs", label: "Featured Blogs", enabled: true },
    { id: "contact-cta", label: "Contact CTA", enabled: true },
  ],
}

// SiteSettings type is defined in @/types

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

    if (value === undefined || value === null) {
      return apiError("Setting value is required", 400)
    }

    const defaults = DEFAULT_SETTINGS as Record<string, unknown>
    const expected = defaults[key]
    if (typeof value !== typeof expected) {
      return apiError(`Invalid type for setting "${key}": expected ${typeof expected}`, 400)
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
