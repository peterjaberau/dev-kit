'use client'

import { Accordion, Box, Button, Container, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { LuRefreshCw } from 'react-icons/lu'
import { webhookEvents } from './data'
import { EventItem } from './event-item'

export const Block = () => {
  return (
    <Container maxW="5xl" py="20">
      <Stack gap="6">
        <HStack justify="space-between" align="center">
          <Stack gap="1">
            <Heading size="xl">Event log</Heading>
            <Text color="fg.muted" textStyle="sm">
              Expand any event to inspect request and response payloads.
            </Text>
          </Stack>
          <Button variant="outline" size="sm" colorPalette="gray">
            <LuRefreshCw />
            Refresh
          </Button>
        </HStack>

        <Box borderWidth="1px" rounded="l2">
          <Accordion.Root collapsible>
            {webhookEvents.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </Accordion.Root>
        </Box>
      </Stack>
    </Container>
  )
}
