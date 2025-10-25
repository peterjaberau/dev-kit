
import React from 'react';
import {
  CellProps,
  isRangeControl,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { Flex, Field, Slider } from '@chakra-ui/react';
import { withJsonFormsCellProps } from '#jSchemaBuilder/react';
import type { VanillaRendererProps } from '../index';
import { withVanillaCellProps } from '../util/index';

export const SliderCell = (props: CellProps & VanillaRendererProps) => {
  const { data, id, enabled, schema, path, handleChange } = props;

  return (
    <Flex>
      <Slider.Root
        maxW='200px'
        max={schema.maximum}
        min={schema.minimum}
        value={data || schema.default}
        onValueChange={(e) => handleChange(path, Number(e.value))}
        id={id}
        disabled={!enabled}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
      <Field.Label style={{ marginLeft: '0.5em' }}>
        {data || schema.default}
      </Field.Label>
    </Flex>
  );
};

export const sliderCellTester: RankedTester = rankWith(4, isRangeControl);

export default withJsonFormsCellProps(withVanillaCellProps(SliderCell));
