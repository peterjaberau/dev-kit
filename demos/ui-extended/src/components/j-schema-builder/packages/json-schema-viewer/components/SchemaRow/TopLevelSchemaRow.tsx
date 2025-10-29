"use client"

import { isPlainObject } from "@stoplight/json"
import { isRegularNode, RegularNode } from "@stoplight/json-schema-tree"
import { Box, Button, Flex, HStack, Icon, IconButton, Menu, Portal } from "@chakra-ui/react"
import { useSetAtom } from "jotai"
import { isEmpty } from "lodash"
import * as React from "react"
import { LuChevronDown } from "react-icons/lu"

import { COMBINER_NAME_MAP } from "../../consts"
import { useJSVOptionsContext } from "../../context"
import { useIsOnScreen } from "../../hooks/useIsOnScreen"
import { isComplexArray, isDictionaryNode, visibleChildren } from "../../tree"
import { extractVendorExtensions } from "../../utils/extractVendorExtensions"
import { showPathCrumbsAtom } from "../PathCrumbs/state"
import { Description, getValidationsFromSchema, Validations } from "../shared"
import { ChildStack } from "../shared/ChildStack"
import { Error } from "../shared/Error"
import { SchemaRow, SchemaRowProps } from "./SchemaRow"
import { useChoices } from "./useChoices"

export const TopLevelSchemaRow = ({ schemaNode, skipDescription }: Pick<SchemaRowProps, "schemaNode"> & { skipDescription?: boolean }) => {
  const { renderExtensionAddon } = useJSVOptionsContext()

  const { selectedChoice, setSelectedChoice, choices }: any = useChoices(schemaNode)
  const childNodes = React.useMemo(() => visibleChildren(selectedChoice.type), [selectedChoice.type])
  const nestingLevel = 0

  const nodeId = (() => {
    if (isPlainObject(schemaNode.fragment) && isPlainObject(schemaNode.fragment["x-stoplight"])) {
      const id = schemaNode.fragment["x-stoplight"].id
      return typeof id === "string" ? id : undefined
    }
    return undefined
  })()
  const [totalVendorExtensions, vendorExtensions] = React.useMemo(() => extractVendorExtensions(schemaNode.fragment), [schemaNode.fragment])
  const hasVendorProperties = totalVendorExtensions > 0

  // regular objects are flattened at the top level
  if (isRegularNode(schemaNode) && isPureObjectNode(schemaNode)) {
    return (
      <>
        <ScrollCheck />
        {!skipDescription ? <Description value={schemaNode.annotations.description} /> : null}
        {hasVendorProperties && renderExtensionAddon ? renderExtensionAddon({ schemaNode, nestingLevel, vendorExtensions }) : null}
        <ChildStack schemaNode={schemaNode} childNodes={childNodes} currentNestingLevel={nestingLevel} parentNodeId={nodeId} />
        <Error schemaNode={schemaNode} data-id="top-level-schame-row__pure-obj-node__error" />
      </>
    )
  }

  if (isRegularNode(schemaNode) && choices.length > 1) {
    const combiner: any = isRegularNode(schemaNode) && schemaNode.combiners?.length ? schemaNode.combiners[0] : null

    return (
      <>
        <ScrollCheck />
        {schemaNode.annotations.description !== schemaNode.parent?.fragment.description && (
          <Description value={schemaNode.annotations.description} data-id="top-level-schame-row__choices__description" />
        )}
        <HStack>
          <Menu.Root positioning={{ placement: "bottom-end" }}>
            <Menu.Trigger asChild>
              <Button variant={"plain"} p={0}>
                <Flex fontFamily="mono" fontWeight="semibold" cursor="pointer" fontSize="base">
                  {selectedChoice.title}
                  <Box ml={1}>
                    <Icon size={"xs"}>
                      <LuChevronDown />
                    </Icon>
                  </Box>
                </Flex>
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {choices.map((choice: any, index: any) => {
                    return (
                      <Menu.Item key={index} onSelect={() => setSelectedChoice(choice)} value={index}>
                        {choice.title}
                      </Menu.Item>
                    )
                  })}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          {combiner !== null ? (
            <Flex alignItems="center" color="muted" fontSize="base">
              {`(${COMBINER_NAME_MAP[combiner]})`}
            </Flex>
          ) : null}
        </HStack>
        {childNodes.length > 0 ? (
          <ChildStack
            schemaNode={schemaNode}
            childNodes={childNodes}
            currentNestingLevel={nestingLevel}
            parentNodeId={nodeId}
            data-id="top-level-schame-row__choices__child-stack"
          />
        ) : combiner ? (
          <SchemaRow schemaNode={selectedChoice.type} nestingLevel={nestingLevel} />
        ) : null}
      </>
    )
  }

  if (isComplexArray(schemaNode) && isPureObjectNode(schemaNode.children[0])) {
    const validations = isRegularNode(schemaNode) ? getValidationsFromSchema(schemaNode) : {}
    return (
      <>
        <ScrollCheck />
        <Description value={schemaNode.annotations.description} />

        <Box fontFamily="mono" fontWeight="semibold" fontSize="base" pb={4}>
          array of:
        </Box>

        {!isEmpty(validations) && (
          <Box fontSize="sm" mb={1} mt={-2}>
            <Validations validations={validations} />
          </Box>
        )}

        {childNodes.length > 0 ? <ChildStack schemaNode={schemaNode} childNodes={childNodes} currentNestingLevel={nestingLevel} parentNodeId={nodeId} /> : null}
      </>
    )
  }

  return (
    <>
      <ScrollCheck />
      <SchemaRow schemaNode={schemaNode} nestingLevel={nestingLevel} />
    </>
  )
}

function ScrollCheck() {
  const elementRef: any = React.useRef<HTMLDivElement>(null)

  const isOnScreen = useIsOnScreen(elementRef)
  const setShowPathCrumbs = useSetAtom(showPathCrumbsAtom)
  React.useEffect(() => {
    setShowPathCrumbs(!isOnScreen)
  }, [isOnScreen, setShowPathCrumbs])

  return <div ref={elementRef} />
}

function isPureObjectNode(schemaNode: RegularNode) {
  return schemaNode.primaryType === "object" && schemaNode.types?.length === 1 && !isDictionaryNode(schemaNode)
}


function RenderPureObjectRegularNode({ schemaNode, skipDescription, hasVendorProperties, nestingLevel }: any) {

}
