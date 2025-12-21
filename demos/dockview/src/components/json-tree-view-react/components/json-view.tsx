'use client';
import { createContext, useCallback, useEffect, useState } from 'react'
import { ChakraProvider, defineConfig, defaultConfig, createSystem, useSlotRecipe, chakra, Container } from "@chakra-ui/react"
import JsonNode from './json-node'
import type { Collapsed, CustomizeCollapseStringUI, CustomizeNode, DisplaySize, Editable, NodeMeta } from '../types'
import { stringifyForCopying } from '../utils'
import { jsonViewTreeSlotRecipe } from "../json-view-tree.slot-recipe"

type OnEdit = (params: {
	newValue: any
	oldValue: any
	depth: number
	src: any
	indexOrName: string | number
	parentType: 'object' | 'array' | null
	parentPath: string[]
}) => void
type OnDelete = (params: {
	value: any
	indexOrName: string | number
	depth: number
	src: any
	parentType: 'object' | 'array' | null
	parentPath: string[]
}) => void
type OnAdd = (params: { indexOrName: string | number; depth: number; src: any; parentType: 'object' | 'array'; parentPath: string[] }) => void
type OnChange = (params: {
	indexOrName: string | number
	depth: number
	src: any
	parentType: 'object' | 'array' | null
	type: 'add' | 'edit' | 'delete'
	parentPath: string[]
}) => void
type OnCollapse = (params: { isCollapsing: boolean; node: Record<string, any> | Array<any>; indexOrName: string | number | undefined; depth: number }) => void

export const defaultURLRegExp = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/

const themeConfig: any = defineConfig({
  ...defaultConfig,
  // cssVarsPrefix: 'chakra',
} as any);
const theme = createSystem(themeConfig);

export const JsonViewContext = createContext({
  src: undefined as any,

  collapseStringsAfterLength: 99,
  collapseStringMode: 'directly' as 'directly' | 'word' | 'address',
  customizeCollapseStringUI: undefined as CustomizeCollapseStringUI | undefined,

  collapseObjectsAfterLength: 20,
  collapsed: false as Collapsed,
  onCollapse: undefined as OnCollapse | undefined,
  enableClipboard: true,

  editable: false as Editable,
  onEdit: undefined as OnEdit | undefined,
  onDelete: undefined as OnDelete | undefined,
  onAdd: undefined as OnAdd | undefined,
  onChange: undefined as OnChange | undefined,

  forceUpdate: () => {},

  customizeNode: undefined as CustomizeNode | undefined,
  customizeCopy: (() => {}) as (node: any, nodeMeta?: NodeMeta) => any,

  displaySize: undefined as DisplaySize,
  displayArrayIndex: true,

  matchesURL: false,
  urlRegExp: defaultURLRegExp,

  ignoreLargeArray: false,

  CopyComponent: undefined as
    | React.FC<{ onClick: (event: React.MouseEvent) => void; className: string, css: any }>
    | React.Component<{ onClick: (event: React.MouseEvent) => void; className: string, css: any }>
    | undefined
    | any,
  CopiedComponent: undefined as
    | React.FC<{ className: string; style: React.CSSProperties, css: any }>
    | React.Component<{ className: string; style: React.CSSProperties, css: any }>
    | undefined
    | any,
  EditComponent: undefined as
    | React.FC<{ onClick: (event: React.MouseEvent) => void; className: string, css: any }>
    | React.Component<{ onClick: (event: React.MouseEvent) => void; className: string, css: any }>
    | undefined
    | any,
  CancelComponent: undefined as
    | React.FC<{ onClick: (event: React.MouseEvent) => void; className: string; style: React.CSSProperties, css: any }>
    | React.Component<{ onClick: (event: React.MouseEvent) => void; className: string; style: React.CSSProperties, css: any }>
    | undefined
    | any,
  DoneComponent: undefined as
    | React.FC<{ onClick: (event: React.MouseEvent) => void; className: string; style: React.CSSProperties, css: any }>
    | React.Component<{ onClick: (event: React.MouseEvent) => void; className: string; style: React.CSSProperties, css: any }>
    | undefined
    | any,
  CustomOperation: undefined as React.FC<{ node: any }> | React.Component<{ node: any }> | undefined
})


export const JsonViewThemeProvider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={theme}>
      {props.children}
    </ChakraProvider>
  );
};



export interface JsonViewProps {
	src: any

	collapseStringsAfterLength?: number
	collapseStringMode?: 'directly' | 'word' | 'address'
	customizeCollapseStringUI?: CustomizeCollapseStringUI

	collapseObjectsAfterLength?: number
	collapsed?: Collapsed
	onCollapse?: OnCollapse

	enableClipboard?: boolean

	editable?: Editable
	onEdit?: OnEdit
	onDelete?: OnDelete
	onAdd?: OnAdd
	onChange?: OnChange

	customizeNode?: CustomizeNode
	customizeCopy?: (node: any, nodeMeta?: NodeMeta) => any

	dark?: boolean
	theme?: 'default' | 'a11y' | 'github' | 'vscode' | 'atom' | 'winter-is-coming'

	displaySize?: DisplaySize
	displayArrayIndex?: boolean

	style?: React.CSSProperties
	className?: string

	matchesURL?: boolean
	urlRegExp?: RegExp

	ignoreLargeArray?: boolean

	CopyComponent?:
		| React.FC<{ onClick: (event: React.MouseEvent) => void; className: string; css: any }>
		| React.Component<{ onClick: (event: React.MouseEvent) => void; className: string; css: any }>
	CopiedComponent?: React.FC<{ className: string; style: React.CSSProperties; css: any }> | React.Component<{ className: string; style: React.CSSProperties; css: any }>

	EditComponent?:
		| React.FC<{ onClick: (event: React.MouseEvent) => void; className: string; css: any }>
		| React.Component<{ onClick: (event: React.MouseEvent) => void; className: string; css: any }>

	CancelComponent?:
		| React.FC<{ onClick: (event: React.MouseEvent) => void; className: string; style: React.CSSProperties; css: any }>
		| React.Component<{ onClick: (event: React.MouseEvent) => void; className: string; style: React.CSSProperties; css: any }>

	DoneComponent?:
		| React.FC<{ onClick: (event: React.MouseEvent) => void; className: string; style: React.CSSProperties; css: any }>
		| React.Component<{ onClick: (event: React.MouseEvent) => void; className: string; style: React.CSSProperties; css: any }>

	CustomOperation?: React.FC<{ node: any }> | React.Component<{ node: any }>
}



export default function JsonView({
	src: _src,

	collapseStringsAfterLength = 99,
	collapseStringMode = 'directly',
	customizeCollapseStringUI,

	collapseObjectsAfterLength = 99,
	collapsed,
	onCollapse,

	enableClipboard = true,

	editable = false,
	onEdit,
	onDelete,
	onAdd,
	onChange,

	dark = false,
	theme = 'default',

	customizeNode,
	customizeCopy = node => stringifyForCopying(node),

	displaySize,
	displayArrayIndex = true,

	style,
	className,

	matchesURL = false,
	urlRegExp = defaultURLRegExp,

	ignoreLargeArray = false,

	CopyComponent,
	CopiedComponent,

	EditComponent,
	CancelComponent,
	DoneComponent,
	CustomOperation
}: JsonViewProps) {
	const [_, update] = useState(0)
	const forceUpdate = useCallback(() => update(state => ++state), [])
	const [src, setSrc] = useState(_src)
	useEffect(() => setSrc(_src), [_src])

  const recipe = useSlotRecipe({ recipe: jsonViewTreeSlotRecipe })
  const { root: cssRoot } = recipe()

  return (
    <JsonViewThemeProvider>
      <JsonViewContext.Provider
        value={{
          src,

          collapseStringsAfterLength,
          collapseStringMode,
          customizeCollapseStringUI,

          collapseObjectsAfterLength,
          collapsed,
          onCollapse,

          enableClipboard,

          editable,
          onEdit,
          onDelete,
          onAdd,
          onChange,

          forceUpdate,

          customizeNode,
          customizeCopy,

          displaySize,
          displayArrayIndex,

          matchesURL,
          urlRegExp,

          ignoreLargeArray,

          CopyComponent,
          CopiedComponent,
          EditComponent,
          CancelComponent,
          DoneComponent,
          CustomOperation,
        }}
      >
        <Container
          css={{
            ...cssRoot,
            width: 'full',
            padding: 0,
            margin: 0
          }}
        >
          <JsonNode
            node={src}
            depth={1}
            editHandle={(indexOrName: number | string, newValue: any, oldValue: any, parentPath: string[]) => {
              setSrc(newValue)
              if (onEdit)
                onEdit({
                  newValue,
                  oldValue,
                  depth: 1,
                  src,
                  indexOrName: indexOrName,
                  parentType: null,
                  parentPath: parentPath,
                })
              if (onChange)
                onChange({
                  type: "edit",
                  depth: 1,
                  src,
                  indexOrName: indexOrName,
                  parentType: null,
                  parentPath: parentPath,
                })
            }}
            deleteHandle={(indexOrName: number | string, parentPath: string[]) => {
              setSrc(undefined)
              if (onDelete)
                onDelete({
                  value: src,
                  depth: 1,
                  src,
                  indexOrName: indexOrName,
                  parentType: null,
                  parentPath: parentPath,
                })
              if (onChange)
                onChange({
                  depth: 1,
                  src,
                  indexOrName: indexOrName,
                  parentType: null,
                  type: "delete",
                  parentPath: parentPath,
                })
            }}
            parentPath={[]}
          />
        </Container>
      </JsonViewContext.Provider>
    </JsonViewThemeProvider>
  )
}
