

import type { ControlElement, JsonSchema, UISchemaElement } from '../models';
import { findUISchema, JsonFormsUISchemaRegistryEntry } from '../reducers';
import { Resolve } from './util';

export interface CombinatorSubSchemaRenderInfo {
  schema: JsonSchema;
  uischema: UISchemaElement;
  label: string;
}

export type CombinatorKeyword = 'anyOf' | 'oneOf' | 'allOf';

const createLabel = (
  subSchema: JsonSchema,
  subSchemaIndex: number,
  keyword: CombinatorKeyword
): string => {
  if (subSchema.title) {
    return subSchema.title;
  } else {
    return keyword + '-' + subSchemaIndex;
  }
};

export const createCombinatorRenderInfos = (
  combinatorSubSchemas: JsonSchema[],
  rootSchema: JsonSchema,
  keyword: CombinatorKeyword,
  control: ControlElement,
  path: string,
  uischemas: JsonFormsUISchemaRegistryEntry[]
): CombinatorSubSchemaRenderInfo[] =>
  combinatorSubSchemas.map((subSchema, subSchemaIndex) => {
    const schema = subSchema.$ref
      ? Resolve.schema(rootSchema, subSchema.$ref, rootSchema)
      : subSchema;
    return {
      schema,
      uischema: findUISchema(
        uischemas,
        schema,
        control.scope,
        path,
        undefined,
        control,
        rootSchema
      ),
      label: createLabel(subSchema, subSchemaIndex, keyword),
    };
  });
