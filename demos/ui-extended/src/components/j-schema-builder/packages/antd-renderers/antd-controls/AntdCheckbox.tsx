"use client"

import React from 'react';
import { CellProps, WithClassname } from '#jSchemaBuilder/core';
import { Checkbox } from 'antd';
import merge from 'lodash/merge';

type Props = {
  label?: string;
};

export const AntdCheckbox = React.memo(function AntdCheckbox(
  props: CellProps &
    WithClassname &
    Props & { inputProps?: React.ComponentProps<typeof Checkbox> }
) {
  const {
    data,
    className,
    id,
    enabled,
    label,
    uischema,
    path,
    handleChange,
    config,
    inputProps,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  // !! causes undefined value to be converted to false, otherwise has no effect
  const checked = !!data;

  return (
    <Checkbox
      indeterminate={data === undefined || data === null}
      checked={checked}
      onChange={(e: any) => handleChange(path, e.target.checked)}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={!!appliedUiSchemaOptions.focus}
      {...inputProps}
    >
      {label}
    </Checkbox>
  );
});
