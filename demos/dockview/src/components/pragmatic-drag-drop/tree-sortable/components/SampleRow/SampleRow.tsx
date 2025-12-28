import type { RowPropsType } from "#components/pragmatic-drag-drop/tree-sortable/package"
import type { DataType, IdType } from "../../data/sample"
import { chakra, HStack, IconButton, Icon } from "@chakra-ui/react"
import { LuChevronRight, LuChevronDown, LuGripVertical} from 'react-icons/lu'
import "./SampleRow.css"

const SampleRow = <ID extends IdType, D extends DataType>({
  "aria-controls": ariaControls,
  "aria-expanded": ariaExpanded,
  draggedItem,
  dragHandleRef,
  indentLevel,
  indentSize,
  indicatorType,
  instruction,
  item,
  itemRef,
  onExpandToggle,
  state,
  withDragHandle = false,
}: Omit<RowPropsType<ID, D>, "item"> & {
  item?: RowPropsType<ID, D>["item"] | null
  withDragHandle?: boolean
}) => {
  const handleExpandToggleClick = (event: React.MouseEvent) => {
    if (!item) return
    onExpandToggle?.({ event, isOpen: !item.isOpen, item })
  }

  // Don't render the dragged item when using ghost indicators
  const isHidden = draggedItem?.id === item?.id && indicatorType === "ghost"

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: Deliberate
    <chakra.li
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      css={{
        gap: 2,
        alignItems: "center",
        padding: 1,
        margin: 0,
        color: "currentColor",
        cursor: "pointer",
        border: 0,
        borderRadius: "md",
        "--indent-level": `${indentLevel * indentSize}px`,
        listStyle: "none",
        ...(state === "idle" && {
          _hover: {
            backgroundColor: "bg.subtle",
          }
        }),
        ...(state === "dragging" && {
          opacity: 0.4,
        }),
        ...(state === "parent-of-instruction" && {
          parentOfInstruction: {
            backgroundColor: "bg.subtle",
          }
        }),
        ...(state === "indicator" && {
          opacity: 0.5,
        }),
        ...(instruction?.type === "make-child" && {
          outline: '2px solid',
          outlineColor: 'border.info',
        }),
        display: isHidden ? "none": "flex"
      }}
      ref={itemRef as React.RefObject<HTMLLIElement>}
    >
      {withDragHandle ? (
        <IconButton
          variant={'ghost'}
          size={'xs'}
          css={{
            _hover: {
              backgroundColor: "bg.subtle",
            }
          }}
          //@ts-ignore
          ref={dragHandleRef as React.RefObject<HTMLDivElement>}
        >
          <LuGripVertical />
        </IconButton>
      ) : null}
      <chakra.div css={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'var(--indent-level)',
      }}>
        {item?.isExpandable ? (
          <IconButton onClick={handleExpandToggleClick} variant='ghost' size={'xs'} >
            {item.isOpen ? <LuChevronDown /> : <LuChevronRight />}
          </IconButton>
        ) : (
          <div className={"toggleButton"} />
        )}
        {item?.data?.name}
      </chakra.div>
    </chakra.li>
  )
}

export default SampleRow
