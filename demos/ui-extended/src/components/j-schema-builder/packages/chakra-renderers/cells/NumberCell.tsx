"use client"

import React from 'react';
import {
  CellProps,
  isNumberControl,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { NumberInput } from '@chakra-ui/react';
import { withJsonFormsCellProps } from '#jSchemaBuilder/react';
import type { VanillaRendererProps } from '../index';
import { withVanillaCellProps } from '../util/index';

const toNumber = (value: string) => (value === '' ? undefined : Number(value));

export const NumberCell = (props: CellProps & VanillaRendererProps) => {
  const { data, id, enabled, uischema, path, handleChange } = props;

  return (
    <NumberInput.Root
      inputMode='decimal'
      step={0.1}
      value={data ?? 0}
      onValueChange={(e) => handleChange(path, toNumber(e.value))}
      id={id}
      disabled={!enabled}
      focusInputOnChange={uischema.options && uischema.options.focus}
    >
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  );
};

/**
 * Default tester for number controls.
 * @type {RankedTester}
 */
export const numberCellTester: RankedTester = rankWith(2, isNumberControl);

export default withJsonFormsCellProps(withVanillaCellProps(NumberCell));
