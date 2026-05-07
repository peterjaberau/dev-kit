"use client"

import { cn } from "@/lib/utils"

type Anchor = "tl" | "tc" | "tr" | "ml" | "mc" | "mr" | "bl" | "bc" | "br"

interface ToolbarAlignmentGridProps {
  anchor?: Anchor
  className?: string
}

const anchors: Anchor[] = ["tl", "tc", "tr", "ml", "mc", "mr", "bl", "bc", "br"]

export function ToolbarAlignmentGrid({ anchor = "tl", className }: ToolbarAlignmentGridProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card grid grid-cols-3 gap-1 rounded-lg border p-2 shadow-sm">
        {anchors.map((a) => {
          const isActive = a === anchor
          return (
            <button
              key={a}
              type="button"
              aria-label={`Anchor ${a}`}
              aria-pressed={isActive}
              className="border-border bg-card hover:bg-muted flex size-6 items-center justify-center rounded-sm border transition-colors"
            >
              <span
                className={cn("size-2 rounded-full", isActive ? "bg-primary" : "bg-muted-foreground/30")}
                aria-hidden="true"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
