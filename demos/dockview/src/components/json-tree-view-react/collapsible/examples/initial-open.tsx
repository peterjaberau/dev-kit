import { Collapsible } from '..'
import { ChevronRightIcon } from 'lucide-react'

export const InitialOpen = () => (
  <Collapsible.Root defaultOpen>
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)
