"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GlassCard } from "@/components/ui/glass-card"

interface FormWrapperProps {
  title: string
  description?: string
  backHref?: string
  onSave?: () => void
  onSaveDraft?: () => void
  saving?: boolean
  saveLabel?: string
  saveDraftLabel?: string
  children: React.ReactNode
  className?: string
}

export function FormWrapper({
  title,
  description,
  backHref = "/admin",
  onSave,
  onSaveDraft,
  saving,
  saveLabel = "Save",
  saveDraftLabel = "Save as Draft",
  children,
  className,
}: FormWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("space-y-6", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={backHref}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onSaveDraft && (
            <Button variant="outline" onClick={onSaveDraft} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saveDraftLabel}
            </Button>
          )}
          {onSave && (
            <Button onClick={onSave} disabled={saving} loading={saving}>
              <Save className="h-4 w-4" />
              {saveLabel}
            </Button>
          )}
        </div>
      </div>

      <Separator />

      <div className="space-y-6">{children}</div>
    </motion.div>
  )
}

export function FormSection({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <GlassCard intensity="light" className={cn("overflow-hidden", className)}>
      <div className="border-b border-border/20 px-6 py-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </GlassCard>
  )
}

export function FormGrid({
  children,
  cols = 2,
  className,
}: {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid gap-4",
        cols === 1 && "grid-cols-1",
        cols === 2 && "grid-cols-1 md:grid-cols-2",
        cols === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        cols === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  )
}
