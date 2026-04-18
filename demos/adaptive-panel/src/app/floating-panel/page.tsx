'use client';
import { useState } from "react"
import { Flexbox } from "react-layout-kit"
import { FloatingPanel } from '#components/floating-panel'
import { Button, HStack, Text } from "@chakra-ui/react"

export default function Page() {

  const [expandLeft, setExpandLeft] = useState(true)
  const [pinLeft, setPinLeft] = useState(true)


  const [expandRight, setExpandRight] = useState(true)
  const [pinRight, setPinRight] = useState(true)

  const [expandBottom, setExpandBottom] = useState(true)
  const [pinBottom, setPinBottom] = useState(true)


  return (
    <Flexbox direction={"vertical"} height={"100%"} style={{ position: "relative" }} width={"100%"}>
      <Flexbox
        direction={"horizontal"}
        height={"50px"}
        width={"full"}
        style={{ overflow: "hidden", position: "relative", borderBottom: "1px solid", borderBottomColor: "#d9d9d9" }}
      >
        <HStack w={"full"} justifyContent={"center"}>
          <HStack border={"1px solid"} borderColor={"border"} p={1}>
            <Text textStyle={"sm"} fontWeight={"bold"}>
              Left
            </Text>
            <Button onClick={() => setExpandLeft(!expandLeft)} size={"2xs"} variant={expandLeft ? "solid" : "outline"}>
              Expand {expandLeft ? "(ON)" : "(OFF)"}
            </Button>
            <Button onClick={() => setPinLeft(!pinLeft)} size={"2xs"} variant={pinLeft ? "solid" : "outline"}>
              Pin {pinLeft ? "(ON)" : "(OFF)"}
            </Button>
          </HStack>
          <HStack border={"1px solid"} borderColor={"border"} p={1}>
            <Text textStyle={"sm"} fontWeight={"bold"}>
              Bottom
            </Text>
            <Button
              onClick={() => setExpandBottom(!expandBottom)}
              size={"2xs"}
              variant={expandBottom ? "solid" : "outline"}
            >
              Expand {expandBottom ? "(ON)" : "(OFF)"}
            </Button>
            <Button onClick={() => setPinBottom(!pinBottom)} size={"2xs"} variant={pinBottom ? "solid" : "outline"}>
              Pin {pinBottom ? "(ON)" : "(OFF)"}
            </Button>
          </HStack>
          <HStack border={"1px solid"} borderColor={"border"} p={1}>
            <Text textStyle={"sm"} fontWeight={"bold"}>
              Right
            </Text>
            <Button
              onClick={() => setExpandRight(!expandRight)}
              size={"2xs"}
              variant={expandRight ? "solid" : "outline"}
            >
              Expand {expandRight ? "(ON)" : "(OFF)"}
            </Button>
            <Button onClick={() => setPinRight(!pinRight)} size={"2xs"} variant={pinRight ? "solid" : "outline"}>
              Pin {pinRight ? "(ON)" : "(OFF)"}
            </Button>
          </HStack>
        </HStack>
      </Flexbox>
      <Flexbox
        direction="horizontal"
        width="100%"
        height="100%"
        style={{ maxWidth: "100vw", overflow: "hidden", position: "relative" }}
      >
        <FloatingPanel
          title="Panel Left"
          trigger={
            <Button onClick={() => setExpandLeft(!expandLeft)} size={"2xs"} variant={expandLeft ? "solid" : "outline"}>
              Expand {expandLeft ? "(ON)" : "(OFF)"}
            </Button>
          }
        >
          Floating Panel Left
        </FloatingPanel>

        <Flexbox
          flex={1}
          direction={"vertical"}
          width={"100%"}
          height={"100%"}
          style={{ overflow: "hidden", position: "relative" }}
        >
          <Flexbox
            flex={1}
            direction={"vertical"}
            style={{
              overflow: "hidden auto",
              position: "relative",
              backgroundColor: "white",
              padding: 1,
            }}
          >
            content
          </Flexbox>
          <FloatingPanel
            title="Panel Bottom"
            trigger={
              <Button
                onClick={() => setExpandBottom(!expandBottom)}
                size={"2xs"}
                variant={expandBottom ? "solid" : "outline"}
              >
                Expand {expandBottom ? "(ON)" : "(OFF)"}
              </Button>
            }
          >
            Floating Panel Bottom
          </FloatingPanel>
        </Flexbox>

        <FloatingPanel
          title="Panel Bottom"
          trigger={
            <Button
              onClick={() => setExpandRight(!expandRight)}
              size={"2xs"}
              variant={expandRight ? "solid" : "outline"}
            >
              Expand {expandRight ? "(ON)" : "(OFF)"}
            </Button>
          }
        >
          Floating Panel expandRight
        </FloatingPanel>
      </Flexbox>
    </Flexbox>
  )
}
