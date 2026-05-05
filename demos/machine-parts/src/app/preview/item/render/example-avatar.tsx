import { Avatar, Button } from "@chakra-ui/react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "#components/item";

export const ExampleAvatar = () => (
  <Item className="w-full max-w-md" variant="outline">
    <ItemMedia>
      <Avatar.Root size="sm">
        <Avatar.Image
          alt="@pasqualevitiello"
          src="https://github.com/pasqualevitiello.png"
        />
        <Avatar.Fallback name="P V" />
      </Avatar.Root>
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Pasquale Vitiello</ItemTitle>
      <ItemDescription>Last seen 5 months ago</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button size="sm" variant="outline">
        View
      </Button>
    </ItemActions>
  </Item>
);

