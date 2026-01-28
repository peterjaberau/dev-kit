"use client"
import {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  type ReactNode,
} from 'react'
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from 'react-resizable-panels'
import { cn } from '../../lib/utils'

export interface EditorShellHandle {
  toggleSidebar: () => void
  toggleBottomPanel: () => void
  toggleRightPanel: () => void
  isSidebarCollapsed: () => boolean
  isBottomPanelCollapsed: () => boolean
  isRightPanelCollapsed: () => boolean
}

interface EditorShellProps {
  header?: ReactNode
  sidebar?: ReactNode
  editor?: ReactNode
  bottomPanel?: ReactNode
  rightPanel?: ReactNode
  className?: string
  onSidebarCollapsedChange?: (collapsed: boolean) => void
  onBottomPanelCollapsedChange?: (collapsed: boolean) => void
  onRightPanelCollapsedChange?: (collapsed: boolean) => void
}

export const EditorShell = forwardRef<EditorShellHandle, EditorShellProps>(
  function EditorShell(
    {
      header,
      sidebar,
      editor,
      bottomPanel,
      rightPanel,
      className,
      onSidebarCollapsedChange,
      onBottomPanelCollapsedChange,
      onRightPanelCollapsedChange,
    },
    ref
  ) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isBottomPanelCollapsed, setIsBottomPanelCollapsed] = useState(false)
    const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false)

    const sidebarPanelRef = useRef<ImperativePanelHandle>(null)
    const bottomPanelRef = useRef<ImperativePanelHandle>(null)
    const rightPanelRef = useRef<ImperativePanelHandle>(null)

    useImperativeHandle(ref, () => ({
      toggleSidebar: () => {
        const panel = sidebarPanelRef.current
        if (panel) {
          if (panel.isCollapsed()) {
            panel.expand()
          } else {
            panel.collapse()
          }
        }
      },
      toggleBottomPanel: () => {
        const panel = bottomPanelRef.current
        if (panel) {
          if (panel.isCollapsed()) {
            panel.expand()
          } else {
            panel.collapse()
          }
        }
      },
      toggleRightPanel: () => {
        const panel = rightPanelRef.current
        if (panel) {
          if (panel.isCollapsed()) {
            panel.expand()
          } else {
            panel.collapse()
          }
        }
      },
      isSidebarCollapsed: () => isSidebarCollapsed,
      isBottomPanelCollapsed: () => isBottomPanelCollapsed,
      isRightPanelCollapsed: () => isRightPanelCollapsed,
    }))

    return (
      <div
        className={cn(
          'flex h-screen w-screen flex-col overflow-hidden',
          'bg-[var(--bg-base)]',
          className
        )}
      >
        {/* Header */}
        {header && (
          <header className="h-12 shrink-0 border-b border-[var(--border-default)]">
            {header}
          </header>
        )}

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          <PanelGroup direction="horizontal" autoSaveId="editor-layout-main">
            {/* Left Sidebar */}
            {sidebar && (
              <>
                <Panel
                  ref={sidebarPanelRef}
                  id="sidebar"
                  order={1}
                  defaultSize={18}
                  minSize={12}
                  maxSize={30}
                  collapsible
                  collapsedSize={0}
                  onCollapse={() => {
                    setIsSidebarCollapsed(true)
                    onSidebarCollapsedChange?.(true)
                  }}
                  onExpand={() => {
                    setIsSidebarCollapsed(false)
                    onSidebarCollapsedChange?.(false)
                  }}
                  className={cn(
                    'border-r border-[var(--border-default)]',
                    isSidebarCollapsed && 'hidden'
                  )}
                >
                  <div className="flex h-full flex-col overflow-hidden bg-[var(--bg-elevated)]">
                    {sidebar}
                  </div>
                </Panel>
                <ResizeHandle />
              </>
            )}

            {/* Center + Right Panel Group */}
            <Panel id="center-right" order={2} defaultSize={82}>
              <PanelGroup
                direction="horizontal"
                autoSaveId="editor-layout-center"
              >
                {/* Center Area (Editor + Bottom Panel) */}
                <Panel
                  id="center"
                  order={1}
                  defaultSize={rightPanel ? 70 : 100}
                >
                  <PanelGroup
                    direction="vertical"
                    autoSaveId="editor-layout-vertical"
                  >
                    {/* Editor Area */}
                    <Panel id="editor" order={1} defaultSize={70} minSize={30}>
                      <div className="flex h-full flex-col overflow-hidden bg-[var(--bg-surface)]">
                        {editor || <EditorPlaceholder />}
                      </div>
                    </Panel>

                    {/* Bottom Panel */}
                    {bottomPanel && (
                      <>
                        <ResizeHandle orientation="horizontal" />
                        <Panel
                          ref={bottomPanelRef}
                          id="bottom-panel"
                          order={2}
                          defaultSize={30}
                          minSize={10}
                          maxSize={50}
                          collapsible
                          collapsedSize={0}
                          onCollapse={() => {
                            setIsBottomPanelCollapsed(true)
                            onBottomPanelCollapsedChange?.(true)
                          }}
                          onExpand={() => {
                            setIsBottomPanelCollapsed(false)
                            onBottomPanelCollapsedChange?.(false)
                          }}
                          className={cn(
                            'border-t border-[var(--border-default)]',
                            isBottomPanelCollapsed && 'hidden'
                          )}
                        >
                          <div className="flex h-full flex-col overflow-hidden bg-[var(--bg-elevated)]">
                            {bottomPanel}
                          </div>
                        </Panel>
                      </>
                    )}
                  </PanelGroup>
                </Panel>

                {/* Right Panel (AI Chat) */}
                {rightPanel && (
                  <>
                    <ResizeHandle />
                    <Panel
                      ref={rightPanelRef}
                      id="right-panel"
                      order={2}
                      defaultSize={30}
                      minSize={20}
                      maxSize={45}
                      collapsible
                      collapsedSize={0}
                      onCollapse={() => {
                        setIsRightPanelCollapsed(true)
                        onRightPanelCollapsedChange?.(true)
                      }}
                      onExpand={() => {
                        setIsRightPanelCollapsed(false)
                        onRightPanelCollapsedChange?.(false)
                      }}
                      className={cn(
                        'border-l border-[var(--border-default)]',
                        isRightPanelCollapsed && 'hidden'
                      )}
                    >
                      <div className="flex h-full flex-col overflow-hidden bg-[var(--bg-elevated)]">
                        {rightPanel}
                      </div>
                    </Panel>
                  </>
                )}
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    )
  }
)

/**
 * Resize Handle Component
 */
interface ResizeHandleProps {
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

function ResizeHandle({
  orientation = 'vertical',
  className,
}: ResizeHandleProps) {
  const isVertical = orientation === 'vertical'

  return (
    <PanelResizeHandle
      className={cn(
        'group relative flex items-center justify-center',
        'transition-colors duration-150',
        'hover:bg-[var(--color-primary-500)]/20',
        'active:bg-[var(--color-primary-500)]/30',
        'data-[resize-handle-active]:bg-[var(--color-primary-500)]/30',
        isVertical ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize',
        className
      )}
    >
      <div
        className={cn(
          'rounded-full bg-[var(--border-strong)] opacity-0 transition-opacity',
          'group-hover:opacity-100 group-active:opacity-100',
          'group-data-[resize-handle-active]:opacity-100',
          isVertical ? 'h-8 w-0.5' : 'h-0.5 w-8'
        )}
      />
    </PanelResizeHandle>
  )
}

/**
 * Placeholder shown when no editor content is provided
 */
function EditorPlaceholder() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium text-[var(--text-secondary)]">
          No file open
        </p>
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">
          Select a file from the sidebar or create a new one
        </p>
      </div>
    </div>
  )
}

export default EditorShell
