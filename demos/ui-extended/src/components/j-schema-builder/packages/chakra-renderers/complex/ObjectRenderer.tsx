"use client"

import isEmpty from 'lodash/isEmpty';
import {
  findUISchema,
  GroupLayout,
  isObjectControl,
  RankedTester,
  rankWith,
  StatePropsOfControlWithDetail,
} from '#jSchemaBuilder/core';
import {
  JsonFormsDispatch,
  withJsonFormsDetailProps,
} from '#jSchemaBuilder/react';
import React, { useMemo } from 'react';
import Hidden from '../util/Hidden';

const ObjectRenderer = ({
  renderers,
  cells,
  uischemas,
  schema,
  label,
  path,
  visible,
  enabled,
  uischema,
  rootSchema,
}: StatePropsOfControlWithDetail) => {
  const detailUiSchema = useMemo(
    () =>
      findUISchema(
        uischemas as any,
        schema,
        uischema.scope,
        path,
        'Group',
        uischema,
        rootSchema
      ),
    [uischemas, schema, uischema.scope, path, uischema, rootSchema]
  );
  if (isEmpty(path)) {
    detailUiSchema.type = 'VerticalLayout';
  } else {
    (detailUiSchema as GroupLayout).label = label;
  }
  return (
    <Hidden hidden={!visible}>
      <JsonFormsDispatch
        visible={visible}
        enabled={enabled}
        schema={schema}
        uischema={detailUiSchema}
        path={path}
        renderers={renderers}
        cells={cells}
      />
    </Hidden>
  );
};

export const objectControlTester: RankedTester = rankWith(2, isObjectControl);
export default withJsonFormsDetailProps(ObjectRenderer);
