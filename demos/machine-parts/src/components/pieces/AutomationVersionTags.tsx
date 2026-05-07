"use client"

import { GitCommitHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

type VersionStatus = "active" | "draft" | "archived"

interface AutomationVersionTagsVersion {
  tag: string
  status: VersionStatus
  date: string
  author?: string
}

interface AutomationVersionTagsProps {
  heading?: string
  versions?: AutomationVersionTagsVersion[]
  activeLabel?: string
  draftLabel?: string
  archivedLabel?: string
  className?: string
}

const STATUS_CLASSES: Record<VersionStatus, { classes: string; dot: string }> = {
  active: {
    classes: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  draft: {
    classes: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  archived: {
    classes: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
}

export const AutomationVersionTagsDemo: AutomationVersionTagsProps = {
  heading: "Versions",
  versions: [
    { tag: "v3", status: "active", date: "Apr 20", author: "Ada L." },
    { tag: "v2", status: "draft", date: "Apr 14", author: "Marcus R." },
    { tag: "v1", status: "archived", date: "Mar 30", author: "Priya S." },
  ],
  activeLabel: "Active",
  draftLabel: "Draft",
  archivedLabel: "Archived",
}

export function AutomationVersionTags({
  heading = "Versions",
  versions = [],
  activeLabel = "Active",
  draftLabel = "Draft",
  archivedLabel = "Archived",
  className,
}: AutomationVersionTagsProps) {
  const statusLabels: Record<VersionStatus, string> = {
    active: activeLabel,
    draft: draftLabel,
    archived: archivedLabel,
  }
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-2 rounded-md border p-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <GitCommitHorizontal className="text-muted-foreground size-3.5" aria-hidden="true" />
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">{heading}</span>
        </div>
        <ol className="divide-border flex flex-col divide-y">
          {versions.map((v) => {
            const cfg = STATUS_CLASSES[v.status]
            return (
              <li key={v.tag} className="flex items-center gap-2 py-1.5">
                <span className={cn("size-2 shrink-0 rounded-full", cfg.dot)} aria-hidden="true" />
                <span className="text-card-foreground font-mono text-sm font-semibold tabular-nums">{v.tag}</span>
                <span className={cn("rounded-sm px-1.5 py-0.5 text-xs font-medium", cfg.classes)}>
                  {statusLabels[v.status]}
                </span>
                <span className="text-muted-foreground ml-auto flex items-baseline gap-1.5 text-xs">
                  {v.author && (
                    <>
                      <span>{v.author}</span>
                      <span>·</span>
                    </>
                  )}
                  <span className="font-mono">{v.date}</span>
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
