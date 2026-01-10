import { useState } from "react"
import { QueryBuilder } from "#query-builder/headless"
import type { Query } from "#query-builder/headless"
import type { OperatorKey } from "#query-builder/headless/types/common.types"
import { Button, HStack, Stack, Container, Box, chakra, NativeSelect, Input } from "@chakra-ui/react"

const value: Query = {
  id: "root",
  combinator: "and",
  rules: [
    {
      id: "rule-1",
      field: "firstName",
      operator: "equal",
      value: "John",
    },
  ],
}

function App() {
  const [query, setQuery] = useState<Query>(value)

  return (
    <QueryBuilder
      value={query}
      maxDepth={2}
      onChange={(newValue: any) => {
        console.log(newValue)
        setQuery(newValue)
      }}
    >
      <QueryBuilder.Builder
        fields={[
          { label: "First Name", value: "firstName", type: "string" },
          { label: "Last Name", value: "lastName", type: "string" },
          { label: "Age", value: "age", type: "number" },
        ]}
        renderRule={({ rule, slots, onChange, fields, operators, selectedField }: any) => (
          <Box p={2} style={{ marginLeft: 10 }}>
            <HStack>
              {/*<select value={rule.field || ""} onChange={(e) => onChange({ field: e.target.value })}>*/}
              {/*  <option value="" disabled>*/}
              {/*    Select field*/}
              {/*  </option>*/}
              {/*  {fields.map((field: any) => (*/}
              {/*    <option key={field.value} value={field.value}>*/}
              {/*      {field.label}*/}
              {/*    </option>*/}
              {/*  ))}*/}
              {/*</select>*/}

              <NativeSelect.Root size="sm" width={"180px"}>
                <NativeSelect.Field value={rule.field || ""} onChange={(e) => onChange({ field: e.target.value })}>
                  <option value="" disabled>
                    Select field
                  </option>
                  {fields.map((field: any) => (
                    <option key={field.value} value={field.value}>
                      {field.label}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>

              <NativeSelect.Root size="sm" width={"180px"}>
                <NativeSelect.Field
                  value={rule.operator || ""}
                  onChange={(e) => onChange({ operator: e.target.value as OperatorKey })}
                >
                  <option value="" disabled>
                    Select operator
                  </option>
                  {operators.map((operator: any) => (
                    <option key={operator.value} value={operator.value}>
                      {operator.name}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>

              {/*<select value={rule.operator || ""} onChange={(e) => onChange({ operator: e.target.value as OperatorKey })}>*/}
              {/*  <option value="" disabled>*/}
              {/*    Select operator*/}
              {/*  </option>*/}
              {/*  {operators.map((operator: any) => (*/}
              {/*    <option key={operator.value} value={operator.value}>*/}
              {/*      {operator.name}*/}
              {/*    </option>*/}
              {/*  ))}*/}
              {/*</select>*/}

              <Input
                width={"200px"}
                type={selectedField?.type === "number" ? "number" : "text"}
                value={(rule.value as string | number | undefined) || ""}
                onChange={(e) =>
                  onChange({
                    value: selectedField?.type === "number" ? Number(e.target.value) : e.target.value,
                  })
                }
              />

              <Button size="sm" variant="outline" onClick={slots.onRemove}>
                Remove
              </Button>
              <Button size="sm" variant="outline" onClick={slots.onClone}>
                Clone
              </Button>
            </HStack>
          </Box>
        )}
        renderGroup={({ group, children, slots, onChange }: any) => (
          <div style={{ border: "1px solid black", padding: 8, marginLeft: 10 }}>
            <HStack>
              <NativeSelect.Root size="sm" width={"120px"}>
                <NativeSelect.Field
                  value={group.combinator}
                  onChange={(e) => onChange({ combinator: e.target.value as "and" | "or" })}
                >
                  <option value="and">AND</option>
                  <option value="or">OR</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>

              {/*<select*/}
              {/*  value={group.combinator}*/}
              {/*  onChange={(e) => onChange({ combinator: e.target.value as "and" | "or" })}*/}
              {/*>*/}
              {/*  //@ts-ignore*/}
              {/*  <option value="and">AND</option>*/}
              {/*  <option value="or">OR</option>*/}
              {/*</select>*/}
              <Button size="sm" variant="outline" onClick={slots.onAddRule}>
                Add Rule
              </Button>
              <Button size="sm" variant="outline" onClick={slots.onAddGroup}>
                Add Group
              </Button>
              <Button size="sm" variant="outline" onClick={slots.onRemove}>
                Remove Group
              </Button>
              <Button size="sm" variant="outline" onClick={slots.onClone}>
                Clone
              </Button>
            </HStack>
            <div style={{ marginLeft: 20 }}>{children}</div>
          </div>
        )}
      />
    </QueryBuilder>
  )
}

export default App
