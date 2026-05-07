"use client"

import { FolderOpen, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface Folder {
  name: string
  count: number
}

interface UploadFolderListProps {
  heading?: string
  folders?: Folder[]
  className?: string
}

export const UploadFolderListDemo: UploadFolderListProps = {
  heading: "Organize uploads",
  folders: [
    { name: "Brand assets", count: 124 },
    { name: "Press kit 2026", count: 38 },
    { name: "Product screenshots", count: 212 },
    { name: "Archive · 2025", count: 96 },
  ],
}

export function UploadFolderList({ heading, folders = [], className }: UploadFolderListProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-2 rounded-md border p-2 shadow-sm">
        {heading && (
          <span className="text-muted-foreground px-2 pt-1 text-xs font-semibold uppercase tracking-wide">
            {heading}
          </span>
        )}
        <div className="flex flex-col gap-0.5">
          {folders.map((f, idx) => (
            <div key={idx} className="hover:bg-muted flex items-center gap-2 rounded-md px-2 py-1.5">
              <GripVertical className="text-muted-foreground/60 size-3.5 shrink-0" aria-hidden="true" />
              <FolderOpen className="size-3.5 shrink-0 text-amber-500" aria-hidden="true" />
              <span className="text-card-foreground flex-1 truncate text-sm">{f.name}</span>
              <span className="text-muted-foreground font-mono text-xs">{f.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
