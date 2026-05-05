import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "#components/item";

export const ExampleVariantMuted = () => (
  <Item
    css={{
      w: "full",
      maxW: "md",
    }}
    variant="muted"
  >
    <ItemContent>
      <ItemTitle>Muted Variant</ItemTitle>
      <ItemDescription>Muted background for secondary content.</ItemDescription>
    </ItemContent>
  </Item>
)

