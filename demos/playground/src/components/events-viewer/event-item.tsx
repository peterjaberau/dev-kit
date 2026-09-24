import { Accordion, Box, HStack, Icon, Span, Stack, Tabs, Text } from '@chakra-ui/react'
import { LuChevronRight, LuClock } from 'react-icons/lu'
import type { WebhookEvent } from './data'
import { WebhookEventStatusIconWithColor } from './webhook-event-status'
import { WebhookStatusCodeBadge } from './webhook-status'

interface EventItemProps {
  event: WebhookEvent
}

export const EventItem = (props: EventItemProps) => {
  const { event } = props
  return (
    <Accordion.Item value={event.id} _last={{ borderBottomWidth: '0' }}>
      <Accordion.ItemTrigger w="full" gap="3" py="3" px="4">
        <HStack flex="1">
          <Accordion.ItemIndicator
            color="fg.muted"
            _open={{ rotate: '90deg' }}
            _icon={{ boxSize: '3' }}
          >
            <LuChevronRight />
          </Accordion.ItemIndicator>
          <WebhookEventStatusIconWithColor status={event.status} />
          <Span textStyle="sm" fontFamily="mono" fontWeight="medium">
            {event.event}
          </Span>
          <WebhookStatusCodeBadge code={event.statusCode} />
        </HStack>

        <HStack gap="3" hideBelow="sm">
          <Text textStyle="xs" color="fg.muted">
            {event.latency ? `${event.latency}ms` : '—'}
          </Text>
          <HStack gap="1" color="fg.muted" hideBelow="md">
            <Icon fontSize="xs">
              <LuClock />
            </Icon>
            <Text textStyle="xs">{event.timestamp}</Text>
          </HStack>
        </HStack>
      </Accordion.ItemTrigger>

      <Accordion.ItemContent>
        <Accordion.ItemBody p="0" bg="bg.subtle">
          <Tabs.Root defaultValue="request" size="sm" variant="outline" colorPalette="gray">
            <Tabs.List px="4" pt="2">
              <Tabs.Trigger value="request">Request</Tabs.Trigger>
              <Tabs.Trigger value="response">Response</Tabs.Trigger>
              <Tabs.Trigger value="headers">Headers</Tabs.Trigger>
            </Tabs.List>
            <Box p="4">
              <Tabs.Content value="request" p="0">
                <Stack>
                  <Box textStyle="xs" color="fg.muted" fontWeight="medium">
                    Request body
                  </Box>
                  <Box
                    bg="bg"
                    borderWidth="1px"
                    rounded="md"
                    p="3"
                    fontFamily="mono"
                    textStyle="xs"
                    whiteSpace="pre"
                    overflowX="auto"
                  >
                    {event.requestBody ?? 'No request body'}
                  </Box>
                </Stack>
              </Tabs.Content>
              <Tabs.Content value="response" p="0">
                <Stack>
                  <HStack justify="space-between">
                    <Box textStyle="xs" color="fg.muted" fontWeight="medium">
                      Response body
                    </Box>
                    <WebhookStatusCodeBadge code={event.statusCode} />
                  </HStack>
                  <Box
                    bg="bg"
                    borderWidth="1px"
                    rounded="md"
                    p="3"
                    fontFamily="mono"
                    textStyle="xs"
                    whiteSpace="pre"
                    overflowX="auto"
                  >
                    {event.responseBody ?? 'No response body'}
                  </Box>
                </Stack>
              </Tabs.Content>
              <Tabs.Content value="headers" p="0">
                <Stack gap="4">
                  <Stack>
                    <Box textStyle="xs" color="fg.muted" fontWeight="medium">
                      Request headers
                    </Box>
                    <Box bg="bg" borderWidth="1px" rounded="md" divideY="1px" overflow="hidden">
                      {event.requestHeaders &&
                        Object.entries(event.requestHeaders).map(([key, value]) => (
                          <HStack key={key} px="3" py="2" gap="4">
                            <Text textStyle="xs" fontFamily="mono" fontWeight="medium">
                              {key}
                            </Text>
                            <Text textStyle="xs" fontFamily="mono" color="fg.muted" truncate>
                              {value}
                            </Text>
                          </HStack>
                        ))}
                    </Box>
                  </Stack>
                  {event.responseHeaders && Object.keys(event.responseHeaders).length > 0 && (
                    <Stack>
                      <Box textStyle="xs" color="fg.muted" fontWeight="medium">
                        Response headers
                      </Box>
                      <Box bg="bg" borderWidth="1px" rounded="md" divideY="1px" overflow="hidden">
                        {Object.entries(event.responseHeaders).map(([key, value]) => (
                          <HStack key={key} px="3" py="2" gap="4" textStyle="xs" fontFamily="mono">
                            <Span fontWeight="medium">{key}</Span>
                            <Span color="fg.muted" truncate>
                              {value}
                            </Span>
                          </HStack>
                        ))}
                      </Box>
                    </Stack>
                  )}
                </Stack>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  )
}
