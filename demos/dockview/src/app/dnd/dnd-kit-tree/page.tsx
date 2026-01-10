"use client"
import { SortableTree } from "./components/SortableTree"
import React, { useState } from "react"
import { Box, Container, Flex, GridItem, SimpleGrid, Stack } from "@chakra-ui/react"

const data = [
  {
    id: "id-1",
    data: { label: "Root Item 1" },
    children: [
      {
        id: "id-2",
        data: { label: "Sub Item 2" },
        children: [
          {
            id: "id-3",
            children: [],
            data: { label: "Sub Item 3" },
          },
        ],
      },
    ],
  },
  {
    id: "id-4",
    children: [],
    data: { label: "Root Item 2" },
  },
  {
    id: "id-5",
    maxDepth: 0,
    children: [],
    data: { label: "Root Item 3" },
  },
]

export default function Page() {
  const [value, setValue] = useState(data)

  return (
    <Container p={4}>
      <SortableTree
        value={data}
        removable={true}
        collapsible={true}
        collapseChildren={true}
        maxDepth={5}
        indentationWidth={25}
        onChange={() => setValue}
      />
    </Container>
  )
}
