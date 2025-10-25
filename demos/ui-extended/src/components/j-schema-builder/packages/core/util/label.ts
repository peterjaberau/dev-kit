

import startCase from 'lodash/startCase';

import type { ControlElement, JsonSchema, LabelDescription } from '../models';
import { decode } from './path';

const deriveLabel = (
  controlElement: ControlElement,
  schemaElement?: JsonSchema
): string => {
  if (schemaElement && typeof schemaElement.title === 'string') {
    return schemaElement.title;
  }
  if (typeof controlElement.scope === 'string') {
    const ref = controlElement.scope;
    const label = decode(ref.substr(ref.lastIndexOf('/') + 1));
    return startCase(label);
  }

  return '';
};

export const createCleanLabel = (label: string): string => {
  return startCase(label.replace('_', ' '));
};

/**
 * Return a label object based on the given control and schema element.
 * @param {ControlElement} withLabel the UI schema to obtain a label object for
 * @param {JsonSchema} schema optional: the corresponding schema element
 * @returns {LabelDescription}
 */
export const createLabelDescriptionFrom = (
  withLabel: ControlElement,
  schema?: JsonSchema
): LabelDescription => {
  const labelProperty = withLabel.label;
  if (typeof labelProperty === 'boolean') {
    return labelDescription(deriveLabel(withLabel, schema), labelProperty);
  }
  if (typeof labelProperty === 'string') {
    return labelDescription(labelProperty, true);
  }
  if (typeof labelProperty === 'object') {
    const label =
      typeof labelProperty.text === 'string'
        ? labelProperty.text
        : deriveLabel(withLabel, schema);
    const show =
      typeof labelProperty.show === 'boolean' ? labelProperty.show : true;
    return labelDescription(label, show);
  }
  return labelDescription(deriveLabel(withLabel, schema), true);
};

const labelDescription = (text: string, show: boolean): LabelDescription => ({
  text: text,
  show: show,
});
