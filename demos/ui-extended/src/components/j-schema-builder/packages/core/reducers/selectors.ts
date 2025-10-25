

import get from 'lodash/get';
import type Ajv from 'ajv';
import type { JsonFormsState } from '../store';
import type { JsonSchema, UISchemaElement } from '../models';
import {
  extractAjv,
  extractData,
  extractSchema,
  extractUiSchema,
} from './core';
import {
  extractDefaultData,
  JsonFormsDefaultDataRegistryEntry,
} from './default-data';
import type { JsonFormsRendererRegistryEntry } from './renderers';
import type { JsonFormsCellRendererRegistryEntry } from './cells';
import type { JsonFormsUISchemaRegistryEntry } from './uischemas';

export const getData = (state: JsonFormsState | any) =>
  extractData(get(state, 'jsonforms.core'));
export const getSchema = (state: JsonFormsState | any): JsonSchema =>
  extractSchema(get(state, 'jsonforms.core'));
export const getUiSchema = (state: JsonFormsState | any): UISchemaElement =>
  extractUiSchema(get(state, 'jsonforms.core'));
export const getAjv = (state: JsonFormsState | any): Ajv | any =>
  extractAjv(get(state, 'jsonforms.core'));
export const getDefaultData = (
  state: JsonFormsState
): JsonFormsDefaultDataRegistryEntry[] =>
  extractDefaultData(get(state, 'jsonforms.defaultData'));
export const getRenderers = (
  state: JsonFormsState | any
): JsonFormsRendererRegistryEntry[] => get(state, 'jsonforms.renderers');
export const getCells = (
  state: JsonFormsState | any
): JsonFormsCellRendererRegistryEntry[] => get(state, 'jsonforms.cells');
export const getUISchemas = (
  state: JsonFormsState | any
): JsonFormsUISchemaRegistryEntry[] => get(state, 'jsonforms.uischemas');
