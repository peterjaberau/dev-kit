

import type { ControlElement, UISchemaElement } from '../models';
import { coreReducer, errorAt, subErrorsAt } from './core';
import { defaultDataReducer } from './default-data';
import { rendererReducer } from './renderers';
import type { JsonFormsState } from '../store';
import type { JsonFormsUISchemaRegistryEntry } from './uischemas';
import { findMatchingUISchema, uischemaRegistryReducer } from './uischemas';
import { fetchErrorTranslator, fetchLocale, i18nReducer } from './i18n';

import { Generate } from '../generators';
import type { JsonSchema } from '../models/jsonSchema';

import { cellReducer } from './cells';
import { configReducer } from './config';
import get from 'lodash/get';
import { fetchTranslator } from '.';
import type { ErrorTranslator, Translator } from '../i18n';

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
        return Generate.uiSchema(schema, fallback);
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

export const getErrorAt =
  (instancePath: string, schema: JsonSchema) => (state: JsonFormsState | any) => {
    return errorAt(instancePath, schema)(state.jsonforms.core);
  };

export const getSubErrorsAt =
  (instancePath: string, schema: JsonSchema) => (state: JsonFormsState | any) =>
    subErrorsAt(instancePath, schema)(state.jsonforms.core);

export const getConfig = (state: JsonFormsState) => state.jsonforms.config;

export const getLocale = (state: JsonFormsState) =>
  fetchLocale(get(state, 'jsonforms.i18n'));

export const getTranslator =
  () =>
  (state: JsonFormsState): Translator | any =>
    fetchTranslator(get(state, 'jsonforms.i18n'));

export const getErrorTranslator =
  () =>
  (state: JsonFormsState): ErrorTranslator | any =>
    fetchErrorTranslator(get(state, 'jsonforms.i18n'));
