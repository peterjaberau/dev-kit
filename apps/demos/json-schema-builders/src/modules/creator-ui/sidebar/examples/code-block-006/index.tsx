'use client'

import { CodeBlock, IconButton, Tabs, useTabs } from '@chakra-ui/react'
import { codeFiles, shikiAdapter } from './data'

const Index = () => {
  const tabs = useTabs({
    defaultValue: 'python',
  })

  const activeTab: any = codeFiles.find((file) => file.language === tabs.value) || codeFiles[0]

  const otherTabs = codeFiles.filter((file) => file.language !== tabs.value)

  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <Tabs.RootProvider value={tabs} size="sm" variant="subtle">
        <CodeBlock.Root
          mb="8"
          mt="5"
          size="sm"
          mx="auto"
          maxW="4xl"
          code={activeTab.code}
          language={activeTab.language}
        >
          <CodeBlock.Header py="1" borderBottomWidth="1px">
            <CodeBlock.Title fontFamily="mono" textTransform="uppercase">
              Request
            </CodeBlock.Title>
            <Tabs.List border="0">
              {codeFiles.map((file) => (
                <Tabs.Trigger
                  colorPalette="teal"
                  key={file.language}
                  value={file.language}
                  textStyle="xs"
                >
                  {file.title}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <CodeBlock.CopyTrigger asChild>
              <IconButton variant="ghost" size="2xs">
                <CodeBlock.CopyIndicator />
              </IconButton>
            </CodeBlock.CopyTrigger>
          </CodeBlock.Header>
          <CodeBlock.Content>
            {otherTabs.map((file) => (
              <Tabs.Content key={file.language} value={file.language} />
            ))}
            <Tabs.Content pt="1" value={activeTab.language}>
              <CodeBlock.Code>
                <CodeBlock.CodeText />
              </CodeBlock.Code>
            </Tabs.Content>
          </CodeBlock.Content>
        </CodeBlock.Root>
      </Tabs.RootProvider>
    </CodeBlock.AdapterProvider>
  )
}
export default Index
