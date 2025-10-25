"use client"
import React, { useMemo } from "react"
import { EnumCellProps, isOneOfEnumControl, RankedTester, rankWith } from "#jSchemaBuilder/core"
import { TranslateProps, withJsonFormsOneOfEnumCellProps, withTranslateProps } from "#jSchemaBuilder/react"
import { i18nDefaults, withVanillaEnumCellProps } from "../util"
import type { VanillaRendererProps } from "../index"
import { NativeSelect } from "@chakra-ui/react"

export const OneOfEnumCell = (props: EnumCellProps & VanillaRendererProps & TranslateProps) => {
  const { data, className, id, enabled, schema, uischema, path, handleChange, options, t }: any = props
  const noneOptionLabel = useMemo(() => t("enum.none", i18nDefaults["enum.none"], { schema, uischema, path }), [t, schema, uischema, path])
  const noneOption = (
    <option value={""} key={"jsonforms.enum.none"}>
      {noneOptionLabel}
    </option>
  )
  return (
    <NativeSelect.Root id={id} disabled={!enabled} variant={"outline"} w={"full"}>
      <NativeSelect.Field
        autoFocus={uischema.options && uischema.options.focus}
        value={data || ""}
        onChange={(ev) => handleChange(path, ev.currentTarget.selectedIndex === 0 ? undefined : ev.currentTarget.value)}
      >
        {(uischema.options?.hideEmptyOption === true ? [] : [noneOption]).concat(
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
 * Default tester for oneOf enum controls.
 * @type {RankedTester}
 */
export const oneOfEnumCellTester: RankedTester = rankWith(2, isOneOfEnumControl)

export default withJsonFormsOneOfEnumCellProps(withTranslateProps(withVanillaEnumCellProps(OneOfEnumCell)))
