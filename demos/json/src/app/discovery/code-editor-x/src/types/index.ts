/**
 * Core type definitions for EditorX
 */

// ============================================
// File System Types
// ============================================

export type FileLanguage =
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'
  | 'json'
  | 'markdown'
  | 'python'
  | 'rust'
  | 'go'
  | 'plaintext'

export interface FileNode {
  id: string
  name: string
  path: string
  type: 'file'
  language: FileLanguage
  content: string
  parentId: string | null
}

export interface FolderNode {
  id: string
  name: string
  path: string
  type: 'folder'
  parentId: string | null
  isExpanded?: boolean
}

export type FileSystemNode = FileNode | FolderNode

export interface Project {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  rootFolderId: string
  nodes: Record<string, FileSystemNode>
}

// ============================================
// Editor Types
// ============================================

export interface EditorTab {
  id: string
  fileId: string
  fileName: string
  filePath: string
  isDirty: boolean
  isPinned?: boolean
}

export type LayoutMode =
  | 'single'
  | 'vertical-split'
  | 'horizontal-split'
  | 'grid'

export interface EditorPane {
  id: string
  activeTabId: string | null
  tabIds: string[]
}

export interface EditorSettings {
  theme: 'light' | 'dark' | 'system'
  fontSize: number
  fontFamily: string
  tabSize: number
  lineNumbers: boolean
  wordWrap: boolean
  minimap: boolean
  bracketPairColorization: boolean
  autoSave: boolean
  autoSaveDelay: number
}

// ============================================
// Panel Types
// ============================================

export type PanelId =
  | 'files'
  | 'search'
  | 'git'
  | 'extensions'
  | 'ai-chat'
  | 'output'
  | 'terminal'
  | 'problems'
  | 'debug'

export interface Panel {
  id: PanelId
  title: string
  icon: string
  isVisible: boolean
  position: 'left' | 'right' | 'bottom'
}

export interface SidebarWidget {
  id: string
  title: string
  icon: string
  isCollapsed: boolean
}

// ============================================
// UI State Types
// ============================================

export interface CommandPaletteItem {
  id: string
  label: string
  description?: string
  shortcut?: string
  icon?: string
  action: () => void
}

export interface BreadcrumbItem {
  id: string
  label: string
  path: string
  isFile?: boolean
}

export interface ContextMenuItem {
  id: string
  label: string
  icon?: string
  shortcut?: string
  disabled?: boolean
  separator?: boolean
  children?: ContextMenuItem[]
  action?: () => void
}

// ============================================
// Terminal Types
// ============================================

export interface TerminalSession {
  id: string
  name: string
  cwd: string
  isActive: boolean
}

export interface TerminalOutput {
  id: string
  sessionId: string
  type: 'input' | 'output' | 'error'
  content: string
  timestamp: Date
}

// ============================================
// AI Chat Types
// ============================================

export type MessageRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  codeBlocks?: CodeBlock[]
  isStreaming?: boolean
}

export interface CodeBlock {
  id: string
  language: FileLanguage
  code: string
  fileName?: string
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

// ============================================
// Application State Types
// ============================================

export interface AppState {
  // Projects
  projects: Project[]
  currentProjectId: string | null

  // Editor
  tabs: EditorTab[]
  activeTabId: string | null
  layoutMode: LayoutMode
  panes: EditorPane[]

  // Panels
  panels: Panel[]
  activeSidebarPanel: PanelId | null
  activeBottomPanel: PanelId | null
  isSidebarCollapsed: boolean
  isBottomPanelCollapsed: boolean
  isRightPanelCollapsed: boolean

  // Settings
  settings: EditorSettings

  // UI State
  isCommandPaletteOpen: boolean
  theme: 'light' | 'dark'
}

// ============================================
// Action Types (for state management)
// ============================================

export type AppAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_CURRENT_PROJECT'; payload: string | null }
  | { type: 'OPEN_FILE'; payload: { fileId: string; paneId?: string } }
  | { type: 'CLOSE_TAB'; payload: { tabId: string } }
  | { type: 'SET_ACTIVE_TAB'; payload: { tabId: string } }
  | {
      type: 'UPDATE_FILE_CONTENT'
      payload: { fileId: string; content: string }
    }
  | { type: 'SET_LAYOUT_MODE'; payload: LayoutMode }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_BOTTOM_PANEL' }
  | { type: 'TOGGLE_RIGHT_PANEL' }
  | { type: 'SET_ACTIVE_SIDEBAR_PANEL'; payload: PanelId | null }
  | { type: 'SET_ACTIVE_BOTTOM_PANEL'; payload: PanelId | null }
  | { type: 'TOGGLE_COMMAND_PALETTE' }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<EditorSettings> }

// ============================================
// Utility Types
// ============================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>
