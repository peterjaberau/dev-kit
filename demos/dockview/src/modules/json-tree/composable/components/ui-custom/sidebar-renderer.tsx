import { useResourceManager, useResource } from "../../actors"
import { useSidebarDragDrop } from "../../hooks/use-sidebar-drag-drop"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui-custom/animated-collapsible"
import * as React from "react"
import { chakra } from "@chakra-ui/react"
import { isGroup } from "../../shared/utils"
import { DropTargetItem } from "../drop.target-item"
import { VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"



export const SidebarRenderer = () => {
  const { data: projects, resourceRef: projectsRef } = useResource({ resourceId: "projects" })
  const { data: groups, resourceRef: groupsRef } = useResource({ resourceId: "projectGroups" })

  // Drag and drop - consolidated hooks
  const { handleDrop: handleProjectDrop } = useSidebarDragDrop()

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        <DropTargetItem
          id="sidebar-root"
          index={-1}
          mode="tree-item"
          currentLevel={0}
          indentPerLevel={24}
          getData={() => ({
            type: "sidebar-root-drop-target",
          })}
          onDrop={handleProjectDrop}
        >
          {/* Render root group items in order (projects and groups) */}
          {groups.items.map((item: any, index: number) => {
            if (isGroup(item)) {
              return <></>
            }
          })}
        </DropTargetItem>
      </SidebarMenu>
    </SidebarGroupContent>
  )
}
