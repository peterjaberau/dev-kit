import { Code, HStack, NativeSelect } from "@chakra-ui/react"
import * as React from "react"

export const SchemaRowAnyOf = ({ choices, selectedChoice, onChange }: any) => {
  return (
    choices.length > 1 && (
      <NativeSelect.Root aria-label="Pick a type" size="xs">
        <NativeSelect.Field
          value={String(choices.indexOf(selectedChoice))}
          onChange={onChange}
        >
          {choices.map((choice: any, index: any) => (
            <option key={String(index)} value={String(index)}>
              {choice.title}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    )
  )
}
