"use client"

import React from 'react';
import {
  ControlProps,
  ControlState,
  isDescriptionHidden,
} from '#jSchemaBuilder/core';
import { Control } from '#jSchemaBuilder/react';
import { Field } from '@chakra-ui/react';
import merge from 'lodash/merge';
import Hidden from '../util/Hidden';

export interface WithInput {
  input: any;
}

export class InputControlWrapper extends Control<
  ControlProps & WithInput,
  ControlState
> {
  render() {
    const {
      id,
      description,
      errors,
      label,
      uischema,
      visible,
      required,
      config,
      input,
    } = this.props;
    const isValid = errors.length === 0;
    const appliedUiSchemaOptions = merge({}, config, uischema.options);

    const showDescription = !isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription
    );

    const InnerComponent = input;
    const style = !appliedUiSchemaOptions.trim ? { width: '100%' } : {};

    return (
      <Hidden hidden={!visible}>
        <>
          <Field.Root
            required={required}
            invalid={!isValid}
            style={style}
            id={id}
          >
            <Field.Label>{label}</Field.Label>
            <InnerComponent
              {...this.props}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              id={id + '-input'}
              isValid={isValid}
              visible={visible}
            />
            <Field.HelperText>
              {showDescription ? description : ''}
            </Field.HelperText>
            <Field.ErrorText>{errors}</Field.ErrorText>
          </Field.Root>
        </>
      </Hidden>
    );
  }
}
