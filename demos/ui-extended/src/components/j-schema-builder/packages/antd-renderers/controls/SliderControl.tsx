"use client"

import {
  ControlProps,
  RankedTester,
  isRangeControl,
  rankWith,
} from '#jSchemaBuilder/core';
import { withJsonFormsControlProps } from '#jSchemaBuilder/react';
import React from 'react';

import { AntdSlider } from '../antd-controls/AntdSlider';
import { InputControl } from './InputControl';

export const SliderControl = (props: ControlProps) => (
  <InputControl {...props} input={AntdSlider} />
);

export const sliderControlTester: RankedTester = rankWith(4, isRangeControl);

export default withJsonFormsControlProps(SliderControl);
