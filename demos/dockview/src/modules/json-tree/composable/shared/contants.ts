export const DEFAULT_UUID = "00000000-0000-0000-0000-000000000000"
export const DEFAULT_TASK_PRIORITY = 4 as const
export const DEFAULT_TASK_TITLE = "Untitled Task"
export const DEFAULT_TASK_COMPLETED = false
export const DEFAULT_TASK_STATUS = "active" as const
export const DEFAULT_TASK_LABELS = []
export const DEFAULT_TASK_SUBTASKS = []
export const DEFAULT_TASK_COMMENTS = []
export const DEFAULT_TASK_ATTACHMENTS = []
export const DEFAULT_RECURRING_MODE = "dueDate"
export const DEFAULT_INBOX_NAME = "Inbox"
export const DEFAULT_INBOX_COLOR = "#6b7280"
export const DEFAULT_SECTION_NAME = "Default"
export const DEFAULT_SECTION_COLOR = "#6b7280"
export const DEFAULT_GROUP_COLOR = "#6b7280"
export const DEFAULT_VIEW_MODE = "list" as const
export const DEFAULT_SORT_BY = "default" as const
export const DEFAULT_SORT_DIRECTION = "asc" as const
export const DEFAULT_SHOW_COMPLETED = false
export const DEFAULT_SHOW_OVERDUE = true
export const DEFAULT_SHOW_SIDE_PANEL = false
export const DEFAULT_COMPACT_VIEW = false
export const DEFAULT_SEARCH_QUERY = ""
export const DEFAULT_ACTIVE_FILTERS = {
  labels: [],
}
export const SIDE_PANEL_WIDTH_MIN = 20
export const SIDE_PANEL_WIDTH_MAX = 80
export const SIDE_PANEL_WIDTH_DEFAULT = 25
export const SIDEBAR_WIDTH_PX_MIN = 250
export const SIDEBAR_WIDTH_PX_MAX = 480
export const SIDEBAR_WIDTH_PX_DEFAULT = 300
export const DEFAULT_SOUND_ENABLED = true
export const DEFAULT_SOUND_VOLUME = 0.3
export const DEFAULT_NOTIFICATION_VOLUME = 70
export const DEFAULT_ROUTE = "/all" as const
export const STANDARD_VIEW_IDS = [
  "all",
  "inbox",
  "today",
  "upcoming",
  "completed",
  "calendar",
  "habits",
  // "analytics",
  // "search",
  // "shortcuts",
  // "profile",
  // "debug",
  // "filters",
  "projects",
  "labels",
  "not-found",
] as const
export const STANDARD_VIEW_METADATA: Record<
  (typeof STANDARD_VIEW_IDS)[number],
  {
    title: string
    description: string
    iconType: string
  }
> = {
  all: {
    title: "All Tasks",
    description: "See every task across all projects and labels in one view",
    iconType: "all" as const,
  },
  inbox: {
    title: "Inbox",
    description: "Capture new tasks that don't have a home yet",
    iconType: "inbox" as const,
  },
  today: {
    title: "Today's Tasks",
    description: "Keep up with everything scheduled for today",
    iconType: "today" as const,
  },
  upcoming: {
    title: "Upcoming",
    description: "Plan ahead with tasks scheduled for future dates",
    iconType: "upcoming" as const,
  },
  completed: {
    title: "Completed",
    description: "Celebrate progress with tasks you've finished",
    iconType: "completed" as const,
  },
  calendar: {
    title: "Calendar",
    description: "Visualize tasks with due dates on a calendar",
    iconType: "calendar" as const,
  },
  habits: {
    title: "Habits",
    description: "Track repeating tasks and routines that auto-rollover",
    iconType: "habits" as const,
  },
  // analytics: {
  //   title: "Analytics",
  //   description: "Start with productivity insights",
  //   iconType: "analytics" as const,
  // },
  // search: {
  //   title: "Search",
  //   description: "Begin by searching tasks",
  //   iconType: "search" as const,
  // },
  // shortcuts: {
  //   title: "Shortcuts",
  //   description: "Keyboard shortcuts and quick actions",
  //   iconType: "shortcuts" as const,
  // },
  // profile: {
  //   title: "Profile",
  //   description: "User profile and account settings",
  //   iconType: "profile" as const,
  // },
  // debug: {
  //   title: "Debug",
  //   description: "Development and debugging tools",
  //   iconType: "debug" as const,
  // },
  // filters: {
  //   title: "Filters",
  //   description: "Advanced task filtering options",
  //   iconType: "filters" as const,
  // },
  projects: {
    title: "Projects",
    description: "Browse all projects and jump into dedicated views",
    iconType: "projects" as const,
  },
  labels: {
    title: "Labels",
    description: "Organize and filter tasks with custom labels",
    iconType: "labels" as const,
  },
  "not-found": {
    title: "Not Found",
    description: "The requested resource could not be found",
    iconType: "error" as const,
  },
} as const

export const START_VIEW_METADATA = {
  ...STANDARD_VIEW_METADATA,
  lastViewed: {
    title: "Last Viewed",
    description: "Return to your last active page",
    iconType: "lastViewed" as const,
  },
} as const
export const VIEW_CONFIG_OPTIONS = {
  today: {
    calendarDisabled: true,
    showCompletedDisabled: false,
  },
  inbox: {
    calendarDisabled: false,
    showCompletedDisabled: false,
  },
  upcoming: {
    calendarDisabled: false,
    showCompletedDisabled: false,
  },
  completed: {
    calendarDisabled: false,
    showCompletedDisabled: true,
  },
  all: {
    calendarDisabled: false,
    showCompletedDisabled: false,
  },
  calendar: {
    calendarDisabled: true,
    showCompletedDisabled: false,
  },
} as const
export const DEFAULT_PROJECTS_HISTORY_LIMIT = 30
export const DEFAULT_ANALYTICS_MONTH_DAYS = 30
export const DEFAULT_ANALYTICS_WEEK_DAYS = 7
export const DEFAULT_DEBOUNCE_DELAY = 300
export const DEFAULT_BUTTON_VARIANT = "default" as const
export const DEFAULT_COLOR_PALETTE = [
  "#ef4444", // red
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#10b981", // emerald
  "#f97316", // orange
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#ec4899", // pink
  "#6366f1", // indigo
] as const
export const DEFAULT_PROJECT_COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#10b981", // emerald
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#f97316", // orange
  "#06b6d4", // cyan
  "#84cc16", // lime
] as const
export const DEFAULT_LABEL_COLORS = DEFAULT_PROJECT_COLORS
export const DEFAULT_SECTION_COLORS = DEFAULT_PROJECT_COLORS
export const COLOR_OPTIONS = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Red", value: "#ef4444" },
  { name: "Green", value: "#10b981" },
  { name: "Yellow", value: "#f59e0b" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Orange", value: "#f97316" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Lime", value: "#84cc16" },
  { name: "Pink", value: "#ec4899" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Gray", value: "#6b7280" },
] as const
export const CHART_COLORS = {
  /** Tasks completed metric (emerald) */
  completed: DEFAULT_COLOR_PALETTE[4],
  /** Tasks created metric (blue) */
  created: DEFAULT_COLOR_PALETTE[2],
  /** Focus time metric (amber) */
  focusTime: DEFAULT_COLOR_PALETTE[1],
  /** Productivity score metric (violet) */
  productivityScore: DEFAULT_COLOR_PALETTE[3],
  /** Grid line color for charts (gray-200 - unique) */
  gridLine: "#e5e7eb",
} as const
export const UI_STATE_COLORS = {
  /** Error/alert state (pure red - unique for visibility) */
  error: "#ff0000",
  /** Warning state (amber) */
  warning: DEFAULT_COLOR_PALETTE[1],
  /** Success/completed state (emerald) */
  success: DEFAULT_COLOR_PALETTE[4],
  /** Info/informational state (blue) */
  info: DEFAULT_COLOR_PALETTE[2],
} as const
export const GRAY_COLORS = {
  /** Default gray for fallbacks and neutral elements (gray-500) */
  default: "#6b7280",
  /** Light gray for subtle backgrounds and borders (gray-200) */
  light: "#e5e7eb",
} as const
export const IMPORT_PRIORITY_COLORS = {
  /** High priority (red-600) - darker than core red for visual distinction */
  1: "#dc2626",
  /** Medium-high priority (orange-600) */
  2: "#ea580c",
  /** Medium priority (amber-600) */
  3: "#d97706",
  /** Low/no priority (gray-500) */
  4: "#6b7280",
} as const
export const THEME_COLORS = {
  /** PWA manifest background color (dark) */
  pwaBackground: "#1b1b1b",
  /** PWA manifest theme color (dark) */
  pwaTheme: "#1b1b1b",
  /** Navigation user icon fill color (near-black) */
  navIconFill: "#1f1f1f",
} as const
export const FALLBACK_COLOR = GRAY_COLORS.default
export const PLACEHOLDER_TASK_INPUT = "Task name"
export const PLACEHOLDER_PROJECT_NAME = "Enter project name"
export const PLACEHOLDER_LABEL_NAME = "Enter label name"
export const PLACEHOLDER_TASK_DESCRIPTION = "Add description..."
export const PLACEHOLDER_SEARCH = "Search tasks..."
export const DEFAULT_DATA_DIR = "data"
export const DEFAULT_BACKUP_DIR = "backups"
export const DEFAULT_ASSETS_DIR = "assets"
export const DEFAULT_AVATAR_DIR = `${DEFAULT_ASSETS_DIR}/avatar`
export const TASKS_QUERY_KEY = ["data", "tasks"] as const
export const PROJECTS_QUERY_KEY = ["data", "projects"] as const
export const LABELS_QUERY_KEY = ["data", "labels"] as const
export const GROUPS_QUERY_KEY = ["data", "groups"] as const
export const SETTINGS_QUERY_KEY = ["data", "settings"] as const
export const USER_QUERY_KEY = ["data", "user"] as const
export const DATA_QUERY_KEY = ["data"] as const
export const DEFAULT_AUTO_BACKUP_ENABLED = false
export const DEFAULT_BACKUP_TIME = "02:00"
export const DEFAULT_MAX_BACKUPS = -1
export const DEFAULT_DATA_FILE_PATH = "data/data.json"
export const MIGRATION_DEFAULT_PROJECT_COLOR = "#3b82f6"
export const MIGRATION_DEFAULT_LABEL_COLOR = "#6b7280"
export const SUPPORTED_IMPORT_SOURCES = ["ticktick", "todoist", "asana", "trello"] as const
export type SupportedImportSource = (typeof SUPPORTED_IMPORT_SOURCES)[number]
export const SUPPORTED_AVATAR_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"] as const
export const AVATAR_DATA_URL_REGEX = /^data:image\/(png|jpe?g|gif|webp);base64,[A-Za-z0-9+/]+=*$/
export type SupportedAvatarMimeType = (typeof SUPPORTED_AVATAR_MIME_TYPES)[number]
export const BASE_THEME_OPTIONS = ["default"] as const
export const THEME_OPTIONS = BASE_THEME_OPTIONS
export type Theme = (typeof THEME_OPTIONS)[number]
export const DEFAULT_THEME: Theme = "default"
export const THEME_DISPLAY_NAMES = {
  default: "Default",
} as const satisfies Record<Theme, string>
export const THEME_DESCRIPTIONS = {
  default: "Default theme",
} as const satisfies Record<Theme, string>
