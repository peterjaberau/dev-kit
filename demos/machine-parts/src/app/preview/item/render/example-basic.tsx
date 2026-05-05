import { Button } from "@chakra-ui/react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "#components/item"

export const ExampleBasic = () => (
  <Item className="w-full max-w-md" variant="outline">
    <ItemContent>
      <ItemTitle>Basic Item</ItemTitle>
      <ItemDescription>
        A simple item with title and description.
      </ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button size="sm" variant="outline">
        Action
      </Button>
    </ItemActions>
  </Item>
);
