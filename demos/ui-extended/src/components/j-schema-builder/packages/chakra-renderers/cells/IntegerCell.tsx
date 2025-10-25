
import React from 'react';
import {
  CellProps,
  isIntegerControl,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { NumberInput } from '@chakra-ui/react';
import { withJsonFormsCellProps } from '#jSchemaBuilder/react';
import type { VanillaRendererProps } from '../index';
import { withVanillaCellProps } from '../util/index';

const toNumber = (value: string) =>
  value === '' ? undefined : parseInt(value, 10);

export const IntegerCell = (props: CellProps & VanillaRendererProps) => {
  const { data, id, enabled, uischema, path, handleChange } = props;

  return (
    <NumberInput.Root
      inputMode='numeric'
      step={1}
      value={data ?? ''}
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
 * Default tester for integer controls.
 * @type {RankedTester}
 */
export const integerCellTester: RankedTester = rankWith(2, isIntegerControl);

export default withJsonFormsCellProps(withVanillaCellProps(IntegerCell));
