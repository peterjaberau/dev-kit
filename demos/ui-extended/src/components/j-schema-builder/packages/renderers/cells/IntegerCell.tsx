"use client"
import React from "react"
import { CellProps, isIntegerControl, RankedTester, rankWith } from "#jSchemaBuilder/core"
import { withJsonFormsCellProps } from "#jSchemaBuilder/react"
import type { VanillaRendererProps } from "../index"
import { withVanillaCellProps } from "../util/index"
import { NumberInput } from "@chakra-ui/react"

const toNumber = (value: string) => (value === "" ? undefined : parseInt(value, 10))

export const IntegerCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props

  return (
    <NumberInput.Root
      id={id}
      value={data ?? ""}
      step={1}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      onValueChange={(ev) => handleChange(path, toNumber(ev.value))}
      w={"full"}
    >
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}
/**
 * Default tester for integer controls.
 * @type {RankedTester}
 */
export const integerCellTester: RankedTester = rankWith(2, isIntegerControl)

export default withJsonFormsCellProps(withVanillaCellProps(IntegerCell))
