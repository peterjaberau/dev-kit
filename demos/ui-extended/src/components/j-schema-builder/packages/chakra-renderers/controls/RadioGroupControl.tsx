
import React from 'react';
import {
  and,
  ControlProps,
  isEnumControl,
  optionIs,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { withJsonFormsEnumProps } from '#jSchemaBuilder/react';
import { RadioGroupInput } from './RadioGroup';
import { withVanillaControlProps } from '../util';
import type { VanillaRendererProps } from '../index';
export const RadioGroupControl = (
  props: ControlProps & VanillaRendererProps
) => {
  return <RadioGroupInput {...props} />;
};

export const radioGroupControlTester: RankedTester = rankWith(
  3,
  and(isEnumControl, optionIs('format', 'radio'))
);
export default withVanillaControlProps(
  withJsonFormsEnumProps(RadioGroupControl)
);
