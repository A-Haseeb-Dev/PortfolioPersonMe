"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ChartType = "bar" | "line"

interface DataPoint {
  label: string
  value: number
  secondary?: number
}

interface AnalyticsChartProps {
  data: DataPoint[]
  type?: ChartType
  height?: number
  color?: string
  secondaryColor?: string
  showGrid?: boolean
  showLabels?: boolean
  showValues?: boolean
  className?: string
  formatValue?: (value: number) => string
}

export function AnalyticsChart({
  data,
  type = "bar",
  height = 200,
  color: colorProp,
  secondaryColor = "#a1a1aa",
  showGrid = true,
  showLabels = true,
  showValues = false,
  className,
  formatValue = (v) => v.toString(),
}: AnalyticsChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"
  const color = colorProp ?? (isDark ? "#f4f4f5" : "#18181b")

  const maxValue = Math.max(...data.map((d) => d.value), 1)
  const lineColor = isDark ? "#f4f4f5" : "#18181b"
  const gridColor = isDark ? "#27272a" : "#e4e4e7"
  const textColor = isDark ? "#a1a1aa" : "#71717a"
  const activeColor = isDark ? "#f4f4f5" : "#09090b"

  const padding = { top: 20, right: 16, bottom: showLabels ? 32 : 16, left: 16 }
  const chartWidth = 100
  const chartHeight = 100

  const xScale = (chartWidth - padding.left - padding.right) / Math.max(data.length - 1, 1)
  const yScale = (value: number) =>
    padding.top + (chartHeight - padding.top - padding.bottom) * (1 - value / maxValue)

  const barWidth = Math.min(
    ((chartWidth - padding.left - padding.right) / data.length) * 0.6,
    8
  )
  const barGap = ((chartWidth - padding.left - padding.right) / data.length) * 0.2

  const linePath = data
    .map((d, i) => {
      const x = padding.left + i * xScale
      const y = yScale(d.value)
      return `${i === 0 ? "M" : "L"}${x},${y}`
    })
    .join(" ")

  const areaPath = `${linePath}L${padding.left + (data.length - 1) * xScale},${
    chartHeight - padding.bottom
  }L${padding.left},${chartHeight - padding.bottom}Z`

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full"
        style={{ height: `${height}px` }}
        preserveAspectRatio="none"
      >
        {showGrid &&
          [0, 0.25, 0.5, 0.75, 1].map((f) => {
            const y = padding.top + (chartHeight - padding.top - padding.bottom) * (1 - f)
            return (
              <line
                key={f}
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke={gridColor}
                strokeWidth={0.3}
                strokeDasharray="1,1"
              />
            )
          })}

        {type === "bar" && (
          <>
            {data.map((d, i) => {
              const x =
                padding.left + i * ((chartWidth - padding.left - padding.right) / data.length) + barGap
              const barHeight = ((d.value / maxValue) * (chartHeight - padding.top - padding.bottom))
              const y = chartHeight - padding.bottom - barHeight
              const isActive = activeIndex === i

              return (
                <motion.rect
                  key={i}
                  x={x}
                  y={chartHeight - padding.bottom}
                  width={barWidth}
                  height={0}
                  initial={{ height: 0, y: chartHeight - padding.bottom }}
                  animate={{
                    height: barHeight,
                    y,
                  }}
                  transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
                  fill={isActive ? activeColor : color}
                  rx={1}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
              )
            })}
          </>
        )}

        {type === "line" && (
          <>
            <motion.path
              d={areaPath}
              fill={color}
              fillOpacity={0.08}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke={lineColor}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            {data.map((d, i) => {
              const cx = padding.left + i * xScale
              const cy = yScale(d.value)
              const isActive = activeIndex === i

              return (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={isActive ? 3 : 1.5}
                  fill={isActive ? activeColor : lineColor}
                  stroke={isActive ? lineColor : "none"}
                  strokeWidth={0.5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.02 }}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
              )
            })}
          </>
        )}

        {showLabels &&
          data.map((d, i) => {
            if (data.length > 30 && i % Math.ceil(data.length / 15) !== 0) return null
            const x = padding.left + i * ((chartWidth - padding.left - padding.right) / Math.max(data.length - 1, 1))
            return (
              <text
                key={i}
                x={type === "bar" ? x + barWidth / 2 : x}
                y={chartHeight - 4}
                textAnchor={type === "bar" ? "middle" : "start"}
                fill={textColor}
                fontSize={3}
                transform={data.length > 15 ? `rotate(45, ${x}, ${chartHeight - 4})` : undefined}
              >
                {d.label.length > 5 ? d.label.slice(0, 5) + "…" : d.label}
              </text>
            )
          })}
      </svg>

      {activeIndex !== null && data[activeIndex] && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
          style={{
            left: `${(activeIndex / Math.max(data.length - 1, 1)) * 100}%`,
            top: `${0}px`,
          }}
        >
          <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50">
            {data[activeIndex].label}
          </p>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
            {formatValue(data[activeIndex].value)}
          </p>
          {data[activeIndex].secondary !== undefined && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {formatValue(data[activeIndex].secondary)}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
