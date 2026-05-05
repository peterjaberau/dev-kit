import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "#components/item";

export const ExampleVariantOutline = () => (
  <Item
    css={{
      w: "full",
      maxW: "md",
    }}
    variant="outline"
  >
    <ItemContent>
      <ItemTitle>Outline Variant</ItemTitle>
      <ItemDescription>Outlined style with a visible border.</ItemDescription>
    </ItemContent>
  </Item>
)

