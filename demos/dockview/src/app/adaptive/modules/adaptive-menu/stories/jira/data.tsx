import React, { type ReactNode } from "react"

import { BasketballIcon } from "./icons"
import { ChartBarIcon } from "./icons"
import { DeviceMobileIcon } from "./icons"
import { FilterIcon } from "./icons"
import { ImageIcon } from "./icons"
import { ScorecardIcon } from "./icons"
import { TextIcon } from "./icons"
import { ThemeIcon } from "./icons"
import { VehicleCarIcon } from "./icons"
import type { Operation } from "#adaptive-menu/drag-and-drop/hitbox"

import { ProjectTile } from "./projects/project-tile"
import { Icon } from "@chakra-ui/react"

export type TFilter = {
  id: string
  icon: ReactNode
  name: string
  href: string
  children: TFilter[]
}

const filterKey = Symbol("filter")

export type TFilterData = {
  [filterKey]: true
  id: string
}

export function getFilterData(filter: TFilter): TFilterData {
  return {
    id: filter.id,
    [filterKey]: true,
  }
}

export function isFilterData(data: Record<string | symbol, unknown>): data is TFilterData {
  return data[filterKey] === true
}

export type TProject = {
  id: string
  href: string
  icon: ReactNode
  name: string
}

const projectKey = Symbol("project")

export type TProjectData = {
  [projectKey]: true
  groupName: "recent" | "starred"
  id: string
}

export function getProjectData({
  project,
  groupName,
}: {
  project: TProject
  groupName: "recent" | "starred"
}): TProjectData {
  return {
    id: project.id,
    groupName,
    [projectKey]: true,
  }
}

export function isProjectData(data: Record<string | symbol, unknown>): data is TProjectData {
  return data[projectKey] === true
}

const topLevelItems = ["for-you", "recent", "starred", "projects", "filters"] as const

export type TTopLevelItem = (typeof topLevelItems)[number]

export type TActionTrigger = "pointer" | "keyboard"

export type TAction =
  | {
      type: "top-level-menu-reorder"
      trigger: TActionTrigger
      value: TTopLevelItem
      startIndex: number
      finishIndex: number
    }
  | {
      type: "reorder-project"
      trigger: TActionTrigger
      groupName: "starred" | "recent"
      draggingId: string
      startIndex: number
      finishIndex: number
    }
  | {
      type: "filter-move"
      trigger: TActionTrigger
      draggingId: string
      targetId: string
      operation: Operation
    }

export type TData = {
  topLevelItems: TTopLevelItem[]
  projects: { starred: TProject[]; recent: TProject[] }
  filters: TFilter[]
  lastAction: TAction | null
}

const getId = (() => {
  let count: number = 0
  return function getId(): string {
    return `id:${count++}`
  }
})()

export function getInitialData(): TData {
  return {
    lastAction: null,
    topLevelItems: Array.from(topLevelItems),
    projects: {
      starred: [
        {
          id: getId(),
          href: "#",
          name: "Modernize typography",
          icon: (
            <ProjectTile backgroundColor={"#964AC0"}>
              <Icon size={"xs"}>
                <TextIcon />
              </Icon>
            </ProjectTile>
          ),
        },
        {
          id: getId(),
          href: "#",
          name: "F1 sponsorship",
          icon: (
            <ProjectTile backgroundColor={"#946F00"}>
              <Icon size={"xs"}>
                <VehicleCarIcon />
              </Icon>
            </ProjectTile>
          ),
        },
        {
          id: getId(),
          href: "#",
          name: "Mobile application",
          icon: (
            <ProjectTile backgroundColor={"#1F845A"}>
              <Icon size={"xs"}>
                <DeviceMobileIcon  />
              </Icon>
            </ProjectTile>
          ),
        },
      ],
      recent: [
        {
          id: getId(),
          href: "#",
          name: "Attachments",
          icon: (
            <ProjectTile backgroundColor={"#5B7F24"}>
              <ImageIcon label="" color="currentColor" />
            </ProjectTile>
          ),
        },
        {
          id: getId(),
          href: "#",
          name: "Audit",
          icon: (
            <ProjectTile backgroundColor={"#AE4787"}>
              <ScorecardIcon label="" color="currentColor" />
            </ProjectTile>
          ),
        },
        {
          id: getId(),
          href: "#",
          name: "Dark mode",
          icon: (
            <ProjectTile backgroundColor={"#6B6E76"}>
              <ThemeIcon label="" color="currentColor" />
            </ProjectTile>
          ),
        },
        {
          id: getId(),
          href: "#",
          name: "Visualization",
          icon: (
            <ProjectTile backgroundColor={"#1868DB"}>
              <ChartBarIcon label="" />
            </ProjectTile>
          ),
        },
        {
          id: getId(),
          href: "#",
          name: "Basketball tournament",
          icon: (
            <ProjectTile backgroundColor={"#BD5B00"}>
              <BasketballIcon label="" />
            </ProjectTile>
          ),
        },
      ],
    },
    filters: [
      {
        id: getId(),
        name: "Filter 1",
        href: "#",
        icon: <FilterIcon label="" />,
        children: [
          {
            id: getId(),
            name: "Filter 1.1",
            href: "#",
            icon: <FilterIcon label="" />,
            children: [],
          },
          {
            id: getId(),
            name: "Filter 1.2",
            href: "#",
            icon: <FilterIcon label="" />,
            children: [],
          },
          {
            id: getId(),
            name: "Filter 1.3",
            href: "#",
            icon: <FilterIcon label="" />,
            children: [],
          },
        ],
      },
      {
        id: getId(),
        name: "Filter 2",
        href: "#",
        icon: <FilterIcon label="" />,
        children: [
          {
            id: getId(),
            name: "Filter 2.1",
            href: "#",
            icon: <FilterIcon label="" />,
            children: [
              {
                id: getId(),
                name: "Filter 2.1.1",
                href: "#",
                icon: <FilterIcon label="" />,
                children: [],
              },
              {
                id: getId(),
                name: "Filter 2.1.2",
                href: "#",
                icon: <FilterIcon label="" />,
                children: [],
              },
              {
                id: getId(),
                name: "Filter 2.1.3",
                href: "#",
                icon: <FilterIcon label="" />,
                children: [],
              },
            ],
          },
          {
            id: getId(),
            name: "Filter 2.2",
            href: "#",
            icon: <FilterIcon label="" />,
            children: [],
          },
        ],
      },
      {
        id: getId(),
        name: "Filter 3",
        href: "#",
        icon: <FilterIcon label="" />,
        children: [],
      },
      {
        id: getId(),
        name: "Filter 4",
        href: "#",
        icon: <FilterIcon label="" />,
        children: [],
      },
    ],
  }
}

const topLevelItemKey = Symbol("top-level")

type TTopLevelItemData = {
  value: TTopLevelItem
  [topLevelItemKey]: true
}

export function getTopLevelItemData(value: TTopLevelItem): TTopLevelItemData {
  return {
    value,
    [topLevelItemKey]: true,
  }
}

export function isTopLevelItemData(data: Record<string | symbol, unknown>): data is TTopLevelItemData {
  return data[topLevelItemKey] === true
}
