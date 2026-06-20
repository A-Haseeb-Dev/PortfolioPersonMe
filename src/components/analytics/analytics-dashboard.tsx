"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Users,
  Eye,
  Download,
  MessageSquare,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  ArrowUp,
  ArrowDown,
  Activity,
  TrendingUp,
  MousePointerClick,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnalyticsChart } from "@/components/analytics/analytics-chart"
import { AnalyticsTable, type Column } from "@/components/analytics/analytics-table"
import { StatsCard } from "@/components/ui/stats-card"

interface AnalyticsData {
  totalVisitors: number
  todayVisitors: number
  activeVisitors: number
  totalPageViews: number
  totalDownloads: number
  totalContacts: number
  pageViewsChart: { date: string; views: number; visitors: number }[]
  topPages: { page: string; views: number; visitors: number }[]
  topReferrers: { referrer: string; count: number }[]
  countries: { country: string; count: number }[]
  devices: { device: string; count: number }[]
  browsers: { browser: string; count: number }[]
  downloadsOverTime: { date: string; count: number }[]
  contactsOverTime: { date: string; count: number }[]
}

const dateRanges = [
  { label: "7d", value: 7 },
  { label: "30d", value: 30 },
  { label: "90d", value: 90 },
  { label: "All", value: 365 },
] as const

const deviceIcons: Record<string, React.ReactNode> = {
  desktop: <Monitor className="h-4 w-4" />,
  mobile: <Smartphone className="h-4 w-4" />,
  tablet: <Tablet className="h-4 w-4" />,
}

const deviceColors: Record<string, string> = {
  desktop: "bg-blue-500",
  mobile: "bg-emerald-500",
  tablet: "bg-purple-500",
}

export function AnalyticsDashboard() {
  const [data, setData] = React.useState<AnalyticsData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [days, setDays] = React.useState(30)
  const [prevData, setPrevData] = React.useState<AnalyticsData | null>(null)

  React.useEffect(() => {
    setLoading(true)
    fetch(`/api/analytics/data?days=${days}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [days])

  const currentVsPrevious = React.useMemo(() => {
    if (!data || !prevData) return {}
    return {
      visitorsChange: data.totalVisitors - (prevData?.totalVisitors || 0),
      viewsChange: data.totalPageViews - (prevData?.totalPageViews || 0),
    }
  }, [data, prevData])

  const topPagesColumns: Column<{ page: string; views: number; visitors: number }>[] = [
    { key: "page", label: "Page", sortable: true, render: (item) => (
      <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">{item.page}</span>
    )},
    { key: "views", label: "Views", sortable: true },
    { key: "visitors", label: "Visitors", sortable: true },
  ]

  const referrerColumns: Column<{ referrer: string; count: number }>[] = [
    { key: "referrer", label: "Referrer", sortable: true, render: (item) => (
      <span className="font-medium">{item.referrer === "direct" ? "Direct" : item.referrer}</span>
    )},
    { key: "count", label: "Visits", sortable: true },
  ]

  const countryColumns: Column<{ country: string; count: number }>[] = [
    { key: "country", label: "Country", sortable: true },
    { key: "count", label: "Visitors", sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Analytics Dashboard
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Real-time visitor insights and page performance
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
          {dateRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setDays(range.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                days === range.value
                  ? "bg-zinc-900 text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {loading && !data ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-2 h-8 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatsCard
              value={data.totalVisitors}
              label="Total Visitors"
              prefix=""
              icon={<Users className="h-5 w-5" />}
              variant="elevated"
            />
            <StatsCard
              value={data.todayVisitors}
              label="Today's Visitors"
              prefix=""
              icon={<Activity className="h-5 w-5" />}
              variant="elevated"
            />
            <StatsCard
              value={data.activeVisitors}
              label="Active Now"
              prefix=""
              icon={<TrendingUp className="h-5 w-5" />}
              variant="elevated"
            />
            <StatsCard
              value={data.totalPageViews}
              label="Page Views"
              prefix=""
              icon={<Eye className="h-5 w-5" />}
              variant="elevated"
            />
            <StatsCard
              value={data.totalDownloads}
              label="Downloads"
              prefix=""
              icon={<Download className="h-5 w-5" />}
              variant="elevated"
            />
            <StatsCard
              value={data.totalContacts}
              label="Contact Requests"
              prefix=""
              icon={<MessageSquare className="h-5 w-5" />}
              variant="elevated"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card variant="elevated" className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Page Views</CardTitle>
                    <CardDescription>Daily page views and unique visitors</CardDescription>
                  </div>
                  <Badge variant="info" dot>
                    {data.pageViewsChart.length} days
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsChart
                  data={data.pageViewsChart.map((d) => ({
                    label: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    value: d.views,
                    secondary: d.visitors,
                  }))}
                  type="line"
                  height={240}
                />
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Devices</CardTitle>
                <CardDescription>Breakdown by device type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.devices.length === 0 ? (
                  <p className="text-sm text-zinc-400 dark:text-zinc-500">No data available</p>
                ) : (
                  data.devices.map((d) => {
                    const total = data.devices.reduce((s, x) => s + x.count, 0)
                    const pct = total > 0 ? Math.round((d.count / total) * 100) : 0
                    return (
                      <div key={d.device}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {deviceIcons[d.device.toLowerCase()] || <Monitor className="h-4 w-4" />}
                            <span className="font-medium capitalize text-zinc-700 dark:text-zinc-300">
                              {d.device}
                            </span>
                          </div>
                          <span className="text-zinc-500 dark:text-zinc-400">
                            {d.count} ({pct}%)
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                          <motion.div
                            className={cn(
                              "h-full rounded-full",
                              deviceColors[d.device.toLowerCase()] || "bg-zinc-500"
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    )
                  })
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Browsers</CardTitle>
                <CardDescription>Browser market share</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.browsers.length === 0 ? (
                  <p className="text-sm text-zinc-400 dark:text-zinc-500">No data available</p>
                ) : (
                  data.browsers.map((b) => {
                    const total = data.browsers.reduce((s, x) => s + x.count, 0)
                    const pct = total > 0 ? Math.round((b.count / total) * 100) : 0
                    return (
                      <div key={b.browser} className="flex items-center justify-between text-sm">
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{b.browser}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                            <motion.div
                              className="h-full rounded-full bg-zinc-900 dark:bg-zinc-50"
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                          </div>
                          <span className="w-12 text-right text-zinc-500 dark:text-zinc-400">{pct}%</span>
                        </div>
                      </div>
                    )
                  })
                )}
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>Visitor geography</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsTable
                  data={data.countries}
                  columns={countryColumns}
                  searchable={false}
                  pageSize={5}
                />
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>Traffic sources</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsTable
                  data={data.topReferrers}
                  columns={referrerColumns}
                  searchable={false}
                  pageSize={5}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Downloads Over Time</CardTitle>
                <CardDescription>Resource download activity</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsChart
                  data={data.downloadsOverTime.length > 0
                    ? data.downloadsOverTime.map((d) => ({
                        label: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                        value: d.count,
                      }))
                    : [{ label: "No data", value: 0 }]
                  }
                  type="bar"
                  height={200}
                />
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Contact Requests Over Time</CardTitle>
                <CardDescription>Incoming messages</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsChart
                  data={data.contactsOverTime.length > 0
                    ? data.contactsOverTime.map((d) => ({
                        label: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                        value: d.count,
                      }))
                    : [{ label: "No data", value: 0 }]
                  }
                  type="bar"
                  height={200}
                  color="#10b981"
                />
              </CardContent>
            </Card>
          </div>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most viewed pages on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsTable
                data={data.topPages}
                columns={topPagesColumns}
                searchable={true}
                searchKeys={["page"]}
                pageSize={8}
              />
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Activity className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
            <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
              No analytics data yet
            </p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              Data will appear once visitors start coming to your site.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
