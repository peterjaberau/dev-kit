import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "#components/item";
import { chakra, Image } from '@chakra-ui/react'

const models = [
  {
    name: "v0-1.5-sm",
    description: "Everyday tasks and UI generation.",
    image: "https://picsum.photos/seed/1/500/300",
    credit: "Valeria Reverdo on Unsplash",
  },
  {
    name: "v0-1.5-lg",
    description: "Advanced thinking or reasoning.",
    image: "https://picsum.photos/seed/2/500/300",
    credit: "Michael Oeser on Unsplash",
  },
  {
    name: "v0-2.0-mini",
    description: "Open Source model for everyone.",
    image: "https://picsum.photos/seed/3/500/300",
    credit: "Cherry Laithang on Unsplash",
  },
];

export const ExampleHeader = () => (
  <chakra.div
    css={{
      display: "flex",
      w: "full",
      maxW: "xl",
      flexDirection: "column",
      gap: 6,
    }}
  >
    <ItemGroup
      css={{
        display: "grid",
        gridColumn: 3,
        gap: 4,
      }}
    >
      {models.map((model) => (
        <Item key={model.name} variant="outline">
          <ItemHeader>
            <Image
              css={{
                aspectRatio: "square",
                filter: "grayscale(100%)",
                height: "128px",
                width: "128px",
              }}
              alt={model.name}
              src={model.image}
            />
          </ItemHeader>
          <ItemContent>
            <ItemTitle>{model.name}</ItemTitle>
            <ItemDescription>{model.description}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  </chakra.div>
)
