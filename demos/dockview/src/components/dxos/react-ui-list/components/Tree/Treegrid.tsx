import { useFocusFinders } from "@fluentui/react-tabster"
import { type Scope, createContextScope } from "@radix-ui/react-context"
import { Primitive } from "@radix-ui/react-primitive"
import { Slot } from "@radix-ui/react-slot"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { chakra } from "@chakra-ui/react"
import React, {
  type CSSProperties,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  forwardRef,
  useCallback,
} from "react"

const TREEGRID_ROW_NAME = "TreegridRow"

const [createTreegridRowContext, createTreegridRowScope] = createContextScope(TREEGRID_ROW_NAME, [])

const [TreegridRowProvider, useTreegridRowContext] = createTreegridRowContext<any>(TREEGRID_ROW_NAME)

const PATH_SEPARATOR = "~"
const PARENT_OF_SEPARATOR = " "

const TreegridRoot = forwardRef<HTMLDivElement, any>(
  ({ asChild, css, children, gridTemplateColumns, ...props }, forwardedRef) => {


    return (
      <chakra.div
        role="treegrid"
        css={{
          ...css,
          display: "grid",
          //grid-template-columns: 1fr;
          // gridTemplateColumns: [tree-row-start] 1fr min-content [tree-row-end]
          gridTemplateColumns: gridTemplateColumns,
        }}
        // onKeyDown={handleKeyDown}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </chakra.div>
    )
  },
)
const rowLevelStyle = new Map<number, any>([
  [1, {
  paddingInlineStart: 0,
  fontWeight: 'medium'
  }],
  [2, {
  paddingInlineStart: 0,
  }],
  [3, {
    paddingInlineStart: 1,
  }],
  [4, {
    paddingInlineStart: 2,
  }],
  [5, {
    paddingInlineStart: 3,
  }],
  [6, {
    paddingInlineStart: 4,
  }],
  [7, {
    paddingInlineStart: 5,
  }],
  [8, {
    paddingInlineStart: 6
  }],
]);


/*
export type TreegridStyleProps = Partial<{
  level: number;
  indent: boolean;
}>;

const levelStyles = new Map<number, string>([
  [1, '[&>.indent:first-of-type]:pis-0 font-medium'],
  [2, '[&>.indent:first-of-type]:pis-0'],
  [3, '[&>.indent:first-of-type]:pis-1'],
  [4, '[&>.indent:first-of-type]:pis-2'],
  [5, '[&>.indent:first-of-type]:pis-3'],
  [6, '[&>.indent:first-of-type]:pis-4'],
  [7, '[&>.indent:first-of-type]:pis-5'],
  [8, '[&>.indent:first-of-type]:pis-6'],
]);

----------treegrid.root----------

export const treegridRoot: ComponentFunction<TreegridStyleProps> = (_, ...etc) => mx('grid', ...etc);

----------treegrid.row----------
export const treegridRow: ComponentFunction<TreegridStyleProps> = ({ level = 1 }, ...etc) =>
  mx('contents', levelStyles.get(Math.min(Math.max(Math.round(level), 1), 8)), ...etc);

----------treegrid.cell----------
export const treegridCell: ComponentFunction<TreegridStyleProps> = ({ indent }, ...etc) =>
  mx(indent && 'indent', ...etc);





 */


const TreegridRow = forwardRef<HTMLDivElement, any>(
  (
    {
      __treegridRowScope,
      asChild,
      classNames,
      children,
      id,
      parentOf,
      open: propsOpen,
      defaultOpen,
      onOpenChange: propsOnOpenChange,
      css,
      ...props
    },
    forwardedRef,
  ) => {
    const pathParts = id.split(PATH_SEPARATOR)
    const level = pathParts.length - 1
    const [open, onOpenChange] = useControllableState({
      prop: propsOpen,
      onChange: propsOnOpenChange,
      defaultProp: defaultOpen,
    })

    return (
      <TreegridRowProvider open={open} onOpenChange={onOpenChange} scope={__treegridRowScope}>
        <chakra.div
          role="row"
          aria-level={level}
          css={{
            gridTemplateColumns: "subgrid",
            gridColumn: "tree-row",
            display: "contents",
            '[&>.indent:first-of-type]': {
              ...rowLevelStyle.get(Math.min(Math.max(Math.round(level), 1), 8))
              },
            ...css,
          }}
          // className={tx("treegrid.row", "treegrid__row", { level }, classNames)}
          {...(parentOf && { "aria-expanded": open, "aria-owns": parentOf })}
          {...props}
          id={id}
          ref={forwardedRef}
        >
          {children}
        </chakra.div>
      </TreegridRowProvider>
    )
  },
)


const TreegridCell = forwardRef<HTMLDivElement, any>(
  ({ css, children, indent, ...props }, forwardedRef) => {
    return (
      <chakra.div
        role="gridcell"
        css={{
          display: "flex",
          alignItems: "center",
          ...css


        }}
        // className={tx("treegrid.cell", "treegrid__cell", { indent }, classNames)}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </chakra.div>
    )
  },
)


export const Treegrid = {
  Root: TreegridRoot,
  Row: TreegridRow,
  Cell: TreegridCell,
  PARENT_OF_SEPARATOR,
  PATH_SEPARATOR,
  createTreegridRowScope,
  useTreegridRowContext,
}
