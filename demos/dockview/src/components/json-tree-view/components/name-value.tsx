import { useContext } from "react"
import { JsonViewContext } from "./json-view"
import { chakra, HStack, Stack, Badge, Wrap, WrapItem, Box } from "@chakra-ui/react"
import { isObject } from '../utils'
import JsonNode from "./json-node"

interface Props {
  indexOrName: number | string
  value: any
  depth: number
  parent?: Record<string, any> | Array<any>
  parentPath: string[]
  deleteHandle: (indexOrName: string | number, parentPath: string[]) => void
  editHandle: (indexOrName: string | number, newValue: any, oldValue: any, parentPath: string[]) => void
}

export default function NameValue({ indexOrName, value, depth, deleteHandle, editHandle, parent, parentPath }: Props) {
  const { displayArrayIndex } = useContext(JsonViewContext)
  const isArray = Array.isArray(parent)
  const isCurrentValueArray = Array.isArray(value)
  const isCurrentValuePlainObject = isObject(value)

  return (
    <Box
      // flexDirection={isCurrentValueArray || isCurrentValuePlainObject ? 'column': 'row'}
      css={{
        ...(isCurrentValueArray || isCurrentValuePlainObject ? {
        }: {
          display: 'flex',
          flexDirection: 'row',


        }),
        border: "1px solid",
        borderColor: "border",
        p: 2,
      }}
    >
      {!isArray || (isArray && displayArrayIndex) ? (
        <>
          <Badge
            data-id="name-value--array-index--or--object-name"
            variant={typeof indexOrName === "number" ? "outline" : "surface"}
            css={{
              mr: 2
            }}
          >
            {indexOrName}
          </Badge>
        </>
      ) : (
        <></>
      )}


      <JsonNode
        node={value}
        depth={depth + 1}
        deleteHandle={(indexOrName, parentPath) => deleteHandle(indexOrName, parentPath)}
        editHandle={(indexOrName, newValue, oldValue, parentPath) =>
          editHandle(indexOrName, newValue, oldValue, parentPath)
        }
        parent={parent}
        indexOrName={indexOrName}
        parentPath={parentPath}
      />
    </Box>
  )
}
