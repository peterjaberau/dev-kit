"use client"
import React from "react"
import { CellProps, isDateControl, RankedTester, rankWith } from "#jSchemaBuilder/core"
import { withJsonFormsCellProps } from "#jSchemaBuilder/react"
import type { VanillaRendererProps } from "../index"
import { withVanillaCellProps } from "../util/index"
import { Input } from "@chakra-ui/react"

export const DateCell = (props: CellProps & VanillaRendererProps | any) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props

  return (
    <Input
      variant={'outline'}
      type={"date"}
      value={data || ""}
      onChange={(ev) => handleChange(path, ev.target.value)}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      w={'full'}
    />
  )
}
/**
 * Default tester for date controls.
 * @type {RankedTester}
 */
export const dateCellTester: RankedTester = rankWith(2, isDateControl)

// @ts-ignore
export default withJsonFormsCellProps(withVanillaCellProps(DateCell))
