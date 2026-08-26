import { IDockviewHeaderActionsProps } from "#modules/dockview/core"
import { HStack } from "@chakra-ui/react"
import { IconButtonRender } from "../../icons"
import * as React from "react"

export const PrefixHeaderActions = (props: IDockviewHeaderActionsProps) => {
  return (
    <HStack
      css={{
        color: "var(--dv-activegroup-visiblepanel-tab-color)",
      }}
    >
      <IconButtonRender name="menu" variant="plain" />
    </HStack>
  )
}
