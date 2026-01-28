"use client"
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs'
import { ScrollArea } from '../../ui/scroll-area'
import { Button } from '../../ui/button'
import {
  Terminal,
  Play,
  Plus,
  X,
  ChevronRight,
  Maximize2,
  Minimize2,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash,
} from '../../ui/icons'
import { cn } from '../../../lib/utils'

// ============================================
// Types
// ============================================

export interface OutputEntry {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  timestamp: Date
  duration?: string
  file?: string
  project?: string
}

export interface TerminalSession {
  id: string
  name: string
  isActive: boolean
}

interface BottomPanelProps {
  outputEntries?: OutputEntry[]
  terminalSessions?: TerminalSession[]
  activeTerminalId?: string
  onNewTerminal?: () => void
  onCloseTerminal?: (id: string) => void
  onSelectTerminal?: (id: string) => void
  onClearOutput?: () => void
  onToggleMaximize?: () => void
  isMaximized?: boolean
  className?: string
  // Controlled mode props
  activeTab?: string
  onActiveTabChange?: (tab: string) => void
}

// ============================================
// Output Entry Component
// ============================================

function OutputEntryItem({ entry }: { entry: OutputEntry }) {
  const statusIcon = {
    success: (
      <CheckCircle size={14} className="text-[var(--color-success-500)]" />
    ),
    error: <AlertCircle size={14} className="text-[var(--color-error-500)]" />,
    warning: (
      <AlertCircle size={14} className="text-[var(--color-warning-500)]" />
    ),
    info: <Clock size={14} className="text-[var(--color-info-500)]" />,
  }

  const statusBg = {
    success: 'bg-[var(--color-success-500)]/10 text-[var(--color-success-500)]',
    error: 'bg-[var(--color-error-500)]/10 text-[var(--color-error-500)]',
    warning: 'bg-[var(--color-warning-500)]/10 text-[var(--color-warning-500)]',
    info: 'bg-[var(--color-info-500)]/10 text-[var(--color-info-500)]',
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <div className="group flex items-start gap-3 rounded-md px-2 py-2 hover:bg-[var(--interactive-hover)]">
      <span
        className={cn(
          'flex h-5 items-center rounded px-1.5 text-xs',
          statusBg[entry.type]
        )}
      >
        {statusIcon[entry.type]}
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
          {entry.project && (
            <>
              <span>{entry.project}</span>
              <ChevronRight size={10} />
            </>
          )}
          {entry.file && <span>{entry.file}</span>}
          {entry.duration && (
            <span className="ml-2 text-[var(--text-muted)]">
              {entry.duration} on {formatTime(entry.timestamp)},{' '}
              {formatDate(entry.timestamp)}
            </span>
          )}
        </div>
        <div className="font-mono text-sm text-[var(--text-primary)]">
          {entry.message}
        </div>
      </div>
    </div>
  )
}

// ============================================
// Terminal Tab Component
// ============================================

interface TerminalTabProps {
  session: TerminalSession
  isActive: boolean
  onSelect: () => void
  onClose: () => void
}

function TerminalTab({
  session,
  isActive,
  onSelect,
  onClose,
}: TerminalTabProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'group flex h-7 items-center gap-1.5 rounded-md px-2 text-xs',
        'transition-colors duration-150',
        isActive
          ? 'bg-[var(--interactive-hover)] text-[var(--text-primary)]'
          : 'text-[var(--text-tertiary)] hover:bg-[var(--interactive-hover)] hover:text-[var(--text-secondary)]'
      )}
    >
      <Terminal size={14} />
      <span>{session.name}</span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className={cn(
          'ml-1 rounded p-0.5',
          'opacity-0 group-hover:opacity-100',
          'hover:bg-[var(--interactive-active)]',
          'transition-opacity duration-150'
        )}
      >
        <X size={10} />
      </button>
    </button>
  )
}

// ============================================
// Terminal Content Component
// ============================================

function TerminalContent() {
  return (
    <div className="flex h-full flex-col font-mono text-sm">
      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-1">
          <div className="flex">
            <span className="text-[var(--color-success-500)]">
              user@editorx
            </span>
            <span className="text-[var(--text-muted)]">:</span>
            <span className="text-[var(--color-info-500)]">~/project</span>
            <span className="text-[var(--text-muted)]">$</span>
            <span className="ml-2 text-[var(--text-primary)]">
              python palindrome.py
            </span>
          </div>
          <div className="text-[var(--text-secondary)]">True</div>
          <div className="text-[var(--text-secondary)]">False</div>
          <div className="flex items-center">
            <span className="text-[var(--color-success-500)]">
              user@editorx
            </span>
            <span className="text-[var(--text-muted)]">:</span>
            <span className="text-[var(--color-info-500)]">~/project</span>
            <span className="text-[var(--text-muted)]">$</span>
            <span className="ml-2 animate-pulse text-[var(--text-primary)]">
              _
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Bottom Panel Component
// ============================================

export function BottomPanel({
  outputEntries = [],
  terminalSessions = [{ id: 'term-1', name: 'Terminal', isActive: true }],
  activeTerminalId = 'term-1',
  onNewTerminal,
  onCloseTerminal,
  onSelectTerminal,
  onClearOutput,
  onToggleMaximize,
  isMaximized = false,
  className,
  activeTab: controlledActiveTab,
  onActiveTabChange,
}: BottomPanelProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<string>('output')

  // Support both controlled and uncontrolled modes
  const isControlled = controlledActiveTab !== undefined
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab
  const setActiveTab = (tab: string) => {
    if (isControlled) {
      onActiveTabChange?.(tab)
    } else {
      setInternalActiveTab(tab)
    }
  }

  // Default output entries for demo
  const defaultEntries: OutputEntry[] =
    outputEntries.length > 0
      ? outputEntries
      : [
          {
            id: '1',
            type: 'success',
            message: 'True\nFalse',
            timestamp: new Date(),
            duration: '54ms',
            project: 'My Code',
            file: 'palindrome.py',
          },
        ]

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex h-full flex-col"
      >
        {/* Header */}
        <div className="flex h-9 items-center justify-between border-b border-[var(--border-default)] px-2">
          <div className="flex items-center gap-1">
            <TabsList className="h-7 gap-1 bg-transparent p-0">
              <TabsTrigger
                value="output"
                className={cn(
                  'h-7 gap-1.5 rounded-md px-2 text-xs',
                  'data-[state=active]:bg-[var(--interactive-hover)]'
                )}
              >
                <Play size={14} />
                Output
              </TabsTrigger>
              <TabsTrigger
                value="terminal"
                className={cn(
                  'h-7 gap-1.5 rounded-md px-2 text-xs',
                  'data-[state=active]:bg-[var(--interactive-hover)]'
                )}
              >
                <Terminal size={14} />
                Terminal
              </TabsTrigger>
            </TabsList>

            {/* Terminal sessions (when terminal tab is active) */}
            {activeTab === 'terminal' && (
              <div className="ml-2 flex items-center gap-1 border-l border-[var(--border-default)] pl-2">
                {terminalSessions.map((session) => (
                  <TerminalTab
                    key={session.id}
                    session={session}
                    isActive={session.id === activeTerminalId}
                    onSelect={() => onSelectTerminal?.(session.id)}
                    onClose={() => onCloseTerminal?.(session.id)}
                  />
                ))}
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={onNewTerminal}
                  title="New Terminal"
                >
                  <Plus size={14} />
                </Button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            {activeTab === 'output' && (
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={onClearOutput}
                title="Clear Output"
              >
                <Trash size={14} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onToggleMaximize}
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </Button>
          </div>
        </div>

        {/* Content */}
        <TabsContent value="output" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-2">
              {defaultEntries.map((entry) => (
                <OutputEntryItem key={entry.id} entry={entry} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="terminal" className="mt-0 flex-1 overflow-hidden">
          <TerminalContent />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default BottomPanel
