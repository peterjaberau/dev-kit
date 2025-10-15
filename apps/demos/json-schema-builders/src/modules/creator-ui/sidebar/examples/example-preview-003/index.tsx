'use client'

import {
  Button,
  CodeBlock,
  Container,
  createListCollection,
  Flex,
  HStack,
  Popover,
  Portal,
  Select,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { LuCopy, LuExternalLink } from 'react-icons/lu'
import { popoverExample, shikiAdapter } from './data'

const Index = () => {
  return (
    <Container maxW="4xl" py="6">
      <VStack align="flex-start" gap="0" borderWidth="1px" rounded="l2">
        <ExamplePreview />
        <ExampleCode />
      </VStack>
    </Container>
  )
}

const stylingFrameworks = createListCollection({
  items: [
    { label: 'CSS Modules', value: 'css-modules' },
    { label: 'Panda CSS', value: 'panda-css' },
    { label: 'Vanilla CSS', value: 'vanilla-css' },
    { label: 'Tailwind CSS', value: 'tailwind-css' },
  ],
})

const ExampleCode = () => {
  const [selectedTab, setSelectedTab] = useState('tsx')

  const currentExample = selectedTab === 'tsx' ? popoverExample.tsx : popoverExample.cssModules

  const examples = Object.values(popoverExample)

  return (
    <>
      <Tabs.Root
        w="full"
        size="sm"
        variant="subtle"
        defaultValue="tsx"
        value={selectedTab}
        onValueChange={(details) => setSelectedTab(details.value)}
      >
        <Tabs.List
          py="1"
          px="2"
          w="full"
          bg="bg.panel"
          overflowX="auto"
          alignItems="center"
          borderTopWidth="1px"
          borderBottomWidth="1px"
          borderColor="border.muted"
        >
          {examples.map((example) => (
            <Tabs.Trigger
              h="7"
              flexShrink={0}
              textStyle="xs"
              fontWeight="semibold"
              key={example.title}
              fontFamily="mono"
              value={example.language}
            >
              {example.title}
            </Tabs.Trigger>
          ))}
          <HStack flex="1" justify="flex-end">
            <Select.Root
              size="xs"
              w="auto"
              collection={stylingFrameworks}
              defaultValue={['css-modules']}
              positioning={{
                sameWidth: false,
                placement: 'bottom-end',
              }}
            >
              <Select.HiddenSelect />
              <Select.Control fontWeight="medium">
                <Select.Trigger>
                  <Select.ValueText placeholder="Select framework" />
                  <Select.Indicator />
                </Select.Trigger>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {stylingFrameworks.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            <Button colorPalette="gray" variant="ghost" size="xs">
              CodeSandbox <LuExternalLink />
            </Button>
            <Button colorPalette="gray" variant="ghost" size="xs">
              Copy <LuCopy />
            </Button>
          </HStack>
        </Tabs.List>
      </Tabs.Root>
      <CodeBlock.AdapterProvider value={shikiAdapter}>
        <CodeBlock.Root
          w="full"
          rounded="0"
          roundedBottom="l2"
          code={currentExample.code}
          language={currentExample.language}
        >
          <CodeBlock.Content>
            <CodeBlock.Code>
              <CodeBlock.CodeText />
            </CodeBlock.Code>
          </CodeBlock.Content>
        </CodeBlock.Root>
      </CodeBlock.AdapterProvider>
    </>
  )
}

const ExamplePreview = () => {
  return (
    <Flex w="full" minH="200px" alignItems="center" justifyContent="center">
      <Popover.Root>
        <Popover.Trigger>Click Me</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content p="3">
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Flex>
  )
}
export default Index
