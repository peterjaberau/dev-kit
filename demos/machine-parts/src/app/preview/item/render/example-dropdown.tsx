"use client";

import { Button, Avatar, Menu } from "@chakra-ui/react"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "#components/item"

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

export const ExampleDropdown = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant="outline">Open</Button>
    </Menu.Trigger>
    <Menu.Content css={{ w: 72 }}>
      {people.map((person) => (
        <Menu.Item key={person.username} value={person.username}>
          <Item css={{ "--space": 2 }}>
            <ItemMedia>
              <Avatar.Root variant={"subtle"} size="sm">
                <Avatar.Image alt="" src={person.avatar} />
                <Avatar.Fallback name={person.username}/>
              </Avatar.Root>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{person.username}</ItemTitle>
              <ItemDescription>{person.email}</ItemDescription>
            </ItemContent>
          </Item>
        </Menu.Item>
      ))}
    </Menu.Content>
  </Menu.Root>
)

