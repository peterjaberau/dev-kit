import React, { forwardRef, ReactNode } from "react"
import { chakra, HStack } from "@chakra-ui/react"
import { useControlled } from "#adaptive-shared/lib/hooks"
import { MenuListItem } from "./menu-list-item"
import { IsExpandedContext, OnExpansionToggleContext, SetIsExpandedContext } from "./expandable-menu-item-context"

export type ExpandableMenuItemProps = {
  isExpanded?: boolean
  isDefaultExpanded?: boolean
  onExpansionToggle?: (isExpanded: boolean) => void
  children: ReactNode
  dropIndicator?: ReactNode
}


export const ExpandableMenuItem = forwardRef((props: any, ref: any) => {
  const {
    isExpanded: isExpandedControlled,
    isDefaultExpanded = false,
    onExpansionToggle,
    children,
    dropIndicator,
    css,
    ...rest
  } = props

  const [isExpanded, setIsExpanded] = useControlled(isExpandedControlled, () => isDefaultExpanded)





  return (
    <IsExpandedContext.Provider value={isExpanded}>
      <SetIsExpandedContext.Provider value={setIsExpanded}>
        <OnExpansionToggleContext.Provider value={onExpansionToggle ?? null}>
          {/* Wrapping in a `li` to group all the composable elements together, as part of the disclosure pattern */}
          <MenuListItem ref={ref}>
            {/* Adding `position:relative` only when it's needed by the drop indicator */}
            <chakra.div
              css={{
                position: dropIndicator ? "relative" : undefined,
              }}
            >
              {children}
              {dropIndicator}
            </chakra.div>
          </MenuListItem>
        </OnExpansionToggleContext.Provider>
      </SetIsExpandedContext.Provider>
    </IsExpandedContext.Provider>
  )


})


import { Collapsible, Stack, useCollapsible, mergeRefs } from "@chakra-ui/react"
export const CollapsibleMenuItem = forwardRef((props: any, ref: any) => {
  const {
    isExpanded: isExpandedControlled,
    isDefaultExpanded = false,
    onExpansionToggle,
    children,
    dropIndicator,
    css,
    ...rest
  } = props


  const [isExpanded, setIsExpanded] = useControlled(isExpandedControlled, () => isDefaultExpanded)

  const collapsible = useCollapsible({
    open: isExpanded,
  })


  return (
    <>
      <Collapsible.RootProvider value={collapsible}>
        <MenuListItem ref={ref}>
          <chakra.div
            css={{
              position: dropIndicator ? "relative": undefined,
            }}
          >
            {children}
            {dropIndicator}
          </chakra.div>
        </MenuListItem>
      </Collapsible.RootProvider>

      <IsExpandedContext.Provider value={isExpanded}>
        <SetIsExpandedContext.Provider value={setIsExpanded}>
          <OnExpansionToggleContext.Provider value={onExpansionToggle ?? null}>
            {/* Wrapping in a `li` to group all the composable elements together, as part of the disclosure pattern */}
            <MenuListItem ref={ref}>
              {/* Adding `position:relative` only when it's needed by the drop indicator */}
              <chakra.div
                css={{
                  ...css,
                  position: dropIndicator && "relative",
                }}
              >
                {children}
                {dropIndicator}
              </chakra.div>
            </MenuListItem>
          </OnExpansionToggleContext.Provider>
        </SetIsExpandedContext.Provider>
      </IsExpandedContext.Provider>
    </>
  )
})
