import { chakra, Container, IconButton, SimpleGrid, Stack } from "@chakra-ui/react"
import { Item } from ".."
import { Button, Icon, Avatar, AvatarGroup, Image } from "@chakra-ui/react"
import {} from "@dev-kit/components"
import { BadgeCheckIcon, ChevronRightIcon, ShieldAlertIcon, Plus, PlusIcon } from "lucide-react"
import { Fragment } from "react"

function ExampleOverviewItem() {
  return (
    <Stack gap={6}>
      <Item.Root variant={"outline"}>
        <Item.Content>
          <Item.Title>Basic Item</Item.Title>
          <Item.Description>A simple item with title and description.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant={"outline"} size={"sm"}>
            Action
          </Button>
        </Item.Actions>
      </Item.Root>

      <Item.Root variant="outline" size="sm" asChild>
        <chakra.a href="#">
          <Item.Media>
            <Icon>
              <BadgeCheckIcon />
            </Icon>
          </Item.Media>
          <Item.Content>
            <Item.Title>Your profile has been verified.</Item.Title>
          </Item.Content>
          <Item.Actions>
            <Icon>
              <BadgeCheckIcon />
            </Icon>
          </Item.Actions>
        </chakra.a>
      </Item.Root>
    </Stack>
  )
}

function ExampleVariantItem() {
  return (
    <Stack gap={6}>
      <Item.Root>
        <Item.Content>
          <Item.Title>Default Variant</Item.Title>
          <Item.Description>Standard styling with subtle background and borders.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant={"outline"} size={"sm"}>
            Open
          </Button>
        </Item.Actions>
      </Item.Root>

      <Item.Root variant="outline">
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant={"outline"} size={"sm"}>
            Open
          </Button>
        </Item.Actions>
      </Item.Root>

      <Item.Root variant="muted">
        <Item.Content>
          <Item.Title>Muted Variant</Item.Title>
          <Item.Description>Subdued appearance with muted colors for secondary content.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant={"outline"} size={"sm"}>
            Open
          </Button>
        </Item.Actions>
      </Item.Root>
    </Stack>
  )
}

function ExampleSizeItem() {
  return (
    <Stack gap={6}>
      <Item.Root variant="outline">
        <Item.Media>
          <Avatar.Root></Avatar.Root>
        </Item.Media>
        <Item.Content>
          <Item.Title>Basic Item</Item.Title>
          <Item.Description>A simple item with title and description..</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant={"outline"} size={"sm"}>
            Action
          </Button>
        </Item.Actions>
      </Item.Root>

      <Item.Root variant="outline" asChild>
        <a href="#">
          <Item.Media>
            <Icon>
              <BadgeCheckIcon />
            </Icon>
          </Item.Media>
          <Item.Content>
            <Item.Title>Your profile has been verified</Item.Title>
          </Item.Content>

          <Item.Actions>
            <Icon>
              <ChevronRightIcon />
            </Icon>
          </Item.Actions>
        </a>
      </Item.Root>
    </Stack>
  )
}

function ExampleIconItem() {
  return (
    <Stack gap={6}>
      <Item.Root variant="outline">
        <Item.Media>
          <Icon>
            <ShieldAlertIcon />
          </Icon>
        </Item.Media>
        <Item.Content>
          <Item.Title>Security Alert</Item.Title>
          <Item.Description>New login detected from unknown device</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant={"outline"} size={"sm"}>
            Review
          </Button>
        </Item.Actions>
      </Item.Root>
    </Stack>
  )
}

const avatarItems = [
  {
    src: "https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd",
    name: "Uchiha Sasuke",
  },
  {
    src: "https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c",
    name: "Baki Ani",
  },
  {
    src: "https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863",
    name: "Uchiha Chan",
  },
]

function ExampleAvatarItem() {
  return (
    <Stack gap={6}>
      <Item.Root variant="outline">
        <Item.Media>
          <Avatar.Root>
            <Avatar.Image src="https://avatar.iran.liara.run/public" />
            <Avatar.Fallback name="Public Avatar" />
          </Avatar.Root>
        </Item.Media>
        <Item.Content>
          <Item.Title>Public Avatar</Item.Title>
          <Item.Description>Last seen 5 months ago</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant={"outline"} size={"sm"} borderRadius={"full"}>
            <Plus />
          </Button>
        </Item.Actions>
      </Item.Root>

      <Item.Root variant="outline">
        <Item.Media>
          <AvatarGroup stacking="last-on-top">
            {avatarItems.map((item: any) => (
              <Avatar.Root key={item.name}>
                <Avatar.Fallback name={item.name} />
                <Avatar.Image src={item.src} />
              </Avatar.Root>
            ))}
          </AvatarGroup>
        </Item.Media>
        <Item.Content>
          <Item.Title>No Team Members</Item.Title>
          <Item.Description>Invite your team to collaborate on this project</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant={"outline"} size={"sm"}>
            Invite
          </Button>
        </Item.Actions>
      </Item.Root>
    </Stack>
  )
}

const itemImagesData = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45",
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05",
  },
  {
    title: "Digital Rain",
    artist: "Cyber Symphony",
    album: "Binary Beats",
    duration: "3:30",
  },
]

function ExampleImagesItem() {
  return (
    <Stack gap={6}>
      <Item.Group gap={4}>
        {itemImagesData.map((item) => (
          <Item.Root key={item.title} variant="outline" asChild role="listitem">
            <chakra.a href="#">
              <Item.Media variant={"image"}>
                <Image
                  src={`https://avatar.vercel.sh/${item.title}`}
                  alt={item.title}
                  width={32}
                  height={32}
                  css={{
                    backgroundColor: "gray",
                  }}
                />
              </Item.Media>
              <Item.Content>
                <Item.Title>
                  {item.title} -
                  <chakra.span
                    css={{
                      color: "fg.muted",
                    }}
                  >
                    {item.album}
                  </chakra.span>
                </Item.Title>
                <Item.Description>{item.artist}</Item.Description>
              </Item.Content>
              <Item.Content>
                <Item.Description>{item.duration}</Item.Description>
              </Item.Content>
            </chakra.a>
          </Item.Root>
        ))}
      </Item.Group>
    </Stack>
  )
}

const groupItems = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
]
function ExampleGroupItem() {
  return (
    <Stack gap={6}>
      <Item.Group>
        {groupItems.map((item: any, index) => (
          <Fragment key={item.username}>
            <Item.Root variant="outline" asChild role="listitem">
              <Item.Media>
                <Avatar.Root>
                  <Avatar.Image src={item.avatar} className="grayscale" />
                  <Avatar.Fallback>{item.username.charAt(0)}</Avatar.Fallback>
                </Avatar.Root>
              </Item.Media>
              <Item.Content gap={1}>
                <Item.Title>{item.username}</Item.Title>
                <Item.Description>{item.email}</Item.Description>
              </Item.Content>
              <Item.Actions>
                <IconButton variant="ghost" css={{ borderRadius: "full" }}>
                  <PlusIcon />
                </IconButton>
              </Item.Actions>
            </Item.Root>
            {index !== item.length - 1 && <Item.Separator />}
          </Fragment>
        ))}
      </Item.Group>
    </Stack>
  )
}

const headerItems = [
  {
    name: "v0-1.5-sm",
    description: "Everyday tasks and UI generation.",
    image: "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
    credit: "Valeria Reverdo on Unsplash",
  },
  {
    name: "v0-1.5-lg",
    description: "Advanced thinking or reasoning.",
    image: "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
    credit: "Michael Oeser on Unsplash",
  },
  {
    name: "v0-2.0-mini",
    description: "Open Source model for everyone.",
    image: "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
    credit: "Cherry Laithang on Unsplash",
  },
]

function ExampleHeaderItem() {
  return (
    <Stack gap={6}>
      <Item.Group asChild>
        <SimpleGrid gap={4} columns={3}></SimpleGrid>
        {headerItems.map((item: any, index) => (
          <Item.Root key={item.name} variant="outline">
            <Item.Header>
              <Image
                src={item.image}
                alt={item.name}
                width={128}
                height={128}
                css={{
                  width: "100%",
                  borderRadius: "sm",
                  objectFit: "cover",
                  aspectRatio: "1 / 1",
                }}
              />
            </Item.Header>
            <Item.Content>
              <Item.Title>{item.name}</Item.Title>
              <Item.Description>{item.description}</Item.Description>
            </Item.Content>
          </Item.Root>
        ))}
      </Item.Group>
    </Stack>
  )
}
