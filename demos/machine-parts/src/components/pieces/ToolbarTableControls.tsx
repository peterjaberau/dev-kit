"use client"

import { Columns3, Merge, Rows3, Split, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Toolbar5Props {
  className?: string
}

const groups: {
  items: { Icon: typeof Rows3; label: string; destructive?: boolean }[]
}[] = [
  {
    items: [
      { Icon: Rows3, label: "Add row" },
      { Icon: Columns3, label: "Add column" },
    ],
  },
  {
    items: [
      { Icon: Merge, label: "Merge cells" },
      { Icon: Split, label: "Split cells" },
    ],
  },
  {
    items: [{ Icon: Trash2, label: "Delete row", destructive: true }],
  },
]


export function ToolbarTableControls({ className }: Toolbar5Props) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card inline-flex items-center rounded-lg border p-1 shadow-sm">
        {groups.map((g, gi) => (
          <div key={gi} className="flex items-center">
            {gi > 0 && <div className="bg-border mx-1 h-5 w-px" aria-hidden="true" />}
            <div className="flex items-center gap-0.5">
              {g.items.map(({ Icon, label, destructive }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-md transition-colors",
                    destructive
                      ? "text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950"
                      : "text-muted-foreground hover:bg-muted hover:text-card-foreground",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
