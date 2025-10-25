"use client"
import React from "react"
import { CellProps, isMultiLineControl, RankedTester, rankWith } from "#jSchemaBuilder/core"
import { withJsonFormsCellProps } from "#jSchemaBuilder/react"
import type { VanillaRendererProps } from "../index"
import { withVanillaCellProps } from "../util/index"
import merge from "lodash/merge"
import { Input, Textarea } from "@chakra-ui/react"

export const TextAreaCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, config, uischema, path, handleChange } = props
  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  return (
    <Textarea
      value={data || ""}
      onChange={(ev) => handleChange(path, ev.target.value === "" ? undefined : ev.target.value)}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      placeholder={appliedUiSchemaOptions.placeholder}
      w={"full"}
    />
  )
}

/**
 * Tester for a multi-line string control.
 * @type {RankedTester}
 */
export const textAreaCellTester: RankedTester = rankWith(2, isMultiLineControl)

export default withJsonFormsCellProps(withVanillaCellProps(TextAreaCell))
