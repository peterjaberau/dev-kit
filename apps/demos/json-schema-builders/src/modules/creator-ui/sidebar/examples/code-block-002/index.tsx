'use client'

import { ClientOnly, CodeBlock, HStack, IconButton } from '@chakra-ui/react'
import { LuCopy, LuSparkles } from 'react-icons/lu'
import { useColorMode, Tooltip } from '@dev-kit/components'
import { helloWorldFile, shikiAdapter } from './data'

const Index = () => {
  const { colorMode } = useColorMode()

  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <ClientOnly>
        {() => (
          <CodeBlock.Root
            mb="8"
            mt="5"
            size="md"
            mx="auto"
            maxW="4xl"
            rounded="2xl"
            code={helloWorldFile.code}
            position="relative"
            language={helloWorldFile.language}
            meta={{
              colorScheme: colorMode,
            }}
          >
            <CodeBlock.Header
              py="2"
              display="flex"
              textStyle="xs"
              roundedTop="sm"
              alignItems="center"
              fontWeight="medium"
              borderBottomWidth="1px"
              justifyContent="space-between"
            >
              <CodeBlock.Title textStyle="xs" fontWeight="medium">
                {helloWorldFile.title}
              </CodeBlock.Title>

              <HStack gap="1.5" zIndex="10">
                <Tooltip content="Copy">
                  <CodeBlock.CopyTrigger asChild>
                    <IconButton size="2xs" rounded="md" variant="ghost" aria-label="Copy content">
                      <LuCopy />
                    </IconButton>
                  </CodeBlock.CopyTrigger>
                </Tooltip>

                <Tooltip content="Ask AI">
                  <IconButton size="2xs" rounded="md" variant="ghost" aria-label="Ask AI">
                    <LuSparkles />
                  </IconButton>
                </Tooltip>
              </HStack>
            </CodeBlock.Header>

            <CodeBlock.Content rounded="xl" textStyle="sm" overflowX="auto">
              <CodeBlock.Code fontFamily="mono" whiteSpace="pre" fontVariantLigatures="none">
                <CodeBlock.CodeText />
              </CodeBlock.Code>
            </CodeBlock.Content>
          </CodeBlock.Root>
        )}
      </ClientOnly>
    </CodeBlock.AdapterProvider>
  )
}

export default Index
