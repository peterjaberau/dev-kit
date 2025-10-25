
import maxBy from 'lodash/maxBy';
import React from 'react';
import {
  ControlProps,
  ControlState,
  isControl,
  isDescriptionHidden,
  NOT_APPLICABLE,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import {
  Control,
  DispatchCell,
  withJsonFormsControlProps,
} from '#jSchemaBuilder/react';
import { Field } from '@chakra-ui/react';
import { withVanillaControlProps } from '../util';
import type { VanillaRendererProps } from '../index';
import merge from 'lodash/merge';

export class InputControl extends Control<
  ControlProps & VanillaRendererProps,
  ControlState
> {
  render() {
    const {
      description,
      id,
      errors,
      label,
      uischema,
      schema,
      rootSchema,
      visible,
      enabled,
      required,
      path,
      cells,
      config,
    } = this.props;

    const isValid = errors.length === 0;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const showDescription = !isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription
    );
    const testerContext = {
      rootSchema: rootSchema,
      config: config,
    };
    const cell = maxBy(cells, (r) => r.tester(uischema, schema, testerContext));
    if (
      cell === undefined ||
      cell.tester(uischema, schema, testerContext) === NOT_APPLICABLE
    ) {
      console.warn('No applicable cell found.', uischema, schema);
      return null;
    } else {
      return (
        <Field.Root
          hidden={!visible}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          required={required}
          id={id}
          invalid={!isValid}
        >
          <Field.Label>{label}</Field.Label>
          <DispatchCell
            uischema={uischema}
            schema={schema}
            path={path}
            enabled={enabled}
          />
          <Field.HelperText>
            {showDescription ? description : ''}
          </Field.HelperText>
          <Field.ErrorText>{errors}</Field.ErrorText>
        </Field.Root>
      );
    }
  }
}

export const inputControlTester: RankedTester = rankWith(1, isControl);

export default withVanillaControlProps(withJsonFormsControlProps(InputControl));
