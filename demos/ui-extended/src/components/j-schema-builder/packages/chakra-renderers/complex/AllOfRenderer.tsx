
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
import {
  JsonFormsDispatch,
  withJsonFormsAllOfProps,
} from '#jSchemaBuilder/react';
import Hidden from '../util/Hidden';

const AllOfRenderer = ({
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
  if (delegateUISchema) {
    return (
      <Hidden hidden={!visible}>
        <JsonFormsDispatch
          schema={schema}
          uischema={delegateUISchema}
          path={path}
          renderers={renderers}
          cells={cells}
        />
      </Hidden>
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
    <Hidden hidden={!visible}>
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
    </Hidden>
  );
};

export const allOfControlTester: RankedTester = rankWith(3, isAllOfControl);
export default withJsonFormsAllOfProps(AllOfRenderer);
