import { LuBadgeCheck as BadgeCheck, LuChevronRight as ChevronRight, LuEllipsis as Ellipsis } from "react-icons/lu"
import { Button, chakra, Icon } from "@chakra-ui/react"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "#components/item"

export const ExampleDefault = () => (
  <chakra.div
    css={{
      display: "flex",
      maxW: "md",
      flexDirection: "column",
      gap: 6,
    }}
  >
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>Basic Item</ItemTitle>
        <ItemDescription>A simple item with title and description.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          <Ellipsis />
        </Button>
      </ItemActions>
    </Item>
    <Item variant="outline">
      <ItemMedia>
        <Icon size={"sm"}>
          <BadgeCheck />
        </Icon>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Your profile has been verified.</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Icon size={"sm"}>
          <ChevronRight />
        </Icon>
      </ItemActions>
    </Item>
  </chakra.div>
)

