import React from "react"
import { useRecursive } from "./use-recursive"
import { AdaptiveTool } from "#adaptive-tool"
import { Container, Button, Card, HStack, Stack, SimpleGrid, GridItem } from "@chakra-ui/react"



export function RenderRecursive({ source }: any) {
  const {
    stateValue,
    transform,
    output,

    isIdle,
    isBooting,

    start,
    reset,
  } = useRecursive(source)

  return (
    <SimpleGrid w={"full"} columns={7} p={4} h={"vh"} overflow={"hidden"} gap={4}>
      {/* CONTROLS */}
      <GridItem flex={1}>
        <AdaptiveTool.Root
          title={"Controls"}
          actions={[
            {
              label: "Start",
              trigger: start,
              disabled: !isIdle,
            },
            {
              label: "Reset",
              trigger: reset,
              disabled: isBooting,
            },
          ]}
        >
          <Stack fontSize="sm" color="fg.muted">
            <div>
              Start: enabled only in <b>idle</b>
            </div>
            <div>
              Reset: disabled only during <b>boot</b>
            </div>
          </Stack>
        </AdaptiveTool.Root>
      </GridItem>

      <GridItem colSpan={2} flex={1}>
        <AdaptiveTool.Root title={"Machine State"}>
          <Stack backgroundColor={"bg.muted"}>
            <pre>{JSON.stringify(stateValue, null, 2)}</pre>
          </Stack>
        </AdaptiveTool.Root>
      </GridItem>

      {/* ITERATION STATE */}
      <GridItem colSpan={2} flex={1}>
        <AdaptiveTool.Root title={"Iteration (context.transform)"}>
          <Stack backgroundColor={"bg.muted"}>
            <pre>{JSON.stringify(transform, null, 2)}</pre>
          </Stack>
        </AdaptiveTool.Root>
      </GridItem>

      {/* OUTPUT */}
      <GridItem colSpan={2} flex={1}>
        <AdaptiveTool.Root title={"Output (incremental)"}>
          <Stack backgroundColor={"bg.muted"}>
            <pre>{JSON.stringify(output, null, 2)}</pre>
          </Stack>
        </AdaptiveTool.Root>
      </GridItem>
    </SimpleGrid>
  )
}
