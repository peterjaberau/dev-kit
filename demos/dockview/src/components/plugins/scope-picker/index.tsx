"use client"
import { HStack, RadioCard } from "@chakra-ui/react"
import { memo, useMemo } from "react"

import {
  LuBriefcase,
  LuCode,
  LuHeadphones,
  LuPencil,
  LuRocket,
  LuScale,
  LuSearch,
  LuSettings,
  LuSpeaker,
  LuTrendingUp,
  LuUsers,
  LuWallet,
} from "react-icons/lu"

const items = [
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

export const ScopePickerPlugin = memo(() => (
  <RadioCard.Root align="center" size='sm'>
    <HStack wrap="wrap" gap="3" p={4} justifyContent='center'>
      {items.map((item: any) => (
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

