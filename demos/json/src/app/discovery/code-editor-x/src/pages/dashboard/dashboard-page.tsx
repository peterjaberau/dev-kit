"use client"
import { useState, useCallback } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useRouter, usePathname } from "next/navigation"

import { useProject } from '../../lib/project-provider'
import { NewProjectDialog } from '../../components/dashboard/new-project-dialog'
import type { Project } from '../../types'
import {
  Clock,
  Folder,
  Star,
  Heart,
  Trash,
  Plus,
  Search,
  Settings,
  User,
  ChevronDown,
  MoreHorizontal,
  Code,
  GitBranch,
  Share,
  Home,
} from '../../components/ui/icons'
import { ScrollArea } from '../../components/ui/scroll-area'
import { Button } from '../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { cn } from '../../lib/utils'

// ============================================
// Types
// ============================================

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  count?: number
}

// ============================================
// Navigation Items
// ============================================

const navItems: NavItem[] = [
  { id: 'recent', label: 'Recent', icon: <Clock size={18} /> },
  { id: 'all', label: 'All projects', icon: <Folder size={18} /> },
  { id: 'starred', label: 'Starred', icon: <Star size={18} /> },
  { id: 'liked', label: 'Liked', icon: <Heart size={18} /> },
  { id: 'trash', label: 'Trash', icon: <Trash size={18} /> },
]

// ============================================
// Helper Functions
// ============================================

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

// ============================================
// Components
// ============================================

function DashboardHeader({
  onNewProject,
  onOpenSettings,
}: {
  onNewProject: () => void
  onOpenSettings: () => void
}) {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b border-[var(--border-default)] bg-[var(--bg-elevated)] px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-emerald-500">
          <Code size={18} className="text-white" />
        </div>
        <span className="font-semibold text-[var(--text-primary)]">
          EditorX
        </span>
      </div>

      {/* Search */}
      <div className="max-w-xl flex-1">
        <div className="relative">
          <Search
            size={16}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Search projects..."
            className="h-9 w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-inset)] pr-4 pl-9 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-purple)] focus:ring-2 focus:ring-[var(--accent-purple)]/50 focus:outline-none"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          className="gap-1.5"
          onClick={onNewProject}
        >
          <Plus size={16} />
          Create
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0"
          onClick={onOpenSettings}
        >
          <Settings size={18} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 focus:ring-2 focus:ring-[var(--accent-purple)]/50 focus:outline-none">
              <User size={16} className="text-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenSettings}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

interface SidebarNavProps {
  activeItem: string
  onItemClick: (id: string) => void
  projectCount: number
}

function SidebarNav({
  activeItem,
  onItemClick,
  projectCount,
}: SidebarNavProps) {
  // Build nav items with counts
  const navItemsWithCounts = navItems.map((item) => ({
    ...item,
    count: item.id === 'all' || item.id === 'recent' ? projectCount : undefined,
  }))

  return (
    <aside className="flex w-56 flex-col border-r border-[var(--border-default)] bg-[var(--bg-base)]">
      <ScrollArea className="flex-1 p-3">
        <nav className="space-y-1">
          {navItemsWithCounts.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                activeItem === item.id
                  ? 'bg-[var(--bg-hover)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
              )}
            >
              <span
                className={
                  activeItem === item.id ? 'text-[var(--accent-purple)]' : ''
                }
              >
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.count !== undefined && (
                <span className="text-xs text-[var(--text-muted)]">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Teams section */}
        <div className="mt-6">
          <div className="px-3 py-2 text-xs font-medium tracking-wider text-[var(--text-muted)] uppercase">
            Teams
          </div>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500/20">
              <span className="text-xs font-medium text-blue-400">P</span>
            </div>
            <span className="flex-1 text-left">Personal</span>
            <ChevronDown size={14} className="text-[var(--text-muted)]" />
          </button>
        </div>
      </ScrollArea>

      {/* Upgrade banner */}
      <div className="border-t border-[var(--border-default)] p-3">
        <div className="rounded-lg border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-emerald-500/10 p-3">
          <div className="mb-1 text-sm font-medium text-[var(--text-primary)]">
            Upgrade to Pro
          </div>
          <div className="mb-2 text-xs text-[var(--text-muted)]">
            Get unlimited private projects
          </div>
          <Button variant="default" size="sm" className="w-full">
            Learn more
          </Button>
        </div>
      </div>
    </aside>
  )
}

interface ProjectCardProps {
  project: Project
  onClick: () => void
  onDelete: () => void
}

function ProjectCard({ project, onClick, onDelete }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] transition-all hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-black/20"
    >
      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="truncate font-medium text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-purple)]">
            {project.name}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--bg-hover)]"
              >
                <MoreHorizontal
                  size={16}
                  className="text-[var(--text-muted)]"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <GitBranch size={14} className="mr-2" />
                Fork
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share size={14} className="mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star size={14} className="mr-2" />
                Star
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-400"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
              >
                <Trash size={14} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {project.description && (
          <p className="mb-3 line-clamp-2 text-sm text-[var(--text-muted)]">
            {project.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: '#3776ab' }}
            />
            <span className="text-[var(--text-secondary)]">Project</span>
          </div>
          <span className="text-[var(--text-muted)]">
            {formatRelativeTime(project.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Main Dashboard Page
// ============================================

export function DashboardPage() {
  // const navigate = useNavigate()
  const router = useRouter()
  const pathname = usePathname()



  const { projects, isLoading, deleteProject } = useProject()
  const [activeNav, setActiveNav] = useState('recent')
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    // Navigate to editor with project ID
    // navigate(`/editor/${project.id}`)
    router.push(`${pathname}/editor/${project.id}`)
  }

  const handleOpenNewProjectDialog = useCallback(() => {
    setIsNewProjectDialogOpen(true)
  }, [])

  const handleProjectCreated = useCallback(
    (projectId: string) => {
      // navigate(`/editor/${projectId}`)
      router.push(`${pathname}/editor/${projectId}`)

    },
    [router]
  )

  const handleDeleteProject = async (projectId: string) => {
    await deleteProject(projectId)
  }

  const handleOpenSettings = () => {
    // navigate('/settings')
    router.push(`${pathname}/settings`)
  }

  const getPageTitle = () => {
    const item = navItems.find((n) => n.id === activeNav)
    return item?.label || 'Dashboard'
  }

  // Sort projects by updatedAt (most recent first)
  const sortedProjects = [...projects].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  )

  console.log("----dashboard-page---", {
    projects,
    // router,
    pathname,
    activeNav,
    isNewProjectDialogOpen,
    getPageTitle: getPageTitle(),
    sortedProjects
  })

  return (
    <div className="flex h-screen flex-col bg-[var(--bg-base)]">
      <DashboardHeader
        onNewProject={handleOpenNewProjectDialog}
        onOpenSettings={handleOpenSettings}
      />

      <div className="flex flex-1 overflow-hidden">
        <SidebarNav
          activeItem={activeNav}
          onItemClick={setActiveNav}
          projectCount={projects.length}
        />

        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Page header */}
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-6 py-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-[var(--text-primary)]">
                {getPageTitle()}
              </h1>
              <span className="text-sm text-[var(--text-muted)]">
                {projects.length} projects
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenNewProjectDialog}
              >
                <Home size={16} className="mr-1.5" />
                Templates
              </Button>
              <Button variant="ghost" size="sm">
                Import
              </Button>
            </div>
          </div>

          {/* Projects grid */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <span className="text-(--text-secondary)">
                    Loading projects...
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {/* New sandbox card */}
                  <button
                    onClick={handleOpenNewProjectDialog}
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[var(--border-default)] bg-[var(--bg-elevated)] transition-all hover:border-[var(--accent-purple)] hover:bg-[var(--bg-hover)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--bg-inset) transition-colors group-hover:bg-(--accent-purple)/10">
                      <Plus
                        size={24}
                        className="text-(--text-muted) transition-colors group-hover:text-(--accent-purple)"
                      />
                    </div>
                    <span className="text-sm font-medium text-(--text-secondary) transition-colors group-hover:text-[var(--text-primary)]">
                      New Project
                    </span>
                  </button>

                  {/* Project cards */}
                  {sortedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => handleProjectClick(project)}
                      onDelete={() => handleDeleteProject(project.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </main>
      </div>

      {/* New Project Dialog */}
      <NewProjectDialog
        open={isNewProjectDialogOpen}
        onOpenChange={setIsNewProjectDialogOpen}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  )
}
