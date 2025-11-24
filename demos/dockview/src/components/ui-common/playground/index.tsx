"use client"
import { useState } from "react"
import { MovableModal } from "#components/ui-common/panel/movableModal"
import JsonView from "react18-json-view"
import { usePattern, useNodeManager } from "#actors/model/selectors"
import {
  Box,
  Container,
  SimpleGrid,
  GridItem,
  For,
  Stack,
  Button,
  Card,
  HStack,
  Text,
  Badge,
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { LuCheck, LuX } from "react-icons/lu"
export default function Playground(props: any) {
  const {
    patternState,
    patternContext,
    fireEvent,
    config,
    guard,
    stateCan,
    stateStatus,
    allowed,
    canState,
    isState,
    allowState,
    patternRef,
    info,
    graph
  } = usePattern()
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
          <PlaygroundPanelsList columns={2}>
            <PlaygroundPanelsItemCustomRenderer title="Visual Monitor" colSpan={2}>
              <Stack>
                {guard.isInstance && (
                  <Container p={0} w={"full"}>
                    <Stack>
                      <HStack>
                        <Badge variant={isState.isInitiating ? "solid" : "plain"}>Initiating</Badge>
                      </HStack>
                      <HStack>
                        <Box flex={1}>
                          <Badge variant={isState.isReady ? "solid" : "plain"}>Ready</Badge>
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
                          <Badge variant={isState.isCreating ? "solid" : "plain"}>Creating</Badge>
                        </Box>
                        <HStack>
                          <Button
                            disabled={!stateCan.canStart || !stateStatus.isCreating}
                            onClick={() => fireEvent("START")}
                          >
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
                          <Badge variant={isState.isTerminating ? "solid" : "plain"}>Terminating</Badge>
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
            </PlaygroundPanelsItemCustomRenderer>
            <PlaygroundPanelsItemObjectRenderer title="Context Config" objectContent={config} showIndicator={true} />
            <PlaygroundPanelsItemObjectRenderer
              title="Context Instance"
              objectContent={patternContext?.instance}
              showIndicator={true}
            />

            <PlaygroundPanelsItemObjectRenderer
              title="Guard Selector"
              objectContent={guard}
              showIndicator={true}
              colSpan={2}
            />
          </PlaygroundPanelsList>

          <PlaygroundPanelsItemCustomRenderer
            title="Inspector"
          >
            <JsonView
              src={{
                pattern: {
                  patternRef,
                  info,
                  graph,
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
          </PlaygroundPanelsItemCustomRenderer>

        </Stack>
      }
      onClose={onClose}
    />
  )
}

const PlaygroundPanelsList = ({ children, columns = 1 }: any) => {
  return (
    <SimpleGrid columns={columns} gap={2}>
      {children}
    </SimpleGrid>
  )
}

const PlaygroundPanelsItem = ({ children, title, colSpan }: any) => {
  return (
    <GridItem colSpan={colSpan}>
      <Card.Root size="sm" height="full">
        <Card.Header borderBottom="1px solid" borderColor="border.emphasized" py={2}>
          <Card.Title>{title}</Card.Title>
        </Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card.Root>
    </GridItem>
  )
}

const PlaygroundPanelsItemBadge = ({ label = undefined, value, showIndicator = true }: any) => {
  return (
    <WrapItem>
      <Badge variant={value ? "outline" : "surface"}>
        {showIndicator && value ? <LuCheck /> : <LuX />}
        <Text color={value ? "fg" : "fg.subtle"}>{label ? label : value}</Text>
      </Badge>
    </WrapItem>
  )
}

const PlaygroundPanelsItemObjectRenderer = ({ title, objectContent, showIndicator = true, colSpan = 1 }: any) => {
  return (
    <PlaygroundPanelsItem title={title} colSpan={colSpan}>
      <Wrap>
        <For each={Object.entries(objectContent)}>
          {([key, value]) => (
            <PlaygroundPanelsItemBadge key={key} label={key} value={value} showIndicator={showIndicator} />
          )}
        </For>
      </Wrap>
    </PlaygroundPanelsItem>
  )
}

const PlaygroundPanelsItemCustomRenderer = ({ children, title, colSpan = 1 }: any) => {
  return (
    <PlaygroundPanelsItem title={title} colSpan={colSpan}>
      {children}
    </PlaygroundPanelsItem>
  )
}
