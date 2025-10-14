import { createShikiAdapter } from '@chakra-ui/react'

export const examples = {
  input: {
    title: 'input.tsx',
    code: `import { Input } from "@chakra-ui/react"

const Demo = () => {
  return <Input placeholder="Enter your email" />
}`,
    language: 'tsx' as const,
  },
  button: {
    title: 'button.tsx',
    code: `import { Button } from "@chakra-ui/react"

const Demo = () => {
  return <Button>Click me</Button>
}`,
    language: 'tsx' as const,
  },
}

export const popoverExample = {
  tsx: {
    title: 'index.tsx',
    code: `import { Popover } from '@ark-ui/react/popover'
import styles from './index.module.css';

const Demo = () => (
  <Popover.Root>
    <Popover.Trigger className={styles.PopoverTrigger}>
      Click Me
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content className={styles.PopoverContent}>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)`,
    language: 'tsx' as const,
  },
  cssModules: {
    title: 'index.module.css',
    code: `
.PopoverTrigger {
  position: relative;
  display: inline-block;
}

.PopoverContent {
  padding: 12px;
}
`,
    language: 'css' as const,
  },
}

export const shikiAdapter = createShikiAdapter({
  async load() {
    const { createHighlighter } = await import('shiki')
    return createHighlighter({
      langs: ['javascript', 'typescript', 'tsx', 'html', 'css', 'bash', 'json', 'python'],
      themes: ['github-light', 'github-dark'],
    })
  },
  theme: { light: 'github-light', dark: 'github-dark' },
})
