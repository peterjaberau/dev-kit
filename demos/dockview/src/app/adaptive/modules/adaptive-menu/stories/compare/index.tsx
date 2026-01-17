"use client"
import JsonView from "react18-json-view"
import { Center, Container, GridItem, Heading, SimpleGrid, Stack, Textarea } from "@chakra-ui/react"
import RenderJira from "../jira"
import RenderJiraRefactor1 from "../jira-refactor-cycle1"
import React, { useEffect, useState } from "react"
// import { useMenuItem } from "#adaptive-menu/use-menu-item"
import { AdaptiveMenuActorInitiator } from "../init"
import { globalRegistry } from "#adaptive-registry"
import { useMenuItem } from "../../use-menu-item"
import { useMenuManager } from "#adaptive-menu/use-menu-manager"
import { AdaptiveTool } from "#adaptive-tool"

function Index() {
  const { menuItemContext, menuItemRef, menuItemState, dataInfo, menuItemChildrenIds, menuItemChildrenRef } =
    useMenuItem()
  const { menuManagerContext, menuManagerRef, menuManagerState } = useMenuManager()

    const topLevelMenuItems = () => {
      return menuItemChildrenIds.map((child, index) => {
          const childMenuItemSelector = useMenuItem({ actorRef: menuItemChildrenRef[child] })

          return {
            id: child,
            name: childMenuItemSelector.dataName,
            ...childMenuItemSelector.menuItemContext,
            childMenuItemSelector: childMenuItemSelector,
          }
          // return {
          //   menuItemContext: childMenuItemSelector.menuItemContext,
          //   menuItemRef: childMenuItemSelector.menuItemRef,
          //   menuItemState: childMenuItemSelector.menuItemState,
          //   dataInfo: childMenuItemSelector.dataInfo,
          //   menuItemChildrenIds: childMenuItemSelector.menuItemChildrenIds,
          //   menuItemChildrenRef: childMenuItemSelector.menuItemChildrenRef,
          // }

      })
    }

  return (
    <SimpleGrid columns={3} gap={10} h={"full"} w={"full"} px={6}>
      <GridItem colSpan={1} flex={1}>
        <AdaptiveTool.Root
          actions={[]}
          title={"Jira"}
          // actions={[
          //   {
          //     label: "Parse HTML",
          //     trigger: () => {
          //       setParsedHtml(htmlInput)
          //       console.log("html.....")
          //     },
          //     disabled: !htmlInput.trim(),
          //   },
          // ]}
        >
          <RenderJira />
        </AdaptiveTool.Root>
      </GridItem>
      <GridItem colSpan={1} flex={1}>
        <AdaptiveTool.Root
          title={"Jira Refactor Cycle 1"}
          actions={[]}
          // actions={[
          //   {
          //     label: "Parse HTML",
          //     trigger: () => {
          //       setParsedHtml(htmlInput)
          //       console.log("html.....")
          //     },
          //     disabled: !htmlInput.trim(),
          //   },
          // ]}
        >
          <RenderJiraRefactor1 />
        </AdaptiveTool.Root>
      </GridItem>
      <GridItem colSpan={1} flex={1}>
        <AdaptiveTool.Root
          actions={[]}
          title={"Inspect"}
          // actions={[
          //   {
          //     label: "Parse HTML",
          //     trigger: () => {
          //       setParsedHtml(htmlInput)
          //       console.log("html.....")
          //     },
          //     disabled: !htmlInput.trim(),
          //   },
          // ]}
        >
          <JsonView
            src={{
              Jira: {},
              JiraRector1: {
                menuManager: { menuManagerContext, menuManagerRef, menuManagerState },
                menuItemRoot: {
                  menuItemContext,
                  menuItemRef,
                  menuItemState,
                  dataInfo,
                  menuItemChildrenIds,
                  menuItemChildrenRef,
                },
                topLevelMenuItems: topLevelMenuItems(),
              },
            }}
            collapsed={2}
            customizeCopy={(node, nodeMeta) => console.log("---node----", { node, nodeMeta })}
            theme="github"
            displaySize
            displayArrayIndex
            style={{ fontSize: 13, fontWeight: "bold" }}
          />
          <JsonView
            src={{
              topLevelMenuItems: topLevelMenuItems(),
            }}
            collapsed={3}
            customizeCopy={(node, nodeMeta) => console.log("---node----", { node, nodeMeta })}
            theme="github"
            displaySize
            displayArrayIndex
            style={{ fontSize: 13, fontWeight: "bold" }}
          />
        </AdaptiveTool.Root>
      </GridItem>
    </SimpleGrid>
  )
}

export default Index
