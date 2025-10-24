
import type { ControlElement, UISchemaElement } from '../models';
import { defaultDataReducer } from './default-data';
import { rendererReducer } from './renderers';
import { findMatchingUISchema, uischemaRegistryReducer } from './uischemas';
import { i18nReducer } from './i18n';

import { Generate } from '../generators';
import type { JsonSchema } from '../models/jsonSchema';

import { cellReducer } from './cells';
import { configReducer } from './config';
import { coreReducer } from './core';
import { JsonFormsUISchemaRegistryEntry } from '../store';

export const jsonFormsReducerConfig = {
  core: coreReducer,
  renderers: rendererReducer,
  cells: cellReducer,
  config: configReducer,
  uischemas: uischemaRegistryReducer,
  defaultData: defaultDataReducer,
  i18n: i18nReducer,
};

/**
 * Finds a registered UI schema to use, if any.
 * @param schema the JSON schema describing the data to be rendered
 * @param schemaPath the according schema path
 * @param path the instance path
 * @param fallback the type of the layout to use or a UI-schema-generator function
 * @param control may be checked for embedded inline uischema options
 */
export const findUISchema = (
  uischemas: JsonFormsUISchemaRegistryEntry[],
  schema: JsonSchema,
  schemaPath: string,
  path: string,
  fallback: string | (() => UISchemaElement) = 'VerticalLayout',
  control?: ControlElement,
  rootSchema?: JsonSchema
): UISchemaElement => {
  // handle options
  if (control && control.options && control.options.detail) {
    if (typeof control.options.detail === 'string') {
      if (control.options.detail.toUpperCase() === 'GENERATE') {
        //use fallback generation function
        if (typeof fallback === 'function') {
          return fallback();
        }
        // force generation of uischema
        return Generate.uiSchema(schema, fallback, undefined, rootSchema);
      }
    } else if (typeof control.options.detail === 'object') {
      // check if detail is a valid uischema
      if (
        control.options.detail.type &&
        typeof control.options.detail.type === 'string'
      ) {
        return control.options.detail as UISchemaElement;
      }
    }
  }
  // default
  const uiSchema = findMatchingUISchema(uischemas)(schema, schemaPath, path);
  if (uiSchema === undefined) {
    //use fallback generation function
    if (typeof fallback === 'function') {
      return fallback();
    }
    return Generate.uiSchema(schema, fallback, '#', rootSchema);
  }
  return uiSchema;
};
