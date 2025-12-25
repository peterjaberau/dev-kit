import { Collapsible } from '..'
import { ChevronRightIcon } from 'lucide-react'

export const Basic = () => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>
        Toggle
        <Collapsible.Indicator>
          <ChevronRightIcon />
        </Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>Content</Collapsible.Content>
    </Collapsible.Root>
  )
}
