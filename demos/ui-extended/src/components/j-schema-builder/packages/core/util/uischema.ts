

import isEmpty from 'lodash/isEmpty';
import { isLayout, UISchemaElement } from '../models';

export type IterateCallback = (uischema: UISchemaElement) => void;

const setReadonlyPropertyValue =
  (value: boolean): IterateCallback =>
  (child: UISchemaElement): void => {
    if (!child.options) {
      child.options = {};
    }
    child.options.readonly = value;
  };
export const setReadonly = (uischema: UISchemaElement): void => {
  iterateSchema(uischema, setReadonlyPropertyValue(true));
};
export const unsetReadonly = (uischema: UISchemaElement): void => {
  iterateSchema(uischema, setReadonlyPropertyValue(false));
};
export const iterateSchema = (
  uischema: UISchemaElement,
  toApply: IterateCallback
): void => {
  if (isEmpty(uischema)) {
    return;
  }
  if (isLayout(uischema)) {
    uischema.elements.forEach((child) => iterateSchema(child, toApply));
    return;
  }
  toApply(uischema);
};
