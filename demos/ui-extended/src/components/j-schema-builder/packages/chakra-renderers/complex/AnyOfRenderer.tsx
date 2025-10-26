"use client"

import React, { useCallback, useState } from 'react';

import {
  createCombinatorRenderInfos,
  isAnyOfControl,
  JsonSchema,
  RankedTester,
  rankWith,
  StatePropsOfCombinator,
} from '#jSchemaBuilder/core';
import {
  JsonFormsDispatch,
  withJsonFormsAnyOfProps,
} from '#jSchemaBuilder/react';
import CombinatorProperties from './CombinatorProperties';
import Hidden from '../util/Hidden';
import { Tabs } from '@chakra-ui/react';

const AnyOfRenderer = ({
  schema,
  rootSchema,
  indexOfFittingSchema,
  visible,
  path,
  renderers,
  cells,
  uischema,
  uischemas,
}: StatePropsOfCombinator) => {
  const [selectedAnyOf, setSelectedAnyOf] = useState(indexOfFittingSchema || 0);
  const handleChange = useCallback(
    (value: number) => setSelectedAnyOf(value),
    [setSelectedAnyOf]
  );
  const anyOf = 'anyOf';
  const anyOfRenderInfos = createCombinatorRenderInfos(
    (schema as JsonSchema).anyOf as JsonSchema[],
    rootSchema,
    anyOf,
    uischema,
    path,
    uischemas
  );

  return (
    <Hidden hidden={!visible}>
      <CombinatorProperties
        schema={schema}
        combinatorKeyword={'anyOf'}
        path={path}
      />
      <Tabs.Root
        value={selectedAnyOf.toString()}
        onValueChange={(e) => handleChange(parseInt(e.value))}
        w='100%'
      >
        <Tabs.List>
          {anyOfRenderInfos.map((anyOfRenderInfo, idx) => (
            <Tabs.Trigger key={idx} value={String(idx)}>
              {anyOfRenderInfo.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {anyOfRenderInfos.map(
          (anyOfRenderInfo, anyOfIndex) =>
            selectedAnyOf === anyOfIndex && (
              <JsonFormsDispatch
                key={anyOfIndex}
                schema={anyOfRenderInfo.schema}
                uischema={anyOfRenderInfo.uischema}
                path={path}
                renderers={renderers}
                cells={cells}
              />
            )
        )}
      </Tabs.Root>
    </Hidden>
  );
};

export const anyOfControlTester: RankedTester = rankWith(3, isAnyOfControl);
export default withJsonFormsAnyOfProps(AnyOfRenderer);
