"use client"

import { ChevronRight, File, Folder } from "lucide-react"
import { Fragment } from "react"
import { cn } from "@/lib/utils"

interface Crumb {
  label: string
  kind?: "folder" | "file"
}

interface EditorPathBreadcrumbProps {
  crumbs?: Crumb[]
  className?: string
}

export const EditorPathBreadcrumbDemo: EditorPathBreadcrumbProps = {
  crumbs: [
    { label: "src", kind: "folder" },
    { label: "components", kind: "folder" },
    { label: "beste", kind: "folder" },
    { label: "button.tsx", kind: "file" },
  ],
}

export function EditorPathBreadcrumb({ crumbs = [], className }: EditorPathBreadcrumbProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card inline-flex items-center gap-1 rounded-md border px-2 py-1.5 font-mono text-xs shadow-sm">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1
          const Icon = c.kind === "file" ? File : Folder
          return (
            <Fragment key={i}>
              <div className="flex items-center gap-1">
                <Icon
                  className={cn("size-3 shrink-0", c.kind === "folder" ? "text-amber-500" : "text-muted-foreground")}
                  aria-hidden="true"
                />
                <span
                  className={cn("truncate", isLast ? "text-card-foreground font-semibold" : "text-muted-foreground")}
                >
                  {c.label}
                </span>
              </div>
              {!isLast && <ChevronRight className="text-muted-foreground/60 size-3 shrink-0" aria-hidden="true" />}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
