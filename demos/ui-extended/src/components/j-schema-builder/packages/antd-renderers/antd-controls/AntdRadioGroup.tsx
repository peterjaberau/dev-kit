"use client"

import React from 'react';
import { CellProps, OwnPropsOfEnum, WithClassname } from '#jSchemaBuilder/core';
import { Radio } from 'antd';

export const AntdRadioGroup = React.memo(function AntdRadioGroup(
  props: CellProps &
    WithClassname &
    OwnPropsOfEnum & {
      inputProps?: React.ComponentProps<typeof Radio.Group>;
    }
) {
  const { data, options, handleChange, path, inputProps } = props;

  return (
    <Radio.Group
      value={data ?? ''}
      onChange={(e: any) => handleChange(path, e.target.value)}
      {...inputProps}
    >
      {(options || []).map((option) => (
        <Radio value={option.value} key={option.label}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
});
