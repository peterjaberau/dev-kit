import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "#components/item";
import { chakra, Image } from "@chakra-ui/react"

const images = [
  {
    src: "https://picsum.photos/seed/1/500/300",
    alt: "Midnight City Lights",
    description: "Electric Nights · Neon Dreams · 3:45",
  },
  {
    src: "https://picsum.photos/seed/2/500/300",
    alt: "Coffee Shop Conversations",
    description: "Urban Stories · The Morning Brew · 4:05",
  },
  {
    src: "https://picsum.photos/seed/3/500/300",
    alt: "Digital Rain",
    description: "Binary Beats · Cyber Symphony · 3:30",
  },
];

export const ExampleImage = () => (
  <chakra.div
    css={{
      display: "flex",
      w: "full",
      maxW: "md",
      flexDirection: "column",
      gap: 4,
    }}
  >
    {images.map((image) => (
      <Item key={image.src} variant="outline">
        <ItemMedia variant="image">
          <Image
            alt={image.alt}
            css={{
              aspectRatio: "square",
              filter: "grayscale(100%)",
              width: "full",
              objectFit: "cover"
            }}
            src={image.src}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{image.alt}</ItemTitle>
          <ItemDescription>{image.description}</ItemDescription>
        </ItemContent>
      </Item>
    ))}
  </chakra.div>
)
