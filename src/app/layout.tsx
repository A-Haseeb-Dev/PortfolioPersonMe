import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { ChatProvider } from "@/contexts/chat-context"
import { SettingsProvider } from "@/contexts/settings-context"
import { ChatButton } from "@/components/chat/chat-button"
import { ChatWindow } from "@/components/chat/chat-window"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toast"

export const metadata: Metadata = {
  title: {
    default: "Muhammad Anas Siddiqui",
    template: "%s | Muhammad Anas Siddiqui",
  },
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, and modern web technologies. Building innovative solutions for complex problems.",
  keywords: [
    "developer",
    "full-stack",
    "next.js",
    "react",
    "typescript",
    "portfolio",
    "web development",
  ],
  authors: [{ name: "Muhammad Anas Siddiqui" }],
  creator: "Muhammad Anas Siddiqui",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      </body>
    </html>
  )
}
