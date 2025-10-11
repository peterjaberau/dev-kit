"use client"
import React from "react"
import { IconButton, Wrap, Badge, HStack, Text } from "@chakra-ui/react"
import { Trash2, Upload, Download, Settings, Save, FolderOpen, Sparkles } from "lucide-react"

interface SchemaBuilderToolbarProps {
  onAddField: () => void
  onClearSchemaTrigger: () => void
  onImportSchemaTrigger: () => void
  onManageTypesTrigger: () => void
  onExportSchemaTrigger: () => void
  onSaveSchemaTrigger: () => void
  onLoadSchemaTrigger: () => void
  onAIGenerateSchemaTrigger: () => void
  hasSchemaFields: boolean
  hasUnsavedChanges: boolean // New prop
}

const SchemaBuilderToolbar: React.FC<SchemaBuilderToolbarProps> = ({
  onAddField,
  onClearSchemaTrigger,
  onImportSchemaTrigger,
  onManageTypesTrigger,
  onExportSchemaTrigger,
  onSaveSchemaTrigger,
  onLoadSchemaTrigger,
  onAIGenerateSchemaTrigger,
  hasSchemaFields,
  hasUnsavedChanges, // Destructure new prop
}) => {
  return (
    <HStack alignItems={"center"} justifyContent={"space-between"}>
      <HStack gap={4} alignItems={"center"}>
        <Text textStyle="md" fontWeight="medium">
          Define Your Schema Fields
        </Text>
        {hasUnsavedChanges && (
          <Badge variant="solid" colorPalette="orange" size={"xs"}>
            Unsaved changes
          </Badge>
        )}
      </HStack>
      <Wrap gap={2}>
        <IconButton size="2xs" variant="solid" title="Clear All Fields" onClick={onClearSchemaTrigger}>
          <Trash2 />
        </IconButton>

        <IconButton size="2xs" variant="solid" title="Save Schema" onClick={onSaveSchemaTrigger}>
          <Save />
        </IconButton>

        <IconButton size="2xs" variant="solid" title="Load Schema" onClick={onLoadSchemaTrigger}>
          <FolderOpen />
        </IconButton>

        <IconButton size="2xs" variant="solid" title="Import JSON" onClick={onImportSchemaTrigger}>
          <Upload />
        </IconButton>

        <IconButton size="2xs" variant="solid" title="Generate with AI" onClick={onAIGenerateSchemaTrigger}>
          <Sparkles />
        </IconButton>

        <IconButton size="2xs" variant="solid" title="Manage Reusable Types" onClick={onManageTypesTrigger}>
          <Settings />
        </IconButton>

        <IconButton size="2xs" variant="solid" title="Export Generated JSON Schema" onClick={onExportSchemaTrigger}>
          <Download />
        </IconButton>
      </Wrap>
    </HStack>
  )
}

export default SchemaBuilderToolbar
