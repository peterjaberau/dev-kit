/**
 * Chakra UI tree visualizer for XState machines
 * Custom built with Flex, Button, and primitive components - no TreeView
 */

import React, { useState, useMemo } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  Badge,
  Separator,
  Icon,
  Tooltip,
  IconButton,
  Code, Container, Stack,
} from "@chakra-ui/react";
import { LuChevronDown as ChevronDownIcon, LuChevronRight as ChevronRightIcon } from "react-icons/lu"
import { type TreeNode, type TreeEdge, type TreeVisualizerOptions } from "./types";

interface TreeNodeProps {
  node: TreeNode;
  options: TreeVisualizerOptions;
  expandedByDefault: boolean;
  onNodeSelect?: (node: TreeNode) => void;
  selectedNodeId?: string;
}

/**
 * Format event name for display
 */
function formatEventName(event: string): string {
  if (event.startsWith("xstate.after.")) {
    const match = event.match(/xstate\.after\.(\d+)\./);
    if (match) {
      return `after ${match[1]}ms`;
    }
  }
  return event;
}

/**
 * Escape special characters for display
 */
function escapeText(text: string): string {
  let result = text.replace(/^INV:/i, "Invariant:");
  result = result.replace(/:/g, "∶");
  return result;
}

/**
 * Single state node UI component
 */
function StateNodeComponent({
  node,
  options,
  expandedByDefault,
  onNodeSelect,
  selectedNodeId,
}: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault);
  const isSelected = selectedNodeId === node.data.id;
  const hasChildren = node.children.length > 0;
  const hasEdges = node.edges.length > 0;

  // Color scheme
  const bgColor = "gray.800"
  const borderColor = "gray.200"
  const selectedBorderColor = "blue.500"
  const selectedBgColor = "blue.50"
  const tagBgColor = "blue.100"
  const actionBgColor = "green.100"
  const eventBgColor = "purple.100"
  const initialBgColor = "yellow.100"

  const handleSelect = () => {
    onNodeSelect?.(node);
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Stack css={{ justifyContent: "flex-start" }}>
      {/* Node Header */}
      <Flex
        p={3}
        bg={isSelected ? "bg.success" : "bg.panel"}
        borderLeft={isSelected ? "4px" : "2px"}
        borderLeftColor={isSelected ? selectedBorderColor : borderColor}
        borderRadius="md"
        cursor="pointer"
        onClick={handleSelect}
        _hover={{ shadow: "sm" }}
        transition="all 0.2s"
      >
        {/* Expand/Collapse Icon */}
        {hasChildren && (
          <IconButton onClick={handleToggleExpand} size="sm" variant="ghost">
            {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}

        {/* Node Content */}
        <VStack align="flex-start">
          {/* Name and Badge */}
          <HStack>
            <Text fontWeight="bold" fontSize="md">
              {node.data.name}
            </Text>
            {node.data.isInitial && (
              <Badge colorPalette="yellow" size={"xs"}>
                Initial
              </Badge>
            )}
            {hasChildren && (
              <Badge colorPalette="gray" size={"xs"}>
                {node.children.length} child{node.children.length !== 1 ? "ren" : ""}
              </Badge>
            )}
            {hasEdges && (
              <Badge colorPalette="purple" size="xs">
                {node.edges.length} transition{node.edges.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </HStack>

          {/* Description */}
          {node.data.description && (
            <Text fontSize="sm" color="gray.600" fontStyle="italic">
              {node.data.description}
            </Text>
          )}

          {/* Tags */}
          {node.data.tags.length > 0 && (
            <Wrap gap={1}>
              {node.data.tags.map((tag, idx) => (
                <WrapItem key={idx}>
                  <Badge colorPalette="blue" variant="subtle" size="xs">
                    {tag}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          )}

          {/* Entry Actions */}
          {options.includeEntryActions && node.data.entryActions.length > 0 && (
            <VStack align="flex-start" gap={1} w="full">
              <Text fontSize="xs" fontWeight="semibold" color="green.600">
                ↳ Entry Actions
              </Text>
              <Wrap gap={1}>
                {node.data.entryActions.map((action, idx) => (
                  <WrapItem key={idx}>
                    <Badge colorPalette="green" variant="subtle" size="xs">
                      ⚡ {action}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          )}

          {/* Exit Actions */}
          {options.includeExitActions && node.data.exitActions.length > 0 && (
            <VStack align="flex-start" gap={1} w="full">
              <Text fontSize="xs" fontWeight="semibold" color="red">
                ↲ Exit Actions
              </Text>
              <Wrap gap={1}>
                {node.data.exitActions.map((action, idx) => (
                  <WrapItem key={idx}>
                    <Badge colorPalette="red" variant="subtle" size="xs">
                      ⚡ {action}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          )}

          {/* Invokes */}
          {options.includeInvokes && node.data.invokes.length > 0 && (
            <VStack align="flex-start" gap={1} w="full">
              <Text fontSize="xs" fontWeight="semibold" color="orange">
                ◉ Invoke Actors
              </Text>
              {node.data.invokes.map((invoke, idx) => (
                <VStack key={idx} align="flex-start" gap={1} w="full" pl={2}>
                  <Code fontSize="xs" p={1} borderRadius="sm">
                    {escapeText(invoke.src)}
                  </Code>
                  <Text fontSize="xs" color="gray.500">
                    ID∶ {escapeText(invoke.id)}
                  </Text>
                </VStack>
              ))}
            </VStack>
          )}

          {/* Meta */}
          {options.includeMeta && node.data.meta && Object.keys(node.data.meta).length > 0 && (
            <VStack align="flex-start" gap={1} w="full">
              <Text fontSize="xs" fontWeight="semibold" color="gray.600">
                Meta
              </Text>
              {Object.entries(node.data.meta).map(([key, value], idx) => (
                <HStack key={idx} fontSize="xs" gap={2}>
                  <Code p={1} borderRadius="sm">
                    {key}∶
                  </Code>
                  <Text>
                    {Array.isArray(value)
                      ? value.join(", ")
                      : typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : String(value)}
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      </Flex>

      {/* Transitions/Edges */}
      {isExpanded && options.includeActions && node.edges.length > 0 && (
        <Box pl={8} py={2} borderLeft={`2px dashed ${borderColor}`}>
          <VStack align="stretch" gap={2}>
            {node.edges.map((edge, idx) => (
              <TransitionEdgeComponent key={idx} edge={edge} options={options} />
            ))}
          </VStack>
        </Box>
      )}

      {/* Children - Nested States */}
      {isExpanded && hasChildren && (
        <Box pl={4} py={2} borderLeft={`2px solid ${borderColor}`}>
          <VStack align="stretch" gap={3}>
            {node.children.map((child) => (
              <StateNodeComponent
                key={child.data.id}
                node={child}
                options={options}
                expandedByDefault={expandedByDefault}
                onNodeSelect={onNodeSelect}
                selectedNodeId={selectedNodeId}
              />
            ))}
          </VStack>
        </Box>
      )}
    </Stack>
  )
}

/**
 * Transition edge component
 */
function TransitionEdgeComponent({
  edge,
  options,
}: {
  edge: TreeEdge;
  options: TreeVisualizerOptions;
}) {
  const eventBgColor = "purple.50"
  const borderColor = "purple.200"

  const formattedEvent = formatEventName(edge.eventType);
  const hasGuard = edge.guard?.type;
  const hasActions = edge.actions && edge.actions.length > 0;

  return (
    <Flex
      p={2}
      bg={eventBgColor}
      border={`1px solid ${borderColor}`}
      borderRadius="md"
      direction="column"
      gap={2}
      fontSize="sm"
    >
      {/* Event */}
      <HStack gap={2}>
        <Text fontWeight="semibold" color="purple.600">
          📤 {formattedEvent}
        </Text>
      </HStack>

      {/* Guard */}
      {options.includeGuards && hasGuard && (
        <Flex align="center" gap={2} pl={2}>
          <Text fontSize="xs" color="orange.600">
            🔐 IF
          </Text>
          <Code fontSize="xs" p={1} borderRadius="sm">
            {hasGuard}
          </Code>
        </Flex>
      )}

      {/* Actions */}
      {options.includeActions && hasActions && (
        <Wrap gap={1} pl={2}>
          {edge.actions?.map((action, idx) => (
            <WrapItem key={idx}>
              <Badge colorScheme="cyan" variant="subtle" fontSize="xs">
                ⚡ {action.type}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Flex>
  );
}

/**
 * Main TreeVisualizer component
 */
export interface TreeVisualizerProps {
  tree: TreeNode;
  options?: TreeVisualizerOptions;
  onNodeSelect?: (node: TreeNode) => void;
  selectedNodeId?: string;
}

export function TreeVisualizer({
  tree,
  options = {},
  onNodeSelect,
  selectedNodeId,
}: TreeVisualizerProps) {
  const expandedByDefault = options.expandedByDefault ?? false;
  const bgColor = "gray.50"

  const resolvedOptions = useMemo(
    () => ({
      includeGuards: options.includeGuards ?? true,
      includeActions: options.includeActions ?? true,
      includeEntryActions: options.includeEntryActions ?? true,
      includeExitActions: options.includeExitActions ?? true,
      includeInvokes: options.includeInvokes ?? true,
      includeTags: options.includeTags ?? true,
      includeMeta: options.includeMeta ?? true,
    }),
    [options]
  );

  return (
    <Box p={6} borderRadius="lg">
      {options.title && (
        <Text fontSize="2xl" fontWeight="bold">
          {options.title}
        </Text>
      )}

      <StateNodeComponent
        node={tree}
        options={resolvedOptions}
        expandedByDefault={expandedByDefault}
        onNodeSelect={onNodeSelect}
        selectedNodeId={selectedNodeId}
      />
    </Box>
  )
}

export default TreeVisualizer;