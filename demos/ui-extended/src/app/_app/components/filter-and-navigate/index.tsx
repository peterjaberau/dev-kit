'use client'

import { HStack, Span } from '@chakra-ui/react'
import { MenuCategories, MenuSelectedCategoryItems } from './menus'

export const FilterAndNavigate= () => {

  return (
    <HStack gap="3">
      <MenuCategories />
      <Span color="fg.subtle">/</Span>
      <MenuSelectedCategoryItems />
    </HStack>
  )
}
