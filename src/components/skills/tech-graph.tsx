"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ZoomIn, ZoomOut, Maximize2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { buildGraphData, technologies, type Technology, type GraphNode, type GraphLink } from "@/data/skills"

interface TechGraphProps {
  onTechSelect: (tech: Technology) => void
  selectedTech: Technology | null
  highlightTech: string | null
}

const NODE_RADIUS = 28
const REPULSION = 4000
const ATTRACTION = 0.02
const DAMPING = 0.85

export default function TechGraph({ onTechSelect, selectedTech, highlightTech }: TechGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<GraphNode[]>([])
  const [links, setLinks] = useState<GraphLink[]>([])
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const { nodes: graphNodes, links: graphLinks } = buildGraphData()
    const w = 800
    const h = 500
    const centerX = w / 2
    const centerY = h / 2

    const radius = Math.min(w, h) * 0.35
    const initialized = graphNodes.map((node, i) => ({
      ...node,
      x: centerX + radius * Math.cos((2 * Math.PI * i) / graphNodes.length),
      y: centerY + radius * Math.sin((2 * Math.PI * i) / graphNodes.length),
      vx: 0,
      vy: 0,
    }))

    setNodes(initialized)
    setLinks(graphLinks)
    setDimensions({ width: w, height: h })
  }, [])

  useEffect(() => {
    if (nodes.length === 0) return

    let running = true
    let iterations = 0
    const maxIterations = 120

    const simulate = () => {
      if (!running) return

      setNodes((prev) => {
        const updated = prev.map((n) => ({ ...n }))

        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const dx = (updated[j].x || 0) - (updated[i].x || 0)
            const dy = (updated[j].y || 0) - (updated[i].y || 0)
            const dist = Math.sqrt(dx * dx + dy * dy) || 1
            const force = REPULSION / (dist * dist)
            const fx = (dx / dist) * force
            const fy = (dy / dist) * force
            updated[i].vx = (updated[i].vx || 0) - fx
            updated[i].vy = (updated[i].vy || 0) - fy
            updated[j].vx = (updated[j].vx || 0) + fx
            updated[j].vy = (updated[j].vy || 0) + fy
          }
        }

        for (const link of links) {
          const source = updated.find((n) => n.id === link.source)
          const target = updated.find((n) => n.id === link.target)
          if (source && target) {
            const dx = (target.x || 0) - (source.x || 0)
            const dy = (target.y || 0) - (source.y || 0)
            const dist = Math.sqrt(dx * dx + dy * dy) || 1
            const force = (dist - 100) * ATTRACTION
            const fx = (dx / dist) * force
            const fy = (dy / dist) * force
            source.vx = (source.vx || 0) + fx
            source.vy = (source.vy || 0) + fy
            target.vx = (target.vx || 0) - fx
            target.vy = (target.vy || 0) - fy
          }
        }

        const cx = updated.reduce((s, n) => s + (n.x || 0), 0) / updated.length
        const cy = updated.reduce((s, n) => s + (n.y || 0), 0) / updated.length
        for (const node of updated) {
          node.vx = (node.vx || 0) + (cx - (node.x || 0)) * 0.001
          node.vy = (node.vy || 0) + (cy - (node.y || 0)) * 0.001
          node.vx = (node.vx || 0) * DAMPING
          node.vy = (node.vy || 0) * DAMPING
          node.x = (node.x || 0) + (node.vx || 0)
          node.y = (node.y || 0) + (node.vy || 0)
          node.x = Math.max(NODE_RADIUS, Math.min(dimensions.width - NODE_RADIUS, node.x || 0))
          node.y = Math.max(NODE_RADIUS, Math.min(dimensions.height - NODE_RADIUS, node.y || 0))
        }

        return updated
      })

      iterations++
      if (iterations < maxIterations) {
        animRef.current = requestAnimationFrame(simulate)
      }
    }

    animRef.current = requestAnimationFrame(simulate)
    return () => {
      running = false
      cancelAnimationFrame(animRef.current)
    }
  }, [nodes.length, links, dimensions])

  const getNode = useCallback((id: string) => {
    return technologies.find((t) => t.id === id)
  }, [])

  const handleMouseDown = useCallback((nodeId: string) => {
    setDragging(nodeId)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging || !svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - pan.x) / zoom
      const y = (e.clientY - rect.top - pan.y) / zoom

      setNodes((prev) =>
        prev.map((n) => (n.id === dragging ? { ...n, x, y } : n))
      )
    },
    [dragging, pan, zoom]
  )

  const handleMouseUp = useCallback(() => {
    setDragging(null)
  }, [])

  const resetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const categoryColors: Record<string, string> = {
    "programming-languages": "#f59e0b",
    frontend: "#3b82f6",
    backend: "#10b981",
    frameworks: "#8b5cf6",
    libraries: "#ec4899",
    databases: "#06b6d4",
    cloud: "#6366f1",
    devops: "#f97316",
    mobile: "#14b8a6",
    ai: "#a855f7",
    blockchain: "#eab308",
    tools: "#64748b",
    business: "#0ea5e9",
    marketing: "#ef4444",
  }

  return (
    <GlassCard intensity="light" className="relative overflow-hidden">
      <div className="absolute right-4 top-4 z-10 flex gap-1.5">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8"
          onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
        >
          <ZoomIn size={14} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8"
          onClick={() => setZoom((z) => Math.max(z - 0.2, 0.3))}
        >
          <ZoomOut size={14} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8"
          onClick={resetView}
        >
          <Maximize2 size={14} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            const { nodes: gn, links: gl } = buildGraphData()
            const w = dimensions.width
            const h = dimensions.height
            const radius = Math.min(w, h) * 0.35
            const initialized = gn.map((node, i) => ({
              ...node,
              x: w / 2 + radius * Math.cos((2 * Math.PI * i) / gn.length),
              y: h / 2 + radius * Math.sin((2 * Math.PI * i) / gn.length),
              vx: 0,
              vy: 0,
            }))
            setNodes(initialized)
            setLinks(gl)
          }}
        >
          <RefreshCw size={14} />
        </Button>
      </div>

      <div className="flex items-center gap-3 px-6 pt-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <circle cx="19" cy="5" r="2" />
            <circle cx="5" cy="5" r="2" />
            <circle cx="5" cy="19" r="2" />
            <circle cx="19" cy="19" r="2" />
            <line x1="12" y1="9" x2="12" y2="5" />
            <line x1="15.5" y1="11.5" x2="17.5" y2="7.5" />
            <line x1="8.5" y1="11.5" x2="6.5" y2="7.5" />
            <line x1="12" y1="15" x2="12" y2="19" />
            <line x1="15.5" y1="12.5" x2="17.5" y2="16.5" />
            <line x1="8.5" y1="12.5" x2="6.5" y2="16.5" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Technology Relationship Graph</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Interactive force-directed visualization</p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mt-4 h-[500px] w-full"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="cursor-grab active:cursor-grabbing"
          style={{ overflow: "visible" }}
        >
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            <defs>
              {nodes.map((node) => {
                const tech = getNode(node.id)
                const color = tech?.color || categoryColors[node.category] || "#888"
                return (
                  <radialGradient key={`grad-${node.id}`} id={`grad-${node.id}`} cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.3} />
                  </radialGradient>
                )
              })}
            </defs>

            {links.map((link) => {
              const source = nodes.find((n) => n.id === link.source)
              const target = nodes.find((n) => n.id === link.target)
              if (!source || !target) return null

              const isHighlighted =
                highlightTech === link.source || highlightTech === link.target

              return (
                <line
                  key={`${link.source}-${link.target}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isHighlighted ? "#a855f7" : "#e4e4e7"}
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  strokeOpacity={isHighlighted ? 0.8 : 0.4}
                  className="transition-all duration-300"
                />
              )
            })}

            {nodes.map((node) => {
              const tech = getNode(node.id)
              const color = tech?.color || categoryColors[node.category] || "#888"
              const isSelected = selectedTech?.id === node.id
              const isHighlighted = highlightTech === node.id
              const isHovered = hoveredNode === node.id
              const isDragging = dragging === node.id
              const size = isSelected ? NODE_RADIUS + 6 : isHovered ? NODE_RADIUS + 3 : NODE_RADIUS

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseDown={() => handleMouseDown(node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => {
                    if (tech) onTechSelect(tech)
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {(isSelected || isHighlighted) && (
                    <circle
                      r={size + 6}
                      fill="none"
                      stroke={color}
                      strokeWidth={2}
                      strokeOpacity={0.3}
                    >
                      <animate
                        attributeName="r"
                        from={size + 6}
                        to={size + 12}
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="strokeOpacity"
                        from={0.3}
                        to={0}
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  <circle
                    r={size}
                    fill={isDragging ? color : `url(#grad-${node.id})`}
                    stroke={isSelected || isHighlighted ? color : "#fff"}
                    strokeWidth={isSelected || isHighlighted ? 3 : 1.5}
                    className="transition-all duration-200"
                    style={{ filter: isHovered ? "brightness(1.1)" : undefined }}
                  />

                  <text
                    textAnchor="middle"
                    dy={0.35 * size}
                    fontSize={size * 0.6}
                    fill="#fff"
                    fontWeight={600}
                    style={{ pointerEvents: "none", fontFamily: "system-ui" }}
                  >
                    {tech?.icon || "?"}
                  </text>

                  <text
                    textAnchor="middle"
                    y={size + 14}
                    fontSize={10}
                    fill="#71717a"
                    fontWeight={500}
                    style={{
                      pointerEvents: "none",
                      fontFamily: "system-ui",
                      opacity: isDragging ? 0 : 1,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {node.name}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-zinc-100 px-6 py-3 dark:border-zinc-800">
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">Legend:</span>
        {Object.entries(categoryColors).map(([key, color]) => {
          const cat = technologies.find((t) => t.categoryId === key)
          const techsInCat = technologies.filter((t) => t.categoryId === key)
          return (
            <div key={key} className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              {techsInCat.length > 0 ? techsInCat[0].categoryId : key}
            </div>
          )
        }).slice(0, 6)}
        <span className="text-[11px] text-zinc-400">...</span>
      </div>
    </GlassCard>
  )
}
