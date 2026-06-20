export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string | null
  category: string
  tags: string[]
  readingTime: string
  date: string
  featured: boolean
  author: {
    name: string
    avatar: string | null
    role: string
  }
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Web Applications with Next.js",
    slug: "building-scalable-web-apps-nextjs",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop",
    excerpt:
      "A deep dive into architecture patterns, optimization techniques, and best practices for building production-ready Next.js applications that scale.",
    content: `## Introduction

Building web applications that scale is both an art and a science. As your user base grows, the architecture decisions you make early on can either enable rapid growth or become a bottleneck that slows your entire team down.

Next.js has emerged as the leading React framework for production applications, offering a powerful hybrid rendering model that combines the best of server-side rendering (SSR), static site generation (SSG), and incremental static regeneration (ISR).

## Architecture Patterns

### The App Router

Next.js 13+ introduced the App Router, a fundamental shift in how we structure Next.js applications. The App Router is built on React Server Components (RSC), allowing components to run on the server by default.

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
\`\`\`

### Route Groups and Layouts

Route groups allow you to organize routes without affecting the URL structure:

\`\`\`typescript
// app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </div>
  )
}
\`\`\`

## Performance Optimization

### Image Optimization

Next.js provides automatic image optimization through the \`next/image\` component:

\`\`\`typescript
import Image from "next/image"

export default function Hero() {
  return (
    <Image
      src="/hero.webp"
      alt="Hero"
      width={1200}
      height={600}
      priority
      className="rounded-2xl"
    />
  )
}
\`\`\`

### Caching Strategies

Implementing effective caching strategies is crucial for performance:

- **Static Rendering**: Pre-render pages at build time for instant loads
- **Incremental Static Regeneration**: Update static pages without rebuilding
- **On-Demand Revalidation**: Revalidate pages when data changes

\`\`\`typescript
// app/posts/page.tsx
export const revalidate = 3600 // revalidate every hour

async function getPosts() {
  const res = await fetch("https://api.example.com/posts")
  return res.json()
}
\`\`\`

## Data Fetching Patterns

### Server Components

With React Server Components, you can fetch data directly in your components:

\`\`\`typescript
async function PostList() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
\`\`\`

### Streaming and Suspense

Use streaming to improve perceived performance:

\`\`\`typescript
import { Suspense } from "react"

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}
\`\`\`

## Conclusion

Building scalable web applications with Next.js requires thoughtful architecture, performance optimization, and a solid data fetching strategy. By leveraging the App Router, React Server Components, and the built-in optimization features, you can build applications that handle millions of users without breaking a sweat.

The key takeaways are:
- Use the App Router for better performance and developer experience
- Implement caching strategies appropriate for your data
- Leverage streaming for improved perceived performance
- Optimize images and fonts for faster loading`,
    category: "Next.js",
    tags: ["Next.js", "React", "Performance", "Architecture", "Web Development"],
    readingTime: "8 min read",
    date: "Mar 15, 2026",
    featured: true,
    author: {
      name: "Abdul Haseeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      role: "Full-Stack Developer",
    },
  },
  {
    id: "2",
    title: "The Future of TypeScript: What's New in 2026",
    slug: "future-of-typescript-2026",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=800&fit=crop",
    excerpt:
      "Exploring the latest TypeScript features, type system improvements, and how they're shaping the modern development landscape.",
    content: `## Introduction

TypeScript continues to evolve at a rapid pace. The 2026 release brings several groundbreaking features that enhance developer productivity and type safety.

## Key Features

### Decorators

The native decorator implementation is now stable:

\`\`\`typescript
function log(target: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name)

  function replacementMethod(this: any, ...args: any[]) {
    console.log(\`Calling \${methodName} with\`, args)
    const result = target.call(this, ...args)
    console.log(\`\${methodName} returned\`, result)
    return result
  }

  return replacementMethod
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b
  }
}
\`\`\`

### Const Type Parameters

Type parameter inference with \`const\` modifier:

\`\`\`typescript
function getConfig<const T extends readonly string[]>(items: T): T {
  return items
}

// Type is inferred as readonly ["admin", "user", "guest"]
const roles = getConfig(["admin", "user", "guest"])
\`\`\`

### Improved Type Narrowing

Better control flow analysis for discriminated unions:

\`\`\`typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number }

function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2
  }
  if (shape.kind === "rectangle") {
    return shape.width * shape.height
  }
  return (shape.base * shape.height) / 2
}
\`\`\`

## Best Practices

### Use Strict Mode

Always enable strict mode in your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
\`\`\`

### Prefer Interfaces Over Types

Interfaces are more extensible and produce better error messages:

\`\`\`typescript
// Prefer this
interface User {
  id: string
  name: string
  email: string
}

// Over this
type User = {
  id: string
  name: string
  email: string
}
\`\`\`

## Conclusion

TypeScript in 2026 is more powerful than ever. The new features focus on making type-safe code easier to write and maintain, while the tooling improvements make the developer experience even smoother.`,
    category: "JavaScript",
    tags: ["TypeScript", "JavaScript", "Programming", "Web Development"],
    readingTime: "6 min read",
    date: "Feb 28, 2026",
    featured: false,
    author: {
      name: "Abdul Haseeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      role: "Full-Stack Developer",
    },
  },
  {
    id: "3",
    title: "AI-Powered Development: Tools and Workflows in 2026",
    slug: "ai-powered-development",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    excerpt:
      "How AI is transforming software development workflows, from code generation to automated testing and deployment.",
    content: `## Introduction

Artificial intelligence is fundamentally changing how we write software. In 2026, AI-powered development tools have become an essential part of every developer's toolkit.

## AI Code Assistants

### Cursor and VS Code Integration

Modern AI assistants can understand entire codebases:

\`\`\`typescript
// AI can generate entire functions from comments
// It understands your codebase context, style, and conventions

/** Fetches user data with caching and error handling */
async function fetchUserData(userId: string): Promise<User> {
  const cacheKey = \`user:\${userId}\`
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) throw new NotFoundError("User not found")

  await redis.setex(cacheKey, 300, JSON.stringify(user))
  return user
}
\`\`\`

### Automated Testing

AI can generate comprehensive test suites:

\`\`\`typescript
describe("UserService", () => {
  it("should create a new user", async () => {
    const user = await UserService.create({
      name: "John Doe",
      email: "john@example.com",
    })
    expect(user).toBeDefined()
    expect(user.name).toBe("John Doe")
  })

  it("should throw on duplicate email", async () => {
    await UserService.create({
      name: "Jane Doe",
      email: "jane@example.com",
    })
    await expect(
      UserService.create({ name: "Jane Doe", email: "jane@example.com" })
    ).rejects.toThrow(DuplicateEmailError)
  })
})
\`\`\`

## AI-Powered Code Review

Automated code reviews catch issues before they reach production:

\`\`\`typescript
// AI review catches this potential issue
function processPayment(amount: number, currency: string) {
  // WARNING: Missing input validation
  // WARNING: No currency conversion handling
  // SUGGESTION: Add rate limiting
  return paymentGateway.charge(amount, currency)
}
\`\`\`

## Workflow Automation

### CI/CD with AI

AI can optimize your build pipeline:

\`\`\`yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
\`\`\`

## The Human Element

Despite all the AI advancement, human developers remain crucial for:
- **Architecture decisions** — AI can suggest but humans design
- **Product intuition** — Understanding user needs
- **Code review judgment** — AI misses business context
- **Creative problem-solving** — Novel solutions require human creativity

## Conclusion

AI is not replacing developers — it's making us more productive than ever. Embrace these tools while focusing on the uniquely human aspects of software engineering.`,
    category: "AI",
    tags: ["AI", "Development", "Tools", "Productivity", "Future"],
    readingTime: "10 min read",
    date: "Feb 10, 2026",
    featured: false,
    author: {
      name: "Abdul Haseeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      role: "Full-Stack Developer",
    },
  },
  {
    id: "4",
    title: "Mastering React Server Components: A Practical Guide",
    slug: "mastering-react-server-components",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop",
    excerpt:
      "Learn how to leverage React Server Components to build faster, more efficient applications with less client-side JavaScript.",
    content: `## Introduction

React Server Components (RSC) represent a paradigm shift in how we think about React applications. By running components on the server, we can reduce bundle size, improve performance, and simplify data fetching.

## Understanding Server vs Client Components

### Server Components (Default)

\`\`\`typescript
// This is a Server Component by default
// It can use async/await directly
async function ProductList() {
  const products = await db.product.findMany()

  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
\`\`\`

### Client Components

\`\`\`typescript
"use client"

import { useState } from "react"

export function AddToCart({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false)

  return (
    <button
      onClick={() => {
        setAdded(true)
        addToCart(productId)
      }}
      className="rounded-lg bg-zinc-900 px-4 py-2 text-white"
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  )
}
\`\`\`

## Composition Patterns

### Passing Client Components to Server Components

\`\`\`typescript
// Server Component
async function ProductPage({ id }: { id: string }) {
  const product = await db.product.findUnique({ where: { id } })

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Client component passed as a prop */}
      <AddToCart productId={product.id} />
    </div>
  )
}
\`\`\`

## Data Fetching

### Parallel Data Fetching

\`\`\`typescript
async function Dashboard() {
  // Fetch in parallel
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics(),
  ])

  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
      <AnalyticsChart data={analytics} />
    </div>
  )
}
\`\`\`

## Performance Benefits

Server Components eliminate the need to send JavaScript to the client for purely presentational components. This means:

- **Smaller bundle sizes** — Only interactive components send JS
- **Faster page loads** — HTML is streamed from the server
- **Better SEO** — Content is immediately available
- **Reduced client processing** — Less work for the browser

## Conclusion

React Server Components are not just a performance optimization — they're a better mental model for building web applications. By defaulting to the server, you naturally build faster, more efficient apps.`,
    category: "React",
    tags: ["React", "Server Components", "Performance", "Next.js"],
    readingTime: "7 min read",
    date: "Jan 25, 2026",
    featured: true,
    author: {
      name: "Abdul Haseeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      role: "Full-Stack Developer",
    },
  },
  {
    id: "5",
    title: "Building Cross-Platform Apps with Flutter: Lessons Learned",
    slug: "cross-platform-flutter-lessons",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
    excerpt:
      "Key insights and lessons from building production Flutter applications for iOS, Android, and the web.",
    content: `## Introduction

Flutter has matured into a powerful framework for building cross-platform applications. After shipping multiple production apps, here are the most valuable lessons I've learned.

## State Management

### Riverpod: The Modern Approach

\`\`\`dart
final userRepository = Provider<UserRepository>((ref) {
  return UserRepository();
});

final currentUser = FutureProvider<User>((ref) {
  final repository = ref.watch(userRepository);
  return repository.fetchCurrentUser();
});

class UserProfile extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(currentUser);

    return userAsync.when(
      loading: () => const CircularProgressIndicator(),
      error: (err, stack) => Text('Error: \$err'),
      data: (user) => Text('Hello, \${user.name}!'),
    );
  }
}
\`\`\`

## Platform-Specific Code

### Using Platform Channels

\`\`\`dart
import 'package:flutter/services.dart';

class BatteryLevel {
  static const platform = MethodChannel('samples.flutter.dev/battery');

  static Future<int> getBatteryLevel() async {
    try {
      final result = await platform.invokeMethod('getBatteryLevel');
      return result as int;
    } on PlatformException catch (e) {
      throw Exception("Failed to get battery level: \${e.message}");
    }
  }
}
\`\`\`

## Performance Optimization

### Image Caching

\`\`\`dart
CachedNetworkImage(
  imageUrl: "https://example.com/image.jpg",
  placeholder: (context, url) => const CircularProgressIndicator(),
  errorWidget: (context, url, error) => const Icon(Icons.error),
  fadeInDuration: const Duration(milliseconds: 300),
)
\`\`\`

## Testing

### Widget Testing

\`\`\`dart
void main() {
  testWidgets('Login form validates email', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: LoginPage()));

    await tester.enterText(
      find.byKey(const Key('email-field')),
      'invalid-email',
    );

    await tester.tap(find.byKey(const Key('submit-button')));
    await tester.pump();

    expect(find.text('Please enter a valid email'), findsOneWidget);
  });
}
\`\`\`

## Key Takeaways

1. **Choose state management early** — Riverpod or Bloc are great choices
2. **Test on real devices** — Simulators miss platform-specific issues
3. **Optimize images** — Use cached_network_image for production
4. **Handle platform differences** — Use Platform.isIOS or Platform.isAndroid
5. **Monitor performance** — Use the DevTools profiler regularly

## Conclusion

Flutter is an excellent choice for cross-platform development when you need pixel-perfect UIs and native performance. The ecosystem has matured significantly, and the developer experience is world-class.`,
    category: "Flutter",
    tags: ["Flutter", "Cross-Platform", "Mobile", "Dart", "Development"],
    readingTime: "9 min read",
    date: "Jan 12, 2026",
    featured: false,
    author: {
      name: "Abdul Haseeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      role: "Full-Stack Developer",
    },
  },
  {
    id: "6",
    title: "From Junior to Senior: A Developer's Career Roadmap",
    slug: "junior-to-senior-developer-roadmap",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
    excerpt:
      "A practical guide to advancing your software engineering career, from mastering technical skills to building leadership capabilities.",
    content: `## Introduction

The journey from junior to senior developer is not just about writing better code. It's about developing a holistic set of skills that span technical expertise, communication, leadership, and business acumen.

## Technical Skills

### Master Your Stack

Deep knowledge of your primary stack is non-negotiable. But being a senior means understanding the WHY, not just the HOW:

\`\`\`typescript
// Junior mindset: "This works"
function fetchData() {
  return fetch("/api/data").then((r) => r.json())
}

// Senior mindset: "This works reliably and efficiently"
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  })

  if (!response.ok) {
    throw new ApiError(
      \`API request failed: \${response.statusText}\`,
      response.status
    )
  }

  return response.json()
}
\`\`\`

## System Design

Seniors think in systems, not just features:

- **Scalability** — How will this handle 10x growth?
- **Reliability** — What happens when things fail?
- **Maintainability** — Can another team understand this in 6 months?
- **Observability** — How do we know it's working in production?

## Soft Skills

### Communication

Clear communication is the most underrated engineering skill:

\`\`\`typescript
// Instead of:
// "The API is slow"
// Say:
// "The /users endpoint currently responds in 2.3s (p95).
//  We should add database indexing and implement Redis caching
//  to bring this under 200ms. Estimated effort: 2 days."
\`\`\`

### Code Review Mindset

| Junior Review | Senior Review |
|--------------|---------------|
| "This works" | "Is this testable?" |
| "LGTM" | "What's the error budget?" |
| No comments | Constructive feedback |
| Focuses on style | Focuses on correctness |

## Career Growth Strategies

### 1. Build Things End-to-End

Don't just own the frontend or backend. Build complete features that touch every layer.

### 2. Write Things Down

Document architecture decisions, post-mortems, and design docs. Writing clarifies thinking.

### 3. Mentor Others

Teaching is the best way to learn. Start by pair programming with juniors.

### 4. Say No Strategically

Seniors know when to say no to features, meetings, and scope creep — and how to do it constructively.

## Conclusion

The path from junior to senior is not a straight line. It's a spiral where you revisit the same concepts at increasing levels of depth and abstraction. Focus on building systems that work, mentoring those around you, and continuously expanding your understanding of the craft.`,
    category: "Career",
    tags: ["Career", "Growth", "Mentorship", "Software Engineering", "Leadership"],
    readingTime: "11 min read",
    date: "Dec 28, 2025",
    featured: false,
    author: {
      name: "Abdul Haseeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      role: "Full-Stack Developer",
    },
  },
  {
    id: "7",
    title: "Complete Guide to Modern CSS in 2026",
    slug: "modern-css-guide-2026",
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&h=800&fit=crop",
    excerpt:
      "From Container Queries to CSS Nesting, explore the modern CSS features that are changing how we style the web.",
    content: `## Introduction

CSS in 2026 is more powerful than ever. Modern CSS features are reducing our reliance on preprocessors and JavaScript-based styling solutions.

## Container Queries

The most requested CSS feature is finally here:

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
\`\`\`

## CSS Nesting

No more preprocessor requirement for clean nesting:

\`\`\`css
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;

  & .title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  & .description {
    color: #666;
    line-height: 1.5;
  }

  &:hover {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
}
\`\`\`

## The :has() Selector

The "parent selector" changes everything:

\`\`\`css
/* Style a card differently when it contains an image */
.card:has(img) {
  grid-column: span 2;
}

/* Style a form group when input is invalid */
.form-group:has(input:invalid) {
  & .error-message {
    display: block;
  }
}

/* Style a nav item when it's active */
.nav-item:has(a[aria-current="page"]) {
  background: var(--accent);
}
\`\`\`

## Scroll-Driven Animations

\`\`\`css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-on-scroll {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
\`\`\`

## Color Spaces

Modern color functions provide more vibrant options:

\`\`\`css
:root {
  --primary: oklch(0.5 0.2 240);
  --accent: color(display-p3 1 0.5 0);
  --gradient: linear-gradient(
    in oklch,
    oklch(0.6 0.3 20),
    oklch(0.4 0.2 280)
  );
}
\`\`\`

## Conclusion

Modern CSS has transformed from a styling language to a design tool that rivals any framework. The best part? It's all native — no build step required.`,
    category: "Development",
    tags: ["CSS", "Web Development", "Design", "Frontend"],
    readingTime: "7 min read",
    date: "Dec 15, 2025",
    featured: false,
    author: {
      name: "Abdul Haseeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      role: "Full-Stack Developer",
    },
  },
  {
    id: "8",
    title: "Building a Full-Stack SaaS with Next.js and Stripe",
    slug: "building-saas-nextjs-stripe",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    excerpt:
      "A step-by-step guide to building and launching a SaaS product with Next.js, Stripe, authentication, and a PostgreSQL database.",
    content: `## Introduction

Launching a SaaS product is easier than ever with modern tools. In this guide, I'll walk through building a complete SaaS application using Next.js, Stripe for payments, and PostgreSQL for data.

## Project Setup

### Initial Configuration

\`\`\`typescript
// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
}

export default nextConfig
\`\`\`

## Authentication

### Using NextAuth.js

\`\`\`typescript
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [GitHub, Google],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      session.user.role = user.role
      return session
    },
  },
})
\`\`\`

## Subscription Management

### Stripe Integration

\`\`\`typescript
import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
})

export async function createCheckoutSession(
  userId: string,
  priceId: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/dashboard\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/pricing\`,
    metadata: { userId },
  })

  return session
}
\`\`\`

### Webhook Handler

\`\`\`typescript
import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      await db.user.update({
        where: { id: session.metadata?.userId },
        data: {
          subscriptionId: session.subscription as string,
          status: "active",
        },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
\`\`\`

## Database Schema

\`\`\`prisma
model User {
  id             String    @id @default(cuid())
  name           String?
  email          String?   @unique
  subscriptionId String?
  status         String    @default("inactive")
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
\`\`\`

## Deployment

\`\`\`bash
# Deploy to Vercel
vercel --prod

# Run database migrations
npx prisma migrate deploy

# Set environment variables
vercel env add STRIPE_SECRET_KEY
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
\`\`\`

## Conclusion

Building a SaaS with Next.js and Stripe is incredibly straightforward. The combination of Next.js for the frontend and API routes, Prisma for the database layer, and Stripe for payments gives you everything you need to launch a production-ready product.`,
    category: "Tutorial",
    tags: ["Next.js", "Stripe", "SaaS", "Full-Stack", "Tutorial", "Prisma"],
    readingTime: "12 min read",
    date: "Nov 20, 2025",
    featured: true,
    author: {
      name: "Abdul Haseeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      role: "Full-Stack Developer",
    },
  },
]

export const categories = [
  "All",
  "JavaScript",
  "React",
  "Next.js",
  "AI",
  "Flutter",
  "Development",
  "Career",
  "Tutorial",
] as const

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(current: BlogPost, count = 3): BlogPost[] {
  return blogPosts
    .filter((post) => post.id !== current.id)
    .map((post) => ({
      ...post,
      relevance:
        post.tags.filter((tag) => current.tags.includes(tag)).length +
        (post.category === current.category ? 2 : 0),
    }))
    .sort((a, b) => (b as any).relevance - (a as any).relevance)
    .slice(0, count) as BlogPost[]
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const post of blogPosts) {
    counts[post.category] = (counts[post.category] || 0) + 1
  }
  return counts
}

export function transformBlogPost(p: any): BlogPost {
  const isObject = (v: any) => v !== null && typeof v === "object"
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || "",
    content: p.content,
    coverImage: p.coverImage || null,
    category: isObject(p.category) ? p.category.name : (p.category ?? ""),
    tags: Array.isArray(p.tags)
      ? p.tags.map((t: any) => (isObject(t) ? (t.tag?.name ?? t.name ?? "") : t))
      : [],
    readingTime: typeof p.readingTime === "number" ? `${p.readingTime} min read` : (p.readingTime ?? "5 min read"),
    date: p.date
      ? p.date
      : p.createdAt
        ? new Date(p.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "",
    featured: p.featured || false,
    author: {
      name: p.author?.name ?? "Author",
      avatar: p.author?.image ?? p.author?.avatar ?? null,
      role: p.author?.role ?? "Author",
    },
  }
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      tags.add(tag)
    }
  }
  return Array.from(tags).sort()
}
