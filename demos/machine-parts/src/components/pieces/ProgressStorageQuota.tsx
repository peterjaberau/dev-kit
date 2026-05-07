"use client"

import { HardDrive } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressStorageQuotaProps {
  used?: string
  total?: string
  progress?: number
  label?: string
  className?: string
}

export const ProgressStorageQuotaDemo: ProgressStorageQuotaProps = {
  used: "64 GB",
  total: "200 GB",
  progress: 32,
  label: "Workspace storage",
}

export function ProgressStorageQuota({ used = "0 GB", total = "0 GB", progress = 0, label, className }: ProgressStorageQuotaProps) {
  const pct = Math.max(0, Math.min(100, progress))
  const fillClass = pct >= 90 ? "bg-rose-500" : pct >= 70 ? "bg-amber-500" : "bg-sky-500"

  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-72 items-center gap-3 rounded-lg border px-3 py-3 shadow-sm">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
          <HardDrive className="size-4" aria-hidden="true" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {label && <span className="text-card-foreground truncate text-xs font-semibold">{label}</span>}
          <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
            <div
              className={cn("h-full rounded-full transition-all", fillClass)}
              style={{ width: `${pct}%` }}
              aria-hidden="true"
            />
          </div>
          <span className="text-muted-foreground text-xs tabular-nums">
            <span className="text-card-foreground font-semibold">{used}</span>
            {" of "}
            {total}
          </span>
        </div>
      </div>
    </div>
  )
}
