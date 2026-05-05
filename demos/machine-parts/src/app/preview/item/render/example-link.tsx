import { LuExternalLink as ExternalLinkIcon } from "react-icons/lu";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "#components/item";
import { chakra } from '@chakra-ui/react'

export const ExampleLink = () => (
  <chakra.div
    css={{
      display: "flex",
      w: "full",
      maxW: "md",
      flexDirection: "column",
      gap: 4,
    }}
  >
    <Item asChild variant="muted">
      <a href="/docs">
        <ItemContent>
          <ItemTitle>Visit our documentation</ItemTitle>
          <ItemDescription>Learn how to get started with our components.</ItemDescription>
        </ItemContent>
      </a>
    </Item>
    <Item asChild variant="outline">
      <a href="https://vini.one/twitter" rel="noopener noreferrer" target="_blank">
        <ItemContent>
          <ItemTitle>External resource</ItemTitle>
          <ItemDescription>Opens in a new tab with security attributes.</ItemDescription>
        </ItemContent>
        <ExternalLinkIcon />
      </a>
    </Item>
  </chakra.div>
)

