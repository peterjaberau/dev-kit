import { LuUser as User } from "react-icons/lu";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "#components/item"
import { chakra } from '@chakra-ui/react'

export const ExampleCustomSpacing = () => (
  <chakra.div
    css={{
      display: "flex",
      w: "full",
      maxW: "md",
      flexDirection: "column",
      gap: 4,
    }}
  >
    <Item css={{ w: "full", "--space": 2 }} variant="outline">
      <ItemMedia variant="icon">
        <User />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Compact spacing</ItemTitle>
        <ItemDescription>Uses `[--space:--spacing(2)]` for tighter padding and gap.</ItemDescription>
      </ItemContent>
    </Item>

    <Item
      css={{ w: "full", "--space": 3 }}
      variant="outline"
    >
      <ItemMedia variant="icon">
        <User />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Responsive spacing</ItemTitle>
        <ItemDescription>Wider from `md` up with `md:[--space:--spacing(5)]`.</ItemDescription>
      </ItemContent>
    </Item>
  </chakra.div>
)
