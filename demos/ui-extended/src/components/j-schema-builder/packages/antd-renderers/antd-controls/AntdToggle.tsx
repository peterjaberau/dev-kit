"use client"

import React from 'react';
import { CellProps, WithClassname } from '#jSchemaBuilder/core';
import { Switch } from 'antd';
import merge from 'lodash/merge';

export const AntdToggle = React.memo(function AntdToggle(
  props: CellProps &
    WithClassname & { inputProps?: React.ComponentProps<typeof Switch> }
) {
  const {
    data,
    className,
    enabled,
    uischema,
    path,
    handleChange,
    config,
    inputProps,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const checked = !!data;

  return (
    <Switch
      checked={checked}
      onChange={(isChecked) => handleChange(path, isChecked)}
      className={className}
      disabled={!enabled}
      autoFocus={!!appliedUiSchemaOptions.focus}
      {...inputProps}
    />
  );
});
