"use client"

import { cn } from "@/lib/utils"

type Tag = "new" | "beta" | "stable" | "deprecated"

interface TageVersionBadgeProps {
  version?: string
  tag?: Tag
  className?: string
}

const tagClasses: Record<Tag, string> = {
  new: "bg-emerald-500 text-white",
  beta: "bg-amber-500 text-white",
  stable: "bg-sky-500 text-white",
  deprecated: "bg-rose-500 text-white",
}

const tagLabel: Record<Tag, string> = {
  new: "NEW",
  beta: "BETA",
  stable: "STABLE",
  deprecated: "DEPRECATED",
}

export const TageVersionBadgeDemo: TageVersionBadgeProps = {
  version: "v2.4.1",
  tag: "new",
}

export function TageVersionBadge({ version = "v1.0.0", tag, className }: TageVersionBadgeProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border inline-flex items-stretch overflow-hidden rounded-md border text-xs shadow-sm">
        <span className="bg-card text-card-foreground flex items-center px-2.5 py-1 font-mono font-semibold">
          {version}
        </span>
        {tag && (
          <span className={cn("flex items-center px-2 py-1 font-bold uppercase tracking-wide", tagClasses[tag])}>
            {tagLabel[tag]}
          </span>
        )}
      </div>
    </div>
  )
}
