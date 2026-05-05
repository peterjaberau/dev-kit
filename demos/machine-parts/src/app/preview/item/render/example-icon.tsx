import { LuShieldAlert as ShieldAlert } from "react-icons/lu";
import { Button } from "@chakra-ui/react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "#components/item";

export const ExampleIcon = () => (
  <Item className="w-full max-w-md" variant="outline">
    <ItemMedia variant="icon">
      <ShieldAlert />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Security Alert</ItemTitle>
      <ItemDescription>New login detected from unknown device.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button size="sm" variant="outline">
        Review
      </Button>
    </ItemActions>
  </Item>
);

