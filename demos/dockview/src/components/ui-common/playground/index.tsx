"use client"
import { useState } from "react"
import { MovableModal } from "#components/ui-common/panel/movableModal"
import JsonView from "react18-json-view"
import { usePattern, useNodeManager } from "#actors/model/selectors"
import { Box, Container, SimpleGrid,  GridItem, For, Stack, Button, Card, HStack, Text, Badge, Center, Wrap, WrapItem } from "@chakra-ui/react"
import { LuCheck, LuX } from "react-icons/lu"
export default function Playground(props: any) {
  const { patternState, patternContext, fireEvent, config, guard, stateCan, stateStatus, allowed, canState, isState, allowState } = usePattern()
  const { nodeManagerState, nodeManagerContext } = useNodeManager()
  const [position, setPosition] = useState(() => {
    const width = 500
    const height = 600
    const padding = 100 // distance from the right edge
    const x = padding
    const y = 100

    return { x, y, width, height }
  })

  const { onClose, ...rest } = props

  return (
    <MovableModal
      defaultPosition={position}
      title={"Playground"}
      bodyContent={
      <Stack>
        <Card.Root size='sm'>
          <Card.Header borderBottom="1px solid" borderColor="border.emphasized" py={2}>
            <Card.Title>
              Visual Monitor
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack>
              {guard.isInstance && (
                <Container p={0} w={"full"}>
                  <Stack>
                    <HStack>
                      <Badge variant={isState.isInitiating ? "solid" : "plain"} >
                        Initiating
                      </Badge>
                    </HStack>
                    <HStack>
                      <Box flex={1}>
                        <Badge variant={isState.isReady ? "solid" : "plain"}>
                          Ready
                        </Badge>
                      </Box>

                      <HStack>
                        <Button disabled={!allowed.allowCreate} onClick={() => fireEvent("CREATE")}>
                          Create
                        </Button>
                        <Button disabled={!stateCan.canTerminate} onClick={() => fireEvent("TERMINATE")}>
                          Terminate
                        </Button>
                      </HStack>
                    </HStack>

                    <HStack>
                      <Box flex={1}>
                        <Badge variant={isState.isCreating ? "solid" : "plain"}>
                          Creating
                        </Badge>
                      </Box>
                      <HStack>
                        <Button disabled={!stateCan.canStart || !stateStatus.isCreating} onClick={() => fireEvent("START")}>
                          Start
                        </Button>
                        <Button
                          disabled={!stateCan.canProcess || !stateStatus.isCreating}
                          onClick={() => fireEvent("PROCESS")}
                        >
                          Process
                        </Button>
                        <Button
                          disabled={!stateCan.canComplete || !stateStatus.isCreating}
                          onClick={() => fireEvent("COMPLETE")}
                        >
                          Complete
                        </Button>
                      </HStack>
                    </HStack>

                    <HStack>
                      <Box flex={1}>
                        <Badge variant={isState.isTerminating ? "solid" : "plain"}>
                          Terminating
                        </Badge>
                      </Box>
                      <HStack>
                        <Button
                          disabled={!stateCan.canStart || !stateStatus.isTerminating}
                          onClick={() => fireEvent("START")}
                        >
                          Start
                        </Button>
                        <Button
                          disabled={!stateCan.canProcess || !stateStatus.isTerminating}
                          onClick={() => fireEvent("PROCESS")}
                        >
                          Process
                        </Button>
                        <Button
                          disabled={!stateCan.canComplete || !stateStatus.isTerminating}
                          onClick={() => fireEvent("COMPLETE")}
                        >
                          Complete
                        </Button>
                      </HStack>
                    </HStack>
                  </Stack>
                </Container>
              )}

            </Stack>
          </Card.Body>
        </Card.Root>

        <SimpleGrid columns={2} gap={2}>
          <Card.Root size='sm' >
            <Card.Header borderBottom="1px solid" borderColor="border.emphasized" py={2}>
              <Card.Title>
                Context Config
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Wrap>
                <For each={Object.entries(config)}>
                  {([key, value]) => (
                    <WrapItem key={key}>
                      <Badge
                        variant={value ? "outline" : "surface"}>
                        {value ? <LuCheck/> : <LuX/>}
                        <Text
                          color={value ? "fg" : "fg.subtle"}
                        >
                          {key}
                        </Text>

                      </Badge>
                    </WrapItem>
                  )}
                </For>

              </Wrap>

            </Card.Body>
          </Card.Root>
          <Card.Root size='sm' >
            <Card.Header borderBottom="1px solid" borderColor="border.emphasized" py={2}>
              <Card.Title>
                Context Instance
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Wrap>
                <For each={Object.entries(patternContext?.instance)}>
                  {([key, value]) => (
                    <WrapItem key={key}>
                      <Badge
                        variant={value ? "outline" : "surface"}>
                        {value ? <LuCheck/> : <LuX/>}
                        <Text
                          color={value ? "fg" : "fg.subtle"}
                        >
                          {key}
                        </Text>

                      </Badge>
                    </WrapItem>
                  )}
                </For>

              </Wrap>

            </Card.Body>
          </Card.Root>
          <GridItem colSpan={2}>
            <Card.Root size='sm'>
              <Card.Header borderBottom="1px solid" borderColor="border.emphasized" py={2}>
                <Card.Title>
                  Guard
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Wrap>
                  <For each={Object.entries(guard)}>
                    {([key, value]) => (
                      <WrapItem key={key}>
                        <Badge
                          variant={value ? "outline" : "subtle"}
                        >
                          {value ? <LuCheck/> : <LuX/>}
                          <Text
                            color={value ? "fg" : "fg.subtle"}
                          >
                            {key}
                          </Text>
                        </Badge>
                      </WrapItem>
                    )}
                  </For>

                </Wrap>

              </Card.Body>
            </Card.Root>
          </GridItem>
        </SimpleGrid>

        <Card.Root size='sm' variant='subtle'>
          <Card.Header borderBottom="1px solid" borderColor="border.emphasized" py={2}>
            <Card.Title>
              Inspect
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <JsonView
              src={{
                pattern: {
                  guard,
                  context: patternState.context,
                  isState,
                  canState,
                  allowState,
                  state: {
                    status: patternState.status,
                    context: patternState.context,
                    value: patternState.value,
                  },
                  stateStatus,
                  stateCan,
                },
                nodeManager: {
                  children: nodeManagerState.children,
                  context: nodeManagerContext,
                },
              }}
              collapsed={2}
              theme="github"
              displaySize
              displayArrayIndex
              style={{ fontSize: 13, fontWeight: "bold" }}
            />
          </Card.Body>
        </Card.Root>
      </Stack>
      }
      onClose={onClose}
    />
  )
}
