"use client"
import { LuEye, LuEyeOff } from "react-icons/lu"
import { Button } from "@chakra-ui/react"
import { AdaptiveCard } from "#components/adaptive/adaptive-card"
import { usePlayground } from ".."

export const RequestView = ({ children }: any) => {
  const { isInspectorEnabled, enableInspection, disableInspection, fireInitiate } = usePlayground()
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
      <Button size={"xs"} variant={"solid"} onClick={() => fireInitiate()}>
        Initiate
      </Button>
    </AdaptiveCard.Root>
  )
}
