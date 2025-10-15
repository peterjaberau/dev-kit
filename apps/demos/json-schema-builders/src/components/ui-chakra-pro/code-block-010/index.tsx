'use client'

import { Badge, CodeBlock, HStack, IconButton } from '@chakra-ui/react'
import { shikiAdapter, superheroCodeFile } from './data'

const Index = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root
        mb="8"
        mt="5"
        size="sm"
        mx="auto"
        maxW="4xl"
        maxLines={10}
        code={superheroCodeFile.code}
        language={superheroCodeFile.language}
        meta={{ showLineNumbers: true, highlightLines: [2, 4] }}
      >
        <CodeBlock.Header bg="bg.panel" py="2" borderBottomWidth="1px">
          <CodeBlock.Title textTransform="uppercase">Response</CodeBlock.Title>
          <HStack>
            <Badge colorPalette="green" fontWeight="normal" fontFamily="mono">
              status: 200
            </Badge>
            <Badge fontWeight="normal" fontFamily="mono">
              time: 500ms
            </Badge>
            <Badge fontWeight="normal" fontFamily="mono">
              size: 13b
            </Badge>
          </HStack>
          <CodeBlock.CopyTrigger asChild>
            <IconButton variant="ghost" size="2xs">
              <CodeBlock.CopyIndicator />
            </IconButton>
          </CodeBlock.CopyTrigger>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <CodeBlock.Code fontSize="sm" overflowX="auto">
            <CodeBlock.CodeText />
          </CodeBlock.Code>
          <CodeBlock.Overlay>
            <CodeBlock.CollapseTrigger>
              <CodeBlock.CollapseText textStyle="sm" />
            </CodeBlock.CollapseTrigger>
          </CodeBlock.Overlay>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}
export default Index
