"use client"
import { Box, Icon, IconButton, CloseButton, Button, HStack, RadioCard } from "@chakra-ui/react"
import { Pane } from "#components/ui/pane"
import { LuServer as IconServer, LuChevronRight, LuStar, LuPlus } from "react-icons/lu"
import { BiSolidTerminal } from "react-icons/bi"
import { LuComponent } from "react-icons/lu"
import { memo, useMemo } from "react"

import { LuArrowRight, LuBriefcase, LuCode, LuHeadphones, LuPencil, LuRocket, LuScale, LuSearch, LuSettings, LuSpeaker, LuTrendingUp, LuUsers, LuWallet } from "react-icons/lu"
import { useEffect, useState } from "react"

const panelTypesList = [
  { label: "Marketing", icon: <LuSpeaker />, value: "marketing" },
  { label: "Sales", icon: <LuBriefcase />, value: "sales" },
  { label: "Engineering", icon: <LuCode />, value: "engineering" },
  { label: "Design", icon: <LuPencil />, value: "design" },
  { label: "Product", icon: <LuRocket />, value: "product" },
  { label: "Customer Support", icon: <LuHeadphones />, value: "support" },
  { label: "Finance", icon: <LuWallet />, value: "finance" },
  { label: "Human Resources", icon: <LuUsers />, value: "hr" },
  { label: "Operations", icon: <LuSettings />, value: "operations" },
  { label: "Research", icon: <LuSearch />, value: "research" },
  { label: "Legal", icon: <LuScale />, value: "legal" },
  { label: "Business Development", icon: <LuTrendingUp />, value: "business-dev" },
]

const NewPanelContent = memo(() => (
  <RadioCard.Root align="center">
    <HStack wrap="wrap" gap="3">
      {panelTypesList.map((item) => (
        <RadioCard.Item flex="0" whiteSpace="nowrap" key={item.value} value={item.value}>
          <RadioCard.ItemHiddenInput />
          <RadioCard.ItemControl>
            {item.icon}
            <RadioCard.ItemText>{item.label}</RadioCard.ItemText>
          </RadioCard.ItemControl>
        </RadioCard.Item>
      ))}
    </HStack>
  </RadioCard.Root>
))

const panelRegister = {
  "empty-panel": {
    title: "Empty Panel",
    icon: <LuComponent />,
    content: () => <>empty panel</>,
  },
  "new-panel": {
    title: "New Panel",
    icon: <BiSolidTerminal />,
    content: NewPanelContent,
  },
  "renderer-panel": {
    title: "Renderer Panel",
    icon: <LuComponent />,
    content: () => <>renderer panel example</>,
  },
}




export function RendererPane({ panelType }: { panelType: keyof typeof panelRegister }) {
  const panel = useMemo(() => panelRegister[panelType] ?? panelRegister["empty-panel"], [panelType])
  const ComponentContent = panel.content

  return (
    <Pane
      title={panel.title}
      icon={panel.icon}
      leftSection={
        <IconButton variant="ghost" size="xs" borderRadius="full">
          <LuPlus />
        </IconButton>
      }
      rightSection={
        <HStack>
          <IconButton size="sm" variant="ghost">
            <LuStar />
          </IconButton>
        </HStack>
      }
    >
      <ComponentContent />
    </Pane>
  )
}
