"use client"
import React from "react"
import { Collapsible as ChakraCollapsible, Text, Button as ChakraButton, Stack, Center } from "@chakra-ui/react"
import { PlusCircle, ChevronDown, ChevronUp } from "lucide-react"
import SortableFieldEditor from "./SortableFieldEditor"
import { SchemaField } from "./FieldEditor"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"

interface FieldObjectPropertiesProps {
  field: SchemaField
  onFieldChange: (field: SchemaField) => void
  onAddField?: (parentId: string) => void
  onRemoveField?: (fieldId: string) => void
  onMoveField?: (fieldId: string, direction: "up" | "down", parentId?: string) => void
  level: number
  reusableTypes: SchemaField[]
  hideRefTypeOption: boolean
  onManageReusableTypes?: () => void
  onConvertToReusableType?: (fieldId: string) => void
  onRefineFieldWithAI?: (field: SchemaField) => void // New prop for AI refinement
}

const FieldObjectProperties: React.FC<FieldObjectPropertiesProps> = React.memo(
  ({
    field,
    onFieldChange,
    onAddField,
    onRemoveField,
    onMoveField,
    level,
    reusableTypes,
    hideRefTypeOption,
    onManageReusableTypes,
    onConvertToReusableType,
    onRefineFieldWithAI, // Destructure new prop
  }) => {
    const [isObjectPropertiesOpen, setIsObjectPropertiesOpen] = React.useState(true)

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    )

    const borderColors = [
      "border-blue-400",
      "border-green-400",
      "border-purple-400",
      "border-yellow-400",
      "border-red-400",
    ]

    const handleNestedDragEnd = (event: DragEndEvent) => {
      const { active, over } = event

      if (active.id !== over?.id && field.children) {
        const oldIndex = field.children.findIndex((f) => f.id === active.id)
        const newIndex = field.children.findIndex((f) => f.id === over?.id)

        if (oldIndex !== -1 && newIndex !== -1) {
          const newChildren = arrayMove(field.children, oldIndex, newIndex)
          onFieldChange({ ...field, children: newChildren })
        }
      }
    }

    return (
      <ChakraCollapsible.Root
        open={isObjectPropertiesOpen}
        onOpenChange={() => setIsObjectPropertiesOpen(!isObjectPropertiesOpen)}
        css={{
          // marginTop: 4,
          // paddingTop: 4,
          borderTopWidth: 1,
        }}
      >
        <ChakraCollapsible.Trigger asChild>
          <ChakraButton variant="ghost">
            {isObjectPropertiesOpen ? <ChevronUp /> : <ChevronDown />}
            Properties for {field.name || "Unnamed Object"}:
          </ChakraButton>
        </ChakraCollapsible.Trigger>
        <ChakraCollapsible.Content p={4} borderWidth={1}>
          {field.children && field.children.length > 0 ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleNestedDragEnd}>
              <SortableContext items={field.children.map((child) => child.id)} strategy={verticalListSortingStrategy}>
                <Stack gap={4}>
                  {field.children.map((childField, index) => (
                    <SortableFieldEditor
                      key={childField.id}
                      field={childField}
                      onFieldChange={onFieldChange}
                      onAddField={onAddField}
                      onRemoveField={onRemoveField}
                      onMoveField={onMoveField}
                      level={level + 1}
                      reusableTypes={reusableTypes}
                      hideRefTypeOption={hideRefTypeOption}
                      isFirst={index === 0}
                      isLast={index === (field.children?.length || 0) - 1}
                      onManageReusableTypes={onManageReusableTypes}
                      onConvertToReusableType={onConvertToReusableType}
                      onRefineFieldWithAI={onRefineFieldWithAI} // Pass the new prop
                    />
                  ))}
                </Stack>
              </SortableContext>
            </DndContext>
          ) : (
            <Text textStyle="sm">No properties defined for this object.</Text>
          )}
          {onAddField && (
            <Center width={'full'} py={4}>
              <ChakraButton variant="outline" onClick={() => onAddField(field.id)}>
                <PlusCircle /> Add Property to {field.name || "Unnamed Object"}
              </ChakraButton>
            </Center>
          )}
        </ChakraCollapsible.Content>
      </ChakraCollapsible.Root>
    )
  },
)

FieldObjectProperties.displayName = "FieldObjectProperties"

export default FieldObjectProperties
