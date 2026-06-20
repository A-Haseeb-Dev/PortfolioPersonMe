import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import AdminLayoutClient from "@/components/layout/admin-layout"

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Admin",
  },
  description: "Admin dashboard for managing portfolio content.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <AdminLayoutClient
      user={{
        name: session.user.name ?? "Admin",
        email: session.user.email ?? "",
        image: session.user.image ?? undefined,
        role: (session.user.role as "SUPER_ADMIN" | "ADMIN" | "EDITOR") ?? "EDITOR",
      }}
    >
      {children}
    </AdminLayoutClient>
  )
}
