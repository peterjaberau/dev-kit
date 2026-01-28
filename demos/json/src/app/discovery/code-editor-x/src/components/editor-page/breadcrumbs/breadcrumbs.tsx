"use client"
import { type ReactNode, Fragment } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import {
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  Python,
  JavaScript,
  TypeScript,
  Html,
  Css,
  Json,
  Markdown,
} from '../../ui/icons'
import { cn } from '../../../lib/utils'
import type { FileLanguage } from '../../../types'

// ============================================
// Types
// ============================================

export interface BreadcrumbItem {
  id: string
  label: string
  type: 'folder' | 'file'
  language?: FileLanguage
  siblings?: BreadcrumbItem[]
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  onItemClick?: (item: BreadcrumbItem) => void
  className?: string
}

// ============================================
// Icon mapping
// ============================================

function getIcon(item: BreadcrumbItem): ReactNode {
  if (item.type === 'folder') {
    return <Folder size={14} className="text-[var(--color-primary-400)]" />
  }

  switch (item.language) {
    case 'python':
      return <Python size={14} />
    case 'javascript':
      return <JavaScript size={14} />
    case 'typescript':
      return <TypeScript size={14} />
    case 'html':
      return <Html size={14} />
    case 'css':
      return <Css size={14} />
    case 'json':
      return <Json size={14} />
    case 'markdown':
      return <Markdown size={14} />
    default:
      return <File size={14} className="text-[var(--text-tertiary)]" />
  }
}

// ============================================
// Breadcrumbs Component
// ============================================

export function Breadcrumbs({
  items,
  onItemClick,
  className,
}: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1 text-xs', className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const hasSiblings = item.siblings && item.siblings.length > 0

        return (
          <Fragment key={item.id}>
            {hasSiblings ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      'flex items-center gap-1 rounded px-1.5 py-0.5',
                      'transition-colors duration-150',
                      isLast
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-tertiary)] hover:bg-[var(--interactive-hover)] hover:text-[var(--text-secondary)]'
                    )}
                  >
                    {getIcon(item)}
                    <span>{item.label}</span>
                    <ChevronDown
                      size={10}
                      className="ml-0.5 text-[var(--text-muted)]"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.siblings?.map((sibling) => (
                    <DropdownMenuItem
                      key={sibling.id}
                      onClick={() => onItemClick?.(sibling)}
                    >
                      {getIcon(sibling)}
                      {sibling.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => onItemClick?.(item)}
                className={cn(
                  'flex items-center gap-1 rounded px-1.5 py-0.5',
                  'transition-colors duration-150',
                  isLast
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-tertiary)] hover:bg-[var(--interactive-hover)] hover:text-[var(--text-secondary)]'
                )}
              >
                {getIcon(item)}
                <span>{item.label}</span>
              </button>
            )}

            {!isLast && (
              <ChevronRight size={12} className="text-[var(--text-muted)]" />
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
