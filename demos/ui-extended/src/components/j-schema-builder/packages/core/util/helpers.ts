

import type { ControlElement, JsonSchema, LabelDescription } from '../models';
import { createLabelDescriptionFrom } from './label';
import { convertToValidClassName } from './util';

export const Helpers: {
  createLabelDescriptionFrom(
    withLabel: ControlElement,
    schema: JsonSchema
  ): LabelDescription;
  convertToValidClassName(s: string): string;
} = {
  createLabelDescriptionFrom,
  convertToValidClassName,
};
