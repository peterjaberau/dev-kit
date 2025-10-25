"use client"

import React, { useCallback } from 'react';

import {
  ArrayLayoutProps,
  isObjectArrayWithNesting,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import {
  withArrayTranslationProps,
  withJsonFormsArrayLayoutProps,
  withTranslateProps,
} from '#jSchemaBuilder/react';
import { ArrayLayout } from './ArrayLayout';

export const ArrayLayoutRenderer = ({
  visible,
  addItem,
  ...props
}: ArrayLayoutProps) => {
  const addItemCb = useCallback(
    (p: string, value: any) => addItem(p, value),
    [addItem]
  );

  if (!visible) {
    return null;
  }

  return <ArrayLayout visible={visible} addItem={addItemCb} {...props} />;
};

export const arrayLayoutTester: RankedTester = rankWith(
  4,
  isObjectArrayWithNesting
);
export default withJsonFormsArrayLayoutProps(
  withTranslateProps(withArrayTranslationProps(ArrayLayoutRenderer))
);
