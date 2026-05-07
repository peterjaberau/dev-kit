"use client"

import { ScanLine } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadDocumentScannerProps {
  current?: number
  total?: number
  label?: string
  className?: string
}

export const UploadDocumentScannerDemo: UploadDocumentScannerProps = {
  current: 3,
  total: 5,
  label: "Scanning page",
}

export function UploadDocumentScanner({ current = 0, total = 1, label = "Scanning page", className }: UploadDocumentScannerProps) {
  const pct = Math.max(0, Math.min(100, (current / Math.max(1, total)) * 100))

  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-64 items-center gap-3 rounded-md border p-2 shadow-sm">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-500">
          <ScanLine className="size-4" aria-hidden="true" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {label} ·{" "}
              <span className="text-card-foreground font-mono">
                {current} / {total}
              </span>
            </span>
          </div>
          <div className="bg-muted h-1 overflow-hidden rounded-full" aria-hidden="true">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
