"use client"
import React from "react"
import { CellProps, isNumberControl, RankedTester, rankWith } from "#jSchemaBuilder/core"
import { withJsonFormsCellProps } from "#jSchemaBuilder/react"
import type { VanillaRendererProps } from "../index"
import { withVanillaCellProps } from "../util/index"
import { NumberInput } from "@chakra-ui/react"

const toNumber = (value: string) => (value === "" ? undefined : Number(value))

export const NumberCell = (props: (CellProps & VanillaRendererProps) | any) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props

  return (
    <NumberInput.Root
      id={id}
      value={data ?? ""}
      step={0.1}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      onValueChange={(ev) => handleChange(path, toNumber(ev.value))}
      w={'full'}
    >
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

/**
 * Default tester for number controls.
 * @type {RankedTester}
 */
export const numberCellTester: RankedTester = rankWith(2, isNumberControl)

export default withJsonFormsCellProps(withVanillaCellProps(NumberCell))
