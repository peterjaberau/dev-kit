"use client"

import { Collapsible, Card, HStack, Icon, Stack, useCollapsibleContext, Accordion } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"

import { isMirroredNode, isReferenceNode, isRegularNode, SchemaNode } from "@stoplight/json-schema-tree"
import { Box, Flex, Select, VStack, NativeSelect } from "@chakra-ui/react"
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
;("jotai/utils")

export interface SchemaRowProps {
  schemaNode: SchemaNode
  nestingLevel: number
  pl?: any
  parentNodeId?: string
  parentChangeType?: ChangeType
}

export const SchemaRow: React.FunctionComponent<SchemaRowProps> = React.memo(({ schemaNode, nestingLevel, pl, parentNodeId, parentChangeType }) => {
  const { defaultExpandedDepth, renderRowAddon, renderExtensionAddon, onGoToRef, hideExamples, renderRootTreeLines, nodeHasChanged, viewMode } = useJSVOptionsContext()

  const setHoveredNode = useSetAtom(hoveredNodeAtom)

  const nodeId = getNodeId(schemaNode, parentNodeId)

  // @ts-expect-error originalFragment does exist...
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
    <>
      <Card.Root border={!isCollapsible ? 'none' : undefined  }>
        <Card.Header
          onMouseEnter={(e: any) => {
            e.stopPropagation()
            setHoveredNode(selectedChoice.type)
          }}
        >
          {/*{!isRootLevel && (*/}
          {/*  <Box*/}
          {/*    data-id="id-01"*/}
          {/*  />*/}
          {/*)}*/}
          {/*{parentChangeType !== "added" && parentChangeType !== "removed" ? (*/}
          {/*  <Box*/}
          {/*    data-id="id-02"*/}
          {/*    w={3}*/}
          {/*    h={"full"}*/}
          {/*    pos={"absolute"}*/}
          {/*    left={0}*/}
          {/*    zIndex={20}*/}
          {/*    backgroundColor={"border.emphasized"}>*/}
          {/*  </Box>*/}
          {/*) : null}*/}

          <VStack
            data-id="id-03"
            flex={1}
            alignItems={"flex-start"}
            // paddingLeft={3}
            // ml={isCollapsible && !isRootLevel ? 2 : undefined}
            // backgroundColor={isCollapsible ? 'red': undefined}
          >
            <Flex
              gap={2}
              data-id="id-03-01"
              alignItems="center"
              maxW="full"
              onClick={isCollapsible ? () => setExpanded(!isExpanded) : undefined}
              cursor={isCollapsible ? "pointer" : undefined}
            >
              {isCollapsible && <Caret isExpanded={isExpanded} />}
              <Flex alignItems="baseline" fontSize="base">
                {schemaNode.subpath.length > 0 && shouldShowPropertyName(schemaNode) && (
                  <Box fontFamily="mono" fontWeight="semibold">
                    {last(schemaNode.subpath)} ??
                  </Box>
                )}

                {choices.length === 1 && (
                  <Types schemaNode={typeToShow} />
                )}

                {onGoToRef && isReferenceNode(schemaNode) && schemaNode.external ? (
                  <Box
                    as="a"
                    ml={2}
                    cursor="pointer"
                    color="primary-light"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onGoToRef(schemaNode)
                    }}
                  >
                    (go to ref)
                  </Box>
                ) : null}

                {schemaNode.subpath.length > 1 && schemaNode.subpath[0] === "patternProperties" ? (
                  <Box ml={2} color="muted">
                    (pattern property)
                  </Box>
                ) : null}

                {choices.length > 1 && (
                  <>
                    <NativeSelect.Root aria-label="Pick a type" size="sm">
                      <NativeSelect.Field value={String(choices.indexOf(selectedChoice))} onChange={(selectedIndex: any) => setSelectedChoice(choices[selectedIndex as number])}>
                        {choices.map((choice: any, index: any) => (
                          <option key={String(index)} value={String(index)}>
                            {choice.title}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </>
                )}
              </Flex>
              {hasProperties && <Divider atom={isNodeHoveredAtom(schemaNode)} />}
              <Properties required={required} deprecated={deprecated} validations={validations} />
            </Flex>
            {typeof description === "string" && (!combiner || schemaNode.parent?.fragment.description !== description) && description.length > 0 && (
              <Description value={description} />
            )}
            <Validations validations={isRegularNode(schemaNode) ? getValidationsFromSchema(schemaNode) : {}} hideExamples={hideExamples} />
            {hasVendorProperties && renderExtensionAddon ? <Box>{renderExtensionAddon({ schemaNode, nestingLevel, vendorExtensions })}</Box> : null}
          </VStack>
          <Error schemaNode={schemaNode} />
          {renderRowAddon ? <Box>{renderRowAddon({ schemaNode, nestingLevel })}</Box> : null}
        </Card.Header>

        {isCollapsible && isExpanded ? (

            <ChildStack
              schemaNode={schemaNode}
              childNodes={childNodes}
              currentNestingLevel={nestingLevel}
              parentNodeId={nodeId}
              parentChangeType={parentChangeType ? parentChangeType : hasChanged ? hasChanged?.type : undefined}
            />

        ) : null}
      </Card.Root>
    </>
  )
})

const Divider = ({ atom }: { atom: Atom<boolean> }) => {
  const isHovering = useAtomValue(atom)

  return <Box bg={isHovering ? "canvas-200" : undefined} h="px" flex={1} mx={3} />
}

function shouldShowPropertyName(schemaNode: SchemaNode) {
  return schemaNode.subpath.length === 2 && (schemaNode.subpath[0] === "properties" || schemaNode.subpath[0] === "patternProperties")
}
