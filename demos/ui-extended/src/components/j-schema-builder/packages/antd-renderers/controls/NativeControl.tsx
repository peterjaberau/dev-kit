"use client"

import React from 'react';
import {
  ControlProps,
  isDateControl,
  isDescriptionHidden,
  isTimeControl,
  or,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { withJsonFormsControlProps } from '#jSchemaBuilder/react';
import merge from 'lodash/merge';
import { useDebouncedChange, useFocus } from '../util';
import { Form, Input } from 'antd';

export const NativeControl = (props: ControlProps) => {
  const [focused, onFocus, onBlur] = useFocus();
  const {
    id,
    errors,
    label,
    schema,
    description,
    enabled,
    visible,
    required,
    path,
    handleChange,
    data,
    config,
  } = props;
  const isValid = errors.length === 0;
  const appliedUiSchemaOptions = merge({}, config, props.uischema.options);
  const [inputValue, onChange] = useDebouncedChange(
    handleChange,
    '',
    data,
    path
  );
  const fieldType = appliedUiSchemaOptions.format ?? schema.format;
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );

  const inputStyle = appliedUiSchemaOptions.trim ? {} : { width: '100%' };

  if (!visible) {
    return null;
  }

  return (
    <Form.Item
      required={required}
      hasFeedback={!isValid}
      validateStatus={isValid ? 'success' : 'error'}
      label={label}
      help={!isValid ? errors : showDescription ? description : null}
      htmlFor={id + '-input'}
      id={id}
    >
      <Input
        id={id + '-input'}
        type={fieldType}
        disabled={!enabled}
        style={inputStyle}
        onFocus={onFocus}
        onBlur={onBlur}
        value={inputValue}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export const nativeControlTester: RankedTester = rankWith(
  2,
  or(isDateControl, isTimeControl)
);

export default withJsonFormsControlProps(NativeControl);
