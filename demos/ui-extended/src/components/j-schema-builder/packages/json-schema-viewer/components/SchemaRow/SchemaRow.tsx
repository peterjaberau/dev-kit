"use client"

import { Collapsible, Code, Card, HStack, Icon, useCollapsibleContext, Accordion } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"

import { isMirroredNode, isReferenceNode, isRegularNode, SchemaNode } from "@stoplight/json-schema-tree"
import { Box, Flex, Select, VStack, NativeSelect, Stack } from "@chakra-ui/react"
import type { ChangeType } from "@stoplight/types"
import { Atom } from "jotai"
import last from "lodash/last.js"
import * as React from "react"

import { COMBINER_NAME_MAP } from "../../consts"
import { useJSVOptionsContext } from "../../context"
import { getNodeId, getOriginalNodeId } from "../../hash"
import { isPropertyRequired, visibleChildren } from "../../tree"
import { extractVendorExtensions } from "../../utils/extractVendorExtensions"
import { Caret, Description, getValidationsFromSchema, Types, Validations } from "../shared"
import { ChildStack } from "../shared/ChildStack"
import { Error } from "../shared/Error"
import { Properties, useHasProperties } from "../shared/Properties"
import { hoveredNodeAtom, isNodeHoveredAtom } from "./state"
import { useChoices } from "./useChoices"
import { useAtomValue, useSetAtom } from "jotai"
import {
  SchemaRowDescription,
  SchemaRowError,
  SchemaRowGoToRef,
  SchemaRowProperties,
  SchemaRowSubPath,
  SchemaRowTrigger,
  SchemaRowTypeToShow,
  SchemaRowValidation,
  SchemaRowAnyOf,
  SchemaRowPatternProperty,
  SchemaRowExtension,
  SchemaRowAddon,
  SchemaRowChildren
} from "./components"

export interface SchemaRowProps {
  schemaNode: SchemaNode
  nestingLevel: number
  pl?: any
  parentNodeId?: string
  parentChangeType?: ChangeType
}

export const SchemaRow: React.FunctionComponent<SchemaRowProps> = React.memo(({ schemaNode, nestingLevel, pl, parentNodeId, parentChangeType }: any) => {
  const { defaultExpandedDepth, renderRowAddon, renderExtensionAddon, onGoToRef, hideExamples, renderRootTreeLines, nodeHasChanged, viewMode } = useJSVOptionsContext()

  const setHoveredNode = useSetAtom(hoveredNodeAtom)

  const nodeId = getNodeId(schemaNode, parentNodeId)

  const originalNodeId = schemaNode.originalFragment?.$ref ? getOriginalNodeId(schemaNode, parentNodeId) : nodeId
  const mode = viewMode === "standalone" ? undefined : viewMode
  const hasChanged = nodeHasChanged?.({ nodeId: originalNodeId, mode })

  const [isExpanded, setExpanded] = React.useState<boolean>(!isMirroredNode(schemaNode) && nestingLevel <= defaultExpandedDepth)

  const { selectedChoice, setSelectedChoice, choices }: any = useChoices(schemaNode)
  const typeToShow = selectedChoice.type
  const description = isRegularNode(typeToShow) ? typeToShow.annotations.description : null

  const rootLevel = renderRootTreeLines ? 1 : 2
  const childNodes = React.useMemo(() => visibleChildren(typeToShow), [typeToShow])
  const combiner = isRegularNode(schemaNode) && schemaNode.combiners?.length ? schemaNode.combiners[0] : null
  const isCollapsible = childNodes.length > 0
  const isRootLevel = nestingLevel < rootLevel

  const required = isPropertyRequired(schemaNode)
  const deprecated = isRegularNode(schemaNode) && schemaNode.deprecated
  const validations = isRegularNode(schemaNode) ? schemaNode.validations : {}
  const hasProperties = useHasProperties({ required, deprecated, validations })

  const [totalVendorExtensions, vendorExtensions] = React.useMemo(() => extractVendorExtensions(schemaNode.fragment), [schemaNode.fragment])
  const hasVendorProperties = totalVendorExtensions > 0

  const annotationRootOffset = renderRootTreeLines ? 0 : 8
  let annotationLeftOffset = -20 - annotationRootOffset
  if (nestingLevel > 1) {
    // annotationLeftOffset -= 27;
    annotationLeftOffset = -1 * 29 * Math.max(nestingLevel - 1, 1) - Math.min(nestingLevel, 2) * 2 - 16 - annotationRootOffset

    if (!renderRootTreeLines) {
      annotationLeftOffset += 27
    }
  }

  if (parentChangeType === "added" && hasChanged && hasChanged.type === "removed") {
    return null
  }

  if (parentChangeType === "removed" && hasChanged && hasChanged.type === "added") {
    return null
  }

  return (
    <Box w="full" py={2}>
      <Card.Root>
        <Card.Header
          onMouseEnter={(e: any) => {
            e.stopPropagation()
            setHoveredNode(selectedChoice.type)
          }}
          px={2}
          py={1}
        >
          <VStack data-id="schame-row__card-header_vstack" flex={1} alignItems={"flex-start"}>
            <HStack
              gap={2}
              onClick={isCollapsible ? () => setExpanded(!isExpanded) : undefined}
              cursor={isCollapsible ? "pointer" : undefined}
            >
              <SchemaRowTrigger isCollapsible={isCollapsible} isOpen={isExpanded} />

              <HStack gap={2}>
                <SchemaRowSubPath schemaNode={schemaNode} />
                <SchemaRowTypeToShow choices={choices} typeToShow={typeToShow} />
                <SchemaRowGoToRef schemaNode={schemaNode} onGoToRef={onGoToRef} />
                <SchemaRowPatternProperty schemaNode={schemaNode} />
                <SchemaRowAnyOf choices={choices} selectedChoice={selectedChoice} onChange={(selectedIndex: any) => setSelectedChoice(choices[selectedIndex as number])} />
              </HStack>

              <SchemaRowProperties required={required} deprecated={deprecated} validations={validations} />
            </HStack>
            <SchemaRowDescription schemaNode={schemaNode} description={description} combiner={combiner} />
            <SchemaRowValidation schemaNode={schemaNode} hideExamples={hideExamples} />
            <SchemaRowExtension schemaNode={schemaNode} nestingLevel={nestingLevel} vendorExtensions={vendorExtensions} renderExtensionAddon={renderExtensionAddon} hasVendorProperties={hasVendorProperties}/>


          </VStack>
          <SchemaRowError schemaNode={schemaNode} />
          <SchemaRowAddon schemaNode={schemaNode} nestingLevel={nestingLevel} renderRowAddon={renderRowAddon} />

        </Card.Header>

        <SchemaRowChildren
          schemaNode={schemaNode}
          childNodes={childNodes}
          currentNestingLevel={nestingLevel}
          parentNodeId={nodeId}
          parentChangeType={() => parentChangeType ? parentChangeType : hasChanged ? hasChanged?.type : undefined}
          isCollapsible
          isExpanded

        />

      </Card.Root>
    </Box>
  )
})


