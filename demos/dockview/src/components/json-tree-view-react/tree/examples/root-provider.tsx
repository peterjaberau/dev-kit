import { Collapsible } from '..'
import { useComponent } from "../selectors"
import { ChevronRightIcon } from 'lucide-react'

export const RootProvider = () => {
  const collapsible = useComponent()

  return (
    <>
      <span>{collapsible.visible ? 'Visible' : 'Hidden'}</span>

      <Collapsible.RootProvider value={collapsible}>
        <Collapsible.Trigger>
          Toggle
          <Collapsible.Indicator>
            <ChevronRightIcon />
          </Collapsible.Indicator>
        </Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible.RootProvider>
    </>
  )
}
