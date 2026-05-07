"use client"

import { FileText, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

interface UploadFileRowProps {
  filename?: string
  size?: string
  modified?: string
  className?: string
}

export const UploadFileRowDemo: UploadFileRowProps = {
  filename: "2026-msa-final.pdf",
  size: "2.1 MB",
  modified: "Edited 2 hours ago",
}

export function UploadFileRow({ filename, size, modified, className }: UploadFileRowProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 items-center gap-3 rounded-md border p-3 shadow-sm">
        <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md">
          <FileText className="size-4" aria-hidden="true" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-card-foreground truncate text-sm font-semibold">{filename}</span>
          <span className="text-muted-foreground truncate text-xs">
            {size} · {modified}
          </span>
        </div>
        <button
          type="button"
          className="text-muted-foreground hover:bg-muted flex size-7 shrink-0 items-center justify-center rounded"
          aria-label="More"
        >
          <MoreHorizontal className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

