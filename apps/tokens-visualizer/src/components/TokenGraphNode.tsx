"use client"
import React, { useMemo, useState } from "react"
import { Box, Heading, List, ListItem, Text, Icon, HStack } from "@chakra-ui/react"
import { useGesture } from "@use-gesture/react"
import { FaCopy } from "react-icons/fa"
import { ValueTuple, TokenGraphNodeProps } from "./shared/types"
import { GRAPH_NODE_WIDTH } from "./shared/constants"

// --- START: Constants and Helpers ---
// These were defined in your Lit component's context
const GRAPH_NODE_VALUE_HEIGHT = 20
const GRAPH_NODE_VALUE_MARGIN = 4
const GRAPH_NODE_VALUES_PADDING = 8
const ValuePathSplitter = "@"
const ValuesListSplitter = ","


// --- START: Refactored TokenGraphNode Component ---
export const TokenGraphNode: React.FC<TokenGraphNodeProps> = ({

  id,
  value = "",
  type = "token",
  isFaded = false,
  isIntersect = false,
  selected = false,
  selectionAncestor = false,
  selectionDescendent = false,
  hasDownstream = false,
  hoverUpstream = false,
  style,
  onNodeClick,
  onNodeDoubleClick,
  onNodePointerDown,
  onNodePointerOver,
  onNodePointerOut,
  onNodeDrag,
  onNodeDragStart,
  onNodeDragEnd,
  onCopyToClipboard,

}) => {
  const [isInteractingWithButton, setIsInteractingWithButton] = useState(false)
  const targetRef = React.useRef<HTMLDivElement>(null)

  // 1. Decompose the 'value' prop into displayable parts
  const { decomposedValues, rowCount } = useMemo(() => {
    const values = value.split(ValuesListSplitter)
    if (values.length === 1 && values[0] === "") {
      return { decomposedValues: [], rowCount: 1 }
    }
    const decomposed = values.map((v): ValueTuple => {
      const parts: any = v.split(ValuePathSplitter)
      return [parts[0], parts[1] || ""]
    })
    return {
      decomposedValues: decomposed,
      rowCount: Math.max(decomposed.length, 1),
    }
  }, [value])

  // 2. Calculate all component colors based on props
  const colors = useMemo(() => {
    // Base styles for the value pills
    const valuePillStyles = {
      base: { bg: "gray.100", color: "gray.800" },
      text: { bg: "gray.900", color: "gray.100" },
    }
    if (selected) {
      return {
        bg: "yellow.400",
        color: "black",
        iconColor: "black",
        valuePill: {
          base: { bg: "yellow.100", color: "yellow.800" },
          text: { bg: "yellow.800", color: "yellow.100" },
        },
      }
    }

    let hue = "gray"
    let fillValue = 200

    if (type === "token") {
      hue = selectionDescendent ? "purple" : "purple"
      if (isIntersect || (selectionDescendent && selectionAncestor)) {
        hue = "orange"
        fillValue = 400
      }
    } else if (type === "component") {
      hue = "gray"
      if (hasDownstream) fillValue = 300
    } else if (type === "orphan-category") {
      hue = "cyan"
      if (hasDownstream) fillValue = 300
    }

    if (isFaded) fillValue = Math.max(100, fillValue - 100)

    const textColorShade = fillValue > 400 ? "white" : "black"
    const iconColor = hoverUpstream ? "white" : textColorShade

    return {
      bg: `${hue}.${fillValue}`,
      color: textColorShade,
      iconColor,
      valuePill: valuePillStyles,
    }
  }, [selected, type, isFaded, isIntersect, selectionAncestor, selectionDescendent, hasDownstream, hoverUpstream])

  const nodeHeight =
    rowCount * GRAPH_NODE_VALUE_HEIGHT + (rowCount - 1) * GRAPH_NODE_VALUE_MARGIN + GRAPH_NODE_VALUES_PADDING * 2


  // --- START: Gesture and Event Handling ---

  useGesture(
    {
      onDrag: ({ event, delta, first, last, ctrlKey, metaKey, shiftKey, altKey }) => {
        // Only drag if a modifier key is pressed and not interacting with a button
        if (!isInteractingWithButton && (ctrlKey || metaKey || shiftKey || altKey)) {
          if (first) onNodeDragStart({ id })
          onNodeDrag({ id, delta })
          if (last) onNodeDragEnd({ id })
        }
      },
      onClick: ({ event, shiftKey, metaKey }) => {
        if (!isInteractingWithButton) {
          event.stopPropagation()
          onNodeClick({ id, shiftKey, metaKey })
        }
      },
      onDoubleClick: ({ event }) => {
        if (!isInteractingWithButton) {
          event.stopPropagation()
          onNodeDoubleClick({ id })
        }
      },
      onHover: ({ hovering }) => {
        if (hovering) onNodePointerOver({ id })
        else onNodePointerOut({ id })
      },
      onPointerDown: () => {
        onNodePointerDown({ id })
      },
    },
    { target: targetRef, eventOptions: { passive: false } },
  )

  const handleCopyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(id).then(() => onCopyToClipboard({ id }))
  }

  // --- END: Gesture and Event Handling ---

  return (
    <Box css={style} position="absolute">
      <HStack
        ref={targetRef}
        w={`${GRAPH_NODE_WIDTH}px`}
        h={`${nodeHeight}px`}
        bg={colors.bg}
        color={colors.color}
        borderRadius="md"
        px={2}
        alignItems="center"
        justifyContent="space-between"
        userSelect="none"
        boxShadow={selected ? "0 0 0 2px var(--chakra-colors-blue-400)" : "md"}
        css={{
          ".copy-icon": { display: "none" },
          ":hover .copy-icon": { display: "flex" },
        }}
      >
        <HStack flex={1} overflow="hidden">
          <Box
            className="copy-icon"
            as="button"
            aria-label="Copy ID"
            onPointerDown={() => setIsInteractingWithButton(true)}
            onPointerUp={() => setIsInteractingWithButton(false)}
            onClick={handleCopyToClipboard}
            // Reset button styles
            bg="transparent"
            border="none"
            p={1}
            cursor="pointer"
          >
            <Icon as={FaCopy} color={colors.iconColor} opacity={0.7} _hover={{ opacity: 1 }} />
          </Box>
          <Text
            textStyle="xs"
            css={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            pointerEvents="none"
            pl={1}
          >
            {id}
          </Text>
        </HStack>

        {decomposedValues.length > 0 && (
          <List.Root
            as="ol"
            gap={`${GRAPH_NODE_VALUE_MARGIN}px`}
            pointerEvents="none"
            css={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {decomposedValues.map(([value, path], index) => (
              <List.Item key={index} h={`${GRAPH_NODE_VALUE_HEIGHT}px`}>
                <HStack gap={0}>
                  <Text
                    fontSize="xs"
                    px={2}
                    lineHeight={`${GRAPH_NODE_VALUE_HEIGHT}px`}
                    bg={colors.valuePill.base.bg}
                    color={colors.valuePill.base.color}
                    borderLeftRadius="sm"
                  >
                    {path || "*"}
                  </Text>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    px={2}
                    lineHeight={`${GRAPH_NODE_VALUE_HEIGHT}px`}
                    bg={colors.valuePill.text.bg}
                    color={colors.valuePill.text.color}
                    borderRightRadius="sm"
                  >
                    {value}
                  </Text>
                </HStack>
              </List.Item>
            ))}
          </List.Root>
        )}
      </HStack>
    </Box>
  )
}
