'use client'

import {
  Button,
  CodeBlock,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  Tabs,
} from '@chakra-ui/react'
import { examples, shikiAdapter } from './data'

 const Index = () => {
  return (
    <Container maxW="4xl" py="6">
      <Tabs.Root size="sm" unmountOnExit variant="subtle" defaultValue="preview">
        <Tabs.List mb="4" width="full">
          <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
          <Tabs.Trigger value="code">Code</Tabs.Trigger>
          <HStack flex="1" justify="flex-end">
            <Button size="sm" colorPalette="gray" variant="ghost" aria-label="Open in Stackblitz">
              <svg fill="#1389FD" viewBox="0 0 32 32" width="1em" height="1em">
                <title>StackBlitz Icon</title>
                <path d="M5.853 18.647h8.735L9.45 31l16.697-17.647h-8.735L22.55 1z" />
              </svg>
              Stackblitz
            </Button>
          </HStack>
        </Tabs.List>
        <Tabs.ContentGroup borderWidth="1px" rounded="l3" overflow="hidden">
          <Tabs.Content value="preview" mt="0!" padding={{ base: '6', sm: '10' }}>
            <ExamplePreview />
          </Tabs.Content>
          <Tabs.Content value="code" pt="0!">
            <ExampleCode />
          </Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>
    </Container>
  )
}

const ExamplePreview = () => {
  return (
    <Flex minH="200px" alignItems="center" justifyContent="center">
      <Input maxW="md" placeholder="Enter your email" />
    </Flex>
  )
}

const ExampleCode = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root rounded="l3" code={examples.input.code} language={examples.input.language}>
        <CodeBlock.Header>
          <CodeBlock.Title>{examples.input.title}</CodeBlock.Title>
          <CodeBlock.CopyTrigger asChild>
            <IconButton variant="ghost" size="2xs">
              <CodeBlock.CopyIndicator />
            </IconButton>
          </CodeBlock.CopyTrigger>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <CodeBlock.Code>
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}
export default Index
