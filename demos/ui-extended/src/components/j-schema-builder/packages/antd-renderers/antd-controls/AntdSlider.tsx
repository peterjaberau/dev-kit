"use client"

import React from 'react';
import { CellProps, WithClassname } from '#jSchemaBuilder/core';
import { Slider } from 'antd';
import merge from 'lodash/merge';

export const AntdSlider = React.memo(function AntdSlider(
  props: CellProps &
    WithClassname & { inputProps?: React.ComponentProps<typeof Slider> }
) {
  const {
    data,
    id,
    enabled,
    uischema,
    path,
    handleChange,
    config,
    schema,
    inputProps,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const sliderStyle: { [x: string]: any } = {
    marginTop: '7px',
  };

  const marks = {
    [schema.minimum!]: schema.minimum,
    [schema.maximum!]: schema.maximum,
  };

  return (
    <Slider
      id={id}
      style={sliderStyle}
      min={schema.minimum}
      max={schema.maximum}
      marks={marks}
      value={Number(data || schema.default) as any}
      onChange={(value: any) => {
        handleChange(path, Number(value));
      }}
      disabled={!enabled}
      step={schema.multipleOf || 1}
      autoFocus={!!appliedUiSchemaOptions.focus}
      {...inputProps}
    ></Slider>
  );
});
