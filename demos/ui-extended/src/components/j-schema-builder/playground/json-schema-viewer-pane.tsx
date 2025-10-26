"use client"
import { Box, Icon, IconButton, CloseButton, Button, HStack } from "@chakra-ui/react"
import { Pane } from "#components/ui/pane"
import { LuServer as IconServer, LuChevronRight, LuStar, LuPlus } from "react-icons/lu"
import { JsonSchemaViewer } from "../packages/json-schema-viewer"
import { data } from "../packages/json-schema-viewer/__fixtures__"
import { useCurrentApp } from "../actors-model/selectors/current-app"

const schemas = {
  SimpleAllOf: data.combiners.allOfs.base,
  CircularAllOf: data.combiners.allOfs.complex,
  ArrayOneOf: data.combiners.oneofWithArrayType,
  OneOfMulti: data.combiners.oneofWithMultiTypes,
  ArrayOneOf2: data.combiners.oneofWithinArrayItem,
  anyOfObject: data.combiners.anyOf,
  defaultSchema: data.defaultSchema,
  stressSchema: data.stressSchema,
  arrayOfComplexObjects: data.arrays.ofComplexObject,
  boxFileSchema: data.realWorld.boxFile,
  githubIssueSchema: data.realWorld.githubIssue,
  refSchema: data.references.base,
  nullRefSchema: data.references.nullish,
  brokenRefArraySchema: data.arrays.ofRefs,
  allOfRefSchema: data.references.allOfRenference,
  fullAllOfRefDoc: data.references.fullAllOfReference,
  extensionsSchema: data.extensions.simple
}

export function JsonSchemaViewerPane() {

  const { currentViewerExample } = useCurrentApp()
  return (
    <>
      <Pane
        title={"Query"}
        icon={<IconServer />}
        leftSection={
          <IconButton variant="ghost" size="xs" borderRadius={"full"}>
            <LuPlus />
          </IconButton>
        }
        // infoSection={"info"}
        rightSection={
          <HStack>
            <IconButton size={"sm"} variant={"ghost"}>
              <LuStar />
            </IconButton>
          </HStack>
        }
      >
        <JsonSchemaViewer schema={currentViewerExample as any} />
      </Pane>
    </>
  )
}

/**
 * data.combiners.allOfs.base
 */
