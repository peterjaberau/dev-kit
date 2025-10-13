"use client"
import { Menu, Select } from "@mantine/core"
import { Button, IconButton } from "@chakra-ui/react"
import { IconChevronDown, IconFileUpload } from "@tabler/icons-react"
import { memo } from "react"
import JSONEditor from "../code-editors/json-editor"
import PanelShell from "../panel-shell"
import { DataTypeRaw, DataTypeRawFormat } from "../../models/data-type-raw"
import { examples } from "../../models/examples"
import { openTextFile } from "../../services/files"

/**
 * Panel for query argument type editation.
 */
const TypePanel = memo(
  ({
    queryArgumentTypeRaw,
    onQueryArgumentTypeRawChanged,
  }: {
    queryArgumentTypeRaw: DataTypeRaw
    onQueryArgumentTypeRawChanged: (queryArgumentTypeRaw: DataTypeRaw) => void
  }) => {
    return (
      <PanelShell
        toolbar={
          <>
            <Select
              title='Schema Format'
              size="xs"
              w="200px"
              allowDeselect={false}
              data={[
                { label: "JSON Schema Draft 2020-12", value: DataTypeRawFormat.jsonSchema },
                { label: "JSON Type Definition", value: DataTypeRawFormat.jsonTypeDefinition },
              ]}
              value={queryArgumentTypeRaw.format}
              onChange={(value) =>
                onQueryArgumentTypeRawChanged({ ...queryArgumentTypeRaw, format: value as DataTypeRawFormat })
              }
            />
            <IconButton
              size="sm"
              variant="outline"
              title="Load From a File"
              onClick={async () => {
                const content = await openTextFile(".json")
                if (content === null) return
                if (queryArgumentTypeRaw.format === DataTypeRawFormat.jsonSchema)
                  onQueryArgumentTypeRawChanged({ ...queryArgumentTypeRaw, jsonSchemaText: content })
                else onQueryArgumentTypeRawChanged({ ...queryArgumentTypeRaw, jsonTypeDefinitionText: content })
              }}
            >
              <IconFileUpload />
            </IconButton>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="outline" size="sm">
                  Example Schema
                  <IconChevronDown />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {examples.map((e: any, i: any) => (
                  <Menu.Item
                    key={i}
                    onClick={() => {
                      if (queryArgumentTypeRaw.format === DataTypeRawFormat.jsonSchema)
                        onQueryArgumentTypeRawChanged({ ...queryArgumentTypeRaw, jsonSchemaText: e.jsonSchemaText })
                      else
                        onQueryArgumentTypeRawChanged({
                          ...queryArgumentTypeRaw,
                          jsonTypeDefinitionText: e.jsonTypeDefinitionText,
                        })
                    }}
                  >
                    {e.name}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </>
        }
      >
        {queryArgumentTypeRaw.format === DataTypeRawFormat.jsonSchema ? (
          <JSONEditor
            key={DataTypeRawFormat.jsonSchema}
            value={queryArgumentTypeRaw.jsonSchemaText}
            onValueChanged={(v) => onQueryArgumentTypeRawChanged({ ...queryArgumentTypeRaw, jsonSchemaText: v })}
          />
        ) : (
          <JSONEditor
            key={DataTypeRawFormat.jsonTypeDefinition}
            value={queryArgumentTypeRaw.jsonTypeDefinitionText}
            onValueChanged={(v) =>
              onQueryArgumentTypeRawChanged({ ...queryArgumentTypeRaw, jsonTypeDefinitionText: v })
            }
          />
        )}
      </PanelShell>
    )
  },
)
export default TypePanel
