import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "#components/item";

export const ExampleVariantDefault = () => (
  <Item
    css={{
      w: "full",
      maxW: "md",
    }}
    variant="plain"
  >
    <ItemContent>
      <ItemTitle>Default Variant</ItemTitle>
      <ItemDescription>Transparent background with no border.</ItemDescription>
    </ItemContent>
  </Item>
)

