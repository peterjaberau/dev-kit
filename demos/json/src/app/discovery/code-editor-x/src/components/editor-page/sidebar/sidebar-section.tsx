"use client"
import { type ReactNode } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible'
import { ChevronRight } from '../../ui/icons'
import { cn } from '../../../lib/utils'

interface SidebarSectionProps {
  title: string
  children?: ReactNode
  defaultOpen?: boolean
  actions?: ReactNode
  className?: string
}

export function SidebarSection({
  title,
  children,
  defaultOpen = false,
  actions,
  className,
}: SidebarSectionProps) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      className={cn('border-t border-[var(--border-default)]', className)}
    >
      <div className="flex items-center">
        <CollapsibleTrigger className="group flex flex-1 items-center gap-1.5 px-3 py-2.5 hover:bg-[var(--interactive-hover)]">
          <ChevronRight
            size={12}
            className={cn(
              'shrink-0 text-[var(--text-muted)] transition-transform duration-150',
              'group-data-[state=open]:rotate-90'
            )}
          />
          <span className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
            {title}
          </span>
        </CollapsibleTrigger>
        {actions && (
          <div className="flex items-center gap-0.5 pr-2">{actions}</div>
        )}
      </div>
      <CollapsibleContent>
        <div className="px-2 pb-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ============================================
// Sidebar Widget Item
// ============================================

interface SidebarWidgetItemProps {
  icon: ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function SidebarWidgetItem({
  icon,
  label,
  isActive = false,
  onClick,
  className,
}: SidebarWidgetItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-2 py-1.5',
        'text-sm transition-colors',
        isActive
          ? 'bg-[var(--interactive-active)] text-[var(--text-primary)]'
          : 'text-[var(--text-secondary)] hover:bg-[var(--interactive-hover)] hover:text-[var(--text-primary)]',
        className
      )}
    >
      <span className="shrink-0 text-[var(--text-tertiary)]">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  )
}

// ============================================
// Icon Button
// ============================================

interface IconButtonProps {
  icon: ReactNode
  onClick?: () => void
  className?: string
  title?: string
}

export function IconButton({
  icon,
  onClick,
  className,
  title,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded',
        'text-[var(--text-tertiary)]',
        'hover:bg-[var(--interactive-hover)] hover:text-[var(--text-secondary)]',
        'transition-colors',
        className
      )}
    >
      {icon}
    </button>
  )
}

export default SidebarSection
