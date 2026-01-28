"use client"
import { type ReactNode } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import {
  GitBranch,
  AlertCircle,
  CheckCircle,
  History,
  Python,
  JavaScript,
  TypeScript,
  Html,
  Css,
  Json,
  Markdown,
  File,
} from '../../ui/icons'
import { cn } from '../../../lib/utils'
import type { FileLanguage } from '../../../types'

// ============================================
// Types
// ============================================

interface StatusBarProps {
  line?: number
  column?: number
  language?: FileLanguage
  encoding?: string
  lineEnding?: 'LF' | 'CRLF'
  tabSize?: number
  gitBranch?: string
  problems?: { errors: number; warnings: number }
  className?: string
}

// ============================================
// Icon mapping
// ============================================

function getLanguageIcon(language?: FileLanguage): ReactNode {
  switch (language) {
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
      return <File size={14} />
  }
}

function getLanguageLabel(language?: FileLanguage): string {
  switch (language) {
    case 'python':
      return 'Python'
    case 'javascript':
      return 'JavaScript'
    case 'typescript':
      return 'TypeScript'
    case 'html':
      return 'HTML'
    case 'css':
      return 'CSS'
    case 'json':
      return 'JSON'
    case 'markdown':
      return 'Markdown'
    default:
      return 'Plain Text'
  }
}

// ============================================
// Status Bar Component
// ============================================

export function StatusBar({
  line = 1,
  column = 1,
  language,
  encoding = 'UTF-8',
  lineEnding = 'LF',
  tabSize = 2,
  gitBranch,
  problems,
  className,
}: StatusBarProps) {
  const hasErrors = problems && problems.errors > 0
  const hasWarnings = problems && problems.warnings > 0

  return (
    <div
      className={cn(
        'flex h-6 items-center justify-between',
        'border-t border-[var(--border-default)] bg-[var(--bg-elevated)]',
        'px-3 text-xs text-[var(--text-tertiary)]',
        className
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Git branch */}
        {gitBranch && (
          <StatusBarItem icon={<GitBranch size={12} />} label={gitBranch} />
        )}

        {/* Problems */}
        {problems && (
          <StatusBarItem
            icon={
              hasErrors ? (
                <AlertCircle
                  size={12}
                  className="text-[var(--color-error-500)]"
                />
              ) : (
                <CheckCircle
                  size={12}
                  className="text-[var(--color-success-500)]"
                />
              )
            }
            label={
              hasErrors || hasWarnings
                ? `${problems.errors} errors, ${problems.warnings} warnings`
                : 'No problems'
            }
            className={hasErrors ? 'text-[var(--color-error-500)]' : undefined}
          />
        )}

        {/* History */}
        <StatusBarItem icon={<History size={12} />} label="History" />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Line and column */}
        <StatusBarButton>
          Ln {line}, Col {column}
        </StatusBarButton>

        {/* Tab size */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <StatusBarButton>Spaces: {tabSize}</StatusBarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Indent Using Spaces</DropdownMenuItem>
            <DropdownMenuItem>Indent Using Tabs</DropdownMenuItem>
            <DropdownMenuItem>2 Spaces</DropdownMenuItem>
            <DropdownMenuItem>4 Spaces</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Encoding */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <StatusBarButton>{encoding}</StatusBarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>UTF-8</DropdownMenuItem>
            <DropdownMenuItem>UTF-16</DropdownMenuItem>
            <DropdownMenuItem>ASCII</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Line ending */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <StatusBarButton>{lineEnding}</StatusBarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>LF (Unix)</DropdownMenuItem>
            <DropdownMenuItem>CRLF (Windows)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <StatusBarButton className="flex items-center gap-1.5">
              {getLanguageIcon(language)}
              {getLanguageLabel(language)}
            </StatusBarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Python size={14} />
              Python
            </DropdownMenuItem>
            <DropdownMenuItem>
              <JavaScript size={14} />
              JavaScript
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TypeScript size={14} />
              TypeScript
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Html size={14} />
              HTML
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Css size={14} />
              CSS
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Json size={14} />
              JSON
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Markdown size={14} />
              Markdown
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

// ============================================
// Helper Components
// ============================================

interface StatusBarItemProps {
  icon?: ReactNode
  label: string
  className?: string
}

function StatusBarItem({ icon, label, className }: StatusBarItemProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {icon}
      <span>{label}</span>
    </div>
  )
}

interface StatusBarButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

function StatusBarButton({
  children,
  className,
  onClick,
}: StatusBarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded px-1.5 py-0.5',
        'transition-colors duration-150',
        'hover:bg-[var(--interactive-hover)] hover:text-[var(--text-secondary)]',
        className
      )}
    >
      {children}
    </button>
  )
}

export default StatusBar
