import { DEFAULT_PROJECT_SECTION, DEFAULT_UI_SETTINGS } from "../../../../lib/defaults"

import { atomWithQuery, queryClientAtom } from "jotai-tanstack-query"

// Re-export queryClientAtom for use in mutations
export { queryClientAtom }
import { createProjectId, createLabelId, createGroupId } from "../../../../lib/types/id"
import {
  DEFAULT_AUTO_BACKUP_ENABLED,
  DEFAULT_BACKUP_TIME,
  DEFAULT_MAX_BACKUPS,
  TASKS_QUERY_KEY,
  PROJECTS_QUERY_KEY,
  LABELS_QUERY_KEY,
  GROUPS_QUERY_KEY,
  SETTINGS_QUERY_KEY,
  USER_QUERY_KEY,
} from "../../../../lib/contants"
import { DEFAULT_NOTIFICATION_SETTINGS, DEFAULT_GENERAL_SETTINGS, DEFAULT_USER } from "../../../../lib/defaults"

const TEST_TASKS: any[] = []

const TEST_PROJECTS: any[] = [
  {
    id: createProjectId("12345678-1234-4234-8234-123456789abc"),
    name: "Test Project 1",
    slug: "test-project-1",
    color: "#ef4444",
    sections: [DEFAULT_PROJECT_SECTION],
  },
  {
    id: createProjectId("12345678-1234-4234-8234-123456789abd"),
    name: "Test Project 2",
    slug: "test-project-2",
    color: "#10b981",
    sections: [DEFAULT_PROJECT_SECTION],
  },
]

const TEST_LABELS: any[] = [
  {
    id: createLabelId("abcdef01-abcd-4bcd-8bcd-abcdefabcdef"),
    name: "Test Label",
    slug: "test-label",
    color: "#ef4444",
  },
  {
    id: createLabelId("abcdef01-abcd-4bcd-8bcd-abcdefabcde0"),
    name: "test-personal",
    slug: "test-personal",
    color: "#3b82f6",
  },
]

const TEST_PROJECT_GROUPS: any = {
  type: "project" as const,
  id: createGroupId("33333333-3333-4333-8333-333333333333"),
  name: "All Projects",
  slug: "all-projects",
  items: [
    {
      type: "project" as const,
      id: createGroupId("11111111-1111-4111-8111-111111111111"),
      name: "Work Projects",
      slug: "work-projects",
      description: "Projects related to work",
      color: "#3b82f6",
      items: [createProjectId("44444444-4444-4444-8444-444444444444")],
    },
    {
      type: "project" as const,
      id: createGroupId("22222222-2222-4222-8222-222222222222"),
      name: "Development",
      slug: "development",
      items: [createProjectId("55555555-5555-4555-8555-555555555555")],
    },
  ],
}

const TEST_LABEL_GROUPS: any = {
  type: "label" as const,
  id: createGroupId("88888888-8888-4888-8888-888888888888"),
  name: "All Labels",
  slug: "all-labels",
  items: [],
}

const TEST_SETTINGS: any = {
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
}

const TEST_USER: any = DEFAULT_USER

export async function fetchAndValidate<T>(
  url: string,
  schema: {
    safeParse: (data: unknown) => {
      success: boolean
      data?: T
      error?: unknown
    }
  },
  resourceName: string,
): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${resourceName}: ${response.statusText}`)
  }

  const data = await response.json()
  const result = schema.safeParse(data)

  if (!result.success) {
    console.error(`${resourceName} validation error:`, result.error)
    throw new Error(`Failed to parse ${resourceName}`)
  }

  if (!result.data) {
    throw new Error(`No data returned for ${resourceName}`)
  }

  return result.data
}

async function fetchTasks(): Promise<any[]> {
  return TEST_TASKS
}

async function fetchProjects(): Promise<any[]> {
  return TEST_PROJECTS
}

async function fetchLabels(): Promise<any[]> {
  return TEST_LABELS
}

async function fetchGroups(): Promise<any> {
  return {
    projectGroups: TEST_PROJECT_GROUPS,
    labelGroups: TEST_LABEL_GROUPS,
  }
}

async function fetchSettings(): Promise<any> {
  return TEST_SETTINGS
}

async function fetchUser(): Promise<any> {
  return TEST_USER
}

export const QUERY_CONFIG = {
  staleTime: 1000, // Consider data fresh for 1 second
  refetchOnMount: false, // Don't refetch on component mount
  refetchOnWindowFocus: false, // Don't refetch when window regains focus
  refetchInterval: false, // No automatic polling
} as const

export const tasksQueryAtom = atomWithQuery(() => ({
  queryKey: TASKS_QUERY_KEY,
  queryFn: fetchTasks,
  ...QUERY_CONFIG,
}))
tasksQueryAtom.debugLabel = "tasksQueryAtom"

export const projectsQueryAtom = atomWithQuery(() => ({
  queryKey: PROJECTS_QUERY_KEY,
  queryFn: fetchProjects,
  ...QUERY_CONFIG,
}))
projectsQueryAtom.debugLabel = "projectsQueryAtom"

export const labelsQueryAtom = atomWithQuery(() => ({
  queryKey: LABELS_QUERY_KEY,
  queryFn: fetchLabels,
  ...QUERY_CONFIG,
}))
labelsQueryAtom.debugLabel = "labelsQueryAtom"

export const groupsQueryAtom = atomWithQuery(() => ({
  queryKey: GROUPS_QUERY_KEY,
  queryFn: fetchGroups,
  ...QUERY_CONFIG,
}))
groupsQueryAtom.debugLabel = "groupsQueryAtom"

export const settingsQueryAtom = atomWithQuery(() => ({
  queryKey: SETTINGS_QUERY_KEY,
  queryFn: fetchSettings,
  ...QUERY_CONFIG,
}))
settingsQueryAtom.debugLabel = "settingsQueryAtom"

export const userQueryAtom = atomWithQuery(() => ({
  queryKey: USER_QUERY_KEY,
  queryFn: fetchUser,
  ...QUERY_CONFIG,
}))
userQueryAtom.debugLabel = "userQueryAtom"
