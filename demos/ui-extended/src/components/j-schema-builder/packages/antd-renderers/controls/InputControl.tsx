"use client"

import { ControlProps, isDescriptionHidden } from '#jSchemaBuilder/core';
import { Form } from 'antd';
import React from 'react';

import merge from 'lodash/merge';
import { AntdCheckbox } from '../antd-controls';
import { useFocus } from '../util';

export interface WithInput {
  input: any;
}

export const InputControl = (props: ControlProps & WithInput) => {
  const [focused, onFocus, onBlur] = useFocus();
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
  } = props;
  const isValid = errors.length === 0;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );

  // const firstFormHelperText = showDescription
  //   ? description
  //   : !isValid
  //   ? errors
  //   : null;
  // const secondFormHelperText = showDescription && !isValid ? errors : null;
  const help = !isValid ? errors : showDescription ? description : null;

  const InnerComponent = input;
  const style = !appliedUiSchemaOptions.trim ? { width: '100%' } : {};

  if (!visible) {
    return null;
  }

  return (
    <Form.Item
      required={required}
      hasFeedback={!isValid}
      validateStatus={isValid ? 'success' : 'error'}
      label={input !== AntdCheckbox ? label : ''}
      help={help}
      style={style}
      htmlFor={id + '-input'}
      id={id}
    >
      <InnerComponent
        {...props}
        label={label}
        inputProps={{
          onFocus,
          onBlur,
        }}
        id={id + '-input'}
        isValid={isValid}
        visible={visible}
      />
    </Form.Item>
  );
};
