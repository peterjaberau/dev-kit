

import isEmpty from 'lodash/isEmpty';
import {
  ControlElement,
  GroupLayout,
  Internationalizable,
  Labelable,
  Labeled,
  Layout,
  Scopable,
  Scoped,
  UISchemaElement,
} from '../models';
import { compose, getPropPath, toDataPathSegments } from './path';

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

/**
 * Find a control in a uiSchema, based on the dotted path of the schema value
 * @param {UISchemaElement} uiSchema the uiSchema to search from
 * @param path a dotted prop path to a schema value (i.e. articles.comment.author)
 * @return {UISchemaElement} or undefined if not found
 */
export const findUiControl = (
  uiSchema: UISchemaElement,
  path: string
): UISchemaElement | undefined => {
  if (isControlElement(uiSchema)) {
    if (isScoped(uiSchema) && uiSchema.scope.endsWith(getPropPath(path))) {
      return uiSchema;
    } else if (uiSchema.options?.detail) {
      return findUiControl(uiSchema.options.detail, path);
    }
  }

  if (isLayout(uiSchema)) {
    for (const elem of uiSchema.elements) {
      const result = findUiControl(elem, path);
      if (result !== undefined) return result;
    }
  }

  return undefined;
};

export const composeWithUi = (scopableUi: Scopable, path: string): string => {
  if (!isScoped(scopableUi)) {
    return path ?? '';
  }

  const segments = toDataPathSegments(scopableUi.scope);

  if (isEmpty(segments)) {
    return path ?? '';
  }

  return compose(path, segments.join('.'));
};

export const isInternationalized = (
  element: unknown
): element is Required<Internationalizable> =>
  typeof element === 'object' &&
  element !== null &&
  typeof (element as Internationalizable).i18n === 'string';

export const isGroup = (layout: Layout): layout is GroupLayout =>
  layout.type === 'Group';

export const isLayout = (uischema: UISchemaElement): uischema is Layout =>
  (uischema as Layout).elements !== undefined;

export const isScopable = (obj: unknown): obj is Scopable =>
  !!obj && typeof obj === 'object';

export const isScoped = (obj: unknown): obj is Scoped =>
  isScopable(obj) && typeof obj.scope === 'string';

export const isLabelable = (obj: unknown): obj is Labelable =>
  !!obj && typeof obj === 'object';

export const isLabeled = <T = never>(obj: unknown): obj is Labeled<T> =>
  isLabelable(obj) && ['string', 'boolean'].includes(typeof obj.label);

export const isControlElement = (
  uiSchema: UISchemaElement
): uiSchema is ControlElement => uiSchema.type === 'Control';
