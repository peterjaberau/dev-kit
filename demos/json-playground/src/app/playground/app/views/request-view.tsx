"use client"
import { LuEye, LuEyeOff } from "react-icons/lu"
import { Button, Card, Wrap, Stack } from "@chakra-ui/react"
import { AdaptiveCard } from "#components/adaptive/adaptive-card"
import { usePlayground, useJsonManager } from "../../engine"
import { rawJsonData } from "../../store/data"

const CardSection = ({ title, children }: any) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Wrap>{children}</Wrap>
      </Card.Body>
    </Card.Root>
  )
}

export const RequestView = ({ children }: any) => {
  const { isInspectorEnabled, enableInspection, disableInspection, fireInitiate } = usePlayground()
  const { createDocFromJson  } = useJsonManager()
  return (
    <AdaptiveCard.Root
      actions={[
        {
          label: "Inspect",
          icon: isInspectorEnabled ? <LuEye /> : <LuEyeOff />,
          trigger: () => (isInspectorEnabled ? disableInspection() : enableInspection()),
        },
      ]}
      title={"Request"}
    >
      <Stack gap={4} px={4}>
        <CardSection title={"Json Manager"}>
          <Button size={"xs"} variant={"solid"} onClick={() => fireInitiate()}>
            Initiate
          </Button>
        </CardSection>
        <CardSection title={"Json Manager"}>
          <Button size={"xs"} variant={"solid"} onClick={() => {
            // console.log("----rawJsonData.xstateOpenapi---, ", rawJsonData.xstateOpenapi)
            createDocFromJson({ content: rawJsonData.xstateOpenapi })
          }}>
            Create Doc from Raw JSON
          </Button>
        </CardSection>
      </Stack>
    </AdaptiveCard.Root>
  )
}
