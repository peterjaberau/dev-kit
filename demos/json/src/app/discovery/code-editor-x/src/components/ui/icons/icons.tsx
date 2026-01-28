"use client"
/**
 * Icon exports using Tabler Icons
 * Re-exported with consistent naming for the application
 */

export {
  // Navigation & Actions
  IconChevronRight as ChevronRight,
  IconChevronDown as ChevronDown,
  IconChevronLeft as ChevronLeft,
  IconChevronUp as ChevronUp,
  IconPlus as Plus,
  IconX as X,
  IconDotsVertical as MoreVertical,
  IconDots as MoreHorizontal,
  IconSearch as Search,
  IconSettings as Settings,
  IconMenu2 as Menu,

  // Files & Folders
  IconFile as File,
  IconFileCode as FileCode,
  IconFolder as Folder,
  IconFolderOpen as FolderOpen,
  IconFolderPlus as FolderPlus,
  IconFilePlus as FilePlus,

  // Editor & Code
  IconPlayerPlay as Play,
  IconPlayerPause as Pause,
  IconPlayerStop as Stop,
  IconTerminal2 as Terminal,
  IconCode as Code,
  IconBraces as Braces,
  IconBrackets as Brackets,

  // Communication
  IconMessage as MessageSquare,
  IconSend as Send,
  IconSparkles as Sparkles,

  // UI Elements
  IconLayoutSidebarLeftCollapse as PanelLeft,
  IconLayoutSidebarRightCollapse as PanelRight,
  IconLayoutBottombarCollapse as PanelBottom,
  IconLayout as Layout,
  IconMaximize as Maximize2,
  IconMinimize as Minimize2,
  IconArrowsMaximize as ArrowsMaximize,
  IconArrowsMinimize as ArrowsMinimize,

  // Actions
  IconUpload as Upload,
  IconDownload as Download,
  IconCopy as Copy,
  IconTrash as Trash,
  IconEdit as Edit,
  IconPencil as Pencil,
  IconRefresh as RefreshCw,
  IconReload as Reload,

  // Status & Info
  IconAlertCircle as AlertCircle,
  IconCircleCheck as CheckCircle,
  IconInfoCircle as Info,
  IconBug as Bug,
  IconCircleFilled as Circle,

  // Misc
  IconHistory as History,
  IconClock as Clock,
  IconLink as Link,
  IconExternalLink as ExternalLink,
  IconCloud as Cloud,
  IconCloudUpload as CloudUpload,
  IconNotebook as Notebook,
  IconPlug as Plug,
  IconUser as User,
  IconGitBranch as GitBranch,
  IconPuzzle as Puzzle,
  IconBulb as Lightbulb,
  IconBolt as Zap,
  IconCheck as Check,
  IconLoader2 as Loader,
  IconEye as Eye,
  IconEyeOff as EyeOff,
  IconLock as Lock,
  IconKey as Key,
  IconHome as Home,
  IconStar as Star,
  IconHeart as Heart,
  IconBookmark as Bookmark,
  IconShare as Share,
  IconFilter as Filter,
  IconSortAscending as Sort,
  IconAdjustments as Adjustments,
  IconCommand as Command,
  IconSun as Sun,
  IconMoon as Moon,
  IconDeviceDesktop as Monitor,
  IconKeyboard as Keyboard,
  IconTypography as Type,

  // Language Icons (generic)
  IconBrandPython as Python,
  IconBrandJavascript as JavaScript,
  IconBrandTypescript as TypeScript,
  IconBrandHtml5 as Html,
  IconBrandCss3 as Css,
  IconJson as Json,
  IconMarkdown as Markdown,
  IconBrandRust as Rust,
  IconBrandGolang as Go,

  // Brand Icons (for integrations)
  IconBrandGithub as BrandGithub,
  IconBrandNpm as BrandNpm,
  IconBrandDocker as BrandDocker,
  IconBrandVercel as BrandVercel,
  IconBrandAws as BrandAws,
  IconBrandSlack as BrandSlack,
  IconBrandReact as BrandReact,
  IconBrandNodejs as BrandNodejs,
} from '@tabler/icons-react'

// Icon props type
export type IconProps = {
  size?: number | string
  stroke?: number
  className?: string
}
