import type { Metadata } from "next"

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
  return <>{children}</>
}
