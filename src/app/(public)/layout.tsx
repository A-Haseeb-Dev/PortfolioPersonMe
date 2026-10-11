import type { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ChatButton } from "@/components/chat/chat-button"
import { ChatWindow } from "@/components/chat/chat-window"
import {
  SitePreloader,
  RouteProgressBar,
} from "@/components/layout/preloader"

export const metadata: Metadata = {
  title: {
    default: "Abdul Haseeb — Full Stack Developer",
    template: "%s | Abdul Haseeb",
  },
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, React, and modern web technologies. Building innovative solutions for complex problems.",
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SitePreloader />
      <RouteProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatButton />
      <ChatWindow />
    </>
  )
}