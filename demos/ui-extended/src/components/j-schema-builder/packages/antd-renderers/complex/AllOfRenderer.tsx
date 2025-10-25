"use client"

import React from 'react';

import {
  createCombinatorRenderInfos,
  findMatchingUISchema,
  isAllOfControl,
  JsonSchema,
  RankedTester,
  rankWith,
  StatePropsOfCombinator,
} from '#jSchemaBuilder/core';
import { JsonFormsDispatch, withJsonFormsAllOfProps } from '#jSchemaBuilder/react';

export const AllOfRenderer = ({
  schema,
  rootSchema,
  visible,
  renderers,
  cells,
  path,
  uischemas,
  uischema,
}: StatePropsOfCombinator) => {
  const delegateUISchema = findMatchingUISchema(uischemas)(
    schema,
    uischema.scope,
    path
  );

  if (!visible) {
    return null;
  }

  if (delegateUISchema) {
    return (
      <JsonFormsDispatch
        schema={schema}
        uischema={delegateUISchema}
        path={path}
        renderers={renderers}
        cells={cells}
      />
    );
  }
  const allOfRenderInfos = createCombinatorRenderInfos(
    (schema as JsonSchema | any).allOf,
    rootSchema,
    'allOf',
    uischema,
    path,
    uischemas
  );

  return (
    <>
      {allOfRenderInfos.map((allOfRenderInfo, allOfIndex) => (
        <JsonFormsDispatch
          key={allOfIndex}
          schema={allOfRenderInfo.schema}
          uischema={allOfRenderInfo.uischema}
          path={path}
          renderers={renderers}
          cells={cells}
        />
      ))}
    </>
  );
};

export const allOfControlTester: RankedTester = rankWith(3, isAllOfControl);

export default withJsonFormsAllOfProps(AllOfRenderer);
