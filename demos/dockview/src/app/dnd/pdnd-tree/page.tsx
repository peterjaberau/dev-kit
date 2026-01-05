'use client';

import { Box, Flex, Heading } from "@chakra-ui/react"
import { WithDragHandles, WithGhostIndicator, WithLineIndicatorAndScroll } from "./examples"

export default function Page() {

  return (
    <Flex justifyContent={'center'} gap={4}>
      <Box>
        <Heading textStyle={'md'}>With Container Scroll</Heading>
        <WithLineIndicatorAndScroll />
      </Box>
      <Box>
        <Heading textStyle={'md'}>With Drag Handles</Heading>

        <WithDragHandles />
      </Box>
      <Box>
        <Heading textStyle={'md'}>With Ghost Indicator</Heading>

        <WithGhostIndicator />
      </Box>
    </Flex>
  );
}
