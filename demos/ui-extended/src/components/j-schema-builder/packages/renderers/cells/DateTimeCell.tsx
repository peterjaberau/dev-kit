"use client"
import React from "react"
import { CellProps, isDateTimeControl, RankedTester, rankWith } from "#jSchemaBuilder/core"
import { withJsonFormsCellProps } from "#jSchemaBuilder/react"
import type { VanillaRendererProps } from "../index"
import { withVanillaCellProps } from "../util/index"
import { Input } from "@chakra-ui/react"

export const DateTimeCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props
  const toISOString = (inputDateTime: string) => {
    return inputDateTime === "" ? "" : inputDateTime + ":00.000Z"
  }

  return (
    <Input
      variant={"outline"}
      type="datetime-local"
      value={(data || "").substr(0, 16)}
      onChange={(ev) => handleChange(path, toISOString(ev.target.value))}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      w={"full"}
    />
  )
}
/**
 * Default tester for datetime controls.
 * @type {RankedTester}
 */
export const dateTimeCellTester: RankedTester = rankWith(2, isDateTimeControl)

export default withJsonFormsCellProps(withVanillaCellProps(DateTimeCell))
