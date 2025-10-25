"use client"

import {
  CellProps,
  WithClassname,
  defaultDateTimeFormat,
} from '#jSchemaBuilder/core';
import { DatePicker } from 'antd';
import merge from 'lodash/merge';
import React, { useMemo } from 'react';
import { createOnChangeHandler, getData } from '../util';

const JSON_SCHEMA_DATE_TIME_FORMATS = [
  'YYYY-MM-DDTHH:mm:ss.SSSZ',
  'YYYY-MM-DDTHH:mm:ss.SSS',
  'YYYY-MM-DDTHH:mm:ssZ',
  'YYYY-MM-DDTHH:mm:ss',
];

const DATE_PICKER_STYLE = {
  width: '100%',
};

export const AntdDateTimePicker = React.memo(function AntdDateTimePicker(
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

  const format = appliedUiSchemaOptions.dateTimeFormat ?? 'YYYY-MM-DD HH:mm';
  const saveFormat =
    appliedUiSchemaOptions.dateTimeSaveFormat ?? defaultDateTimeFormat;

  const onChange: any = useMemo(
    () => createOnChangeHandler(path, handleChange, saveFormat),
    [path, handleChange, saveFormat]
  );

  const value = getData(data, [
    saveFormat,
    format,
    ...JSON_SCHEMA_DATE_TIME_FORMATS,
  ]);

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
      showTime={true}
      use12Hours={!!appliedUiSchemaOptions.ampm}
      style={DATE_PICKER_STYLE}
      status={isValid ? undefined : 'error'}
      {...inputProps}
    />
  );
});
