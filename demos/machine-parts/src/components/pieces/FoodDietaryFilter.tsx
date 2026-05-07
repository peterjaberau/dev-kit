"use client"

import { Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface FoodDietaryFilterProps {
  heading?: string
  filters?: string[]
  active?: string[]
  className?: string
}

export const FoodDietaryFilterDemo: FoodDietaryFilterProps = {
  heading: "Dietary preferences",
  filters: ["Vegetarian", "Vegan", "Gluten-free", "Lactose-free", "Keto", "Halal", "Kosher", "Nut-free"],
  active: ["Vegetarian", "Gluten-free"],
}

export function FoodDietaryFilter({ heading, filters = [], active = [], className }: FoodDietaryFilterProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-2 rounded-xl border p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Leaf className="size-3.5 text-emerald-500" aria-hidden="true" />
          {heading && (
            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">{heading}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f, idx) => {
            const isActive = active.includes(f)
            return (
              <button
                key={idx}
                type="button"
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors",
                  isActive
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-border bg-card text-muted-foreground hover:bg-muted",
                )}
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
