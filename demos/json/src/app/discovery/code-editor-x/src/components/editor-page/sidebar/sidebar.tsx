"use client"
import { ScrollArea } from '../../ui'
import { FileTree, type FileTreeItem } from '../file-tree'
import {
  SidebarSection,
  SidebarWidgetItem,
  IconButton,
} from './sidebar-section'
import {
  FilePlus,
  FolderPlus,
  MoreHorizontal,
  Terminal,
  Notebook,
  Bug,
  Plug,
  Sparkles,
} from '../../ui/icons'
import { cn } from '../../../lib/utils'

// ============================================
// Types
// ============================================

interface SidebarProps {
  files: FileTreeItem[]
  selectedFileId?: string
  onFileSelect?: (item: FileTreeItem) => void
  onNewFile?: () => void
  onNewFolder?: () => void
  onWidgetClick?: (widgetId: string) => void
  activeWidget?: string
  className?: string
}

// ============================================
// Default widgets configuration
// ============================================

const defaultWidgets = [
  { id: 'ai-chat', label: 'AI Chat', icon: <Sparkles size={16} /> },
  { id: 'output', label: 'Output', icon: <Terminal size={16} /> },
  { id: 'notes', label: 'Notes', icon: <Notebook size={16} /> },
  { id: 'debugger', label: 'Debugger', icon: <Bug size={16} /> },
  { id: 'terminal', label: 'Terminal', icon: <Terminal size={16} /> },
  { id: 'integration', label: 'Integration', icon: <Plug size={16} /> },
]

// ============================================
// Sidebar Component
// ============================================

export function Sidebar({
  files,
  selectedFileId,
  onFileSelect,
  onNewFile,
  onNewFolder,
  onWidgetClick,
  activeWidget,
  className,
}: SidebarProps) {
  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Files Header */}
      <div className="flex items-center justify-between border-b border-(--border-default) px-3 py-2.5">
        <span className="text-xs font-semibold tracking-wider text-(--text-secondary) uppercase">
          Files
        </span>
        <div className="flex items-center gap-0.5">
          <IconButton
            icon={<FilePlus size={14} />}
            onClick={onNewFile}
            title="New File"
          />
          <IconButton
            icon={<FolderPlus size={14} />}
            onClick={onNewFolder}
            title="New Folder"
          />
          <IconButton
            icon={<MoreHorizontal size={14} />}
            title="More Actions"
          />
        </div>
      </div>

      {/* File Tree */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          <FileTree
            items={files}
            selectedId={selectedFileId}
            onSelect={onFileSelect}
          />
        </div>
      </ScrollArea>

      {/* Bottom Sections */}
      <div className="shrink-0">
        <SidebarSection title="Manager">
          <div className="py-1 text-center text-xs text-(--text-muted)">
            No active processes
          </div>
        </SidebarSection>

        <SidebarSection title="Widgets" defaultOpen>
          <div className="space-y-0.5 py-1">
            {defaultWidgets.map((widget) => (
              <SidebarWidgetItem
                key={widget.id}
                icon={widget.icon}
                label={widget.label}
                isActive={activeWidget === widget.id}
                onClick={() => onWidgetClick?.(widget.id)}
              />
            ))}
          </div>
        </SidebarSection>
      </div>
    </div>
  )
}

export default Sidebar
