"use client"
import { useState, type ReactNode } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible'
import {
  ChevronRight,
  File,
  Folder,
  FolderOpen,
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

export interface FileTreeItem {
  id: string
  name: string
  type: 'file' | 'folder'
  language?: FileLanguage
  children?: FileTreeItem[]
}

interface FileTreeProps {
  items: FileTreeItem[]
  selectedId?: string
  onSelect?: (item: FileTreeItem) => void
  className?: string
}

interface FileTreeNodeProps {
  item: FileTreeItem
  level: number
  selectedId?: string
  onSelect?: (item: FileTreeItem) => void
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
// File Tree Node Component
// ============================================

function FileTreeNode({
  item,
  level,
  selectedId,
  onSelect,
}: FileTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true)
  const isSelected = item.id === selectedId
  const isFolder = item.type === 'folder'
  const paddingLeft = 8 + level * 12

  if (isFolder) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className={cn(
            'group flex w-full items-center gap-1 rounded-md py-1 pr-2',
            'text-sm text-[var(--text-secondary)]',
            'hover:bg-[var(--interactive-hover)]',
            'transition-colors'
          )}
          style={{ paddingLeft }}
        >
          <ChevronRight
            size={12}
            className={cn(
              'shrink-0 text-[var(--text-muted)] transition-transform duration-150',
              isOpen && 'rotate-90'
            )}
          />
          {isOpen ? (
            <FolderOpen
              size={14}
              className="shrink-0 text-[var(--color-primary-400)]"
            />
          ) : (
            <Folder
              size={14}
              className="shrink-0 text-[var(--color-primary-400)]"
            />
          )}
          <span className="truncate">{item.name}</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {item.children?.map((child) => (
            <FileTreeNode
              key={child.id}
              item={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <button
      onClick={() => onSelect?.(item)}
      className={cn(
        'flex w-full items-center gap-1.5 rounded-md py-1 pr-2',
        'text-sm transition-colors',
        isSelected
          ? 'bg-[var(--interactive-active)] text-[var(--text-primary)]'
          : 'text-[var(--text-secondary)] hover:bg-[var(--interactive-hover)]'
      )}
      style={{ paddingLeft: paddingLeft + 14 }}
    >
      {getFileIcon(item.language)}
      <span className="truncate">{item.name}</span>
    </button>
  )
}

// ============================================
// File Tree Component
// ============================================

export function FileTree({
  items,
  selectedId,
  onSelect,
  className,
}: FileTreeProps) {
  return (
    <div className={cn('space-y-0.5', className)}>
      {items.map((item) => (
        <FileTreeNode
          key={item.id}
          item={item}
          level={0}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default FileTree
