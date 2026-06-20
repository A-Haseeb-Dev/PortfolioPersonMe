import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const db = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // ── Admin User ──────────────────────────────────────────────
  const hashedPassword = await hash("Admin@123", 12)
  const admin = await db.user.upsert({
    where: { email: "admin@muhammadhaseebkhalid.com" },
    update: {},
    create: {
      name: "Muhammad Haseeb Khalid",
      email: "admin@muhammadhaseebkhalid.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  })
  console.log("Created admin user:", admin.email)

  // ── Technology Categories ───────────────────────────────────
  const categories = await Promise.all([
    db.technologyCategory.upsert({
      where: { slug: "frontend" },
      update: {},
      create: { name: "Frontend", slug: "frontend", description: "Frontend technologies", icon: "Monitor", order: 1 },
    }),
    db.technologyCategory.upsert({
      where: { slug: "backend" },
      update: {},
      create: { name: "Backend", slug: "backend", description: "Backend technologies", icon: "Server", order: 2 },
    }),
    db.technologyCategory.upsert({
      where: { slug: "database" },
      update: {},
      create: { name: "Database", slug: "database", description: "Database technologies", icon: "Database", order: 3 },
    }),
    db.technologyCategory.upsert({
      where: { slug: "devops" },
      update: {},
      create: { name: "DevOps", slug: "devops", description: "DevOps & Cloud", icon: "Cloud", order: 4 },
    }),
    db.technologyCategory.upsert({
      where: { slug: "language" },
      update: {},
      create: { name: "Languages", slug: "language", description: "Programming languages", icon: "Code", order: 5 },
    }),
    db.technologyCategory.upsert({
      where: { slug: "tools" },
      update: {},
      create: { name: "Tools", slug: "tools", description: "Development tools", icon: "Wrench", order: 6 },
    }),
  ])

  // ── Technologies ────────────────────────────────────────────
  const techs = await Promise.all([
    db.technology.upsert({
      where: { slug: "react" },
      update: {},
      create: { name: "React", slug: "react", description: "UI library for web apps", experienceLevel: "EXPERT", yearsExperience: 4, categoryId: categories[0].id },
    }),
    db.technology.upsert({
      where: { slug: "nextjs" },
      update: {},
      create: { name: "Next.js", slug: "nextjs", description: "React framework for production", experienceLevel: "EXPERT", yearsExperience: 3, categoryId: categories[0].id },
    }),
    db.technology.upsert({
      where: { slug: "typescript" },
      update: {},
      create: { name: "TypeScript", slug: "typescript", description: "Typed JavaScript", experienceLevel: "EXPERT", yearsExperience: 3, categoryId: categories[4].id },
    }),
    db.technology.upsert({
      where: { slug: "nodejs" },
      update: {},
      create: { name: "Node.js", slug: "nodejs", description: "JavaScript runtime", experienceLevel: "ADVANCED", yearsExperience: 3, categoryId: categories[1].id },
    }),
    db.technology.upsert({
      where: { slug: "python" },
      update: {},
      create: { name: "Python", slug: "python", description: "General purpose language", experienceLevel: "ADVANCED", yearsExperience: 2, categoryId: categories[4].id },
    }),
    db.technology.upsert({
      where: { slug: "postgresql" },
      update: {},
      create: { name: "PostgreSQL", slug: "postgresql", description: "Relational database", experienceLevel: "ADVANCED", yearsExperience: 3, categoryId: categories[2].id },
    }),
    db.technology.upsert({
      where: { slug: "tailwindcss" },
      update: {},
      create: { name: "Tailwind CSS", slug: "tailwindcss", description: "Utility-first CSS framework", experienceLevel: "EXPERT", yearsExperience: 3, categoryId: categories[0].id },
    }),
    db.technology.upsert({
      where: { slug: "docker" },
      update: {},
      create: { name: "Docker", slug: "docker", description: "Containerization platform", experienceLevel: "INTERMEDIATE", yearsExperience: 1.5, categoryId: categories[3].id },
    }),
    db.technology.upsert({
      where: { slug: "git" },
      update: {},
      create: { name: "Git", slug: "git", description: "Version control", experienceLevel: "ADVANCED", yearsExperience: 4, categoryId: categories[5].id },
    }),
    db.technology.upsert({
      where: { slug: "prisma" },
      update: {},
      create: { name: "Prisma", slug: "prisma", description: "ORM for Node.js", experienceLevel: "ADVANCED", yearsExperience: 2, categoryId: categories[1].id },
    }),
  ])

  console.log(`Created ${techs.length} technologies`)

  // ── Technology Relations ────────────────────────────────────
  await db.technologyRelation.createMany({
    data: [
      { fromTechnologyId: techs[0].id, toTechnologyId: techs[1].id, relationType: "builds-on" },
      { fromTechnologyId: techs[2].id, toTechnologyId: techs[0].id, relationType: "enhances" },
      { fromTechnologyId: techs[2].id, toTechnologyId: techs[1].id, relationType: "enhances" },
      { fromTechnologyId: techs[4].id, toTechnologyId: techs[3].id, relationType: "runs-on" },
      { fromTechnologyId: techs[3].id, toTechnologyId: techs[5].id, relationType: "connects-to" },
    ],
  })
  console.log("Created technology relations")

  // ── Blog Categories ────────────────────────────────────────
  const blogCats = await Promise.all([
    db.blogCategory.upsert({
      where: { slug: "web-development" },
      update: {},
      create: { name: "Web Development", slug: "web-development", description: "Modern web dev topics", color: "#3B82F6" },
    }),
    db.blogCategory.upsert({
      where: { slug: "career" },
      update: {},
      create: { name: "Career", slug: "career", description: "Career advice and growth", color: "#10B981" },
    }),
    db.blogCategory.upsert({
      where: { slug: "tutorials" },
      update: {},
      create: { name: "Tutorials", slug: "tutorials", description: "Step-by-step guides", color: "#F59E0B" },
    }),
    db.blogCategory.upsert({
      where: { slug: "tech-insights" },
      update: {},
      create: { name: "Tech Insights", slug: "tech-insights", description: "Technology analysis", color: "#8B5CF6" },
    }),
  ])

  // ── Blog Tags ───────────────────────────────────────────────
  const tags = await Promise.all([
    db.blogTag.upsert({ where: { slug: "react" }, update: {}, create: { name: "React", slug: "react" } }),
    db.blogTag.upsert({ where: { slug: "nextjs" }, update: {}, create: { name: "Next.js", slug: "nextjs" } }),
    db.blogTag.upsert({ where: { slug: "typescript" }, update: {}, create: { name: "TypeScript", slug: "typescript" } }),
    db.blogTag.upsert({ where: { slug: "web-dev" }, update: {}, create: { name: "Web Dev", slug: "web-dev" } }),
    db.blogTag.upsert({ where: { slug: "portfolio" }, update: {}, create: { name: "Portfolio", slug: "portfolio" } }),
  ])

  // ── Blog Posts ──────────────────────────────────────────────
  const blog1 = await db.blog.upsert({
    where: { slug: "building-a-modern-portfolio-with-nextjs" },
    update: {},
    create: {
      title: "Building a Modern Portfolio with Next.js",
      slug: "building-a-modern-portfolio-with-nextjs",
      content: `# Building a Modern Portfolio with Next.js\n\nIn this post, I'll walk through how I built my portfolio using Next.js 16 with the App Router, TypeScript, Tailwind CSS, and Framer Motion.\n\n## Why Next.js?\n\nNext.js provides the best developer experience for building full-stack React applications with server-side rendering, static generation, and API routes.\n\n## Key Features\n\n- **App Router** for intuitive routing\n- **Server Components** for better performance\n- **API Routes** for backend functionality\n- **TypeScript** for type safety\n\n## Conclusion\n\nBuilding a portfolio with Next.js allows for a seamless blend of performance, SEO, and developer experience.`,
      excerpt: "How I built my portfolio using Next.js 16 with App Router, TypeScript, and Tailwind CSS.",
      readingTime: 5,
      published: true,
      featured: true,
      seoTitle: "Building a Modern Portfolio with Next.js",
      seoDescription: "Learn how to build a modern portfolio with Next.js 16",
      authorId: admin.id,
      categoryId: blogCats[0].id,
    },
  })

  const blog2 = await db.blog.upsert({
    where: { slug: "typescript-best-practices-2026" },
    update: {},
    create: {
      title: "TypeScript Best Practices in 2026",
      slug: "typescript-best-practices-2026",
      content: `# TypeScript Best Practices in 2026\n\nTypeScript has evolved significantly. Here are the practices I follow.\n\n## 1. Strict Mode\n\nAlways enable strict mode in your tsconfig.json.\n\n## 2. Use Type Inference\n\nLet TypeScript infer types when possible.\n\n## 3. Prefer Interfaces for Objects\n\nUse interfaces over type aliases for object shapes.\n\n## Conclusion\n\nFollowing these practices ensures maintainable and type-safe code.`,
      excerpt: "Essential TypeScript practices for writing cleaner, safer code in 2026.",
      readingTime: 7,
      published: true,
      featured: false,
      authorId: admin.id,
      categoryId: blogCats[3].id,
    },
  })

  await db.blogTags.createMany({
    data: [
      { blogId: blog1.id, tagId: tags[0].id },
      { blogId: blog1.id, tagId: tags[1].id },
      { blogId: blog1.id, tagId: tags[3].id },
      { blogId: blog1.id, tagId: tags[4].id },
      { blogId: blog2.id, tagId: tags[2].id },
      { blogId: blog2.id, tagId: tags[3].id },
    ],
  })
  console.log(`Created ${2} blog posts`)

  // ── Projects ────────────────────────────────────────────────
  const project1 = await db.project.upsert({
    where: { slug: "portfolio-platform" },
    update: {},
    create: {
      title: "Personal Portfolio Platform",
      slug: "portfolio-platform",
      description: "A full-stack portfolio platform with blog, admin panel, knowledge base, and AI chatbot assistant.",
      problem: "Needed a single platform to showcase skills, projects, and writings with enterprise-grade admin capabilities.",
      solution: "Built with Next.js 16, Prisma, PostgreSQL, and deployed on Vercel with a custom analytics system.",
      architecture: "Monolithic Next.js app with App Router, server components for performance, API routes for backend logic.",
      features: JSON.stringify(["Blog with markdown", "Admin dashboard", "AI chatbot", "Knowledge base", "Analytics dashboard", "Dark mode"]),
      githubUrl: "https://github.com/MuhammadHaseebKhalid/portfolio",
      liveUrl: "https://muhammadhaseebkhalid.vercel.app",
      results: "Successfully deployed with 56 routes, 100+ Lighthouse score",
      published: true,
      featured: true,
      coverImage: "https://res.cloudinary.com/djvo1frqj/image/upload/v1/portfolio/placeholder",
    },
  })

  const project2 = await db.project.upsert({
    where: { slug: "ecommerce-platform" },
    update: {},
    create: {
      title: "E-Commerce Platform",
      slug: "ecommerce-platform",
      description: "A full-featured e-commerce platform with payment processing, inventory management, and real-time analytics.",
      problem: "Small businesses need affordable digital storefronts with modern UX.",
      solution: "Built with Next.js, Stripe integration, and PostgreSQL for reliable data storage.",
      features: JSON.stringify(["Shopping cart", "Stripe payments", "Admin dashboard", "Inventory tracking", "Order management"]),
      published: true,
      featured: true,
    },
  })

  // ── Project Technologies ────────────────────────────────────
  await db.projectTechnology.createMany({
    data: [
      { projectId: project1.id, technologyId: techs[1].id },
      { projectId: project1.id, technologyId: techs[2].id },
      { projectId: project1.id, technologyId: techs[6].id },
      { projectId: project1.id, technologyId: techs[5].id },
      { projectId: project1.id, technologyId: techs[9].id },
      { projectId: project2.id, technologyId: techs[0].id },
      { projectId: project2.id, technologyId: techs[3].id },
      { projectId: project2.id, technologyId: techs[5].id },
    ],
  })
  console.log(`Created ${2} projects`)

  // ── Services ────────────────────────────────────────────────
  await Promise.all([
    db.service.upsert({
      where: { slug: "web-development" },
      update: {},
      create: {
        title: "Web Development",
        slug: "web-development",
        description: "Custom web applications built with modern frameworks and best practices.",
        icon: "Globe",
        features: JSON.stringify(["Responsive design", "SEO optimization", "Performance tuning", "Accessibility"]),
        price: 5000,
        published: true,
      },
    }),
    db.service.upsert({
      where: { slug: "api-development" },
      update: {},
      create: {
        title: "API Development",
        slug: "api-development",
        description: "RESTful and GraphQL APIs designed for scalability and maintainability.",
        icon: "Server",
        features: JSON.stringify(["REST & GraphQL", "Authentication", "Rate limiting", "Documentation"]),
        price: 3000,
        published: true,
      },
    }),
    db.service.upsert({
      where: { slug: "consulting" },
      update: {},
      create: {
        title: "Technical Consulting",
        slug: "consulting",
        description: "Architecture review, code audits, and technology strategy for your projects.",
        icon: "Lightbulb",
        features: JSON.stringify(["Architecture review", "Code audits", "Tech stack advice", "Performance optimization"]),
        price: 150,
        published: true,
      },
    }),
  ])
  console.log("Created 3 services")

  // ── Testimonials ────────────────────────────────────────────
  await db.testimonial.createMany({
    data: [
      {
        name: "Sarah Ahmed",
        title: "CTO",
        company: "TechVentures",
        content: "Haseeb delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth.",
        rating: 5,
        featured: true,
        order: 1,
      },
      {
        name: "Usman Khan",
        title: "Founder",
        company: "Digital Solutions",
        content: "Working with Haseeb was a great experience. He understood our requirements perfectly and delivered on time. Highly recommended!",
        rating: 5,
        featured: true,
        order: 2,
      },
      {
        name: "Ayesha Malik",
        title: "Product Manager",
        company: "StartupHub",
        content: "The API architecture Haseeb designed for us was clean, well-documented, and scalable. Our development team loved working with it.",
        rating: 5,
        featured: false,
        order: 3,
      },
    ],
  })
  console.log("Created 3 testimonials")

  // ── Case Studies ────────────────────────────────────────────
  await db.caseStudy.upsert({
    where: { slug: "portfolio-platform-case-study" },
    update: {},
    create: {
      title: "Building a Full-Stack Portfolio Platform",
      slug: "portfolio-platform-case-study",
      client: "Self",
      industry: "Technology",
      duration: "3 months",
      role: "Full-Stack Developer",
      team: "Solo",
      problem: "Required a modern, performant platform to showcase skills and manage content.",
      research: "Evaluated Next.js, Astro, and Gatsby. Next.js 16 with App Router was the clear winner for its server components and API routes.",
      architecture: "Monolithic Next.js app with Prisma ORM, PostgreSQL, and Cloudinary for media.",
      development: "Built 27 database models, 20+ UI components, and 18 API routes.",
      testing: "Manual testing across all routes and components. TypeScript strict mode enabled.",
      deployment: "Deployed on Vercel with automatic HTTPS, CDN, and environment variables.",
      results: "56 routes, static generation for performance, comprehensive admin panel.",
      technologies: JSON.stringify(["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"]),
      published: true,
      featured: true,
    },
  })
  console.log("Created 1 case study")

  // ── Achievements ────────────────────────────────────────────
  await db.achievement.createMany({
    data: [
      {
        title: "Completed 50+ Projects",
        description: "Successfully delivered over 50 web development projects for clients worldwide.",
        type: "MILESTONE",
        icon: "Award",
      },
      {
        title: "AWS Certified Developer",
        description: "Achieved AWS Certified Developer - Associate certification.",
        type: "CERTIFICATION",
        icon: "Certificate",
        url: "https://aws.amazon.com/certification/",
      },
      {
        title: "Open Source Contributor",
        description: "Active contributor to open source projects including Next.js and Prisma.",
        type: "MILESTONE",
        icon: "GitFork",
      },
    ],
  })
  console.log("Created 3 achievements")

  // ── Learning Journey ────────────────────────────────────────
  const learning = await db.learningJourney.upsert({
    where: { id: "learning-nextjs-advanced" },
    update: {},
    create: {
      id: "learning-nextjs-advanced",
      title: "Advanced Next.js Patterns",
      description: "Deep dive into server components, streaming, and advanced caching strategies.",
      status: "CURRENT",
      category: "Web Development",
    },
  })
  await db.learningMilestone.createMany({
    data: [
      { title: "Server Components", description: "Understood RSC architecture", journeyId: learning.id, completed: true },
      { title: "Streaming & Suspense", description: "Implemented streaming patterns", journeyId: learning.id, completed: true },
      { title: "Advanced Caching", description: "Mastered ISR and on-demand revalidation", journeyId: learning.id, completed: false },
    ],
  })
  console.log("Created learning journey with milestones")

  // ── Startup Ideas ───────────────────────────────────────────
  await db.startupIdea.createMany({
    data: [
      {
        title: "DevPortfolio SaaS",
        slug: "devportfolio-saas",
        problem: "Developers struggle to create and maintain professional portfolios.",
        solution: "A SaaS platform that generates and hosts portfolios from GitHub profiles.",
        market: "Millions of developers worldwide need online presence.",
        revenueModel: "Freemium with premium themes and custom domains.",
        status: "VALIDATING",
        published: true,
      },
      {
        title: "CodeReview AI",
        slug: "codereview-ai",
        problem: "Code reviews are time-consuming and inconsistent.",
        solution: "AI-powered code review assistant that integrates with GitHub and GitLab.",
        status: "IDEA",
        published: true,
      },
    ],
  })
  console.log("Created 2 startup ideas")

  // ── Resources ───────────────────────────────────────────────
  await db.resource.upsert({
    where: { slug: "web-developer-resume" },
    update: {},
    create: {
      title: "Web Developer Resume Template",
      slug: "web-developer-resume",
      description: "A professional resume template designed for web developers.",
      type: "RESUME",
      published: true,
    },
  })
  await db.resource.upsert({
    where: { slug: "react-cheat-sheet" },
    update: {},
    create: {
      title: "React 19 Cheat Sheet",
      slug: "react-cheat-sheet",
      description: "Quick reference for React 19 hooks, patterns, and best practices.",
      type: "CHEAT_SHEET",
      published: true,
    },
  })
  console.log("Created 2 resources")

  // ── SEO Entries ─────────────────────────────────────────────
  await db.sEO.createMany({
    data: [
      { page: "/", title: "Muhammad Haseeb Khalid - Full-Stack Developer", description: "Full-stack developer specializing in Next.js, TypeScript, and modern web technologies." },
      { page: "/about", title: "About - Muhammad Haseeb Khalid", description: "Learn about my journey in web development." },
      { page: "/projects", title: "Projects - Muhammad Haseeb Khalid", description: "Explore my portfolio of web development projects." },
      { page: "/blog", title: "Blog - Muhammad Haseeb Khalid", description: "Read articles about web development, career, and technology." },
      { page: "/contact", title: "Contact - Muhammad Haseeb Khalid", description: "Get in touch for collaboration or opportunities." },
    ],
  })
  console.log("Created 5 SEO entries")

  // ── Settings ────────────────────────────────────────────────
  await db.settings.upsert({
    where: { key: "site-name" },
    update: {},
    create: { key: "site-name", value: JSON.stringify("Muhammad Haseeb Khalid") },
  })
  await db.settings.upsert({
    where: { key: "site-description" },
    update: {},
    create: { key: "site-description", value: JSON.stringify("Full-Stack Developer & Technical Writer") },
  })

  console.log("Seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
