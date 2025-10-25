'use client'
import React from 'react';
import {
  CellProps,
  isBooleanControl,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { withJsonFormsCellProps } from '#jSchemaBuilder/react';
import type { VanillaRendererProps } from '../index';
import { withVanillaBooleanCellProps } from '../util/index';
import { Checkbox } from '@chakra-ui/react'

export const BooleanCell = (
  props: CellProps & VanillaRendererProps
) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  return (
    <Checkbox.Root
      onChange={(ev: any) => handleChange(path, ev.checked)}
      checked={!!data}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control />
    </Checkbox.Root>
  );
};

/**
 * Default tester for boolean controls.
 * @type {RankedTester}
 */

// @ts-ignore
export const booleanCellTester: RankedTester | any = rankWith(2, isBooleanControl);

// @ts-ignore
export default withJsonFormsCellProps(withVanillaBooleanCellProps(BooleanCell));
