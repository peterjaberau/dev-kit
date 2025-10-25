
import React, { useCallback } from 'react';

import {
  ArrayLayoutProps,
  isObjectArrayWithNesting,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { ArrayLayout } from './ArrayLayout';
import { withJsonFormsArrayLayoutProps } from '#jSchemaBuilder/react';
import Hidden from '../util/Hidden';

export const ArrayLayoutRenderer = ({
  visible,
  enabled,
  id,
  uischema,
  schema,
  label,
  rootSchema,
  renderers,
  cells,
  data,
  path,
  errors,
  uischemas,
  addItem,
  translations,
}: ArrayLayoutProps | any) => {
  const addItemCb = useCallback(
    (p: string, value: any) => addItem(p, value),
    [addItem]
  );
  return (
    <Hidden hidden={!visible}>
      <ArrayLayout
        label={label}
        //@ts-ignore
        translations={translations}
        uischema={uischema}
        schema={schema}
        id={id}
        rootSchema={rootSchema}
        errors={errors}
        enabled={enabled}
        visible={visible}
        data={data}
        path={path}
        addItem={addItemCb}
        renderers={renderers}
        cells={cells}
        uischemas={uischemas}
      />
    </Hidden>
  );
};

export const arrayLayoutTester: RankedTester = rankWith(
  4,
  isObjectArrayWithNesting
);
export default withJsonFormsArrayLayoutProps(ArrayLayoutRenderer);
