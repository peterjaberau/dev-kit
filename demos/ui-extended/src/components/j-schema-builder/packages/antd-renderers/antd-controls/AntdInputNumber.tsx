"use client"

import React from 'react';
import { CellProps, WithClassname } from '#jSchemaBuilder/core';
import merge from 'lodash/merge';
import { InputNumber } from 'antd';
import { useDebouncedChange } from '../util';

const toNumber = (value: string) =>
  value === '' ? undefined : parseFloat(value);
const eventToValue = (value: any) => toNumber(value);

export const AntdInputNumber = React.memo(function AntdInputNumber(
  props: CellProps &
    WithClassname & { inputProps?: React.ComponentProps<typeof InputNumber> }
) {
  const {
    data,
    className,
    id,
    enabled,
    uischema,
    path,
    handleChange,
    config,
    inputProps,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const inputStyle = !appliedUiSchemaOptions.trim ? { width: '100%' } : {};

  const [inputValue, onChange]: any = useDebouncedChange(
    handleChange,
    '',
    data,
    path,
    eventToValue
  );

  return (
    <InputNumber
      value={inputValue}
      onChange={onChange}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      step={0.1}
      style={inputStyle}
      placeholder={appliedUiSchemaOptions.placeholder}
      {...inputProps}
    />
  );
});
