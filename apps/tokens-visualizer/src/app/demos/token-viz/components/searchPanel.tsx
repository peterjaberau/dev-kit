"use client"
import {
  Container,
  For,
  Center,
  SimpleGrid,
  HStack,
  Stack,
  Button,
  Text,
  GridItem,
  DataList,
  Card,
  Tag,
  Badge,
} from "@chakra-ui/react"
import { TokenSearch } from '#components/TokenSearch'

// import { Search } from "#components/Search"
// import { searchSelector } from "#actors/selectors"

export const SearchPanel = () => {
  // const { searchQuery, searchResults, searchCount, selected } = searchSelector()

  return (
    <Card.Root css={{ boxShadow: "sm", borderRadius: "md" }}>
      <Card.Header>
        <Card.Title>Dictionary</Card.Title>
        <HStack justifyContent="space-between">
          <Card.Description>Select tokens to inspect</Card.Description>
          <HStack justifyContent="flex-end">
            {/*<Badge>{searchCount}</Badge>*/}
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body gap={4}>
        <TokenSearch />
        <HStack wrap={"wrap"}>
          {/*<For each={selected}>*/}
          {/*  {(item: any) => (*/}
          {/*    <Tag.Root key={item}>*/}
          {/*      <Tag.Label>{item}</Tag.Label>*/}
          {/*      <Tag.EndElement>*/}
          {/*        <Tag.CloseTrigger />*/}
          {/*      </Tag.EndElement>*/}
          {/*    </Tag.Root>*/}
          {/*  )}*/}
          {/*</For>*/}
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
