'use client'

import { Box, Button, Card, CodeBlock, HStack, IconButton, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { LuCode, LuEye } from 'react-icons/lu'
import { examples, shikiAdapter } from './data'

 const Index = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

  return (
    <Card.Root my="6" maxW="4xl" mx="auto" bg="bg" overflow="hidden">
      <Card.Header p="0" borderBottomWidth="1px" borderColor="border.muted">
        <HStack gap="0">
          <Button
            px="4"
            py="3"
            size="sm"
            rounded="0"
            colorPalette="gray"
            onClick={() => setActiveTab('preview')}
            variant={activeTab === 'preview' ? 'solid' : 'ghost'}
          >
            <LuEye size="16" />
            Preview
          </Button>
          <Button
            px="4"
            py="3"
            size="sm"
            rounded="0"
            colorPalette="gray"
            onClick={() => setActiveTab('code')}
            variant={activeTab === 'code' ? 'solid' : 'ghost'}
          >
            <LuCode size="16" />
            Code
          </Button>
        </HStack>
      </Card.Header>

      <Card.Body p="0">
        {activeTab === 'preview' ? (
          <Box
            p="8"
            bg="bg"
            minH="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Input placeholder="Enter your email" maxW="md" color="white" />
          </Box>
        ) : (
          <Box p="0" bg="bg">
            <CodeBlock.AdapterProvider value={shikiAdapter}>
              <CodeBlock.Root
                rounded="0"
                code={examples.input.code}
                language={examples.input.language}
              >
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
          </Box>
        )}
      </Card.Body>
    </Card.Root>
  )
}
export default Index
