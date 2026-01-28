"use client"
import { type ReactNode } from 'react'
import { ScrollArea } from '../../ui/scroll-area'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import {
  X,
  Plus,
  MoreHorizontal,
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

export interface EditorTab {
  id: string
  fileId: string
  fileName: string
  filePath: string
  language?: FileLanguage
  isDirty?: boolean
  isPinned?: boolean
}

interface EditorTabsProps {
  tabs: EditorTab[]
  activeTabId: string | null
  onTabSelect: (tabId: string) => void
  onTabClose: (tabId: string) => void
  onNewTab?: () => void
  onCloseAll?: () => void
  onCloseOthers?: (tabId: string) => void
  className?: string
}

// ============================================
// Icon mapping
// ============================================

function getFileIcon(language?: FileLanguage): ReactNode {
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
      return <File size={14} className="text-[var(--text-tertiary)]" />
  }
}

// ============================================
// Editor Tabs Component
// ============================================

export function EditorTabs({
  tabs,
  activeTabId,
  onTabSelect,
  onTabClose,
  onNewTab,
  onCloseAll,
  onCloseOthers,
  className,
}: EditorTabsProps) {
  return (
    <div
      className={cn(
        'flex h-9 items-center border-b border-[var(--border-default)] bg-[var(--bg-elevated)]',
        className
      )}
    >
      {/* Tabs Scroll Area */}
      <ScrollArea className="flex-1">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              tab={tab}
              isActive={tab.id === activeTabId}
              onSelect={() => onTabSelect(tab.id)}
              onClose={() => onTabClose(tab.id)}
              onCloseOthers={() => onCloseOthers?.(tab.id)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="flex items-center gap-0.5 border-l border-[var(--border-default)] px-1">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onNewTab}
          title="New Tab"
        >
          <Plus size={14} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-xs" title="More Actions">
              <MoreHorizontal size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onNewTab}>
              <Plus size={14} />
              New Tab
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onCloseAll} disabled={tabs.length === 0}>
              Close All Tabs
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

// ============================================
// Tab Item Component
// ============================================

interface TabItemProps {
  tab: EditorTab
  isActive: boolean
  onSelect: () => void
  onClose: () => void
  onCloseOthers?: () => void
}

function TabItem({
  tab,
  isActive,
  onSelect,
  onClose,
  onCloseOthers,
}: TabItemProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  return (
    <DropdownMenu>
      <div
        onClick={onSelect}
        className={cn(
          'group relative flex h-9 cursor-pointer items-center gap-2 border-r border-[var(--border-default)] px-3',
          'transition-colors duration-150',
          isActive
            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
            : 'text-[var(--text-secondary)] hover:bg-[var(--interactive-hover)] hover:text-[var(--text-primary)]'
        )}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-[var(--color-primary-500)]" />
        )}

        {/* File icon */}
        <span className="shrink-0">{getFileIcon(tab.language)}</span>

        {/* File name */}
        <span className="max-w-32 truncate text-sm">{tab.fileName}</span>

        {/* Dirty indicator */}
        {tab.isDirty && (
          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary-500)]" />
        )}

        {/* Close button */}
        <button
          onClick={handleClose}
          className={cn(
            'shrink-0 rounded p-0.5',
            'text-[var(--text-muted)]',
            'opacity-0 group-hover:opacity-100',
            'hover:bg-[var(--interactive-hover)] hover:text-[var(--text-secondary)]',
            'transition-opacity duration-150',
            isActive && 'opacity-100'
          )}
        >
          <X size={12} />
        </button>

        {/* Context menu trigger (invisible, for right-click) */}
        <DropdownMenuTrigger asChild>
          <button
            className="absolute inset-0"
            onContextMenu={(e) => e.preventDefault()}
          />
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={onClose}>
          <X size={14} />
          Close
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCloseOthers}>
          Close Others
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <File size={14} />
          Copy Path
        </DropdownMenuItem>
        <DropdownMenuItem>Reveal in Sidebar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default EditorTabs
