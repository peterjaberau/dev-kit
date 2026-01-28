"use client"
import { type HTMLAttributes } from 'react'
import { cn } from '../../../lib/utils'

interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded',
        'border border-[var(--border-default)]',
        'bg-[var(--bg-elevated)]',
        'px-1.5 text-[10px] font-medium text-[var(--text-muted)]',
        'font-sans',
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
}

export default Kbd
