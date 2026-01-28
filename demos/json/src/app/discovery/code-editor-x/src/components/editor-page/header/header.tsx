'use client'
import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Button } from '../../ui/button'
import { Kbd } from '../../ui/kbd'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip'
import { CommandPalette, type CommandGroup } from '../../ui/command-palette'
import {
  Search,
  CloudUpload,
  PanelLeft,
  PanelRight,
  PanelBottom,
  Settings,
  User,
  ChevronDown,
  Sparkles,
  Play,
  File,
  Folder,
  GitBranch,
  ExternalLink,
  X,
} from '../../ui/icons'
import { cn } from '../../../lib/utils'
import { useRouter, usePathname } from "next/navigation"

// ============================================
// Types
// ============================================

interface HeaderProps {
  projectName?: string
  onToggleSidebar?: () => void
  onToggleBottomPanel?: () => void
  onToggleRightPanel?: () => void
  isSidebarCollapsed?: boolean
  isBottomPanelCollapsed?: boolean
  isRightPanelCollapsed?: boolean
  onDeploy?: () => void
  className?: string
}

// ============================================
// Command palette commands
// ============================================

const defaultCommands: CommandGroup[] = [
  {
    id: 'actions',
    label: 'Actions',
    items: [
      {
        id: 'run',
        label: 'Run Code',
        description: 'Execute the current file',
        icon: <Play size={16} />,
        shortcut: ['Ctrl', 'Enter'],
        onSelect: () => console.log('Run code'),
      },
      {
        id: 'deploy',
        label: 'Deploy Project',
        description: 'Deploy to production',
        icon: <CloudUpload size={16} />,
        shortcut: ['Ctrl', 'Shift', 'D'],
        onSelect: () => console.log('Deploy'),
      },
    ],
  },
  {
    id: 'files',
    label: 'Files',
    items: [
      {
        id: 'new-file',
        label: 'New File',
        description: 'Create a new file',
        icon: <File size={16} />,
        shortcut: ['Ctrl', 'N'],
        onSelect: () => console.log('New file'),
      },
      {
        id: 'new-folder',
        label: 'New Folder',
        description: 'Create a new folder',
        icon: <Folder size={16} />,
        onSelect: () => console.log('New folder'),
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI Assistant',
    items: [
      {
        id: 'explain',
        label: 'Explain Code',
        description: 'Get an explanation of selected code',
        icon: <Sparkles size={16} />,
        onSelect: () => console.log('Explain code'),
      },
      {
        id: 'fix',
        label: 'Fix Errors',
        description: 'Let AI fix errors in your code',
        icon: <Sparkles size={16} />,
        onSelect: () => console.log('Fix errors'),
      },
      {
        id: 'refactor',
        label: 'Refactor Code',
        description: 'Improve code quality with AI',
        icon: <Sparkles size={16} />,
        onSelect: () => console.log('Refactor'),
      },
    ],
  },
  {
    id: 'view',
    label: 'View',
    items: [
      {
        id: 'toggle-sidebar',
        label: 'Toggle Sidebar',
        description: 'Show or hide the sidebar',
        icon: <PanelLeft size={16} />,
        shortcut: ['Ctrl', 'B'],
        onSelect: () => console.log('Toggle sidebar'),
      },
      {
        id: 'toggle-terminal',
        label: 'Toggle Terminal',
        description: 'Show or hide the terminal',
        icon: <PanelBottom size={16} />,
        shortcut: ['Ctrl', '`'],
        onSelect: () => console.log('Toggle terminal'),
      },
    ],
  },
]

// ============================================
// Header Component
// ============================================

export function Header({
  projectName = 'Code Editor',
  onToggleSidebar,
  onToggleBottomPanel,
  onToggleRightPanel,
  isSidebarCollapsed = false,
  isBottomPanelCollapsed = false,
  isRightPanelCollapsed = false,
  onDeploy,
  className,
}: HeaderProps) {
  // const navigate = useNavigate()
  const router = useRouter()
  const pathname = usePathname()
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <TooltipProvider delayDuration={300}>
      <header className={cn("flex h-full items-center justify-between gap-4 px-3", "bg-(--bg-elevated)", className)}>
        {/* Left: Close & Logo & Project */}
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                // onClick={() => navigate('/')}
                onClick={() => router.push(`${pathname}/`)}
              >
                <X size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Close Editor</TooltipContent>
          </Tooltip>
          <div className="to-primary-700 bg-linear-to-br from-(--color-primary-500) flex h-7 w-7 items-center justify-center rounded-md">
            <span className="text-sm font-bold text-white">E</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-(--text-primary) text-sm font-semibold">{projectName}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-xs">
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Projects</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Folder size={14} />
                  My Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Folder size={14} />
                  Another Project
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <File size={14} />
                  New Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Center: Command Palette Trigger */}
        <div className="flex flex-1 justify-center px-4">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className={cn(
              "flex h-8 w-full max-w-md items-center gap-2 rounded-lg px-3",
              "border-(--border-default) bg-(--bg-surface) border",
              "text-(--text-tertiary) text-sm",
              "transition-all duration-150",
              "hover:border-(--border-strong) hover:bg-(--bg-surface-hover)",
              "focus-visible:ring-(--color-primary-500) focus-visible:outline-none focus-visible:ring-2",
            )}
          >
            <Search size={14} />
            <span className="flex-1 text-left">Ask AI & Search</span>
            <div className="flex items-center gap-0.5">
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </div>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Layout Controls */}
          <div className="mr-2 flex items-center gap-0.5 border-r border-[var(--border-default)] pr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onToggleSidebar}
                  className={cn(!isSidebarCollapsed && "bg-[var(--bg-surface-hover)] text-[var(--text-primary)]")}
                >
                  <PanelLeft size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onToggleBottomPanel}
                  className={cn(!isBottomPanelCollapsed && "bg-[var(--bg-surface-hover)] text-[var(--text-primary)]")}
                >
                  <PanelBottom size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isBottomPanelCollapsed ? "Show Terminal" : "Hide Terminal"}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onToggleRightPanel}
                  className={cn(!isRightPanelCollapsed && "bg-[var(--bg-surface-hover)] text-[var(--text-primary)]")}
                >
                  <PanelRight size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isRightPanelCollapsed ? "Show AI Chat" : "Hide AI Chat"}</TooltipContent>
            </Tooltip>
          </div>

          {/* Deploy Button */}
          <Button variant="default" size="sm" onClick={onDeploy}>
            <CloudUpload size={14} />
            Deploy
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1 rounded-full">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-primary-600)]">
                  <User size={14} className="text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User size={14} />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings size={14} />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GitBranch size={14} />
                Repositories
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ExternalLink size={14} />
                Documentation
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[var(--color-error-500)]">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} groups={defaultCommands} />
    </TooltipProvider>
  )
}

export default Header
