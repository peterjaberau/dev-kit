
import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import {
  CellProps,
  createLabelDescriptionFrom,
  isBooleanControl,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { withJsonFormsCellProps } from '#jSchemaBuilder/react';
import type { FC } from 'react';
import type { VanillaRendererProps } from '../index';
import { withVanillaBooleanCellProps } from '../util/index';

export const BooleanCell: FC<CellProps> = (
  props: CellProps & VanillaRendererProps
) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;
  const { text: label } = createLabelDescriptionFrom(uischema, props.schema);

  return (
    <Checkbox.Root
      checked={!!data}
      id={id}
      onCheckedChange={(ev) => handleChange(path, ev.checked)}
      className={className}
      disabled={!enabled}
      // autoFocus={!!appliedUiSchemaOptions.focus}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label fontSize='md' fontWeight='medium'>
        {label}
      </Checkbox.Label>
    </Checkbox.Root>
  );
};

/**
 * Default tester for boolean controls.
 * @type {RankedTester}
 */
export const booleanCellTester: RankedTester = rankWith(2, isBooleanControl);

export default withJsonFormsCellProps(withVanillaBooleanCellProps(BooleanCell));
