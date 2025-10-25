

import { convertToValidClassName, createLabelDescriptionFrom } from './util';
import type { ControlElement, JsonSchema, LabelDescription } from './models';

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
