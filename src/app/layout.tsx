import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { SessionProvider } from "@/components/layout/session-provider"
import { ChatProvider } from "@/contexts/chat-context"
import { SettingsProvider } from "@/contexts/settings-context"
import { ChatButton } from "@/components/chat/chat-button"
import { ChatWindow } from "@/components/chat/chat-window"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toast"

export async function generateMetadata(): Promise<Metadata> {
  let title = "Haseeb"
  let description = "Full Stack Developer specializing in Next.js, TypeScript, and modern web technologies."
  let keywords = "developer, full-stack, next.js, react, typescript, portfolio, web development"
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/settings`, { cache: "no-store" })
    const json = await res.json()
    const s = json.settings || {}
    const site = s.site_config || {}
    const seo = s.seo || {}
    if (site.name) title = site.name
    if (site.description) description = site.description
    if (seo.keywords) keywords = seo.keywords
  } catch {}
  return {
    title: { default: title, template: `%s | ${title}` },
    description,
    keywords: keywords.split(",").map((k) => k.trim()),
    authors: [{ name: title }],
    creator: title,
    icons: { icon: "/favicon.ico", shortcut: "/favicon-16x16.png", apple: "/apple-touch-icon.png" },
    manifest: "/manifest.json",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem("theme")
                if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                  document.documentElement.classList.add("dark")
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <ChatProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ChatButton />
              <ChatWindow />
              <Toaster />
            </ChatProvider>
          </SettingsProvider>
        </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
