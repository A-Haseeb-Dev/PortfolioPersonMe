"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  className?: string
  hidden?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyField: string
  loading?: boolean
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
  onSort?: (key: string, direction: "asc" | "desc") => void
  sortKey?: string
  sortDirection?: "asc" | "desc"
  searchable?: boolean
  searchPlaceholder?: string
  searchValue?: string
  onSearch?: (value: string) => void
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: React.ReactNode
  onRowClick?: (item: T) => void
  selectable?: boolean
  className?: string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  loading,
  selectedIds = [],
  onSelectionChange,
  onSort,
  sortKey,
  sortDirection,
  searchable,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearch,
  page = 1,
  totalPages = 1,
  onPageChange,
  emptyTitle = "No items found",
  emptyDescription,
  emptyAction,
  onRowClick,
  selectable,
  className,
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && data.every((item) => selectedIds.includes(item[keyField] as string))
  const someSelected = data.some((item) => selectedIds.includes(item[keyField] as string))

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange?.([])
    } else {
      onSelectionChange?.(data.map((item) => item[keyField] as string))
    }
  }

  const toggleOne = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange?.(selectedIds.filter((i) => i !== id))
    } else {
      onSelectionChange?.([...selectedIds, id])
    }
  }

  const renderSortIcon = (key: string) => {
    if (sortKey !== key) return <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 text-zinc-400" />
    if (sortDirection === "asc") return <ChevronUp className="ml-1 h-3.5 w-3.5 shrink-0" />
    return <ChevronDown className="ml-1 h-3.5 w-3.5 shrink-0" />
  }

  return (
    <div className={cn("space-y-4", className)}>
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-9 pr-9"
          />
          {searchValue && (
            <button
              onClick={() => onSearch?.("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {selectable && (
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someSelected && !allSelected
                      }}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-border text-foreground focus:ring-foreground"
                    />
                  </th>
                )}
                {columns
                  .filter((c) => !c.hidden)
                  .map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                        col.sortable && "cursor-pointer select-none hover:text-foreground",
                        col.className
                      )}
                      onClick={() => {
                        if (col.sortable) {
                          const newDir = sortKey === col.key && sortDirection === "asc" ? "desc" : "asc"
                          onSort?.(col.key, newDir)
                        }
                      }}
                    >
                      <span className="inline-flex items-center">
                        {col.label}
                        {col.sortable && renderSortIcon(col.key)}
                      </span>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {selectable && <td className="px-4 py-3"><Skeleton className="h-4 w-4" /></td>}
                    {columns
                      .filter((c) => !c.hidden)
                      .map((col) => (
                        <td key={col.key} className="px-4 py-3">
                          <Skeleton className={cn("h-4", col.key === "actions" ? "w-20" : "w-32")} />
                        </td>
                      ))}
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.filter((c) => !c.hidden).length + (selectable ? 1 : 0)} className="px-4 py-12">
                    <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {data.map((item, index) => {
                    const id = item[keyField] as string
                    return (
                      <motion.tr
                        key={id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ delay: index * 0.03 }}
                        className={cn(
                          "transition-colors hover:bg-muted/50",
                          onRowClick && "cursor-pointer",
                          selectedIds.includes(id) && "bg-muted/50"
                        )}
                        onClick={() => onRowClick?.(item)}
                      >
                        {selectable && (
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(id)}
                              onChange={() => toggleOne(id)}
                              onClick={(e) => e.stopPropagation()}
                              className="h-4 w-4 rounded border-border text-foreground focus:ring-foreground"
                            />
                          </td>
                        )}
                        {columns
                          .filter((c) => !c.hidden)
                          .map((col) => (
                            <td
                              key={col.key}
                              className={cn("px-4 py-3 text-sm text-muted-foreground", col.className)}
                            >
                              {col.render ? col.render(item) : (item[col.key] as React.ReactNode) ?? "—"}
                            </td>
                          ))}
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => onPageChange?.(page - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const start = Math.max(1, Math.min(page - 2, totalPages - 4))
                const p = start + i
                if (p > totalPages) return null
                return (
                  <Button
                    key={p}
                    variant={p === page ? "primary" : "outline"}
                    size="sm"
                    className="min-w-[2.25rem]"
                    onClick={() => onPageChange?.(p)}
                  >
                    {p}
                  </Button>
                )
              })}
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => onPageChange?.(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function useTableSearch(data: any[], fields: string[]) {
  const [search, setSearch] = React.useState("")

  const filtered = React.useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter((item) =>
      fields.some((field) => {
        const val = item[field]
        return val && String(val).toLowerCase().includes(q)
      })
    )
  }, [data, search, fields])

  return { search, setSearch, filtered }
}

export function useTablePagination(data: any[], pageSize = 10) {
  const [page, setPage] = React.useState(1)
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
  const paginated = React.useMemo(() => {
    const start = (page - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, page, pageSize])

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages, page])

  return { page, setPage, totalPages, paginated }
}
