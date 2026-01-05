"use client"

import { Box, Flex, Stack, Container, Heading, SimpleGrid, GridItem } from "@chakra-ui/react"
import { WithDragHandles, WithGhostIndicator, WithLineIndicatorAndScroll, FullCustom, FullOrigin } from "./examples"

export default function Page() {
  return (
    <Stack p={4}>
      <Container boxShadow={"md"} borderRadius={"md"} p={4}>
        <SimpleGrid columns={4} gap={4} backgroundColor={"bg.muted"} minH={"800px"}>
          <GridItem colSpan={3}>
            <FullCustom />
          </GridItem>
          <GridItem>
            <FullOrigin />
          </GridItem>
        </SimpleGrid>
      </Container>
      <Container boxShadow={"md"} borderRadius={"md"} p={4}>
        <Flex justifyContent={"center"} gap={4}>
          <Box flex={1}>
            <WithLineIndicatorAndScroll />
          </Box>
          <Box flex={1}>
            <WithDragHandles />
          </Box>
          <Box flex={1}>
            <WithGhostIndicator />
          </Box>
        </Flex>
      </Container>
    </Stack>
  )
}
