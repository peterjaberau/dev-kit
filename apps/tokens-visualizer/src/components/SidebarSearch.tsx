'use client'
import { Box, Icon, Input, InputGroup, useFilter, useListCollection } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import React from "react"
import { searchSelector } from "../actors/selectors"

export const Search = (props: any) => {
  const { dictionary } = searchSelector()

  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter } = useListCollection({
    initialItems: dictionary,
    filter: contains,
  })

  return (
    <Box
      css={{
        position: "relative",
        width: "100%",
        display: "block",
      }}
    >
      <InputGroup
        flex="1"
        startElement={
          <Icon size="sm">
            <LuSearch />
          </Icon>
        }
      >
        <Input placeholder="Search" />
      </InputGroup>
    </Box>
  )
}
