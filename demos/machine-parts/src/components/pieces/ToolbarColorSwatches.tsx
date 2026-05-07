"use client"

import { Check, Pipette } from "lucide-react"
import { cn } from "@/lib/utils"

interface Swatch {
  color: string
  label: string
}

interface ToolbarColorSwatchesProps {
  swatches?: Swatch[]
  active?: string
  className?: string
}

export const ToolbarColorSwatchesDemo: ToolbarColorSwatchesProps = {
  swatches: [
    { color: "#0f172a", label: "Slate" },
    { color: "#ef4444", label: "Rose" },
    { color: "#f59e0b", label: "Amber" },
    { color: "#10b981", label: "Emerald" },
    { color: "#0ea5e9", label: "Sky" },
    { color: "#8b5cf6", label: "Violet" },
  ],
  active: "#10b981",
}

export function ToolbarColorSwatches({ swatches = [], active, className }: ToolbarColorSwatchesProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card inline-flex items-center gap-1 rounded-full border p-1 shadow-sm">
        {swatches.map((s) => {
          const isActive = s.color === active
          return (
            <button
              key={s.color}
              type="button"
              aria-label={s.label}
              aria-pressed={isActive}
              className="flex size-6 items-center justify-center rounded-full transition-transform"
              style={{ backgroundColor: s.color }}
            >
              {isActive && <Check className="size-3 text-white" strokeWidth={3} aria-hidden="true" />}
            </button>
          )
        })}
        <div className="bg-border mx-0.5 h-5 w-px" aria-hidden="true" />
        <button
          type="button"
          aria-label="Custom color"
          className="text-muted-foreground hover:bg-muted hover:text-card-foreground flex size-6 items-center justify-center rounded-full transition-colors"
        >
          <Pipette className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
