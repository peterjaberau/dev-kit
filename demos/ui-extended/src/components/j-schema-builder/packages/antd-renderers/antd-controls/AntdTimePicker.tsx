"use client"

import { CellProps, WithClassname, defaultTimeFormat } from '#jSchemaBuilder/core';
import { TimePicker } from 'antd';
import merge from 'lodash/merge';
import React, { useMemo } from 'react';
import { createOnChangeHandler, getData } from '../util';

const JSON_SCHEMA_TIME_FORMATS = [
  'HH:mm:ss.SSSZ',
  'HH:mm:ss.SSS',
  'HH:mm:ssZ',
  'HH:mm:ss',
];

const TIME_PICKER_STYLE = {
  width: '100%',
};

export const AntdTimePicker = React.memo(function AntdTimePicker(
  props: CellProps &
    WithClassname & { inputProps?: React.ComponentProps<typeof TimePicker> }
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
    inputProps,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const format =
    appliedUiSchemaOptions.timeFormat ??
    (appliedUiSchemaOptions.ampm === true ? 'hh:mm a' : 'HH:mm');
  const saveFormat = appliedUiSchemaOptions.timeSaveFormat ?? defaultTimeFormat;

  const onChange = useMemo(
    () => createOnChangeHandler(path, handleChange, saveFormat),
    [path, handleChange, saveFormat]
  );

  const value = getData(data, [
    saveFormat,
    format,
    ...JSON_SCHEMA_TIME_FORMATS,
  ]);

  return (
    <TimePicker
      value={value}
      onChange={onChange}
      format={format}
      allowClear={enabled}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      placeholder={appliedUiSchemaOptions.placeholder}
      use12Hours={!!appliedUiSchemaOptions.ampm}
      style={TIME_PICKER_STYLE}
      {...inputProps}
    />
  );
});
