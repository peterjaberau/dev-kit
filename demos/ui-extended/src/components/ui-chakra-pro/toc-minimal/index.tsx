'use client'

import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { LuText } from 'react-icons/lu'
import { tocData } from './data'
import { TocLink } from './toc-link'
import { useScrollSpy } from './use-scroll-spy'

 const Index = () => {
  const [activeId, setActiveId] = useState<string[]>([tocData[0].id])

  useScrollSpy({
    data: tocData,
    setActiveId,
  })

  const handleClick = (id: string) => {
    setActiveId([id])
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box top="6" w="full" maxW="xs" overflowY="auto" position="sticky" maxH="calc(100vh - 3rem)">
      <HStack alignItems="center" mb="4" px="3">
        <LuText />
        <Heading textStyle="sm" fontWeight="medium">
          On this page
        </Heading>
      </HStack>

      <Stack gap="0">
        {tocData.map((item: any) => {
          return (
            <TocLink
              key={item.id}
              variant="minimal"
              css={{
                '--toc-item-depth': item.level,
              }}
              onClick={() => handleClick(item.id)}
              data-current={activeId.includes(item.id) || undefined}
            >
              {item.text}
            </TocLink>
          )
        })}
      </Stack>
    </Box>
  )
}
export default Index
