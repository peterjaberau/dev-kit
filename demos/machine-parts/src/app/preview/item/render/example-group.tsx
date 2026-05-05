import { LuPlus as PlusIcon } from "react-icons/lu";

import { Button, Avatar, IconButton } from "@chakra-ui/react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "#components/item";

const people = [
  {
    username: "vinihvc",
    avatar: "https://github.com/vinihvc.png",
    email: "vinihvc@example.com",
  },
  {
    username: "segunadebayo",
    avatar: "https://github.com/segunadebayo.png",
    email: "segunadebayo@example.com",
  },
  {
    username: "pasqualevitiello",
    avatar: "https://github.com/pasqualevitiello.png",
    email: "pasqualevitiello@example.com",
  },
];

export const ExampleGroup = () => (
  <ItemGroup
    css={{
      maxW: "sm",
    }}
  >
    {people.map((person) => (
      <Item key={person.username} variant="outline">
        <ItemMedia>
          <Avatar.Root variant={"subtle"}>
            <Avatar.Image src={person.avatar} />
            <Avatar.Fallback name={person.username}/>
          </Avatar.Root>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{person.username}</ItemTitle>
          <ItemDescription>{person.email}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <IconButton css={{ borderRadius: 'full'}}  size="md" variant="ghost">
            <PlusIcon />
          </IconButton>
        </ItemActions>
      </Item>
    ))}
  </ItemGroup>
)

