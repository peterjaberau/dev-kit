"use client"
import React from "react"
import { CellProps, isStringControl, RankedTester, rankWith } from "#jSchemaBuilder/core"
import { withJsonFormsCellProps } from "#jSchemaBuilder/react"
import type { VanillaRendererProps } from "../index"
import { withVanillaCellProps } from "../util/index"
import merge from "lodash/merge"
import { Input } from "@chakra-ui/react"

export const TextCell = (props: CellProps & VanillaRendererProps) => {
  const { config, data, className, id, enabled, uischema, schema, path, handleChange } = props
  const maxLength = schema.maxLength
  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  return (
    <Input
      type={appliedUiSchemaOptions.format === "password" ? "password" : "text"}
      value={data || ""}
      onChange={(ev) => handleChange(path, ev.target.value === "" ? undefined : ev.target.value)}
      // className={className}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      placeholder={appliedUiSchemaOptions.placeholder}
      maxLength={appliedUiSchemaOptions.restrict ? maxLength : undefined}
      w={"full"}
      // size={appliedUiSchemaOptions.trim ? maxLength : undefined}
    />
  )
}

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const textCellTester: RankedTester = rankWith(1, isStringControl)

export default withJsonFormsCellProps(withVanillaCellProps(TextCell))
