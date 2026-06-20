import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { PageHeader } from "@/components/ui/page-header"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default async function AdminAnalyticsPage() {
  const session = await auth()

  if (!session?.user || session.user.role === "user") {
    redirect("/admin/login")
  }

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Track your website performance and visitor insights"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Analytics" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AnalyticsDashboard />
      </div>
    </div>
  )
}
