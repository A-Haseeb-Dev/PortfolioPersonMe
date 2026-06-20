import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
})

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  problem: z.string().optional(),
  solution: z.string().optional(),
  architecture: z.string().optional(),
  features: z.any().optional(),
  results: z.string().optional(),
  lessonsLearned: z.string().optional(),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  images: z.array(z.string()).optional(),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  videoDemo: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  featured: z.boolean().default(false),
  status: z.enum(["completed", "in-progress", "planned"]).default("completed"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  highlights: z.array(z.string()).optional(),
})

export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z.string().optional(),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(500),
  content: z.string().min(50, "Content must be at least 50 characters"),
  coverImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  category: z.string().min(1, "Category is required"),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  readingTime: z.number().optional(),
})

export const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  icon: z.string().min(1, "Icon is required"),
  price: z.string().optional(),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  category: z.string().optional(),
  order: z.number().optional(),
})

export const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  company: z.string().min(1, "Company is required"),
  content: z.string().min(10, "Content must be at least 10 characters").max(1000),
  avatar: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  rating: z.number().min(1).max(5).optional(),
  featured: z.boolean().default(false),
})

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  role: z.enum(["admin", "editor", "user"]).default("user"),
})

export const resourceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  url: z.string().url("Must be a valid URL"),
  type: z.enum(["article", "video", "course", "tool", "book", "podcast", "other"]),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  free: z.boolean().default(true),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

export const startupIdeaSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  problem: z.string().min(10, "Problem must be at least 10 characters"),
  solution: z.string().min(10, "Solution must be at least 10 characters"),
  targetAudience: z.string().min(3, "Target audience is required"),
  marketSize: z.string().optional(),
  businessModel: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  status: z.enum(["idea", "validating", "in-progress", "launched", "pivoted"]).default("idea"),
  featured: z.boolean().default(false),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
})

export const caseStudySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z.string().optional(),
  client: z.string().min(2, "Client name is required"),
  overview: z.string().min(20, "Overview must be at least 20 characters"),
  challenge: z.string().min(20, "Challenge must be at least 20 characters"),
  approach: z.string().min(20, "Approach must be at least 20 characters"),
  solution: z.string().min(20, "Solution must be at least 20 characters"),
  results: z.string().min(10, "Results must be at least 10 characters"),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  images: z.array(z.string()).optional(),
  testimonial: z.string().optional(),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
  featured: z.boolean().default(false),
  completedDate: z.string().optional(),
  duration: z.string().optional(),
})

export const technologySchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().optional(),
  proficiency: z.number().min(0).max(100).optional(),
  color: z.string().optional(),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  order: z.number().optional(),
})

export const learningJourneySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["not-started", "in-progress", "completed", "on-hold"]).default("not-started"),
  resources: z.array(z.string()).optional(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  certificate: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  order: z.number().optional(),
})

export const achievementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  date: z.string().min(1, "Date is required"),
  category: z.enum(["certification", "award", "publication", "competition", "other"]),
  issuer: z.string().min(1, "Issuer is required"),
  credentialUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  featured: z.boolean().default(false),
})

export type LoginInput = z.infer<typeof loginSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type BlogInput = z.infer<typeof blogSchema>
export type ServiceInput = z.infer<typeof serviceSchema>
export type TestimonialInput = z.infer<typeof testimonialSchema>
export type UserInput = z.infer<typeof userSchema>
export type ResourceInput = z.infer<typeof resourceSchema>
export type StartupIdeaInput = z.infer<typeof startupIdeaSchema>
export type CaseStudyInput = z.infer<typeof caseStudySchema>
export type TechnologyInput = z.infer<typeof technologySchema>
export type LearningJourneyInput = z.infer<typeof learningJourneySchema>
export type AchievementInput = z.infer<typeof achievementSchema>
