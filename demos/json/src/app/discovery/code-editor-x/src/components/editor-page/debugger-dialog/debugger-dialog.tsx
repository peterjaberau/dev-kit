"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog'
import { Button } from '../../ui/button'
import { ScrollArea } from '../../ui/scroll-area'
import { Bug, Circle, AlertCircle } from '../../ui/icons'
import { cn } from '../../../lib/utils'

// ============================================
// Types
// ============================================

interface DebuggerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface MockBreakpoint {
  id: string
  file: string
  line: number
  enabled: boolean
}

interface MockVariable {
  name: string
  value: string
  type: string
}

interface MockStackFrame {
  id: string
  name: string
  file: string
  line: number
}

// ============================================
// Mock Data
// ============================================

const mockBreakpoints: MockBreakpoint[] = [
  { id: '1', file: 'index.ts', line: 42, enabled: true },
  { id: '2', file: 'utils.ts', line: 15, enabled: true },
  { id: '3', file: 'app.tsx', line: 78, enabled: false },
]

const mockVariables: MockVariable[] = [
  { name: 'count', value: '0', type: 'number' },
  { name: 'isLoading', value: 'true', type: 'boolean' },
  { name: 'items', value: '[]', type: 'Array<Item>' },
  { name: 'user', value: '{ id: 1, name: "..." }', type: 'User' },
]

const mockCallStack: MockStackFrame[] = [
  { id: '1', name: 'handleClick', file: 'button.tsx', line: 23 },
  { id: '2', name: 'processEvent', file: 'events.ts', line: 45 },
  { id: '3', name: 'dispatch', file: 'store.ts', line: 112 },
]

// ============================================
// Section Components
// ============================================

function SectionHeader({ title, count }: { title: string; count?: number }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h4 className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
        {title}
      </h4>
      {count !== undefined && (
        <span className="rounded bg-[var(--interactive-hover)] px-1.5 py-0.5 text-xs text-[var(--text-muted)]">
          {count}
        </span>
      )}
    </div>
  )
}

function BreakpointItem({ breakpoint }: { breakpoint: MockBreakpoint }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded px-2 py-1.5',
        'hover:bg-[var(--interactive-hover)]',
        !breakpoint.enabled && 'opacity-50'
      )}
    >
      <Circle
        size={8}
        className={cn(
          'fill-current',
          breakpoint.enabled
            ? 'text-[var(--color-error-500)]'
            : 'text-[var(--text-muted)]'
        )}
      />
      <span className="flex-1 truncate font-mono text-xs text-[var(--text-primary)]">
        {breakpoint.file}
      </span>
      <span className="text-xs text-[var(--text-muted)]">
        :{breakpoint.line}
      </span>
    </div>
  )
}

function VariableItem({ variable }: { variable: MockVariable }) {
  return (
    <div className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-[var(--interactive-hover)]">
      <span className="font-mono text-xs text-[var(--color-info-500)]">
        {variable.name}
      </span>
      <span className="text-xs text-[var(--text-muted)]">=</span>
      <span className="flex-1 truncate font-mono text-xs text-[var(--text-primary)]">
        {variable.value}
      </span>
      <span className="text-xs text-[var(--text-tertiary)]">
        {variable.type}
      </span>
    </div>
  )
}

function StackFrameItem({ frame }: { frame: MockStackFrame }) {
  return (
    <div className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-[var(--interactive-hover)]">
      <span className="font-mono text-xs text-[var(--color-warning-500)]">
        {frame.name}
      </span>
      <span className="flex-1 truncate text-xs text-[var(--text-muted)]">
        {frame.file}:{frame.line}
      </span>
    </div>
  )
}

// ============================================
// DebuggerDialog Component
// ============================================

export function DebuggerDialog({ open, onOpenChange }: DebuggerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Bug size={20} className="text-[var(--text-secondary)]" />
            <DialogTitle>Debugger</DialogTitle>
          </div>
          <DialogDescription>
            Debug your code with breakpoints, variables inspection, and call
            stack analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="px-3">
          {/* Status Banner */}
          <div className="flex items-center gap-2 rounded-lg border border-[var(--color-warning-500)]/30 bg-[var(--color-warning-500)]/10 px-3 py-2">
            <AlertCircle
              size={16}
              className="text-[var(--color-warning-500)]"
            />
            <span className="text-sm text-[var(--color-warning-500)]">
              Debugger not connected
            </span>
            <Button variant="ghost" size="sm" className="ml-auto" disabled>
              Connect
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Breakpoints */}
              <div>
                <SectionHeader
                  title="Breakpoints"
                  count={mockBreakpoints.length}
                />
                <ScrollArea className="h-32 rounded border border-[var(--border-default)] bg-[var(--bg-base)]">
                  <div className="p-1">
                    {mockBreakpoints.map((bp) => (
                      <BreakpointItem key={bp.id} breakpoint={bp} />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Call Stack */}
              <div>
                <SectionHeader
                  title="Call Stack"
                  count={mockCallStack.length}
                />
                <ScrollArea className="h-32 rounded border border-[var(--border-default)] bg-[var(--bg-base)]">
                  <div className="p-1">
                    {mockCallStack.map((frame) => (
                      <StackFrameItem key={frame.id} frame={frame} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Variables */}
              <SectionHeader title="Variables" count={mockVariables.length} />
              <ScrollArea className="h-[calc(16rem+1.5rem)] rounded border border-[var(--border-default)] bg-[var(--bg-base)]">
                <div className="p-1">
                  {mockVariables.map((variable, index) => (
                    <VariableItem key={index} variable={variable} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)]">
          Full debugger integration coming soon
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default DebuggerDialog
