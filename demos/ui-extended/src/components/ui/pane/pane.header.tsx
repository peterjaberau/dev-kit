"use client"

import { Card, Icon, HStack, SegmentGroup } from "@chakra-ui/react"

export interface PaneHeaderProps {
  title?: string | any
  icon?: React.ReactNode
  leftSection?: React.ReactNode
  infoSection?: React.ReactNode
  rightSection?: React.ReactNode
  withDivider?: boolean
  [key: string]: any
}

export const PaneHeader = ({ title, icon, leftSection, infoSection, rightSection, withDivider }: PaneHeaderProps) => {
  return (
    (title || icon || leftSection || rightSection || infoSection) && (
      <Card.Header
        paddingX={2}
        paddingY={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={withDivider ? "1px" : "0px"}
      >
        <HStack w={'full'}>
          <HStack flex={1}>
            {leftSection}
            <SegmentGroup.Root defaultValue={title} size={'sm'} >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items  items={[{
                value: title,
                label: (
                  <HStack>
                    {icon && <Icon>{icon}</Icon>}
                    {title}
                  </HStack>
                )
              }]} />
            </SegmentGroup.Root>
            {infoSection}
          </HStack>
          <HStack justifyContent={'flex-end'} alignItems={'center'}>{rightSection}</HStack>
        </HStack>
      </Card.Header>
    )
  )
}
