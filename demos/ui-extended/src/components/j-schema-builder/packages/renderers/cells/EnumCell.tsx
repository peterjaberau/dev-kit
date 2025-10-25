"use client"
import React, { useMemo } from "react"
import { EnumCellProps, isEnumControl, RankedTester, rankWith } from "#jSchemaBuilder/core"
import { TranslateProps, withJsonFormsEnumCellProps, withTranslateProps } from "#jSchemaBuilder/react"
import { i18nDefaults, withVanillaEnumCellProps } from "../util"
import type { VanillaRendererProps } from "../index"
import { NativeSelect } from "@chakra-ui/react"
export const EnumCell = (props: EnumCellProps & VanillaRendererProps & TranslateProps) => {
  const { data, className, id, enabled, schema, uischema, path, handleChange, options, t }: any = props
  const noneOptionLabel = useMemo(() => t("enum.none", i18nDefaults["enum.none"], { schema, uischema, path }), [t, schema, uischema, path])
  return (
    <NativeSelect.Root id={id} disabled={!enabled} w={"full"}>
      <NativeSelect.Field
        autoFocus={uischema.options && uischema.options.focus}
        value={data || ""}
        onChange={(ev) => handleChange(path, ev.currentTarget.selectedIndex === 0 ? undefined : ev.currentTarget.value)}
      >
        {[
          <option value={""} key={"jsonforms.enum.none"}>
            {noneOptionLabel}
          </option>,
        ].concat(
          options.map((optionValue: any) => (
            <option value={optionValue.value} key={optionValue.value}>
              {optionValue.label}
            </option>
          )),
        )}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}
/**
 * Default tester for enum controls.
 * @type {RankedTester}
 */
export const enumCellTester: RankedTester = rankWith(2, isEnumControl)

export default withJsonFormsEnumCellProps(withTranslateProps(withVanillaEnumCellProps(EnumCell)))
