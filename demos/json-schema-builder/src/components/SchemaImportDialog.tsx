"use client"
import React from "react"
import {
  Button as ChakraButton,
  Dialog as ChakraDialog,
  Field,
  Stack,
  Textarea as ChakraTextarea,
} from "@chakra-ui/react"

interface SchemaImportDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  importJsonInput: string
  onImportJsonInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onImportSchema: () => void
}

const SchemaImportDialog: React.FC<SchemaImportDialogProps> = ({
  isOpen,
  onOpenChange,
  importJsonInput,
  onImportJsonInputChange,
  onImportSchema,
}) => {
  return (
    <ChakraDialog.Root open={isOpen} onOpenChange={(e) => onOpenChange(e.open)}>
      <ChakraDialog.Backdrop />
      <ChakraDialog.Positioner>
        <ChakraDialog.Content>
          <ChakraDialog.Header>
            <Stack>
              <ChakraDialog.Title>Import JSON Schema</ChakraDialog.Title>
              <ChakraDialog.Description>
                Paste your JSON Schema below to import it into the builder.
              </ChakraDialog.Description>
            </Stack>
          </ChakraDialog.Header>
          <ChakraDialog.Body>
            <Field.Root invalid>
              <Field.Label>Paste your JSON Schema here:</Field.Label>
              <Field.HelperText>Note: Not all JSON Schema features may be fully supported.</Field.HelperText>
              <ChakraTextarea
                id="json-input"
                value={importJsonInput}
                onChange={onImportJsonInputChange}
                placeholder='{ "type": "object", "properties": { "name": { "type": "string" } } }'
                rows={10}
              />
            </Field.Root>
          </ChakraDialog.Body>
          <ChakraDialog.Footer>
            <ChakraDialog.ActionTrigger asChild>
              <ChakraButton variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </ChakraButton>
            </ChakraDialog.ActionTrigger>
            <ChakraButton variant="solid" onClick={onImportSchema}>
              Import
            </ChakraButton>
          </ChakraDialog.Footer>
        </ChakraDialog.Content>
      </ChakraDialog.Positioner>
    </ChakraDialog.Root>
  )
}

export default SchemaImportDialog
