'use client'

import {
  Button,
  Card,
  Clipboard,
  Container,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { LuCopy } from 'react-icons/lu'

const Index = () => {
  const apiKeyValue = `eyJ0e--xxxxxxxx-xxxxx`

  return (
    <Container py="20" maxW="lg">
      <Card.Root size="sm">
        <Card.Header>
          <Heading as="h2" textStyle="xl">
            API key: My Product
          </Heading>
        </Card.Header>

        <Card.Body>
          <Stack gap="4">
            <HStack align="flex-start" gap="2" position="relative">
              <Clipboard.Root w="full" value={apiKeyValue} colorPalette="gray">
                <Clipboard.Input asChild>
                  <Textarea
                    value={apiKeyValue}
                    // readOnly
                    // rows={4}
                    // fontFamily="mono"
                    // fontSize="sm"
                    // resize="none"
                    // borderColor="border.muted"
                    // bg="bg.subtle"
                  />
                </Clipboard.Input>
                <Clipboard.Trigger asChild>
                  <IconButton
                    aria-label="Copy API key"
                    size="xs"
                    variant="subtle"
                    colorPalette="gray"
                    flexShrink={0}
                    position="absolute"
                    right="2"
                    top="2"
                  >
                    <LuCopy />
                  </IconButton>
                </Clipboard.Trigger>
              </Clipboard.Root>
            </HStack>

            <Text fontSize="sm" color="fg.muted" lineHeight="1.5">
              Here is your new API key.{' '}
              <Text as="span" fontWeight="semibold">
                This is the only time the key will ever be displayed!
              </Text>{' '}
              So keep it safe and make sure you've copied it down before closing this window.
            </Text>
          </Stack>
        </Card.Body>

        <Card.Footer justifyContent="flex-end" pb="6">
          <Button size="sm" variant="subtle" colorPalette="gray" width="full">
            Close
          </Button>
        </Card.Footer>
      </Card.Root>
    </Container>
  )
}
export default Index
