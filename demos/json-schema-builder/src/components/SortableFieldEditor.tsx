"use client"
import React from "react"
import { Box, Card } from "@chakra-ui/react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import FieldEditor, { SchemaField } from "./FieldEditor"

interface SortableFieldEditorProps {
  field: SchemaField
  onFieldChange: (field: SchemaField) => void
  onAddField?: (parentId: string) => void
  onRemoveField?: (fieldId: string) => void
  onMoveField?: (fieldId: string, direction: "up" | "down", parentId?: string) => void
  isRoot?: boolean
  level?: number
  reusableTypes?: SchemaField[]
  hideRefTypeOption?: boolean
  isFirst?: boolean // New prop to disable 'move up' for the first item
  isLast?: boolean // New prop to disable 'move down' for the last item
  onManageReusableTypes?: () => void
  onConvertToReusableType?: (fieldId: string) => void
  onRefineFieldWithAI?: (field: SchemaField) => void // New prop for AI refinement
}

const SortableFieldEditor: React.FC<SortableFieldEditorProps> = React.memo(
  ({
    field,
    onFieldChange,
    onAddField,
    onRemoveField,
    onMoveField,
    isRoot = false,
    level = 0,
    reusableTypes = [],
    hideRefTypeOption = false,
    isFirst = false,
    isLast = false,
    onManageReusableTypes,
    onConvertToReusableType,
    onRefineFieldWithAI, // Destructure new prop
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id })

    return (
      <Box
        ref={setNodeRef}
        css={{
          "--ring-inset": "",
          "--ring-offset-width": "0px",
          "--ring-color": "colors.border.info",
          // "--indent-level": `${level * 24}px`,
          transform: CSS.Transform.toString(transform),
          zIndex: isDragging ? 10 : 0,
          opacity: isDragging ? 0.8 : 1,
          // paddingLeft: "var(--indent-level)",
          boxShadow: isDragging && "var(--ring-inset) 0 0 0 calc(2px + var(--ring-offset-width)) var(--ring-color)",
          borderRadius: "sm",
          // bg: "bg.panel",
        }}
      >
        <FieldEditor
          field={field}
          onFieldChange={onFieldChange}
          onAddField={onAddField}
          onRemoveField={onRemoveField}
          onMoveField={onMoveField}
          isRoot={isRoot}
          level={level}
          reusableTypes={reusableTypes}
          hideRefTypeOption={hideRefTypeOption}
          dragHandleAttributes={attributes} // Pass drag attributes
          dragHandleListeners={listeners} // Pass drag listeners
          isFirstItem={isFirst} // Pass isFirst
          isLastItem={isLast} // Pass isLast
          onManageReusableTypes={onManageReusableTypes}
          onConvertToReusableType={onConvertToReusableType}
          onRefineFieldWithAI={onRefineFieldWithAI} // Pass the new prop
        />
      </Box>
    )
  },
)

SortableFieldEditor.displayName = "SortableFieldEditor"

export default SortableFieldEditor
