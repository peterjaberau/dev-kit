"use client"

import React from 'react';
import { LabelProps, RankedTester, rankWith, uiTypeIs } from '#jSchemaBuilder/core';
import { withJsonFormsLabelProps } from '#jSchemaBuilder/react';

/**
 * Default tester for a label.
 * @type {RankedTester}
 */
export const labelRendererTester: RankedTester = rankWith(1, uiTypeIs('Label'));

/**
 * Default renderer for a label.
 */
export const LabelRenderer = ({ text, visible }: LabelProps) => {
  if (!visible) {
    return null;
  }
  return <label>{text}</label>;
};

export default withJsonFormsLabelProps(LabelRenderer);
