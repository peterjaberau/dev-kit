'use client'

import { Box, HStack, Icon, Span, Stack } from '@chakra-ui/react'
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
    <Box top="6" width="xs" overflowY="auto" position="sticky" maxH="calc(100vh - 3rem)">
      <HStack mb="4">
        <Icon as={LuText} color="fg.subtle" />
        <Span fontWeight="medium" textStyle="sm">
          On this page
        </Span>
      </HStack>

      <Stack gap="0">
        {tocData.map((item) => {
          return (
            <TocLink
              key={item.id}
              css={{
                '--toc-item-depth': item.level,
              }}
              emphasized={item.level === 1}
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
