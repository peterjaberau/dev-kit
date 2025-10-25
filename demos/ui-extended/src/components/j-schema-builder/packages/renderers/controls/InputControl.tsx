"use client"
import maxBy from "lodash/maxBy"
import React from "react"
import { Field } from "@chakra-ui/react"
import { computeLabel, ControlProps, ControlState, isControl, isDescriptionHidden, NOT_APPLICABLE, RankedTester, rankWith } from "#jSchemaBuilder/core"
import { Control, DispatchCell, withJsonFormsControlProps } from "#jSchemaBuilder/react"
import { withVanillaControlProps } from "../util"
import type { VanillaRendererProps } from "../index"
import merge from "lodash/merge"
import { Input } from '@chakra-ui/react'


export class InputControl extends Control<ControlProps & VanillaRendererProps, ControlState> {
  render() {
    const { classNames, description, id, errors, label, uischema, schema, rootSchema, visible, enabled, required, path, cells, config }: any = this.props

    const isValid = errors.length === 0

    const divClassNames = [classNames.validation].concat(isValid ? classNames.description : classNames.validationError).join(" ")

    const appliedUiSchemaOptions = merge({}, config, uischema.options)
    const showDescription = !isDescriptionHidden(visible, description, this.state.isFocused, appliedUiSchemaOptions.showUnfocusedDescription)
    const testerContext = {
      rootSchema: rootSchema,
      config: config,
    }
    const cell = maxBy(cells, (r: any) => r.tester(uischema, schema, testerContext))
    if (cell === undefined || cell.tester(uischema, schema, testerContext) === NOT_APPLICABLE) {
      console.warn("No applicable cell found.", uischema, schema)
      return null
    } else {
      return (
        <Field.Root invalid={!isValid} id={id} hidden={!visible}>
          {label && <Field.Label>
            {label}
            {required && !appliedUiSchemaOptions.hideRequiredAsterisk && <Field.RequiredIndicator />}
          </Field.Label>}
          <DispatchCell uischema={uischema} schema={schema} path={path} id={id + "-input"} enabled={enabled} />
          {showDescription && description && <Field.HelperText>{description}</Field.HelperText>}
          {!isValid && <Field.ErrorText>{errors}</Field.ErrorText>}
        </Field.Root>
      )
    }
  }
}

export const inputControlTester: RankedTester = rankWith(1, isControl)

export default withVanillaControlProps(withJsonFormsControlProps(InputControl))
