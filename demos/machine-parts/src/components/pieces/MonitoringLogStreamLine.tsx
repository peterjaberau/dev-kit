"use client"

import { cn } from "@/lib/utils"

type LogLevel = "debug" | "info" | "warn" | "error"

interface MonitoringLogStreamLineProps {
  timestamp?: string
  level?: LogLevel
  source?: string
  message?: string
  className?: string
}

const levelStyles: Record<LogLevel, { text: string; label: string }> = {
  debug: {
    text: "text-slate-500 dark:text-slate-400",
    label: "DEBUG",
  },
  info: {
    text: "text-sky-600 dark:text-sky-400",
    label: "INFO ",
  },
  warn: {
    text: "text-amber-600 dark:text-amber-400",
    label: "WARN ",
  },
  error: {
    text: "text-rose-600 dark:text-rose-400",
    label: "ERROR",
  },
}

export const MonitoringLogStreamLineDemo: MonitoringLogStreamLineProps = {
  timestamp: "12:34:56",
  level: "warn",
  source: "auth.session",
  message: "token refresh retry 2/3",
}

export function MonitoringLogStreamLine({ timestamp = "00:00:00", level = "info", source, message, className }: MonitoringLogStreamLineProps) {
  const styles = levelStyles[level]

  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 items-center gap-2 overflow-hidden rounded-md border px-3 py-2 font-mono text-xs shadow-sm">
        <span className="text-muted-foreground shrink-0 tabular-nums">{timestamp}</span>
        <span className={cn("shrink-0 font-semibold", styles.text)}>{styles.label}</span>
        {source && <span className="text-muted-foreground shrink-0">{source}</span>}
        <span className="text-card-foreground min-w-0 flex-1 truncate">{message}</span>
      </div>
    </div>
  )
}
