"use client"
import { ComponentRenderer } from "../../../registry"
import { ScrollAreaWrapper } from "../../common"
import { Stack } from "@chakra-ui/react"

export const PanelDynamicRendered = (props: any) => {


  const { id, toolbar = null, props: extraProps = null } = props

  console.log('--PanelDynamicRendered---', extraProps)

  return (
    <Stack gap="3" w="full" h="full">
      {toolbar && (
        <Stack px={4} py={2}>
          {toolbar}
        </Stack>
      )}

      <ScrollAreaWrapper>
        <ComponentRenderer id={id} props={extraProps} />
      </ScrollAreaWrapper>
    </Stack>
  )
}
