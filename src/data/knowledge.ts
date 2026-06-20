export interface KnowledgeNote {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  categoryId: string
  tags: string[]
  readingTime: number
  lastUpdated: Date
  createdAt: Date
}

export interface KnowledgeCategory {
  id: string
  name: string
  description: string
  icon: string
  noteCount: number
  color: string
}

export const knowledgeCategories: KnowledgeCategory[] = [
  { id: "javascript", name: "JavaScript Notes", description: "Core JS concepts, patterns, and best practices", icon: "⚡", noteCount: 4, color: "#f7df1e" },
  { id: "react", name: "React Notes", description: "React hooks, state management, and patterns", icon: "⚛️", noteCount: 3, color: "#61dafb" },
  { id: "nextjs", name: "Next.js Notes", description: "Next.js features, routing, and deployment", icon: "▲", noteCount: 3, color: "#000000" },
  { id: "flutter", name: "Flutter Notes", description: "Dart and Flutter mobile development", icon: "🦋", noteCount: 2, color: "#02569b" },
  { id: "ai", name: "AI Notes", description: "Machine learning, LLMs, and prompt engineering", icon: "🧠", noteCount: 3, color: "#a855f7" },
  { id: "business", name: "Business Notes", description: "Startups, product strategy, and growth", icon: "💼", noteCount: 2, color: "#0ea5e9" },
]

export const knowledgeNotes: KnowledgeNote[] = [
  {
    id: "1",
    title: "JavaScript Closures Explained",
    slug: "javascript-closures",
    excerpt: "A closure is the combination of a function bundled together with references to its surrounding state. Understanding closures is essential for mastering JavaScript.",
    content: `# JavaScript Closures

A **closure** is a fundamental concept in JavaScript that occurs when a function retains access to variables from its outer (enclosing) scope, even after the outer function has finished executing.

## Why Closures Matter

Closures are essential for:

- **Data privacy** — creating private variables
- **Function factories** — generating functions with specific behavior
- **Event handlers and callbacks** — preserving state in async operations
- **Module patterns** — building encapsulated code

## How Closures Work

When a function is defined inside another function, the inner function maintains a reference to the outer function's scope chain:

\`\`\`javascript
function createCounter() {
  let count = 0
  return function () {
    count++
    return count
  }
}

const counter = createCounter()
console.log(counter()) // 1
console.log(counter()) // 2
console.log(counter()) // 3
\`\`\`

The inner function "closes over" the \`count\` variable, keeping it alive even after \`createCounter\` has returned.

## Practical Use Cases

### 1. Private Variables

\`\`\`javascript
function createPerson(name) {
  let _age = 0
  return {
    getName: () => name,
    getAge: () => _age,
    setAge: (age) => { _age = age },
  }
}
\`\`\`

### 2. Function Memoization

\`\`\`javascript
function memoize(fn) {
  const cache = {}
  return function (...args) {
    const key = JSON.stringify(args)
    if (cache[key] === undefined) {
      cache[key] = fn(...args)
    }
    return cache[key]
  }
}
\`\`\`

### 3. Event Handlers in Loops

Using \`let\` (block scoping) or closures to capture loop variables correctly.

## Common Pitfalls

- **Memory leaks** — unintentional references prevent garbage collection
- **Stale closures** — capturing old values in loops (fix with \`let\` or IIFEs)

## Key Takeaways

- Every function in JavaScript is a closure
- Closures are created at function definition time, not execution
- They enable powerful patterns like currying and partial application
`,
    category: "JavaScript Notes",
    categoryId: "javascript",
    tags: ["javascript", "closures", "scope", "functions"],
    readingTime: 5,
    lastUpdated: new Date("2025-12-01"),
    createdAt: new Date("2025-11-15"),
  },
  {
    id: "2",
    title: "Understanding the Event Loop",
    slug: "event-loop",
    excerpt: "The event loop is what allows JavaScript to perform non-blocking I/O operations despite being single-threaded. Here's how it works under the hood.",
    content: `# The JavaScript Event Loop

JavaScript is **single-threaded**, yet it handles thousands of asynchronous operations seamlessly. The event loop is the mechanism that makes this possible.

## The Call Stack

JavaScript executes code using a call stack — a LIFO (Last In, First Out) structure. Functions are pushed onto the stack when called and popped off when they return.

## Web APIs / C++ APIs

When async operations like \`setTimeout\`, \`fetch\`, or DOM events are encountered, they are handed off to the browser (or Node.js) APIs, freeing the call stack.

## Task Queues

There are two types of queues:

1. **Macrotask Queue** — \`setTimeout\`, \`setInterval\`, I/O, rendering
2. **Microtask Queue** — \`Promise.then\`, \`queueMicrotask\`, \`MutationObserver\`

## The Event Loop Cycle

1. Execute all synchronous code on the call stack
2. Process all microtasks (entire queue)
3. Process one macrotask
4. Repeat

\`\`\`javascript
console.log("1") // sync

setTimeout(() => console.log("2"), 0) // macrotask

Promise.resolve().then(() => console.log("3")) // microtask

console.log("4") // sync

// Output: 1, 4, 3, 2
\`\`\`

## Visualizing the Process

- Synchronous code runs first
- Microtasks are drained before the next macrotask
- The event loop never blocks — it continuously checks the queues

## Common Interview Questions

- Order of execution with Promises and setTimeout
- How to defer execution with \`setTimeout(fn, 0)\`
- Starvation of the macrotask queue by infinite microtasks

## Key Takeaways

- Microtasks have higher priority than macrotasks
- The event loop enables non-blocking concurrency
- Understanding this is critical for debugging async code
`,
    category: "JavaScript Notes",
    categoryId: "javascript",
    tags: ["javascript", "event-loop", "async", "concurrency"],
    readingTime: 6,
    lastUpdated: new Date("2025-12-05"),
    createdAt: new Date("2025-11-20"),
  },
  {
    id: "3",
    title: "JavaScript Array Methods — A Complete Reference",
    slug: "array-methods-reference",
    excerpt: "A comprehensive guide to JavaScript array methods including map, filter, reduce, find, and more with practical examples.",
    content: `# JavaScript Array Methods Reference

Arrays are one of the most used data structures in JavaScript. Here's a comprehensive reference of essential array methods.

## Transformation Methods

### map()

Creates a new array by transforming every element.

\`\`\`javascript
const numbers = [1, 2, 3]
const doubled = numbers.map(n => n * 2) // [2, 4, 6]
\`\`\`

### filter()

Creates a new array with elements that pass a test.

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]
const evens = numbers.filter(n => n % 2 === 0) // [2, 4]
\`\`\`

### reduce()

Reduces an array to a single value.

\`\`\`javascript
const numbers = [1, 2, 3, 4]
const sum = numbers.reduce((acc, n) => acc + n, 0) // 10
\`\`\`

## Search Methods

### find() and findIndex()

Returns the first element (or its index) that satisfies a condition.

\`\`\`javascript
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
const user = users.find(u => u.id === 2)
\`\`\`

### some() and every()

Test whether some or all elements pass a condition.

\`\`\`javascript
[1, 2, 3].some(n => n > 2) // true
[1, 2, 3].every(n => n > 0) // true
\`\`\`

## Performance Notes

- \`map\`, \`filter\`, \`reduce\` chain well but create intermediate arrays
- Use \`flatMap\` instead of \`map\` + \`flat\` for performance
- For large datasets, consider \`TypedArray\` or manual loops
`,
    category: "JavaScript Notes",
    categoryId: "javascript",
    tags: ["javascript", "arrays", "methods", "reference"],
    readingTime: 4,
    lastUpdated: new Date("2025-11-28"),
    createdAt: new Date("2025-11-10"),
  },
  {
    id: "4",
    title: "JavaScript Promises and Async/Await",
    slug: "promises-async-await",
    excerpt: "Deep dive into promises, async/await, error handling patterns, and best practices for asynchronous JavaScript.",
    content: `# Promises and Async/Await in JavaScript

Asynchronous programming is at the heart of modern JavaScript. Promises and async/await are the primary tools for handling it.

## Promises

A Promise represents a value that may be available now, later, or never.

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000)
})
\`\`\`

### Promise States

- **Pending** — initial state
- **Fulfilled** — operation completed successfully
- **Rejected** — operation failed

### Chaining

\`\`\`javascript
fetch("/api/user")
  .then(res => res.json())
  .then(user => fetch(\`/api/posts/\${user.id}\`))
  .then(res => res.json())
  .catch(err => console.error(err))
\`\`\`

## Async/Await

Syntactic sugar over Promises that makes async code read like synchronous code.

\`\`\`javascript
async function getUserPosts(userId) {
  try {
    const user = await fetch(\`/api/users/\${userId}\`).then(r => r.json())
    const posts = await fetch(\`/api/posts/\${user.id}\`).then(r => r.json())
    return posts
  } catch (error) {
    console.error("Failed to fetch:", error)
    throw error
  }
}
\`\`\`

## Error Handling Patterns

1. **Try/Catch** — most common for async/await
2. **Higher-order error wrappers** — for Express/Next.js route handlers
3. **Promise.allSettled** — when you need all results regardless of failure

\`\`\`javascript
const results = await Promise.allSettled([
  fetch("/api/a"),
  fetch("/api/b"),
  fetch("/api/c"),
])
const successful = results.filter(r => r.status === "fulfilled").map(r => r.value)
\`\`\`

## Best Practices

- Always handle promise rejections (unhandled rejections crash Node.js)
- Use \`Promise.all\` for parallel independent operations
- Avoid the Promise constructor antipattern — prefer chaining
- Use \`AbortController\` for cancellable fetch requests
`,
    category: "JavaScript Notes",
    categoryId: "javascript",
    tags: ["javascript", "promises", "async", "await", "error-handling"],
    readingTime: 7,
    lastUpdated: new Date("2025-12-10"),
    createdAt: new Date("2025-11-25"),
  },
  {
    id: "5",
    title: "React Hooks — A Practical Guide",
    slug: "react-hooks-guide",
    excerpt: "Everything you need to know about React hooks: useState, useEffect, useContext, useReducer, and custom hooks.",
    content: `# React Hooks — Practical Guide

Hooks are functions that let you use state and lifecycle features in functional components.

## Core Hooks

### useState

\`\`\`tsx
const [count, setCount] = useState(0)
\`\`\`

### useEffect

Handles side effects: data fetching, subscriptions, DOM manipulation.

\`\`\`tsx
useEffect(() => {
  document.title = \`Count: \${count}\`
  return () => {
    // cleanup
  }
}, [count]) // re-run when count changes
\`\`\`

### useContext

Access React context without prop drilling.

\`\`\`tsx
const theme = useContext(ThemeContext)
\`\`\`

## Additional Hooks

### useReducer

For complex state logic with multiple sub-values.

\`\`\`tsx
const [state, dispatch] = useReducer(reducer, initialState)
\`\`\`

### useCallback and useMemo

Optimization hooks that prevent unnecessary re-renders.

\`\`\`tsx
const handleClick = useCallback(() => {
  doSomething(a, b)
}, [a, b])

const sortedList = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name))
}, [items])
\`\`\`

## Custom Hooks

The real power of hooks — extract and reuse stateful logic.

\`\`\`tsx
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initial
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
\`\`\`

## Rules of Hooks

1. Call hooks at the top level (not in conditions, loops, or nested functions)
2. Only call hooks from React function components or custom hooks

## Common Patterns

- **Custom hooks for data fetching** (\`useFetch\`, \`useQuery\`)
- **Form handling** (\`useForm\`)
- **Intersection observers** (\`useInView\`)
- **Media queries** (\`useMediaQuery\`)
`,
    category: "React Notes",
    categoryId: "react",
    tags: ["react", "hooks", "useState", "useEffect", "custom-hooks"],
    readingTime: 8,
    lastUpdated: new Date("2025-12-15"),
    createdAt: new Date("2025-12-01"),
  },
  {
    id: "6",
    title: "React State Management in 2025",
    slug: "react-state-management",
    excerpt: "Comparing modern React state management approaches: Context API, Zustand, Jotai, TanStack Query, and when to use each.",
    content: `# State Management in React (2025)

The state management landscape has evolved significantly. Here's a practical guide to choosing the right tool.

## Types of State

1. **Server State** — data from your API
2. **Client State** — UI state, form data
3. **URL State** — route parameters, search params
4. **Persisted State** — localStorage, IndexedDB

## When to Use What

### React Context + useReducer

Best for: **low-frequency updates**, theme, auth, locale.

\`\`\`tsx
const AuthContext = createContext<AuthState>(null)

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}
\`\`\`

**Caveat:** Context causes all consumers to re-render. Not ideal for rapidly changing state.

### Zustand

Best for: **global client state** with minimal boilerplate.

\`\`\`tsx
import { create } from "zustand"

const useCart = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  total: () => ...,
}))
\`\`\`

### TanStack Query (React Query)

Best for: **server state** — caching, refetching, optimistic updates.

\`\`\`tsx
const { data, isLoading } = useQuery({
  queryKey: ["posts", userId],
  queryFn: () => fetchPosts(userId),
})
\`\`\`

### Jotai / Recoil

Best for: **atomic state** with fine-grained subscriptions.

## Rule of Thumb

- Server state → TanStack Query
- Simple global state → Zustand
- Complex form state → React Hook Form
- URL state → Next.js searchParams
`,
    category: "React Notes",
    categoryId: "react",
    tags: ["react", "state-management", "zustand", "tanstack-query", "context"],
    readingTime: 6,
    lastUpdated: new Date("2025-12-18"),
    createdAt: new Date("2025-12-05"),
  },
  {
    id: "7",
    title: "React Performance Optimization",
    slug: "react-performance",
    excerpt: "Techniques for optimizing React applications: memoization, virtualization, code splitting, and bundle analysis.",
    content: `# React Performance Optimization

Performance is a feature. Here are proven techniques to keep your React apps fast.

## Profiling First

Before optimizing, measure. Use React DevTools Profiler or \`<Profiler>\` component.

## Memoization

### React.memo

Prevents re-renders when props haven't changed.

\`\`\`tsx
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return items.map(item => <Item key={item.id} {...item} />)
})
\`\`\`

### useMemo and useCallback

Cache expensive computations and prevent unnecessary child re-renders.

## Virtualization

Render only what's visible. Use \`react-window\` or \`@tanstack/virtual\`.

\`\`\`tsx
import { useVirtualizer } from "@tanstack/react-virtual"

function VirtualList({ items }) {
  const parentRef = useRef(null)
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  })
  // ...
}
\`\`\`

## Code Splitting

Split your bundle using dynamic imports and \`React.lazy\`.

\`\`\`tsx
const Dashboard = lazy(() => import("./Dashboard"))

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
\`\`\`

## Bundle Analysis

- Run \`next\` or \`vite\` bundle analysis
- Identify large dependencies
- Consider alternatives or dynamic imports

## Image Optimization

- Use Next.js Image component
- Lazy load below-the-fold images
- Serve WebP/AVIF formats

## Key Metrics

- **LCP** (Largest Contentful Paint) — < 2.5s
- **FID** (First Input Delay) — < 100ms
- **CLS** (Cumulative Layout Shift) — < 0.1
`,
    category: "React Notes",
    categoryId: "react",
    tags: ["react", "performance", "memoization", "virtualization", "code-splitting"],
    readingTime: 7,
    lastUpdated: new Date("2025-12-20"),
    createdAt: new Date("2025-12-10"),
  },
  {
    id: "8",
    title: "Next.js App Router — Complete Guide",
    slug: "nextjs-app-router",
    excerpt: "Deep dive into Next.js App Router: server components, layouts, loading states, error handling, and data fetching patterns.",
    content: `# Next.js App Router Guide

The App Router is the modern way to build Next.js applications with React Server Components.

## Core Concepts

### Server Components (RSC)

Components that render on the server and send only the HTML to the client. Zero JavaScript on the client!

\`\`\`tsx
// This is a Server Component by default
async function BlogList() {
  const posts = await db.posts.findMany()
  return posts.map(post => <BlogCard key={post.id} {...post} />)
}
\`\`\`

### File-based Routing

- \`page.tsx\` — route UI
- \`layout.tsx\` — shared layout
- \`loading.tsx\` — loading state (Suspense boundary)
- \`error.tsx\` — error boundary
- \`not-found.tsx\` — 404 page

### Layouts

Persist across navigations without re-rendering.

\`\`\`tsx
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
\`\`\`

## Data Fetching Patterns

### Parallel Fetching

\`\`\`tsx
async function Page() {
  const [posts, users] = await Promise.all([
    fetch("/api/posts"),
    fetch("/api/users"),
  ])
  // ...
}
\`\`\`

### Sequential Fetching

\`\`\`tsx
async function Post({ id }) {
  const post = await fetchPost(id)
  const comments = await fetchComments(post.id) // depends on post
  // ...
}
\`\`\`

## Server Actions

Forms that mutate data without client JavaScript.

\`\`\`tsx
"use server"

async function createPost(formData: FormData) {
  const title = formData.get("title")
  await db.post.create({ data: { title } })
  revalidatePath("/posts")
}
\`\`\`

## Middleware

Run code before a request completes.

\`\`\`tsx
export function middleware(request) {
  if (!request.cookies.has("session")) {
    return Response.redirect(new URL("/login", request.url))
  }
}
\`\`\`
`,
    category: "Next.js Notes",
    categoryId: "nextjs",
    tags: ["nextjs", "app-router", "server-components", "rsc", "data-fetching"],
    readingTime: 9,
    lastUpdated: new Date("2025-12-22"),
    createdAt: new Date("2025-12-08"),
  },
  {
    id: "9",
    title: "Next.js Data Fetching and Caching",
    slug: "nextjs-data-fetching",
    excerpt: "Understanding data fetching in Next.js: fetch caching, revalidation, ISR, and CDN caching strategies.",
    content: `# Next.js Data Fetching and Caching

Efficient data fetching is crucial for performance. Next.js provides powerful caching primitives.

## fetch() Caching

Next.js extends the native \`fetch\` with caching options.

\`\`\`tsx
// Cache indefinitely (default)
fetch(url)

// Revalidate every 60 seconds
fetch(url, { next: { revalidate: 60 } })

// No cache (dynamic data)
fetch(url, { cache: "no-store" })
\`\`\`

## ISR (Incremental Static Regeneration)

Update static content without rebuilding the whole site.

\`\`\`tsx
// In App Router, use fetch with revalidate
const data = await fetch(url, { next: { revalidate: 3600 } })
\`\`\`

## Revalidation

### Time-based

\`\`\`tsx
fetch(url, { next: { revalidate: 3600 } })
\`\`\`

### On-demand (Webhooks)

\`\`\`tsx
import { revalidatePath, revalidateTag } from "next/cache"

// After a CMS webhook
revalidatePath("/blog")
revalidateTag("posts")
\`\`\`

## CDN Caching

Set Cache-Control headers for API routes.

\`\`\`tsx
export async function GET() {
  const data = await getData()
  return new Response(JSON.stringify(data), {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  })
}
\`\`\`

## Full Route Cache

Static pages are cached at the CDN level automatically. Dynamic pages (cookies, searchParams) bypass the cache.

## Data Cache

Next.js caches fetch results across requests. Cache can be persisted to disk for production builds.
`,
    category: "Next.js Notes",
    categoryId: "nextjs",
    tags: ["nextjs", "caching", "isr", "data-fetching", "revalidation"],
    readingTime: 6,
    lastUpdated: new Date("2025-12-23"),
    createdAt: new Date("2025-12-12"),
  },
  {
    id: "10",
    title: "Next.js Authentication Patterns",
    slug: "nextjs-authentication",
    excerpt: "Implementing authentication in Next.js: NextAuth.js, middleware protection, session strategies, and RBAC.",
    content: `# Next.js Authentication

Authentication is critical for most applications. Here's how to implement it in Next.js.

## NextAuth.js (Auth.js)

The most popular authentication library for Next.js.

\`\`\`ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Credentials({...})],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.sub
      return session
    },
  },
})
\`\`\`

## Protecting Routes

### Middleware

\`\`\`ts
export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
\`\`\`

### Server Component Protection

\`\`\`tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")
  return <div>Welcome {session.user.name}</div>
}
\`\`\`

## Session Strategies

- **JWT** — no database required, good for simple apps
- **Database** — more secure, can revoke sessions

## Role-Based Access Control (RBAC)

\`\`\`tsx
function requireRole(role: string) {
  return async function () {
    const session = await auth()
    if (session?.user.role !== role) {
      throw new Error("Unauthorized")
    }
  }
}
\`\`\`

## Best Practices

- Always use HTTP-only cookies for sessions
- Implement CSRF protection (built into NextAuth)
- Use \`redirect\` in server components, not \`router.push\`
- Validate sessions on every request for sensitive operations
`,
    category: "Next.js Notes",
    categoryId: "nextjs",
    tags: ["nextjs", "authentication", "nextauth", "middleware", "authorization"],
    readingTime: 7,
    lastUpdated: new Date("2025-12-25"),
    createdAt: new Date("2025-12-15"),
  },
  {
    id: "11",
    title: "Flutter Basics and Widget Tree",
    slug: "flutter-widget-tree",
    excerpt: "Understanding Flutter's widget tree, composition model, and building custom widgets with Dart.",
    content: `# Flutter Widget Tree

Everything in Flutter is a widget. Understanding the widget tree is fundamental to building Flutter apps.

## Widget Types

### StatelessWidget

Widgets that don't manage mutable state.

\`\`\`dart
class Greeting extends StatelessWidget {
  final String name
  const Greeting({super.key, required this.name})

  @override
  Widget build(BuildContext context) {
    return Text("Hello, $name!")
  }
}
\`\`\`

### StatefulWidget

Widgets that maintain mutable state.

\`\`\`dart
class Counter extends StatefulWidget {
  @override
  State<Counter> createState() => _CounterState()
}

class _CounterState extends State<Counter> {
  int _count = 0

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("Count: $_count"),
        ElevatedButton(
          onPressed: () => setState(() => _count++),
          child: Text("Increment"),
        ),
      ],
    )
  }
}
\`\`\`

## Composition over Inheritance

Flutter favors composing small widgets rather than extending large classes.

## Layout Widgets

- \`Container\` — convenient combination of padding, margins, decoration
- \`Row\` / \`Column\` — flexbox-like layouts
- \`Stack\` — overlay widgets
- \`Expanded\` / \`Flexible\` — distribute space

## BuildContext

Every widget has a BuildContext that locates it in the widget tree. Used for theme, media queries, and navigation.

## Performance Tips

- Use \`const\` constructors when possible
- Avoid rebuilding large widget trees unnecessarily
- Use \`ListView.builder\` for long lists
`,
    category: "Flutter Notes",
    categoryId: "flutter",
    tags: ["flutter", "dart", "widgets", "ui"],
    readingTime: 5,
    lastUpdated: new Date("2025-11-30"),
    createdAt: new Date("2025-11-10"),
  },
  {
    id: "12",
    title: "Flutter State Management with Riverpod",
    slug: "flutter-riverpod",
    excerpt: "Using Riverpod for state management in Flutter: providers, autodispose, and testing patterns.",
    content: `# Flutter State Management with Riverpod

Riverpod is a compile-safe, testable state management solution for Flutter.

## Why Riverpod?

- **Compile-safe** — no runtime errors from missing providers
- **Autodispose** — automatically clean up unused providers
- **Testable** — override providers in tests
- **Code-generation support** — with riverpod_generator

## Core Concepts

### Providers

\`\`\`dart
final counterProvider = StateProvider<int>((ref) => 0)

final userProvider = FutureProvider<User>((ref) async {
  return fetchUser()
})
\`\`\`

### Consuming Providers

\`\`\`dart
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider)
    return Text("Count: $count")
  }
}
\`\`\`

### Modifying State

\`\`\`dart
ref.read(counterProvider.notifier).state++
\`\`\`

## Provider Types

- \`Provider\` — synchronous, never changes
- \`StateProvider\` — mutable synchronous state
- \`FutureProvider\` — async data
- \`StreamProvider\` — stream data
- \`StateNotifierProvider\` — complex state logic

## Testing

\`\`\`dart
void main() {
  test("counter increments", () {
    final container = ProviderContainer()
    addTearDown(() => container.dispose())

    container.read(counterProvider.notifier).state = 5
    container.read(counterProvider.notifier).increment()

    expect(container.read(counterProvider), 6)
  })
}
\`\`\`
`,
    category: "Flutter Notes",
    categoryId: "flutter",
    tags: ["flutter", "dart", "riverpod", "state-management"],
    readingTime: 5,
    lastUpdated: new Date("2025-12-05"),
    createdAt: new Date("2025-11-20"),
  },
  {
    id: "13",
    title: "Prompt Engineering Best Practices",
    slug: "prompt-engineering",
    excerpt: "Techniques for crafting effective prompts for LLMs: system prompts, few-shot learning, chain-of-thought, and structured outputs.",
    content: `# Prompt Engineering Best Practices

Prompt engineering is the art of crafting inputs to get desired outputs from large language models.

## Core Techniques

### System Prompts

Set the behavior and persona of the model.

\`\`\`
You are a senior software engineer reviewing code. 
Focus on: security, performance, maintainability.
Provide actionable feedback with code examples.
\`\`\`

### Few-Shot Learning

Provide examples of the desired output format.

\`\`\`
Convert these SQL queries to Prisma:

SQL: SELECT * FROM users WHERE email = 'test@test.com'
Prisma: await prisma.user.findUnique({ where: { email: "test@test.com" } })

SQL: INSERT INTO posts (title, content) VALUES ('Hello', 'World')
Prisma:
\`\`\`

### Chain-of-Thought (CoT)

Encourage step-by-step reasoning.

\`\`\`
Solve this problem step by step:
1. First, identify the constraints
2. Then, choose the algorithm
3. Finally, implement the solution
\`\`\`

## Structured Outputs

Request JSON or specific formats.

\`\`\`
Return a JSON object with:
{
  "summary": "string",
  "key_points": ["string"],
  "action_items": ["string"],
  "confidence": number (0-100)
}
\`\`\`

## Advanced Patterns

- **RAG** — provide relevant context in the prompt
- **ReAct** — reasoning + acting loop for agents
- **Self-Consistency** — sample multiple answers and pick the most common
- **Temperature Control** — lower for precise, higher for creative

## Common Pitfalls

- Overloading the context window
- Contradictory instructions
- Not handling edge cases in few-shot examples
- Ignoring token limits for structured outputs
`,
    category: "AI Notes",
    categoryId: "ai",
    tags: ["ai", "llm", "prompt-engineering", "gpt", "best-practices"],
    readingTime: 6,
    lastUpdated: new Date("2025-12-20"),
    createdAt: new Date("2025-12-01"),
  },
  {
    id: "14",
    title: "Building RAG Systems",
    slug: "rag-systems",
    excerpt: "Retrieval-Augmented Generation: architecture, embedding models, vector databases, and chunking strategies.",
    content: `# Building RAG Systems

Retrieval-Augmented Generation (RAG) combines retrieval systems with LLMs for accurate, context-aware responses.

## Architecture

1. **Ingestion Pipeline** — chunk documents, generate embeddings, store in vector DB
2. **Retrieval** — query embedding, semantic search, reranking
3. **Generation** — context + query → LLM → response

## Chunking Strategies

- **Fixed-size** — simple but can split sentences
- **Semantic** — split on topic boundaries (more accurate)
- **Recursive** — try different separators
- **Document-specific** — markdown headers, code functions

## Embedding Models

- **text-embedding-3-small** — cost-effective
- **text-embedding-3-large** — higher accuracy
- **Open Source** — BGE, E5, Instructor

## Vector Databases

- **Pinecone** — managed, highly scalable
- **Weaviate** — hybrid search, graph
- **Qdrant** — Rust-based, fast
- **pgvector** — PostgreSQL extension, good for existing Postgres users

## Retrieval Techniques

- **Hybrid Search** — combine semantic + keyword (BM25)
- **Reranking** — cross-encoder for precision
- **Multi-query** — generate multiple query variations
- **Parent Document Retrieval** — retrieve small chunks, return larger context

## Evaluation

- **Hit Rate** — did we retrieve relevant documents?
- **MRR** — rank of first relevant result
- **Faithfulness** — is the response grounded in retrieved context?
`,
    category: "AI Notes",
    categoryId: "ai",
    tags: ["ai", "rag", "vector-database", "embeddings", "llm"],
    readingTime: 8,
    lastUpdated: new Date("2025-12-22"),
    createdAt: new Date("2025-12-10"),
  },
  {
    id: "15",
    title: "Machine Learning Pipeline Fundamentals",
    slug: "ml-pipeline-fundamentals",
    excerpt: "End-to-end machine learning pipeline: data collection, preprocessing, feature engineering, model training, evaluation, and deployment.",
    content: `# ML Pipeline Fundamentals

A production ML pipeline consists of multiple stages from data to deployment.

## Pipeline Stages

### 1. Data Collection

- Sources: databases, APIs, streams, files
- Validation: schema checks, data quality metrics
- Versioning: DVC, LakeFS for dataset version control

### 2. Data Preprocessing

\`\`\`python
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Handle missing values
df.fillna(df.median(), inplace=True)

# Encode categorical variables
encoder = LabelEncoder()
df["category_encoded"] = encoder.fit_transform(df["category"])

# Scale numerical features
scaler = StandardScaler()
df[["age", "salary"]] = scaler.fit_transform(df[["age", "salary"]])
\`\`\`

### 3. Feature Engineering

- Temporal features (day of week, month, hour)
- Text features (TF-IDF, embeddings)
- Aggregate features (rolling means, ratios)
- Domain-specific features

### 4. Model Training

- Train/validation/test split (70/15/15)
- Cross-validation for hyperparameter tuning
- Experiment tracking with MLflow or Weights & Biases

### 5. Evaluation

- Classification: accuracy, precision, recall, F1, ROC-AUC
- Regression: MAE, MSE, RMSE, R²
- Business metrics: ROI, latency, throughput

### 6. Deployment

- **Batch** — scheduled predictions (Airflow, cron)
- **Real-time** — REST API, gRPC, streaming
- **Edge** — on-device inference

## MLOps Considerations

- Model versioning and registry
- A/B testing infrastructure
- Monitoring: data drift, concept drift, prediction distribution
- Automated retraining pipelines
`,
    category: "AI Notes",
    categoryId: "ai",
    tags: ["ai", "machine-learning", "mlops", "pipeline", "data-science"],
    readingTime: 8,
    lastUpdated: new Date("2025-12-18"),
    createdAt: new Date("2025-12-05"),
  },
  {
    id: "16",
    title: "Lean Startup Methodology",
    slug: "lean-startup",
    excerpt: "Principles of the Lean Startup methodology: Build-Measure-Learn, MVPs, pivoting, and validated learning.",
    content: `# Lean Startup Methodology

The Lean Startup methodology, popularized by Eric Ries, emphasizes rapid iteration and validated learning.

## Core Principles

### Build-Measure-Learn Loop

The fundamental feedback loop:

1. **Build** — create a minimum viable product (MVP)
2. **Measure** — collect data on customer behavior
3. **Learn** — validate or invalidate hypotheses
4. **Repeat** — pivot or persevere

### Minimum Viable Product (MVP)

The smallest version of your product that allows you to learn. Not a half-built product — it's the fastest way through the Build-Measure-Learn loop.

### Validated Learning

Learning is the unit of progress. Every feature, experiment, and interaction should teach you something about your customers.

## Pivot or Persevere

At regular intervals, decide:

- **Persevere** — keep the current strategy, optimize execution
- **Pivot** — change one fundamental aspect of the business
- Types: zoom-in, zoom-out, customer segment, platform, technology

## Innovation Accounting

1. **Baseline** — establish current metrics
2. **Tune engine** — experiment to move toward ideal
3. **Pivot or persevere** — decide based on results

## Kanban for Startups

Limit work in progress, visualize flow, and focus on the highest-impact experiments.

## Common Mistakes

- Building a full product before talking to customers
- Vanity metrics that don't measure real learning
- Confirming biases instead of seeking truth
- Ignoring the "Measure" phase in Build-Measure-Learn
`,
    category: "Business Notes",
    categoryId: "business",
    tags: ["business", "startup", "lean", "mvp", "product"],
    readingTime: 5,
    lastUpdated: new Date("2025-12-15"),
    createdAt: new Date("2025-12-01"),
  },
  {
    id: "17",
    title: "Product-Market Fit Framework",
    slug: "product-market-fit",
    excerpt: "How to measure and achieve product-market fit: Sean Ellis test, retention curves, and qualitative signals.",
    content: `# Product-Market Fit Framework

Product-market fit (PMF) is when your product satisfies a strong market demand.

## Defining PMF

**Marc Andreessen:** "The only thing that matters is getting to product-market fit."

**Sean Ellis:** "If 40% of users say they'd be 'very disappointed' without your product, you have PMF."

## Measuring PMF

### Quantitative Signals

1. **Sean Ellis Survey** — "How would you feel if you could no longer use the product?"
2. **Retention Curves** — flattening = PMF, downward slope = no PMF
3. **Organic Growth** — word of mouth, referrals
4. **Active Usage** — DAU/MAU ratio > 50%

### Qualitative Signals

- Users paying despite friction
- Users finding workarounds when features break
- Users inviting others without prompting
- Support tickets about feature requests, not bugs

## The PMF Process

1. **Identify a real problem** — through customer interviews
2. **Build a focused solution** — solve one problem well
3. **Find the right market** — who needs this most?
4. **Iterate based on usage** — let data guide you
5. **Double down when found** — focus all resources on what works

## Common Misconceptions

- PMF is binary — it exists on a spectrum
- PMF is permanent — markets shift, competition emerges
- More features ≠ more fit — often the opposite
- PMF for one segment ≠ PMF for all

## Red Flags

- Churn rate above 5% monthly
- NPS below 20
- Users don't return within 7 days
- Sales-driven growth (not product-driven)
`,
    category: "Business Notes",
    categoryId: "business",
    tags: ["business", "product-market-fit", "startup", "growth", "metrics"],
    readingTime: 6,
    lastUpdated: new Date("2025-12-18"),
    createdAt: new Date("2025-12-05"),
  },
]

export function getNotesByCategory(categoryId: string): KnowledgeNote[] {
  if (categoryId === "all") return knowledgeNotes
  return knowledgeNotes.filter((n) => n.categoryId === categoryId)
}

export function getNoteBySlug(slug: string): KnowledgeNote | undefined {
  return knowledgeNotes.find((n) => n.slug === slug)
}

export function getRelatedNotes(note: KnowledgeNote, limit = 3): KnowledgeNote[] {
  return knowledgeNotes
    .filter((n) => n.id !== note.id)
    .map((n) => ({
      ...n,
      relevance: n.tags.filter((t) => note.tags.includes(t)).length,
    }))
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
    .slice(0, limit)
}

export function searchNotes(query: string): KnowledgeNote[] {
  const q = query.toLowerCase()
  return knowledgeNotes.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q)) ||
      n.category.toLowerCase().includes(q)
  )
}
