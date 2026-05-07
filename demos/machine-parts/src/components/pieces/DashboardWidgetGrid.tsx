"use client"

import type { LucideIcon } from "lucide-react"
import { DollarSign, ShoppingCart, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type Tone = "primary" | "foreground" | "violet" | "emerald" | "sky" | "amber"

interface DashboardWidgetGridWidget {
  label: string
  value: string
  icon?: "revenue" | "orders" | "users" | "signals"
}

interface DashboardWidgetGridProps {
  widgets?: DashboardWidgetGridWidget[]
  tone?: Tone
  className?: string
}

const ICONS: Record<NonNullable<DashboardWidgetGridWidget["icon"]>, LucideIcon> = {
  revenue: DollarSign,
  orders: ShoppingCart,
  users: Users,
  signals: Zap,
}

const tileClasses: Record<Tone, string> = {
  primary: "bg-primary/15 text-primary",
  foreground: "bg-foreground/10 text-foreground",
  violet: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  sky: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
}

export const DashboardWidgetGridDemo: DashboardWidgetGridProps = {
  widgets: [
    { label: "Revenue", value: "$48.2K", icon: "revenue" },
    { label: "Orders", value: "1,284", icon: "orders" },
    { label: "Users", value: "9.4K", icon: "users" },
    { label: "Events", value: "62.1K", icon: "signals" },
  ],
  tone: "violet",
}

export function DashboardWidgetGrid({ widgets = [], tone = "violet", className }: DashboardWidgetGridProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="grid w-full max-w-80 grid-cols-2 gap-2">
        {widgets.map((w, i) => {
          const Icon = w.icon ? ICONS[w.icon] : Zap
          return (
            <div key={i} className="border-border bg-card flex items-center gap-2 rounded-md border p-2.5 shadow-sm">
              <span
                className={cn("flex size-7 shrink-0 items-center justify-center rounded-md", tileClasses[tone])}
                aria-hidden="true"
              >
                <Icon className="size-3.5" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-muted-foreground truncate text-xs">{w.label}</span>
                <span className="text-card-foreground truncate font-mono text-sm font-semibold tabular-nums">
                  {w.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
