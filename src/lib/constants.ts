import type { SiteConfig, NavItem, SocialLink, StatItem, TechnologyGraphNode, TechRadarCategory } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Muhammad Anas Siddiqui",
  title: "Full Stack Developer & Tech Innovator",
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, and modern web technologies. Building innovative solutions for complex problems with cutting-edge tools.",
  url: "https://anas-portfolio.vercel.app",
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

export const socialLinks: SocialLink[] = [
  {
    name: "WhatsApp",
    url: "https://wa.me/923XXXXXXXXX",
    icon: "message-circle",
    label: "Chat on WhatsApp",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/anas-siddiqui",
    icon: "linkedin",
    label: "Connect on LinkedIn",
  },
  {
    name: "GitHub",
    url: "https://github.com/AnasSiddiqui",
    icon: "github",
    label: "Follow on GitHub",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/anas.siddiqui",
    icon: "facebook",
    label: "Friend on Facebook",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/anas.siddiqui",
    icon: "instagram",
    label: "Follow on Instagram",
  },
  {
    name: "Email",
    url: "mailto:anas@example.com",
    icon: "mail",
    label: "Send an email",
  },
]

export const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Services", href: "/services" },
  { title: "Blog", href: "/blog" },
  { title: "Skills", href: "/skills" },
  { title: "Knowledge", href: "/knowledge" },
  { title: "Learning", href: "/learning" },
  { title: "Resources", href: "/resources" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Startup Ideas", href: "/startup-ideas" },
  { title: "Achievements", href: "/achievements" },
  { title: "Open Source", href: "/opensource" },
  { title: "Contact", href: "/contact" },
]

export const stats: StatItem[] = [
  {
    label: "Projects Completed",
    value: "50+",
    description: "Successful deliveries across various domains",
  },
  {
    label: "Technologies Used",
    value: "30+",
    description: "Modern tools and frameworks mastered",
  },
  {
    label: "Years Experience",
    value: "5+",
    description: "Professional software development",
  },
  {
    label: "Happy Clients",
    value: "20+",
    description: "Satisfied clients worldwide",
  },
]

export const services = [
  {
    title: "Web Development",
    description: "Full-stack web applications using Next.js, React, Node.js, and modern frameworks.",
    icon: "globe",
    features: ["Responsive Web Apps", "SPA & SSR", "API Development", "Performance Optimization"],
    price: "Starting from $500",
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications using React Native and Expo.",
    icon: "smartphone",
    features: ["iOS & Android", "Cross-platform", "Push Notifications", "Offline Support"],
    price: "Starting from $800",
  },
  {
    title: "UI/UX Design",
    description: "User-centered design solutions that drive engagement and conversions.",
    icon: "palette",
    features: ["Wireframing", "Prototyping", "Design Systems", "User Research"],
    price: "Starting from $300",
  },
  {
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment solutions.",
    icon: "cloud",
    features: ["AWS/GCP/Azure", "CI/CD Pipelines", "Containerization", "Monitoring"],
    price: "Starting from $400",
  },
  {
    title: "Consulting",
    description: "Technical consulting for architecture, code review, and technology strategy.",
    icon: "lightbulb",
    features: ["Code Audits", "Architecture Design", "Tech Stack Planning", "Best Practices"],
    price: "Starting from $200/hr",
  },
  {
    title: "AI & Automation",
    description: "Intelligent automation solutions powered by machine learning and AI.",
    icon: "brain",
    features: ["Chatbots", "Process Automation", "Data Analysis", "ML Models"],
    price: "Starting from $600",
  },
]

export const techCategories = [
  {
    name: "Frontend",
    icon: "monitor",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux", "Zustand"],
  },
  {
    name: "Backend",
    icon: "server",
    technologies: ["Node.js", "Express", "NestJS", "Python", "FastAPI", "GraphQL", "REST APIs"],
  },
  {
    name: "Database",
    icon: "database",
    technologies: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Drizzle", "Redis", "Supabase"],
  },
  {
    name: "DevOps",
    icon: "cloud",
    technologies: ["Docker", "AWS", "Vercel", "GitHub Actions", "Nginx", "Linux", "CI/CD"],
  },
  {
    name: "Mobile",
    icon: "smartphone",
    technologies: ["React Native", "Expo", "Flutter", "Firebase", "Appwrite"],
  },
  {
    name: "Tools",
    icon: "tool",
    technologies: ["Git", "VS Code", "Figma", "Postman", "Webpack", "Vite", "ESLint"],
  },
]

export const skillCategories = [
  {
    name: "Languages",
    icon: "code",
    items: [
      { name: "TypeScript", proficiency: 95, color: "#3178C6" },
      { name: "JavaScript", proficiency: 95, color: "#F7DF1E" },
      { name: "Python", proficiency: 80, color: "#3776AB" },
      { name: "SQL", proficiency: 85, color: "#4479A1" },
      { name: "HTML/CSS", proficiency: 95, color: "#E34F26" },
    ],
  },
  {
    name: "Frameworks & Libraries",
    icon: "layout",
    items: [
      { name: "Next.js", proficiency: 92, color: "#000000" },
      { name: "React", proficiency: 90, color: "#61DAFB" },
      { name: "React Native", proficiency: 75, color: "#61DAFB" },
      { name: "Node.js", proficiency: 85, color: "#339933" },
      { name: "Express", proficiency: 80, color: "#000000" },
      { name: "Tailwind CSS", proficiency: 90, color: "#06B6D4" },
    ],
  },
  {
    name: "Tools & Platforms",
    icon: "wrench",
    items: [
      { name: "Git", proficiency: 90, color: "#F05032" },
      { name: "Docker", proficiency: 75, color: "#2496ED" },
      { name: "AWS", proficiency: 70, color: "#FF9900" },
      { name: "Vercel", proficiency: 85, color: "#000000" },
      { name: "Prisma", proficiency: 85, color: "#2D3748" },
      { name: "PostgreSQL", proficiency: 80, color: "#336791" },
    ],
  },
  {
    name: "Soft Skills",
    icon: "users",
    items: [
      { name: "Problem Solving", proficiency: 90, color: "#10B981" },
      { name: "Communication", proficiency: 85, color: "#3B82F6" },
      { name: "Team Leadership", proficiency: 80, color: "#8B5CF6" },
      { name: "Agile/Scrum", proficiency: 85, color: "#F59E0B" },
    ],
  },
]

export const techRadarCategories: TechRadarCategory[] = [
  {
    name: "Frontend",
    ring: "adopt",
    description: "Technologies we actively use and recommend",
    items: [
      { name: "Next.js", description: "React framework for production", category: "frontend" },
      { name: "TypeScript", description: "Typed superset of JavaScript", category: "frontend" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework", category: "frontend" },
      { name: "Framer Motion", description: "Animation library for React", category: "frontend" },
    ],
  },
  {
    name: "Backend",
    ring: "trial",
    description: "Technologies we're exploring with confidence",
    items: [
      { name: "tRPC", description: "End-to-end typesafe APIs", category: "backend" },
      { name: "Hono", description: "Lightweight web framework", category: "backend" },
      { name: "Bun", description: "All-in-one JavaScript runtime", category: "backend" },
    ],
  },
  {
    name: "Infrastructure",
    ring: "assess",
    description: "Technologies worth investigating",
    items: [
      { name: "Kubernetes", description: "Container orchestration", category: "infrastructure" },
      { name: "Terraform", description: "Infrastructure as code", category: "infrastructure" },
    ],
  },
  {
    name: "Legacy",
    ring: "hold",
    description: "Technologies to avoid or phase out",
    items: [
      { name: "jQuery", description: "Legacy DOM manipulation", category: "legacy" },
      { name: "PHP", description: "Server-side scripting", category: "legacy" },
    ],
  },
]

export const technologyGraphNodes: TechnologyGraphNode[] = [
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
]
