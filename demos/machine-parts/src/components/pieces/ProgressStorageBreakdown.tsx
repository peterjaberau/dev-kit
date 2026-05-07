"use client"

import { cn } from "@/lib/utils"

type SegmentTone = "primary" | "foreground" | "emerald" | "sky" | "amber" | "rose" | "violet" | "muted"

interface Segment {
  label: string
  value: number
  tone: SegmentTone
}

interface ProgressStorageBreakdownProps {
  title?: string
  segments?: Segment[]
  className?: string
}

const toneClasses: Record<SegmentTone, string> = {
  primary: "bg-primary",
  foreground: "bg-foreground",
  emerald: "bg-emerald-500",
  sky: "bg-sky-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
  muted: "bg-muted-foreground",
}

export const ProgressStorageBreakdownDemo: ProgressStorageBreakdownProps = {
  title: "Storage breakdown",
  segments: [
    { label: "Media", value: 42, tone: "emerald" },
    { label: "Docs", value: 18, tone: "sky" },
    { label: "Cache", value: 12, tone: "amber" },
    { label: "Other", value: 8, tone: "muted" },
  ],
}

export function ProgressStorageBreakdown({ title, segments = [], className }: ProgressStorageBreakdownProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1

  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="flex w-full max-w-72 flex-col gap-2">
        {title && <span className="text-card-foreground text-sm font-medium">{title}</span>}
        <div className="bg-muted flex h-2 w-full overflow-hidden rounded-full" aria-hidden="true">
          {segments.map((seg, i) => (
            <span
              key={i}
              className={cn("h-full", toneClasses[seg.tone])}
              style={{ width: `${(seg.value / total) * 100}%` }}
            />
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
          {segments.map((seg, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full", toneClasses[seg.tone])} aria-hidden="true" />
              <span className="text-muted-foreground">{seg.label}</span>
              <span className="text-card-foreground font-semibold tabular-nums">
                {Math.round((seg.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
