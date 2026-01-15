import React, { type Ref, useContext, useEffect, useRef, useState } from "react"

import invariant from "tiny-invariant"
import { AdaptiveMenu } from "#adaptive-menu"

import { IconButton, chakra } from "@chakra-ui/react"
import { ShowMoreHorizontalIcon } from "../icons"
import { TagIcon } from "../icons"
import { GroupDropIndicator } from "#adaptive-menu/drag-and-drop/group-drop-indicator"
import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"
// import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
// import { MenuList } from '@atlaskit/navigation-system/side-nav-items/menu-list';
// import {
// 	MenuSection,
// 	MenuSectionHeading,
// } from '@atlaskit/navigation-system/side-nav-items/menu-section';
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"

import { getProjectData, isProjectData, type TProject } from "../data"
import { RegistryContext } from "../registry"
import { useDispatch } from "../state-context"

export function ProjectGroup({ name, projects }: { name: "starred" | "recent"; projects: TProject[] }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<"idle" | "is-over">()

  useEffect(() => {
    const element = ref.current

    // might have no projects
    if (!element) {
      return
    }

    return dropTargetForElements({
      element,
      canDrop: ({ source }) => {
        const data = source.data
        if (!isProjectData(data)) {
          return false
        }
        // only allowing projects to be dropped in the same group
        return Boolean(projects.find((project) => project.id === data.id))
      },
      onDragStart() {
        setState("is-over")
      },
      onDragEnter() {
        setState("is-over")
      },
      onDragLeave() {
        setState("idle")
      },
      onDrop() {
        setState("idle")
      },
    })
  })

  if (!projects.length) {
    return null
  }

  return (
    <GroupDropIndicator isActive={state === "is-over"} ref={ref} testId={`project-group-${name}`}>
      <AdaptiveMenu.MenuSection isMenuListItem>
        <AdaptiveMenu.MenuSectionHeading>
          <chakra.span css={{ textTransform: "capitalize" }}>{name}</chakra.span>
        </AdaptiveMenu.MenuSectionHeading>
        <AdaptiveMenu.MenuList>
          {projects.map((project, index) => (
            <Project project={project} key={project.id} group={projects} groupName={name} indexInGroup={index} />
          ))}
        </AdaptiveMenu.MenuList>
      </AdaptiveMenu.MenuSection>
    </GroupDropIndicator>
  )
}

function Project({
  project,
  group,
  groupName,
  indexInGroup,
}: {
  project: TProject
  group: TProject[]
  groupName: "recent" | "starred"
  indexInGroup: number
}) {
  const { state, draggableAnchorRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => getProjectData({ project, groupName }),
      getDragPreviewPieces: () => ({
        elemBefore: project.icon,
        content: project.name,
      }),
    },
    dropTarget: {
      getData: () => getProjectData({ project, groupName }),
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }: any) => {
        const data = source.data
        // Only allowing projects to be dropped in the same group
        return isProjectData(data) && data.groupName === groupName
      },
    },
  })

  // register element
  const registry = useContext(RegistryContext)
  useEffect(() => {
    const element = draggableAnchorRef.current
    invariant(element)
    registry?.registerProject({ projectId: project.id, element })
  }, [registry, draggableAnchorRef, project.id])

  return (
    <>
      <AdaptiveMenu.ItemButton
        href={project.href}
        elemBefore={project.icon}
        ref={draggableAnchorRef}
        isDragging={state.type === "dragging"}
        hasDragIndicator
        dropIndicator={dropIndicator}
        visualContentRef={dropTargetRef}
      >
        {project.name}
      </AdaptiveMenu.ItemButton>
      {dragPreview}
    </>
  )
}
