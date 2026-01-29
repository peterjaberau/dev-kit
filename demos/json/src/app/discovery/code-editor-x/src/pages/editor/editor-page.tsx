"use client"
import { useState, useCallback, useRef, useEffect } from 'react'
import { useParams } from "next/navigation"
import { useTheme } from '../../lib/theme-provider'
import { useSettings } from '../../lib/settings-provider'
import { useProject, type FileTreeItem } from '../../lib/project-provider'
import { EditorShell, type EditorShellHandle } from '../../components/layout'
import {
  Header,
  Sidebar,
  EditorPanel,
  BottomPanel,
  AIChatPanel,
  NewFileDialog,
  NewFolderDialog,
  IntegrationDialog,
  NotesDialog,
  DebuggerDialog,
  type EditorTab,
  type EditorFile,
} from '../../components/editor-page'

// ============================================
// Editor Page Component
// ============================================

function EditorPageContent() {
  const { projectId } = useParams<{ projectId: string }>()
  const { resolvedTheme } = useTheme()
  const { settings } = useSettings()
  const {
    currentProject,
    selectProject,
    isLoading,
    getFileTree,
    getFileById,
    updateFileContent,
  } = useProject()

  const editorShellRef = useRef<EditorShellHandle>(null)
  const [selectedFileId, setSelectedFileId] = useState<string>('')
  const [activeWidget, setActiveWidget] = useState<string>('ai-chat')

  // Panel collapsed state (synced with EditorShell)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isBottomPanelCollapsed, setIsBottomPanelCollapsed] = useState(false)
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false)
  const [openTabs, setOpenTabs] = useState<EditorTab[]>([])
  const [activeTabId, setActiveTabId] = useState<string>('')

  // Bottom panel controlled tab state
  const [bottomPanelActiveTab, setBottomPanelActiveTab] = useState('output')

  // Dialog states
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false)
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false)
  const [isDebuggerDialogOpen, setIsDebuggerDialogOpen] = useState(false)
  const [isIntegrationDialogOpen, setIsIntegrationDialogOpen] = useState(false)

  // Auto-save debounce timer
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Track which project we've initialized tabs for
  const initializedProjectRef = useRef<string | null>(null)

  // Initialize tabs for a project
  const initializeProjectTabs = useCallback(() => {
    // Helper to find first file in tree
    function findFirstFile(items: FileTreeItem[]): FileTreeItem | undefined {
      for (const item of items) {
        if (item.type === 'file') return item
        if (item.children) {
          const found = findFirstFile(item.children)
          if (found) return found
        }
      }
      return undefined
    }

    const fileTree = getFileTree()
    const firstFile = findFirstFile(fileTree)
    if (firstFile) {
      const file = getFileById(firstFile.id)
      if (file) {
        const newTab: EditorTab = {
          id: `tab-${Date.now()}`,
          fileId: file.id,
          fileName: file.name,
          filePath: file.path,
          language: file.language,
          isDirty: false,
        }
        setOpenTabs([newTab])
        setActiveTabId(newTab.id)
        setSelectedFileId(file.id)
      }
    }
  }, [getFileTree, getFileById])

  // Load project when projectId changes and initialize tabs
  useEffect(() => {
    if (projectId && projectId !== initializedProjectRef.current) {
      selectProject(projectId).then(() => {
        // Initialize tabs after project is loaded
        initializedProjectRef.current = projectId
        initializeProjectTabs()
      })
    }
  }, [projectId, selectProject, initializeProjectTabs])

  const handleFileSelect = useCallback(
    (item: FileTreeItem) => {
      if (item.type === 'file') {
        setSelectedFileId(item.id)

        // Check if tab already exists
        const existingTab = openTabs.find((tab) => tab.fileId === item.id)
        if (existingTab) {
          setActiveTabId(existingTab.id)
        } else {
          const file = getFileById(item.id)
          if (file) {
            // Create new tab
            const newTab: EditorTab = {
              id: `tab-${Date.now()}`,
              fileId: item.id,
              fileName: file.name,
              filePath: file.path,
              language: file.language,
              isDirty: false,
            }
            setOpenTabs((prev) => [...prev, newTab])
            setActiveTabId(newTab.id)
          }
        }
      }
    },
    [openTabs, getFileById]
  )

  const handleTabSelect = useCallback(
    (tabId: string) => {
      setActiveTabId(tabId)
      const tab = openTabs.find((t) => t.id === tabId)
      if (tab) {
        setSelectedFileId(tab.fileId)
      }
    },
    [openTabs]
  )

  const handleTabClose = useCallback(
    (tabId: string) => {
      setOpenTabs((prev) => {
        const filtered: any = prev.filter((t) => t.id !== tabId)
        if (activeTabId === tabId && filtered.length > 0) {
          setActiveTabId(filtered[filtered.length - 1].id)
          setSelectedFileId(filtered[filtered.length - 1].fileId)
        } else if (filtered.length === 0) {
          setActiveTabId('')
          setSelectedFileId('')
        }
        return filtered
      })
    },
    [activeTabId]
  )

  const handleContentChange = useCallback(
    (fileId: string, content: string) => {
      // Mark tab as dirty
      setOpenTabs((prev) =>
        prev.map((tab) =>
          tab.fileId === fileId ? { ...tab, isDirty: true } : tab
        )
      )

      // Auto-save with debounce if enabled
      if (settings.autoSave) {
        if (autoSaveTimerRef.current) {
          clearTimeout(autoSaveTimerRef.current)
        }

        autoSaveTimerRef.current = setTimeout(async () => {
          try {
            await updateFileContent(fileId, content)
            // Mark tab as clean after save
            setOpenTabs((prev) =>
              prev.map((tab) =>
                tab.fileId === fileId ? { ...tab, isDirty: false } : tab
              )
            )
          } catch (error) {
            console.error('Failed to auto-save:', error)
          }
        }, settings.autoSaveDelay)
      }
    },
    [settings.autoSave, settings.autoSaveDelay, updateFileContent]
  )

  const handleRun = useCallback(() => {
    console.log('Running code...')
  }, [])

  // Handle widget click actions
  const handleWidgetClick = useCallback(
    (widgetId: string) => {
      setActiveWidget(widgetId)

      switch (widgetId) {
        case 'ai-chat':
          if (isRightPanelCollapsed) {
            editorShellRef.current?.toggleRightPanel()
          }
          break
        case 'output':
          if (isBottomPanelCollapsed) {
            editorShellRef.current?.toggleBottomPanel()
          }
          setBottomPanelActiveTab('output')
          break
        case 'terminal':
          if (isBottomPanelCollapsed) {
            editorShellRef.current?.toggleBottomPanel()
          }
          setBottomPanelActiveTab('terminal')
          break
        case 'notes':
          setIsNotesDialogOpen(true)
          break
        case 'debugger':
          setIsDebuggerDialogOpen(true)
          break
        case 'integration':
          setIsIntegrationDialogOpen(true)
          break
      }
    },
    [isRightPanelCollapsed, isBottomPanelCollapsed]
  )

  // Handle new file creation
  const handleNewFile = useCallback(() => {
    setIsNewFileDialogOpen(true)
  }, [])

  // Handle new folder creation
  const handleNewFolder = useCallback(() => {
    setIsNewFolderDialogOpen(true)
  }, [])

  // Handle file created - open it in a new tab
  const handleFileCreated = useCallback(
    (fileId: string) => {
      const file = getFileById(fileId)
      if (file) {
        const newTab: EditorTab = {
          id: `tab-${Date.now()}`,
          fileId: file.id,
          fileName: file.name,
          filePath: file.path,
          language: file.language,
          isDirty: false,
        }
        setOpenTabs((prev) => [...prev, newTab])
        setActiveTabId(newTab.id)
        setSelectedFileId(file.id)
      }
    },
    [getFileById]
  )

  // Build files array for EditorPanel from open tabs
  const openFiles: EditorFile[] = openTabs
    .map((tab) => {
      const file = getFileById(tab.fileId)
      if (!file) return null
      return {
        id: file.id,
        name: file.name,
        path: file.path,
        content: file.content,
        language: file.language,
      }
    })
    .filter((f): f is EditorFile => f !== null)

  const handleToggleSidebar = useCallback(() => {
    editorShellRef.current?.toggleSidebar()
  }, [])

  const handleToggleBottomPanel = useCallback(() => {
    editorShellRef.current?.toggleBottomPanel()
  }, [])

  const handleToggleRightPanel = useCallback(() => {
    editorShellRef.current?.toggleRightPanel()
  }, [])

  // Get file tree from project
  const fileTree = getFileTree()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--bg-base)]">
        <div className="text-[var(--text-secondary)]">Loading project...</div>
      </div>
    )
  }


  console.log("----editor-page---Content----", {
    projectId: projectId,
    settings: settings,
    currentProject: currentProject,
    isLoading: isLoading,
    selectedFileId,
    activeWidget,
    isSidebarCollapsed,
    isBottomPanelCollapsed,
    isRightPanelCollapsed,
    openTabs,
    activeTabId,
    bottomPanelActiveTab,
    isNewFileDialogOpen,
    isNewFolderDialogOpen,
    isNotesDialogOpen,
    isDebuggerDialogOpen,
    isIntegrationDialogOpen,
    openFiles,
    fileTree,
  })

  return (
    <>
      <EditorShell
        ref={editorShellRef}
        header={
          <Header
            projectName={currentProject?.name ?? 'Untitled Project'}
            onToggleSidebar={handleToggleSidebar}
            onToggleBottomPanel={handleToggleBottomPanel}
            onToggleRightPanel={handleToggleRightPanel}
            isSidebarCollapsed={isSidebarCollapsed}
            isBottomPanelCollapsed={isBottomPanelCollapsed}
            isRightPanelCollapsed={isRightPanelCollapsed}
          />
        }
        sidebar={
          <Sidebar
            files={fileTree}
            selectedFileId={selectedFileId}
            onFileSelect={handleFileSelect}
            activeWidget={activeWidget}
            onWidgetClick={handleWidgetClick}
            onNewFile={handleNewFile}
            onNewFolder={handleNewFolder}
          />
        }
        editor={
          <EditorPanel
            files={openFiles}
            activeFileId={selectedFileId}
            tabs={openTabs}
            activeTabId={activeTabId}
            isDarkMode={resolvedTheme === 'dark'}
            fontSize={settings.fontSize}
            tabSize={settings.tabSize}
            showLineNumbers={settings.lineNumbers}
            wordWrap={settings.wordWrap}
            onTabSelect={handleTabSelect}
            onTabClose={handleTabClose}
            onContentChange={handleContentChange}
            onRun={handleRun}
          />
        }
        bottomPanel={
          <BottomPanel
            activeTab={bottomPanelActiveTab}
            onActiveTabChange={setBottomPanelActiveTab}
          />
        }
        rightPanel={<AIChatPanel />}
        onSidebarCollapsedChange={setIsSidebarCollapsed}
        onBottomPanelCollapsedChange={setIsBottomPanelCollapsed}
        onRightPanelCollapsedChange={setIsRightPanelCollapsed}
      />

      {/* Dialogs */}
      <NewFileDialog
        open={isNewFileDialogOpen}
        onOpenChange={setIsNewFileDialogOpen}
        onFileCreated={handleFileCreated}
      />
      <NewFolderDialog
        open={isNewFolderDialogOpen}
        onOpenChange={setIsNewFolderDialogOpen}
      />
      <NotesDialog
        open={isNotesDialogOpen}
        onOpenChange={setIsNotesDialogOpen}
      />
      <DebuggerDialog
        open={isDebuggerDialogOpen}
        onOpenChange={setIsDebuggerDialogOpen}
      />
      <IntegrationDialog
        open={isIntegrationDialogOpen}
        onOpenChange={setIsIntegrationDialogOpen}
      />
    </>
  )
}

export function EditorPage() {
  return <EditorPageContent />
}
