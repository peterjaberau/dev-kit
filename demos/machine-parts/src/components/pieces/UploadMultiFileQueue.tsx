"use client"

import { CheckCircle2, FileText, Loader2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type FileState = "uploading" | "done" | "failed"

interface UploadRow {
  filename: string
  size: string
  state: FileState
  percent?: number
}

interface UploadMultiFileQueueProps {
  files?: UploadRow[]
  className?: string
}

export const UploadMultiFileQueueDemo: UploadMultiFileQueueProps = {
  files: [
    { filename: "brand-guide.pdf", size: "4.2 MB", state: "done" },
    {
      filename: "hero-video.mov",
      size: "312 MB",
      state: "uploading",
      percent: 62,
    },
    { filename: "logo-dark.svg", size: "18 KB", state: "done" },
    { filename: "pricing.xlsx", size: "2.1 MB", state: "failed" },
  ],
}

export function UploadMultiFileQueue({ files = [], className }: UploadMultiFileQueueProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="divide-border border-border bg-card flex w-full max-w-80 flex-col divide-y overflow-hidden rounded-lg border shadow-sm">
        {files.map((f, idx) => (
          <div key={idx} className="flex items-center gap-2 px-3 py-2">
            <FileText className="text-muted-foreground size-3.5 shrink-0" aria-hidden="true" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-card-foreground truncate text-xs font-medium">{f.filename}</span>
              {f.state === "uploading" && typeof f.percent === "number" ? (
                <div className="bg-muted mt-1 h-1 overflow-hidden rounded-full" aria-hidden="true">
                  <div className="h-full rounded-full bg-sky-500" style={{ width: `${f.percent}%` }} />
                </div>
              ) : (
                <span className="text-muted-foreground text-xs">{f.size}</span>
              )}
            </div>
            {f.state === "done" && <CheckCircle2 className="size-4 shrink-0 text-emerald-500" aria-hidden="true" />}
            {f.state === "uploading" && (
              <Loader2 className="size-4 shrink-0 animate-spin text-sky-500" aria-hidden="true" />
            )}
            {f.state === "failed" && <XCircle className="size-4 shrink-0 text-rose-500" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  )
}
