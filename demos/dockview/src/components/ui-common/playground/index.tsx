"use client"
import { useState } from "react"
import { MovableModal } from "#components/ui-common/panel/movableModal"
import JsonView from "react18-json-view"
import { usePattern, useNodeManager } from "#actors/model/selectors"
import { Container, Stack, Button, Card, HStack, Text } from "@chakra-ui/react"

export default function Playground(props: any) {
  const { patternState, fireEvent, guard, stateCan, stateStatus, allowed } = usePattern()
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
          {guard.isInstance && (
            <Container p={0} w={"full"}>
              <Stack>
                <HStack>
                  <Text flex={1}>Ready</Text>
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
                  <Text flex={1}>Creating</Text>
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
                  <Text flex={1}>Terminating</Text>
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
          <JsonView
            src={{
              pattern: {
                guard,
                context: patternState.context,
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
        </Stack>
      }
      onClose={onClose}
    />
  )
}
