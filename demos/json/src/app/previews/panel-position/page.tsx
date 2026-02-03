"use client"

import { useEffect, useRef, useState } from "react"
import {
  Code,
  Button,
  Text, Portal,
  Center,
  HStack,
  chakra,
  Container,
  SimpleGrid,
  GridItem,
  Box,
  Wrap,
  Flex,
} from "@chakra-ui/react"
import { PanelBasicStory } from "#components/panel-chakra/story"
import { useResizeObserver } from "@mantine/hooks"


const PanelRenderer: any = (props: any)=> {
  const { isPortal = false, ...rest } = props
  const [ref, rect] = useResizeObserver()

  return (
    <Box
      ref={ref}
      width={"200px"}
      height={"full"}
      bg={"red.500"}
      {...rest}
      css={{
        ...(isPortal
          ? {
              top: 0,
            }
          : {}),
      }}
    >
      <Text>{JSON.stringify(rect)}</Text>
    </Box>
  )
}

export default function Page() {
  const [isClient, setIsClient] = useState(false)
  const [portalEnabled, setPortalEnabled] = useState(false)
  const [displayValue, setDisplayValue] = useState("block")
  const [positionValue, setPositionValue] = useState<"static" | "relative" | "absolute" | "fixed" | "sticky">("static")

  // IMPORTANT: neutral host element

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <Container w={"800px"} height={"500px"} px={0} boxShadow={"md"}>
      <Flex w={"full"} h={"full"} gap={10}>
        <Portal disabled={!portalEnabled}>
          <PanelRenderer isPortal={portalEnabled} />
        </Portal>
        <Wrap alignItems={"flex-start"}>
          <Button onClick={() => setPortalEnabled(!portalEnabled)}>{portalEnabled ? 'in Portal': 'in Container'}</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>4</Button>
          <Button>5</Button>
          <Button>6</Button>
          <Button>7</Button>
          <Button>8</Button>
          <Button>9</Button>
          <Button>10</Button>
          <Button>11</Button>
          <Button>12</Button>
          <Button>13</Button>
          <Button>14</Button>
          <Button>15</Button>
          <Button>16</Button>
          <Button>17</Button>
          <Button>18</Button>
          <Button>19</Button>
          <Button>20</Button>
        </Wrap>
      </Flex>
    </Container>
  )
}

const panelStyles = {
  floatingCollpased: {
    inlineSize: "71px",
    minInlineSize: "71px",
  },
  floating: {
    position: "sticky",
    insetBlockStart: "0px",
    blockSize: "100dvh",
    transitionProperty: "inline-size, min-inline-size, margin-inline-start, inset-inline-start",
    transitionDuration: "300ms",
    transitionTimingFunction: "ease-in-out",
    inlineSize: "260px",
    minInlineSize: "260px",
    zIndex: "1200 !important",
  },
  pinnedExpanded: {
    position: "sticky",
    insetBlockStart: "0px",
    blockSize: "100dvh",
    transitionProperty: "inline-size, min-inline-size, margin-inline-start, inset-inline-start",
    transitionDuration: "300ms",
    transitionTimingFunction: "ease-in-out",
    inlineSize: "260px",
    minInlineSize: "260px",
    zIndex: "1200 !important",
  },
}