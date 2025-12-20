import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { JsonViewContext } from "./json-view"
import {
  isObject,
  customAdd,
  customCopy,
  customDelete,
  editableAdd,
  editableDelete,
  isCollapsed,
  objectSize,
  ifDisplay,
} from "../utils"
import CopyButton from "./copy-button"
import NameValue from "./name-value"
import { chakra, IconButton, HStack, Stack, Icon, Button, Box } from "@chakra-ui/react"
import {
  BiTrash as DeleteIcon,
  BiPlus as AddIcon,
  BiCheck as DoneIcon,
  BiXCircle as CancelIcon,
  BiChevronDown as AngleDownIcon,
} from "react-icons/bi"

import type { CustomizeOptions } from "../types"
import LargeArray from "./large-array"

interface Props {
  node: Record<string, any> | Array<any>
  depth: number
  indexOrName?: number | string
  deleteHandle?: (_: string | number, currentPath: string[]) => void
  customOptions?: CustomizeOptions
  parent?: Record<string, any> | Array<any>
  parentPath: string[]
}

export default function ObjectNode({
  node,
  depth,
  indexOrName,
  deleteHandle: _deleteSelf,
  customOptions,
  parent,
  parentPath,
}: Props) {
  const {
    collapsed,
    onCollapse,
    enableClipboard,
    ignoreLargeArray,
    collapseObjectsAfterLength,
    editable,
    onDelete,
    src,
    onAdd,
    onEdit,
    onChange,
    forceUpdate,
    displaySize,
    CustomOperation,
  } = useContext(JsonViewContext)

  const currentPath = typeof indexOrName !== "undefined" ? [...parentPath, String(indexOrName)] : parentPath

  if (!ignoreLargeArray && Array.isArray(node) && node.length > 100) {
    return (
      <LargeArray
        node={node}
        depth={depth}
        indexOrName={indexOrName}
        deleteHandle={_deleteSelf}
        customOptions={customOptions}
        parentPath={currentPath}
      />
    )
  }

  const isPlainObject = isObject(node)

  const [fold, _setFold] = useState(
    isCollapsed(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions),
  )

  const setFold = (value: boolean) => {
    onCollapse?.({ isCollapsing: !value, node, depth, indexOrName })
    _setFold(value)
  }

  useEffect(() => {
    setFold(isCollapsed(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions))
  }, [collapsed, collapseObjectsAfterLength])

  // Edit property
  const editHandle = useCallback(
    (indexOrName: number | string, newValue: any, oldValue: any) => {
      if (Array.isArray(node)) {
        node[+indexOrName] = newValue
      } else if (node) {
        node[indexOrName] = newValue
      }
      if (onEdit)
        onEdit({
          newValue,
          oldValue,
          depth,
          src,
          indexOrName: indexOrName,
          parentType: isPlainObject ? "object" : "array",
          parentPath: currentPath,
        })
      if (onChange)
        onChange({
          type: "edit",
          depth,
          src,
          indexOrName: indexOrName,
          parentType: isPlainObject ? "object" : "array",
          parentPath: currentPath,
        })
      forceUpdate()
    },
    [node, onEdit, onChange, forceUpdate],
  )

  // Delete property
  const deleteHandle = (indexOrName: number | string) => {
    if (Array.isArray(node)) {
      node.splice(+indexOrName, 1)
    } else if (node) {
      delete node[indexOrName]
    }
    forceUpdate()
  }

  // Delete self
  const [deleting, setDeleting] = useState(false)
  const deleteSelf = () => {
    setDeleting(false)
    if (_deleteSelf) _deleteSelf(indexOrName!, currentPath)
    if (onDelete)
      onDelete({
        value: node,
        depth,
        src,
        indexOrName: indexOrName!,
        parentType: isPlainObject ? "object" : "array",
        parentPath: currentPath,
      })
    if (onChange)
      onChange({
        type: "delete",
        depth,
        src,
        indexOrName: indexOrName!,
        parentType: isPlainObject ? "object" : "array",
        parentPath: currentPath,
      })
  }

  // Add
  const [adding, setAdding] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const add = () => {
    if (isPlainObject) {
      const inputName = inputRef.current?.value

      if (inputName) {
        ;(node as Record<string, any>)[inputName] = null

        if (inputRef.current) inputRef.current.value = ""
        setAdding(false)

        if (onAdd) onAdd({ indexOrName: inputName, depth, src, parentType: "object", parentPath: currentPath })
        if (onChange)
          onChange({ type: "add", indexOrName: inputName, depth, src, parentType: "object", parentPath: currentPath })
      }
    } else if (Array.isArray(node)) {
      const arr = node as unknown as any[]
      arr.push(null)
      if (onAdd) onAdd({ indexOrName: arr.length - 1, depth, src, parentType: "array", parentPath: currentPath })
      if (onChange)
        onChange({ type: "add", indexOrName: arr.length - 1, depth, src, parentType: "array", parentPath: currentPath })
    }
    forceUpdate()
  }
  const handleAddKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      add()
    } else if (event.key === "Escape") {
      cancel()
    }
  }

  const isEditing = deleting || adding
  const cancel = () => {
    setDeleting(false)
    setAdding(false)
  }

  const Icons = (
    <>
      {!fold && !isEditing && (
        <chakra.span data-id="object-node-action-icons" onClick={() => setFold(true)}>
          {ifDisplay(displaySize, depth, fold) && (
            <chakra.span data-id="display-size">{objectSize(node)} Items</chakra.span>
          )}
          <Icon>
            <AngleDownIcon />
          </Icon>
        </chakra.span>
      )}

      {adding && isPlainObject && (
        <input className="json-view--input" placeholder="property" ref={inputRef} onKeyDown={handleAddKeyDown} />
      )}

      {isEditing && (
        <IconButton size="2xs" variant="ghost" css={{ display: "inline-block" }} onClick={adding ? add : deleteSelf}>
          <DoneIcon />
        </IconButton>
      )}
      {isEditing && (
        <IconButton
          size="2xs"
          variant="ghost"
          className="json-view--edit"
          css={{ display: "inline-block" }}
          onClick={cancel}
        >
          <CancelIcon />
        </IconButton>
      )}

      {!fold && !isEditing && enableClipboard && customCopy(customOptions) && (
        <CopyButton node={node} nodeMeta={{ depth, indexOrName, parent, parentPath, currentPath }} />
      )}
      {!fold && !isEditing && editableAdd(editable) && customAdd(customOptions) && (
        // <AddSVG
        // 	className='json-view--edit'
        // 	onClick={() => {
        // 		if (isPlainObject) {
        // 			setAdding(true)
        // 			setTimeout(() => inputRef.current?.focus())
        // 		} else {
        // 			add()
        // 		}
        // 	}}
        // />
        <IconButton
          size="2xs"
          variant="ghost"
          className="json-view--edit"
          onClick={() => {
            if (isPlainObject) {
              setAdding(true)
              setTimeout(() => inputRef.current?.focus())
            } else {
              add()
            }
          }}
        >
          <AddIcon />
        </IconButton>
      )}
      {!fold && !isEditing && editableDelete(editable) && customDelete(customOptions) && _deleteSelf && (
        <IconButton size="2xs" variant="ghost" className="json-view--edit" onClick={() => setDeleting(true)}>
          <DeleteIcon />
        </IconButton>
        // <DeleteSVG className='json-view--edit' onClick={() => setDeleting(true)} />
      )}
      {typeof CustomOperation === "function" ? <CustomOperation node={node} /> : null}
    </>
  )

  if (Array.isArray(node)) {
    return (
      <>
        {/*<span>{'['}</span>*/}

        {Icons}

        {!fold && (
          <Stack data-id="object-node--array">
            {node.map((n, i) => (
              <NameValue
                key={String(indexOrName) + String(i)}
                indexOrName={i}
                value={n}
                depth={depth}
                parent={node}
                deleteHandle={deleteHandle}
                editHandle={editHandle}
                parentPath={currentPath}
              />
            ))}
          </Stack>
        )}

        {fold && (
          <Button variant="outline" size="2xs" onClick={() => setFold(false)}>
            Expand
          </Button>
        )}

        {fold && ifDisplay(displaySize, depth, fold) && (
          <span style={{ marginLeft: "8px", backgroundColor: "red" }} onClick={() => setFold(false)}>
            {objectSize(node)} Items
          </span>
        )}
      </>
    )
  } else if (isPlainObject) {
    return (
      <>
        {Icons}

        {!fold ? (
          <Stack data-id="object-node--objects">
            {Object.entries(node).map(([name, value]) => (
              <NameValue
                key={String(indexOrName) + String(name)}
                indexOrName={name}
                value={value}
                depth={depth}
                parent={node}
                deleteHandle={deleteHandle}
                editHandle={editHandle}
                parentPath={currentPath}
              />
            ))}
          </Stack>
        ) : (
          <Button onClick={() => setFold(false)} size="2xs" variant="outline">
            Expand
          </Button>
        )}

        {/*<span>{'}'}</span>*/}

        {fold && ifDisplay(displaySize, depth, fold) && (
          <span style={{ marginLeft: "8px" }} onClick={() => setFold(false)}>
            {objectSize(node)} Items
          </span>
        )}
      </>
    )
  } else {
    return <span>{String(node)}</span>
  }
}
