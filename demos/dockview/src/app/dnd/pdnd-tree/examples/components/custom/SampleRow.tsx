import type { RowPropsType } from "../../../components/custom/types"
import type { DataType, IdType } from "../../data/custom/sample"
import { chakra, HStack, Badge } from "@chakra-ui/react"

export const SampleRow = <ID extends IdType, D extends DataType>({
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
  onDebugToggle,
  state,
  withDragHandle = false,
}: Omit<RowPropsType<ID, D>, "item"> & {
  item?: RowPropsType<ID, D>["item"] | null
  withDragHandle?: boolean
}) => {
  if (!item) return null

  const isDebug = Boolean(item.isDebug)

  const isHidden = draggedItem?.id === item.id && indicatorType === "ghost"


  const handleExpandToggleClick = (event: React.MouseEvent) => {
    onExpandToggle?.({
      event,
      item,
      isOpen: !item.isOpen,
    })
  }

  const handleDebugToggleClick = (event: React.MouseEvent) => {
    onDebugToggle?.({
      event,
      item,
      isDebug: !isDebug,
    })
  }

  return (
    <chakra.li
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      ref={itemRef}
      css={{
        "--indent-level": `${indentLevel * indentSize}px`,
        display: "flex",
        width: "100%",
        gap: "2px",
        alignItems: "center",
        padding: "2px",
        margin: 0,
        cursor: "pointer",
        listStyle: "none",
        border: "1px dashed",
        borderColor: "border.muted",
        backgroundColor: "bg.canvas",
        boxShadow: "xs",
        borderRadius: "3px",

        _hover: { boxShadow: "sm" },

        ...(state === "idle" && {
          _hover: { backgroundColor: "bg.muted" },
        }),

        ...(state === "dragging" && { opacity: 0.4 }),
        ...(state === "parent-of-instruction" && {
          backgroundColor: "bg.muted",
        }),
        ...(state === "indicator" && { opacity: 0.5 }),

        ...(instruction?.type === "make-child" && {
          outline: "2px solid",
          outlineColor: "border.info",
        }),

        ...(isHidden && { display: "none" }),
      }}
    >
      {withDragHandle && (
        <chakra.span
          ref={dragHandleRef as React.RefObject<HTMLSpanElement>}
          css={{
            padding: "2px 4px",
            _focusVisible: { backgroundColor: "bg.emphasized" },
            _hover: { backgroundColor: "bg.emphasized" },
          }}
        >
          <svg height="10" viewBox="0 0 6 10" width="6">
            <title>Drag Handle</title>
            <g fill="currentcolor">
              <circle cx="1" cy="1" r="1" />
              <circle cx="5" cy="1" r="1" />
              <circle cx="1" cy="5" r="1" />
              <circle cx="5" cy="5" r="1" />
              <circle cx="1" cy="9" r="1" />
              <circle cx="5" cy="9" r="1" />
            </g>
          </svg>
        </chakra.span>
      )}

      <chakra.div
        css={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          marginLeft: "var(--indent-level)",
          width: "100%",
        }}
      >
        {item.isExpandable ? (
          <chakra.button
            type="button"
            onClick={handleExpandToggleClick}
            css={{
              width: "24px",
              height: "24px",
              background: "transparent",
              border: "none",
            }}
          >
            {item.isOpen ? "▼" : "►"}
          </chakra.button>
        ) : (
          <chakra.div
            css={{
              width: "24px",
              height: "24px",
            }}
          />
        )}

        <HStack justifyContent="space-between" w="100%">
          <HStack flex={1}>{item.data?.name}</HStack>

          <HStack gap={2}>
            <Badge size="xs" variant="subtle" cursor="pointer" onClick={handleDebugToggleClick}>
              {isDebug ? "ON" : "OFF"}
            </Badge>

            <Badge size="xs" variant="subtle">
              {indicatorType}
            </Badge>

            <Badge size="xs" variant="subtle">
              L={indentLevel}
            </Badge>

            {instruction && (
              <HStack>
                <Badge size="xs" variant="subtle">
                  {/*@ts-ignore*/}
                  {`L=${instruction.currentLevel}`}
                </Badge>
                <Badge size="xs" variant="subtle">
                  {/*@ts-ignore*/}
                  {`I=${instruction.indentSize}`}
                </Badge>
              </HStack>
            )}

            <Badge variant={state === "idle" ? "subtle" : "solid"} size={"xs"}>
              {state}
            </Badge>
          </HStack>
        </HStack>
      </chakra.div>
    </chakra.li>
  )
}
