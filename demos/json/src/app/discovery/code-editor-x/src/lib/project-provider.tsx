'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  Project,
  FileSystemNode,
  FileNode,
  FolderNode,
  FileLanguage,
} from '../types'
import type { ProjectTemplate } from './project-templates'
import {
  getAllProjects,
  getProject,
  saveProject,
  deleteProject as deleteProjectFromDb,
  checkAndRunMigrations,
} from './storage'

// Helper type for file tree rendering
export interface FileTreeItem {
  id: string
  name: string
  type: 'file' | 'folder'
  language?: FileLanguage
  children?: FileTreeItem[]
}

interface ProjectContextValue {
  // State
  projects: Project[]
  currentProject: Project | null
  isLoading: boolean
  error: string | null

  // Project operations
  loadProjects: () => Promise<void>
  selectProject: (id: string) => Promise<void>
  createProject: (name: string, description?: string) => Promise<Project>
  createProjectFromTemplate: (
    name: string,
    template: ProjectTemplate
  ) => Promise<Project>
  deleteProject: (id: string) => Promise<void>

  // File operations
  createFile: (
    parentId: string | null,
    name: string,
    language: FileLanguage
  ) => Promise<FileNode>
  createFolder: (parentId: string | null, name: string) => Promise<FolderNode>
  updateFileContent: (fileId: string, content: string) => Promise<void>
  renameNode: (nodeId: string, newName: string) => Promise<void>
  deleteNode: (nodeId: string) => Promise<void>

  // Helpers
  getFileTree: () => FileTreeItem[]
  getFileById: (fileId: string) => FileNode | undefined
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined)

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function getLanguageFromFileName(fileName: string): FileLanguage {
  const ext = fileName.split('.').pop()?.toLowerCase()
  const languageMap: Record<string, FileLanguage> = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    html: 'html',
    htm: 'html',
    css: 'css',
    json: 'json',
    md: 'markdown',
    markdown: 'markdown',
    py: 'python',
    rs: 'rust',
    go: 'go',
  }
  return languageMap[ext || ''] || 'plaintext'
}

function buildPath(
  parentId: string | null,
  name: string,
  nodes: Record<string, FileSystemNode>
): string {
  if (!parentId) {
    return `/${name}`
  }

  const parent = nodes[parentId]
  if (parent) {
    return `${parent.path}/${name}`
  }

  return `/${name}`
}

interface ProjectProviderProps {
  children: ReactNode
}

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize and load projects on mount
  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true)
        await checkAndRunMigrations()
        const loadedProjects = await getAllProjects()
        setProjects(loadedProjects)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [])

  const loadProjects = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const loadedProjects = await getAllProjects()
      setProjects(loadedProjects)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const selectProject = useCallback(async (id: string) => {
    try {
      setError(null)
      const project = await getProject(id)
      if (project) {
        setCurrentProject(project)
      } else {
        setError('Project not found')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project')
    }
  }, [])

  const createProject = useCallback(
    async (name: string, description?: string): Promise<Project> => {
      const now = new Date()
      const projectId = generateId()

      const project: Project = {
        id: projectId,
        name,
        description,
        createdAt: now,
        updatedAt: now,
        rootFolderId: projectId,
        nodes: {},
      }

      await saveProject(project)
      setProjects((prev) => [...prev, project])
      return project
    },
    []
  )

  const createProjectFromTemplate = useCallback(
    async (name: string, template: ProjectTemplate): Promise<Project> => {
      const now = new Date()
      const projectId = generateId()

      // Build nodes from template
      const nodes: Record<string, FileSystemNode> = {}

      // Map of template paths to generated IDs for parent reference
      const pathToId: Record<string, string> = {}

      // Create folders first
      for (const folder of template.folders) {
        const folderId = generateId()
        pathToId[folder.path] = folderId

        // Find parent folder ID
        let parentId: string | null = null
        if (folder.parentPath) {
          parentId = pathToId[folder.parentPath] || null
        }

        const folderNode: FolderNode = {
          id: folderId,
          name: folder.name,
          path: folder.path,
          type: 'folder',
          parentId,
          isExpanded: true,
        }
        nodes[folderId] = folderNode
      }

      // Create files
      for (const file of template.files) {
        const fileId = generateId()

        // Find parent folder ID
        let parentId: string | null = null
        if (file.parentPath) {
          parentId = pathToId[file.parentPath] || null
        }

        const fileNode: FileNode = {
          id: fileId,
          name: file.name,
          path: file.path,
          type: 'file',
          language: file.language,
          content: file.content,
          parentId,
        }
        nodes[fileId] = fileNode
      }

      const project: Project = {
        id: projectId,
        name,
        description: template.description,
        createdAt: now,
        updatedAt: now,
        rootFolderId: projectId,
        nodes,
      }

      await saveProject(project)
      setProjects((prev) => [...prev, project])
      return project
    },
    []
  )

  const deleteProjectById = useCallback(async (id: string) => {
    await deleteProjectFromDb(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setCurrentProject((prev) => (prev?.id === id ? null : prev))
  }, [])

  const createFile = useCallback(
    async (
      parentId: string | null,
      name: string,
      language: FileLanguage
    ): Promise<FileNode> => {
      if (!currentProject) {
        throw new Error('No project selected')
      }

      const fileId = generateId()
      const path = buildPath(parentId, name, currentProject.nodes)

      const file: FileNode = {
        id: fileId,
        name,
        path,
        type: 'file',
        language: language || getLanguageFromFileName(name),
        content: '',
        parentId,
      }

      const updatedNodes = { ...currentProject.nodes, [fileId]: file }
      const updatedProject: Project = {
        ...currentProject,
        nodes: updatedNodes,
        updatedAt: new Date(),
      }

      await saveProject(updatedProject)
      setCurrentProject(updatedProject)
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      )

      return file
    },
    [currentProject]
  )

  const createFolder = useCallback(
    async (parentId: string | null, name: string): Promise<FolderNode> => {
      if (!currentProject) {
        throw new Error('No project selected')
      }

      const folderId = generateId()
      const path = buildPath(parentId, name, currentProject.nodes)

      const folder: FolderNode = {
        id: folderId,
        name,
        path,
        type: 'folder',
        parentId,
        isExpanded: true,
      }

      const updatedNodes = { ...currentProject.nodes, [folderId]: folder }
      const updatedProject: Project = {
        ...currentProject,
        nodes: updatedNodes,
        updatedAt: new Date(),
      }

      await saveProject(updatedProject)
      setCurrentProject(updatedProject)
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      )

      return folder
    },
    [currentProject]
  )

  const updateFileContent = useCallback(
    async (fileId: string, content: string) => {
      if (!currentProject) {
        throw new Error('No project selected')
      }

      const node = currentProject.nodes[fileId]
      if (!node || node.type !== 'file') {
        throw new Error('File not found')
      }

      const updatedFile: FileNode = { ...node, content }
      const updatedNodes = { ...currentProject.nodes, [fileId]: updatedFile }
      const updatedProject: Project = {
        ...currentProject,
        nodes: updatedNodes,
        updatedAt: new Date(),
      }

      await saveProject(updatedProject)
      setCurrentProject(updatedProject)
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      )
    },
    [currentProject]
  )

  const renameNode = useCallback(
    async (nodeId: string, newName: string) => {
      if (!currentProject) {
        throw new Error('No project selected')
      }

      const node = currentProject.nodes[nodeId]
      if (!node) {
        throw new Error('Node not found')
      }

      const newPath = buildPath(node.parentId, newName, currentProject.nodes)
      const updatedNode: FileSystemNode =
        node.type === 'file'
          ? {
              ...node,
              name: newName,
              path: newPath,
              language: getLanguageFromFileName(newName),
            }
          : { ...node, name: newName, path: newPath }

      const updatedNodes = { ...currentProject.nodes, [nodeId]: updatedNode }
      const updatedProject: Project = {
        ...currentProject,
        nodes: updatedNodes,
        updatedAt: new Date(),
      }

      await saveProject(updatedProject)
      setCurrentProject(updatedProject)
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      )
    },
    [currentProject]
  )

  const deleteNode = useCallback(
    async (nodeId: string) => {
      if (!currentProject) {
        throw new Error('No project selected')
      }

      // Collect all nodes to delete (including children for folders)
      const nodesToDelete = new Set<string>([nodeId])

      function collectChildren(parentId: string) {
        Object.values(currentProject!.nodes).forEach((node) => {
          if (node.parentId === parentId) {
            nodesToDelete.add(node.id)
            if (node.type === 'folder') {
              collectChildren(node.id)
            }
          }
        })
      }

      const node = currentProject.nodes[nodeId]
      if (node?.type === 'folder') {
        collectChildren(nodeId)
      }

      const updatedNodes = { ...currentProject.nodes }
      nodesToDelete.forEach((id) => delete updatedNodes[id])

      const updatedProject: Project = {
        ...currentProject,
        nodes: updatedNodes,
        updatedAt: new Date(),
      }

      await saveProject(updatedProject)
      setCurrentProject(updatedProject)
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      )
    },
    [currentProject]
  )

  const getFileTree = useCallback((): FileTreeItem[] => {
    if (!currentProject) return []

    const nodes = currentProject.nodes
    const rootItems: FileTreeItem[] = []

    // Build tree structure
    function buildTreeItem(node: FileSystemNode): FileTreeItem {
      const item: FileTreeItem = {
        id: node.id,
        name: node.name,
        type: node.type,
      }

      if (node.type === 'file') {
        item.language = node.language
      } else {
        // Find children for folders
        const children = Object.values(nodes)
          .filter((n) => n.parentId === node.id)
          .map(buildTreeItem)
          .sort((a, b) => {
            // Folders first, then alphabetically
            if (a.type !== b.type) {
              return a.type === 'folder' ? -1 : 1
            }
            return a.name.localeCompare(b.name)
          })
        if (children.length > 0) {
          item.children = children
        }
      }

      return item
    }

    // Find root-level nodes
    Object.values(nodes)
      .filter((node) => node.parentId === null)
      .forEach((node) => {
        rootItems.push(buildTreeItem(node))
      })

    // Sort root items: folders first, then alphabetically
    return rootItems.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1
      }
      return a.name.localeCompare(b.name)
    })
  }, [currentProject])

  const getFileById = useCallback(
    (fileId: string): FileNode | undefined => {
      if (!currentProject) return undefined
      const node = currentProject.nodes[fileId]
      return node?.type === 'file' ? node : undefined
    },
    [currentProject]
  )

  const value = useMemo(
    (): ProjectContextValue => ({
      projects,
      currentProject,
      isLoading,
      error,
      loadProjects,
      selectProject,
      createProject,
      createProjectFromTemplate,
      deleteProject: deleteProjectById,
      createFile,
      createFolder,
      updateFileContent,
      renameNode,
      deleteNode,
      getFileTree,
      getFileById,
    }),
    [
      projects,
      currentProject,
      isLoading,
      error,
      loadProjects,
      selectProject,
      createProject,
      createProjectFromTemplate,
      deleteProjectById,
      createFile,
      createFolder,
      updateFileContent,
      renameNode,
      deleteNode,
      getFileTree,
      getFileById,
    ]
  )

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
