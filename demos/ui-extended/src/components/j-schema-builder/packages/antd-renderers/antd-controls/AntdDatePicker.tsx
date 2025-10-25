"use client"

import { CellProps, WithClassname, defaultDateFormat } from '#jSchemaBuilder/core';
import { DatePicker } from 'antd';
import merge from 'lodash/merge';
import React, { useMemo } from 'react';
import { createOnChangeHandler, getData } from '../util';

const JSON_SCHEMA_DATE_FORMATS = ['YYYY-MM-DD'];
const DATE_PICKER_STYLE = {
  width: '100%',
};

export const AntdDatePicker = React.memo(function AntdDatePicker(
  props: CellProps &
    WithClassname & { inputProps?: React.ComponentProps<typeof DatePicker> }
) {
  const {
    data,
    className,
    enabled,
    id,
    uischema,
    path,
    handleChange,
    config,
    isValid,
    inputProps,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const format = appliedUiSchemaOptions.dateFormat ?? 'YYYY-MM-DD';
  const saveFormat = appliedUiSchemaOptions.dateSaveFormat ?? defaultDateFormat;

  const onChange: any = useMemo(
    () => createOnChangeHandler(path, handleChange, saveFormat),
    [path, handleChange, saveFormat]
  );

  const value = getData(data, [
    saveFormat,
    format,
    ...JSON_SCHEMA_DATE_FORMATS,
  ]);

  let mode: 'date' | 'month' | 'year' = 'date';
  if (!saveFormat.includes('D')) {
    mode = 'month';
  }
  if (!saveFormat.includes('M')) {
    mode = 'year';
  }

  return (
    <DatePicker
      value={value}
      onChange={onChange}
      format={format}
      allowClear={enabled}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      placeholder={appliedUiSchemaOptions.placeholder}
      style={DATE_PICKER_STYLE}
      mode={mode}
      status={isValid ? undefined : 'error'}
      {...inputProps}
    />
  );
});
