"use client"
import { useEffect, useRef, useState, useCallback } from 'react'
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
} from '@codemirror/view'
import { EditorState, Compartment } from '@codemirror/state'
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands'
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldGutter,
  indentOnInput,
} from '@codemirror/language'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { oneDark } from '@codemirror/theme-one-dark'

import { EditorTabs, type EditorTab } from '../editor-tabs'
import { Breadcrumbs, type BreadcrumbItem } from '../breadcrumbs'
import { StatusBar } from '../status-bar'
import { Button } from '../../ui/button'
import { Play, Settings } from '../../ui/icons'
import { cn } from '../../../lib/utils'
import type { FileLanguage } from '../../../types'

// ============================================
// Types
// ============================================

export interface EditorFile {
  id: string
  name: string
  path: string
  content: string
  language: FileLanguage
}

interface EditorPanelProps {
  files?: EditorFile[]
  activeFileId?: string | null
  tabs?: EditorTab[]
  activeTabId?: string | null
  isDarkMode?: boolean
  fontSize?: number
  tabSize?: number
  showLineNumbers?: boolean
  wordWrap?: boolean
  onTabSelect?: (tabId: string) => void
  onTabClose?: (tabId: string) => void
  onNewTab?: () => void
  onContentChange?: (fileId: string, content: string) => void
  onRun?: () => void
  className?: string
}

// ============================================
// Language Extension Factory
// ============================================

function getLanguageExtension(language: FileLanguage) {
  switch (language) {
    case 'javascript':
      return javascript()
    case 'typescript':
      return javascript({ typescript: true })
    case 'html':
      return html()
    case 'css':
      return css()
    case 'json':
      return javascript() // JSON highlighting via JS
    default:
      return []
  }
}

// ============================================
// Custom Theme
// ============================================

const lightTheme = EditorView.theme({
  '&': {
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
  },
  '.cm-content': {
    fontFamily: 'var(--font-mono)',
    caretColor: 'var(--color-primary-500)',
  },
  '.cm-cursor': {
    borderLeftColor: 'var(--color-primary-500)',
    borderLeftWidth: '2px',
  },
  '.cm-activeLine': {
    backgroundColor: 'var(--interactive-hover)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'var(--interactive-hover)',
  },
  '.cm-gutters': {
    backgroundColor: 'var(--bg-elevated)',
    color: 'var(--text-muted)',
    border: 'none',
    borderRight: '1px solid var(--border-default)',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 12px 0 8px',
    minWidth: '40px',
  },
  '.cm-foldGutter .cm-gutterElement': {
    padding: '0 4px',
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: 'var(--color-primary-200) !important',
  },
  '.cm-focused .cm-selectionBackground': {
    backgroundColor: 'var(--color-primary-200) !important',
  },
  '.cm-matchingBracket': {
    backgroundColor: 'var(--color-primary-100)',
    outline: '1px solid var(--color-primary-400)',
  },
  '.cm-scroller': {
    fontFamily: 'var(--font-mono)',
    lineHeight: '1.6',
  },
})

const darkTheme = EditorView.theme({
  '&': {
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
  },
  '.cm-content': {
    fontFamily: 'var(--font-mono)',
    caretColor: 'var(--color-primary-400)',
  },
  '.cm-cursor': {
    borderLeftColor: 'var(--color-primary-400)',
    borderLeftWidth: '2px',
  },
  '.cm-activeLine': {
    backgroundColor: 'var(--interactive-hover)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'var(--interactive-hover)',
  },
  '.cm-gutters': {
    backgroundColor: 'var(--bg-elevated)',
    color: 'var(--text-muted)',
    border: 'none',
    borderRight: '1px solid var(--border-default)',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 12px 0 8px',
    minWidth: '40px',
  },
  '.cm-foldGutter .cm-gutterElement': {
    padding: '0 4px',
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: 'rgba(168, 85, 247, 0.3) !important',
  },
  '.cm-focused .cm-selectionBackground': {
    backgroundColor: 'rgba(168, 85, 247, 0.3) !important',
  },
  '.cm-matchingBracket': {
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    outline: '1px solid var(--color-primary-500)',
  },
  '.cm-scroller': {
    fontFamily: 'var(--font-mono)',
    lineHeight: '1.6',
  },
})

// ============================================
// Editor Panel Component
// ============================================

export function EditorPanel({
  files = [],
  activeFileId,
  tabs = [],
  activeTabId,
  isDarkMode = true,
  fontSize = 14,
  tabSize = 2,
  showLineNumbers = true,
  wordWrap = false,
  onTabSelect,
  onTabClose,
  onNewTab,
  onContentChange,
  onRun,
  className,
}: EditorPanelProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })

  // Compartments for dynamic reconfiguration
  const languageCompartment = useRef(new Compartment())
  const themeCompartment = useRef(new Compartment())
  const fontSizeCompartment = useRef(new Compartment())

  // Get active file
  const activeFile = files.find((f) => f.id === activeFileId)

  // Build breadcrumb items from file path
  const breadcrumbItems: BreadcrumbItem[] = activeFile
    ? activeFile.path.split('/').map((segment, index, arr) => ({
        id: `${index}`,
        label: segment,
        type: index === arr.length - 1 ? 'file' : 'folder',
        language: index === arr.length - 1 ? activeFile.language : undefined,
      }))
    : []

  // Handle cursor position updates
  const handleCursorChange = useCallback(
    (view: EditorView) => {
      const { main } = view.state.selection
      const line = view.state.doc.lineAt(main.head)
      setCursorPosition({
        line: line.number,
        column: main.head - line.from + 1,
      })
    },
    [setCursorPosition]
  )

  // Initialize editor
  useEffect(() => {
    if (!editorRef.current || !activeFile) return

    // Destroy previous instance
    if (viewRef.current) {
      viewRef.current.destroy()
      viewRef.current = null
    }

    const extensions = [
      // Basic setup
      history(),
      bracketMatching(),
      indentOnInput(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      foldGutter(),

      // Keymaps
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),

      // Line numbers (conditional)
      ...(showLineNumbers ? [lineNumbers()] : []),

      // Word wrap (conditional)
      ...(wordWrap ? [EditorView.lineWrapping] : []),

      // Theme compartment
      themeCompartment.current.of(
        isDarkMode
          ? [oneDark, darkTheme]
          : [syntaxHighlighting(defaultHighlightStyle), lightTheme]
      ),

      // Language compartment
      languageCompartment.current.of(getLanguageExtension(activeFile.language)),

      // Font size compartment
      fontSizeCompartment.current.of(
        EditorView.theme({
          '.cm-content, .cm-gutters': {
            fontSize: `${fontSize}px`,
          },
        })
      ),

      // Tab size configuration
      EditorState.tabSize.of(tabSize),

      // Update listener for content changes and cursor position
      EditorView.updateListener.of((update) => {
        if (update.docChanged && onContentChange && activeFile) {
          onContentChange(activeFile.id, update.state.doc.toString())
        }
        if (update.selectionSet) {
          handleCursorChange(update.view)
        }
      }),
    ]

    const state = EditorState.create({
      doc: activeFile.content,
      extensions,
    })

    const view = new EditorView({
      state,
      parent: editorRef.current,
    })

    viewRef.current = view

    // Initial cursor position
    handleCursorChange(view)

    return () => {
      view.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFile?.id]) // Only recreate when file changes

  // Update theme dynamically
  useEffect(() => {
    if (!viewRef.current) return
    viewRef.current.dispatch({
      effects: themeCompartment.current.reconfigure(
        isDarkMode
          ? [oneDark, darkTheme]
          : [syntaxHighlighting(defaultHighlightStyle), lightTheme]
      ),
    })
  }, [isDarkMode])

  // Update font size dynamically
  useEffect(() => {
    if (!viewRef.current) return
    viewRef.current.dispatch({
      effects: fontSizeCompartment.current.reconfigure(
        EditorView.theme({
          '.cm-content, .cm-gutters': {
            fontSize: `${fontSize}px`,
          },
        })
      ),
    })
  }, [fontSize])

  // Update language dynamically
  useEffect(() => {
    if (!viewRef.current || !activeFile) return
    viewRef.current.dispatch({
      effects: languageCompartment.current.reconfigure(
        getLanguageExtension(activeFile.language)
      ),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFile?.language])

  // Empty state
  if (!activeFile) {
    return (
      <div className={cn('flex h-full flex-col', className)}>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-[var(--text-secondary)]">No file open</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Select a file from the sidebar to start editing
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Tab bar */}
      <EditorTabs
        tabs={tabs}
        activeTabId={activeTabId ?? null}
        onTabSelect={(id) => onTabSelect?.(id)}
        onTabClose={(id) => onTabClose?.(id)}
        onNewTab={onNewTab}
      />

      {/* Toolbar with breadcrumbs and actions */}
      <div className="flex h-9 items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-elevated)] px-3">
        <Breadcrumbs
          items={breadcrumbItems}
          className="text-[var(--text-tertiary)]"
        />
        <div className="flex items-center gap-2">
          <Button variant="accent" size="sm" onClick={onRun}>
            <Play size={12} />
            Run
          </Button>
          <Button variant="ghost" size="icon-sm">
            <Settings size={14} />
          </Button>
        </div>
      </div>

      {/* CodeMirror editor */}
      <div
        ref={editorRef}
        className="[&_.cm-scroller]:scrollbar-thin flex-1 overflow-hidden [&_.cm-editor]:h-full [&_.cm-editor]:outline-none [&_.cm-scroller]:overflow-auto"
      />

      {/* Status bar */}
      <StatusBar
        line={cursorPosition.line}
        column={cursorPosition.column}
        language={activeFile.language}
        tabSize={tabSize}
        gitBranch="main"
        problems={{ errors: 0, warnings: 0 }}
      />
    </div>
  )
}

export default EditorPanel
