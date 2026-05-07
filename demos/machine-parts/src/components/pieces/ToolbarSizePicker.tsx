"use client"

import { cn } from "@/lib/utils"

interface ToolbarSizePickerProps {
  sizes?: string[]
  active?: string
  className?: string
}


export function ToolbarSizePicker({ sizes = ["S", "M", "L"], active, className }: ToolbarSizePickerProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card inline-flex items-center gap-1 rounded-md border p-1 shadow-sm">
        {sizes.map((s) => {
          const isActive = s === active
          return (
            <button
              key={s}
              type="button"
              aria-pressed={isActive}
              className={cn(
                "flex size-8 items-center justify-center rounded font-mono text-xs font-semibold transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-card-foreground",
              )}
            >
              {s}
            </button>
          )
        })}
      </div>
    </div>
  )
}
