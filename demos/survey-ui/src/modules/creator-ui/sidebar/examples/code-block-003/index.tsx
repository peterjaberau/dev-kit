'use client'

import {
  Badge,
  Button,
  CodeBlock,
  createListCollection,
  HStack,
  IconButton,
  Select,
  Span,
  useSelect,
  useSelectContext,
} from '@chakra-ui/react'
import { LuPlay } from 'react-icons/lu'
import { type CodeFile, codeFiles, shikiAdapter } from './data'

const collection = createListCollection({
  items: codeFiles,
  itemToString: (item) => item.value,
  itemToValue: (item) => item.value,
})

const defaultCodeFile: any = codeFiles[0]

const Index = () => {
  const select = useSelect({
    positioning: {
      strategy: 'fixed',
      sameWidth: false,
      gutter: 4,
      placement: 'bottom-end',
    },
    defaultValue: [defaultCodeFile.value],
    collection,
  })

  const selectedCodeFile: any = select.selectedItems[0]

  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root
        mb="8"
        mt="5"
        size="sm"
        mx="auto"
        maxW="4xl"
        code={selectedCodeFile.code}
        language={selectedCodeFile.language}
      >
        <CodeBlock.Header py="2" borderBottomWidth="1px">
          <HStack flex="1" fontFamily="mono">
            <Badge colorPalette="blue" fontWeight="bold">
              GET
            </Badge>
            <Span textStyle="xs" color="fg.muted">
              /chakra
            </Span>
          </HStack>
          <CodeBlock.Control>
            <LanguageSwitcher value={select} />
            <CodeBlock.CopyTrigger asChild>
              <IconButton variant="ghost" size="2xs">
                <CodeBlock.CopyIndicator />
              </IconButton>
            </CodeBlock.CopyTrigger>
          </CodeBlock.Control>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <CodeBlock.Code fontSize="sm" overflowX="auto">
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>
        <CodeBlock.Footer py="2" borderTopWidth="1px">
          <HStack w="full" justify="flex-end">
            <Button fontFamily="mono" size="xs">
              <LuPlay />
              Try it
            </Button>
          </HStack>
        </CodeBlock.Footer>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}

const SelectValue = () => {
  const select = useSelectContext()
  const items = select.selectedItems as Array<CodeFile>
  const { icon: Icon, value }: any = items[0]
  return (
    <Select.ValueText placeholder="Select member">
      <HStack>
        <Icon />
        {value}
      </HStack>
    </Select.ValueText>
  )
}

const LanguageSwitcher = (props: Select.RootProviderProps) => {
  const { value: select } = props

  return (
    <Select.RootProvider size="xs" variant="outline" {...props}>
      <Select.Control>
        <Select.Trigger>
          <SelectValue />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content bg="bg.muted" minW="32">
          {select.collection.items.map((item) => (
            <Select.Item item={item} key={item.value}>
              <item.icon />
              <Select.ItemText>{item.value}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.RootProvider>
  )
}

export default Index
