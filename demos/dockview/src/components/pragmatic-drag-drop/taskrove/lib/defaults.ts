import {
  SIDE_PANEL_WIDTH_DEFAULT,
  SIDEBAR_WIDTH_PX_DEFAULT,
} from "./contants";
import { createGroupId, createUserId } from "./types/id";
import { LATEST_DATA_VERSION } from "./types/schema-version";
import {
  DEFAULT_UUID,
  DEFAULT_AUTO_BACKUP_ENABLED,
  DEFAULT_BACKUP_TIME,
  DEFAULT_MAX_BACKUPS,
  DEFAULT_VIEW_MODE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SHOW_COMPLETED,
  DEFAULT_SHOW_OVERDUE,
  DEFAULT_SEARCH_QUERY,
  DEFAULT_SHOW_SIDE_PANEL,
  DEFAULT_COMPACT_VIEW,
  DEFAULT_ACTIVE_FILTERS,
  DEFAULT_SECTION_NAME,
  DEFAULT_SECTION_COLOR,
} from "./contants";

export const ROOT_PROJECT_GROUP_ID  = createGroupId(DEFAULT_UUID);
export const ROOT_LABEL_GROUP_ID  = createGroupId(DEFAULT_UUID);

export const DEFAULT_PROJECT_SECTION = {
  id: createGroupId(DEFAULT_UUID),
  name: DEFAULT_SECTION_NAME,
  slug: "",
  color: DEFAULT_SECTION_COLOR,
  type: "section",
  items: [],
  isDefault: true,
};

export const DEFAULT_PROJECT_GROUP = {
  type: "project",
  id: ROOT_PROJECT_GROUP_ID,
  name: "All Projects",
  slug: "all-projects",
  items: [],
};

export const DEFAULT_LABEL_GROUP: any = {
  type: "label",
  id: ROOT_LABEL_GROUP_ID,
  name: "All Labels",
  slug: "all-labels",
  items: [],
};

export const DEFAULT_DATA_VERSION: any = LATEST_DATA_VERSION;

export function getDefaultSection(project: any): any | null {
  if (project.sections.length === 0) {
    return null;
  }

  // Priority 1: Section explicitly marked as default
  const markedDefault = project.sections.find((s: any) => s.isDefault === true);
  if (markedDefault) {
    return markedDefault;
  }

  // Priority 2: First section in array
  return project.sections[0] ?? null;
}

export function getDefaultSectionId(project: any): any | null {
  const defaultSection = getDefaultSection(project);
  return defaultSection?.id ?? null;
}

export const DEFAULT_NOTIFICATION_SETTINGS = {
  enabled: true,
  requireInteraction: true,
};
export const DEFAULT_GENERAL_SETTINGS = {
  startView: "all" as const, // Corresponds to DEFAULT_ROUTE "/all"
  soundEnabled: true,
  linkifyEnabled: true,
  markdownEnabled: true,
  popoverHoverOpen: false,
} as const;
// weekStartsOn is optional; the default UI settings object should be empty
export const DEFAULT_UI_SETTINGS: any = {};

export const DEFAULT_VIEW_STATE: any = {
  viewMode: DEFAULT_VIEW_MODE,
  sortBy: DEFAULT_SORT_BY,
  sortDirection: DEFAULT_SORT_DIRECTION,
  showCompleted: DEFAULT_SHOW_COMPLETED,
  showOverdue: DEFAULT_SHOW_OVERDUE,
  searchQuery: DEFAULT_SEARCH_QUERY,
  showSidePanel: DEFAULT_SHOW_SIDE_PANEL,
  compactView: DEFAULT_COMPACT_VIEW,
  collapsedSections: [],
  activeFilters: DEFAULT_ACTIVE_FILTERS,
};

export const DEFAULT_GLOBAL_VIEW_OPTIONS: any = {
  sidePanelWidth: SIDE_PANEL_WIDTH_DEFAULT,
  sideBarWidth: SIDEBAR_WIDTH_PX_DEFAULT,
  showSidePanel: DEFAULT_SHOW_SIDE_PANEL,
  peopleOwnerCollapsed: false,
  peopleAssigneesCollapsed: false,
  dismissedUi: {},
};

export const DEFAULT_USER_SETTINGS: any = {
  data: {
    autoBackup: {
      enabled: DEFAULT_AUTO_BACKUP_ENABLED,
      backupTime: DEFAULT_BACKUP_TIME,
      maxBackups: DEFAULT_MAX_BACKUPS,
    },
  },
  notifications: DEFAULT_NOTIFICATION_SETTINGS,
  general: DEFAULT_GENERAL_SETTINGS,
  uiSettings: DEFAULT_UI_SETTINGS,
};

export const DEFAULT_USER: any = {
  id: createUserId(DEFAULT_UUID),
  username: "",
  password: "",
};

export const DEFAULT_USER_DATA: any = DEFAULT_USER;

export const DEFAULT_EMPTY_DATA_FILE: any = {
  tasks: [],
  projects: [],
  labels: [],
  projectGroups: DEFAULT_PROJECT_GROUP,
  labelGroups: DEFAULT_LABEL_GROUP,
  settings: DEFAULT_USER_SETTINGS,
  user: DEFAULT_USER,
  version: DEFAULT_DATA_VERSION,
};
