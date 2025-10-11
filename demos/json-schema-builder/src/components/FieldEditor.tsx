"use client"
import React, { useId, useMemo, useState } from "react"
import {
  Stack,
  Card,
  CloseButton,
  HStack,
  Select as ChakraSelect,
  createListCollection,
  Text,
  Wrap,
  Button,
  IconButton,
  Menu,
  Portal,
  Icon,
  Field,
  Input,
  Switch as ChakraSwitch,
  Dialog,
  SimpleGrid,
} from "@chakra-ui/react"

import { Trash2, ChevronDown, ChevronUp, Settings, Link, List, GripVertical, Sparkles } from "lucide-react"
import FieldTypeIcon from "./FieldTypeIcon"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Import new sub-components
import FieldAdvancedOptions from "./FieldAdvancedOptions"
import FieldDropdownOptions from "./FieldDropdownOptions"
import FieldObjectProperties from "./FieldObjectProperties"

export type SchemaFieldType =
  | "string"
  | "int"
  | "date"
  | "datetime"
  | "time" // Added new 'time' type
  | "float"
  | "currency"
  | "object"
  | "ref"
  | "dropdown"
  | "boolean"

export interface SchemaField {
  id: string
  name: string
  type: SchemaFieldType
  isMultiple: boolean
  isRequired: boolean
  title?: string
  description?: string
  example?: string
  children?: SchemaField[]
  refId?: string
  minValue?: number
  maxValue?: number
  minItems?: number
  maxItems?: number
  currency?: string
  options?: string[]
  parentId?: string
  isValidName?: boolean
  pattern?: string
  minLength?: number // New: Minimum length for string
  maxLength?: number // New: Maximum length for string
}

interface FieldEditorProps {
  field: SchemaField
  onFieldChange: (field: SchemaField) => void
  onAddField?: (parentId: string) => void
  onRemoveField?: (fieldId: string) => void
  onMoveField?: (fieldId: string, direction: "up" | "down", parentId?: string) => void
  isRoot?: boolean
  level?: number
  reusableTypes?: SchemaField[]
  hideRefTypeOption?: boolean
  dragHandleAttributes?: React.HTMLAttributes<HTMLButtonElement>
  dragHandleListeners?: React.HTMLAttributes<HTMLButtonElement>
  isFirstItem?: boolean
  isLastItem?: boolean
  onManageReusableTypes?: () => void
  onConvertToReusableType?: (fieldId: string) => void
  onRefineFieldWithAI?: (field: SchemaField) => void
}

const FieldEditor: React.FC<FieldEditorProps> = React.memo(
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
    dragHandleAttributes,
    dragHandleListeners,
    isFirstItem = false,
    isLastItem = false,
    onManageReusableTypes,
    onConvertToReusableType,
    onRefineFieldWithAI,
  }: any) => {
    const [nameError, setNameError] = React.useState<string | null>(null)

    const reusableTypesCollection = useMemo(() => {
      return createListCollection({
        items: reusableTypes,
        itemToValue: (item: any) => item.id,
        itemToString: (item: any) => item.name,
      })
    }, [reusableTypes])


    const borderColors = [
      "border-blue-400",
      "border-green-400",
      "border-purple-400",
      "border-yellow-400",
      "border-red-400",
    ]

    const getBackgroundClasses = (currentLevel: number) => {
      if (currentLevel === 0) {
        return "bg-background"
      }
      const lightShades = ["bg-gray-50", "bg-gray-100", "bg-gray-200", "bg-gray-300"]
      const darkShades = ["dark:bg-gray-800", "dark:bg-gray-850", "dark:bg-gray-900", "dark:bg-gray-925"]
      const index = (currentLevel - 1) % lightShades.length
      return `${lightShades[index]} ${darkShades[index]}`
    }

    const currentBorderColor = borderColors[(level - 1) % borderColors.length]

    const validateName = (name: string): boolean => {
      // Allow alphanumeric, underscore, and hyphen. Must not be empty.
      const isValid = /^[a-zA-Z0-9_-]*$/.test(name) && name.trim() !== ""
      if (!isValid) {
        setNameError("Name must be alphanumeric, hyphens, or underscores (no spaces).")
      } else {
        setNameError(null)
      }
      return isValid
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value
      const isValid = validateName(newName)
      onFieldChange({ ...field, name: newName, isValidName: isValid })
    }

    // Validate initial name on mount
    React.useEffect(() => {
      validateName(field.name)
    }, [field.name])

    const handleTypeChange = (value: SchemaFieldType) => {
      onFieldChange({
        ...field,
        type: value,
        children: value === "object" ? field.children || [] : undefined,
        refId: value === "ref" ? field.refId : undefined,
        minValue: value === "int" || value === "float" || value === "currency" ? field.minValue : undefined,
        maxValue: value === "int" || value === "float" || value === "currency" ? field.maxValue : undefined,
        currency: value === "currency" ? field.currency : undefined,
        options: value === "dropdown" ? field.options || [] : undefined,
        pattern:
          value === "string" || value === "date" || value === "datetime" || value === "time"
            ? field.pattern
            : undefined, // Keep pattern for string, date, datetime, time
        minLength: value === "string" ? field.minLength : undefined, // Preserve minLength for string, clear for others
        maxLength: value === "string" ? field.maxLength : undefined, // Preserve maxLength for string, clear for others
      })
    }

    // const handleRefChange = (refId: string | any) => {
    //   console.log({
    //     refId, field, reusableTypes
    //   })
    //   onFieldChange({ ...field, refId: refId })
    //
    //
    //   if (e?.value?.length > 0) {
    //     const refId = e?.value[0]
    //     onFieldChange({ ...field, refId: refId })
    //   }
    // }


    const handleRefChange =  (e: any) => {
      if (e?.value?.length > 0) {
        const refId = e?.value[0]
        onFieldChange({ ...field, refId: refId })
      }
    }




    const handleMultipleChange = ({ checked }: boolean | any) => {
      onFieldChange({
        ...field,
        isMultiple: checked,
        minItems: checked ? field.minItems : undefined,
        maxItems: checked ? field.maxItems : undefined,
      })
    }

    const handleRequiredChange = ({ checked }: boolean | any) => {
      onFieldChange({ ...field, isRequired: checked })
    }

    const handleMoveUp = () => {
      if (onMoveField) {
        onMoveField(field.id, "up", field.parentId)
      }
    }

    const handleMoveDown = () => {
      if (onMoveField) {
        onMoveField(field.id, "down", field.parentId)
      }
    }

    const typeOptions: { value: SchemaFieldType; label: string }[] = [
      { value: "string", label: "String" },
      { value: "int", label: "Integer" },
      { value: "float", label: "Float" },
      { value: "currency", label: "Currency" },
      { value: "date", label: "Date" },
      { value: "datetime", label: "DateTime" },
      { value: "time", label: "Time" }, // Added new 'time' option
      { value: "object", label: "Object" },
      { value: "dropdown", label: "Dropdown" },
      { value: "boolean", label: "Boolean" },
      { value: "ref", label: "Reference ($ref)" },
    ]

    return (
      <Card.Root boxShadow={'sm'}>
        <Card.Header>
          <Wrap alignItems="center" gap={4}>
            {/* Drag and Move Buttons */}
            {!isRoot && (
              <Stack>
                <IconButton
                  variant="ghost"
                  size="2xs"
                  onClick={handleMoveUp}
                  disabled={isFirstItem}
                  aria-label="Move field up"
                >
                  <ChevronUp />
                </IconButton>
                <IconButton
                  variant="ghost"
                  size="2xs"
                  {...dragHandleListeners}
                  {...dragHandleAttributes}
                  aria-label="Drag to reorder"
                >
                  <GripVertical />
                </IconButton>
                <IconButton
                  variant="ghost"
                  size="2xs"
                  onClick={handleMoveDown}
                  disabled={isLastItem}
                  aria-label="Move field down"
                >
                  <ChevronDown />
                </IconButton>
              </Stack>
            )}

            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton variant="surface" size="sm">
                  <FieldTypeIcon type={field.type} />
                </IconButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    {typeOptions.map((option) => {
                      if (hideRefTypeOption && option.value === "ref") return null
                      return (
                        <Menu.Item
                          key={option.value}
                          value={option.value}
                          onSelect={() => handleTypeChange(option.value)}
                          css={{
                            bg: field.type === option.value && "bg.muted",
                          }}
                        >
                          <Icon size={"sm"}>
                            <FieldTypeIcon type={option.value} />
                          </Icon>
                          <span>{option.label}</span>
                        </Menu.Item>
                      )
                    })}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            <Field.Root
              invalid={!!nameError}
              css={{
                flex: 1,
              }}
            >
              <Input
                id={`field-name-${field.id}`}
                value={field.name}
                onChange={handleNameChange}
                placeholder="e.g., productName"
              />
              {nameError && <Field.ErrorText>{nameError}</Field.ErrorText>}
            </Field.Root>

            {onConvertToReusableType && !isRoot && !hideRefTypeOption && field.type !== "ref" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Convert to reusable type"
                    onClick={() => onConvertToReusableType(field.id)}
                  >
                    <Link />
                  </IconButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Convert to Reusable Type</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <ChakraSwitch.Root
                  id={`multiple-switch-${field.id}`}
                  checked={field.isMultiple}
                  onCheckedChange={handleMultipleChange}
                >
                  <ChakraSwitch.HiddenInput />
                  <ChakraSwitch.Control />
                  <ChakraSwitch.Label>Multiple</ChakraSwitch.Label>
                </ChakraSwitch.Root>
              </TooltipTrigger>
              <TooltipContent>
                <p>If enabled, this field will be an array (list) of values.</p>
              </TooltipContent>
            </Tooltip>

            {!isRoot && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <ChakraSwitch.Root
                    id={`required-switch-${field.id}`}
                    checked={field.isRequired}
                    onCheckedChange={handleRequiredChange}
                  >
                    <ChakraSwitch.HiddenInput />
                    <ChakraSwitch.Control />
                    <ChakraSwitch.Label>Required</ChakraSwitch.Label>
                  </ChakraSwitch.Root>
                </TooltipTrigger>
                <TooltipContent>
                  <p>If enabled, this field will be an array (list) of values.</p>
                </TooltipContent>
              </Tooltip>
            )}

            {onRefineFieldWithAI && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconButton
                    variant="solid"
                    size="sm"
                    onClick={() => onRefineFieldWithAI(field)}
                    aria-label="Refine field with AI"
                  >
                    <Sparkles />
                  </IconButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refine field with AI</p>
                </TooltipContent>
              </Tooltip>
            )}

            {!isRoot && onRemoveField && (
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <IconButton size="sm" variant="solid" colorPalette={"red"}>
                    <Trash2 />
                  </IconButton>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Are you absolutely sure?</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        This action cannot be undone. This will permanently delete the field "
                        {field.name || "Unnamed Field"}" and any nested properties.
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button variant="solid" colorPalette={"red"} onClick={() => onRemoveField(field.id)}>
                          Delete Field
                        </Button>
                      </Dialog.Footer>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Dialog.CloseTrigger>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            )}
          </Wrap>
        </Card.Header>

        <Card.Body >
          <Stack gap={4}>
            {field.type === "ref" && (
              <SimpleGrid gap={2}>
                <Field.Root>
                  <HStack justifyContent='space-between' alignItems='center' w='full'>
                    <Field.Label>Select Reference</Field.Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onManageReusableTypes}
                    >
                      <Settings /> Manage Types
                    </Button>

                  </HStack>
                </Field.Root>

                <ChakraSelect.Root
                  collection={reusableTypesCollection}
                  // @ts-ignore
                  value={[field.refId] || []}
                  onValueChange={handleRefChange}
                >
                  <ChakraSelect.HiddenSelect />
                  <ChakraSelect.Control>
                    <ChakraSelect.Trigger >
                      <ChakraSelect.ValueText placeholder="Select a reusable type" />
                    </ChakraSelect.Trigger>
                    <ChakraSelect.IndicatorGroup>
                      <ChakraSelect.Indicator />
                    </ChakraSelect.IndicatorGroup>
                  </ChakraSelect.Control>
                  <Portal>
                    <ChakraSelect.Positioner>
                      <ChakraSelect.Content>

                        {reusableTypesCollection.items.length === 0 && (
                          <Text textAlign={'center'}>
                            No reusable types defined.
                          </Text>
                        )}

                        {reusableTypesCollection.items.map((collectionItem) => (
                          <ChakraSelect.Item item={collectionItem} key={collectionItem.id}>
                            {collectionItem.name || "Unnamed Type"}
                            <ChakraSelect.ItemIndicator />
                          </ChakraSelect.Item>
                        ))}
                      </ChakraSelect.Content>
                    </ChakraSelect.Positioner>
                  </Portal>
                </ChakraSelect.Root>

              </SimpleGrid>
            )}

            {field.type !== "ref" && <FieldAdvancedOptions field={field} onFieldChange={onFieldChange} />}

            {field.type === "dropdown" && <FieldDropdownOptions field={field} onFieldChange={onFieldChange} />}
            {field.type === "object" && (
              <FieldObjectProperties
                field={field}
                onFieldChange={onFieldChange}
                onAddField={onAddField}
                onRemoveField={onRemoveField}
                onMoveField={onMoveField}
                level={level}
                reusableTypes={reusableTypes}
                hideRefTypeOption={hideRefTypeOption}
                onManageReusableTypes={onManageReusableTypes}
                onConvertToReusableType={onConvertToReusableType}
                onRefineFieldWithAI={onRefineFieldWithAI}
              />
            )}

          </Stack>

        </Card.Body>
      </Card.Root>
    )
  },
)

FieldEditor.displayName = "FieldEditor"

export default FieldEditor
