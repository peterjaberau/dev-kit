

import find from 'lodash/find';
import type { JsonSchema } from '../models';

export const getFirstPrimitiveProp = (schema: any) => {
  if (
    schema &&
    typeof schema === 'object' &&
    'properties' in schema &&
    schema.properties
  ) {
    return find(
      Object.keys(schema.properties),
      (propName: keyof typeof schema.properties) => {
        const prop: unknown = schema.properties[propName];
        return (
          prop &&
          typeof prop === 'object' &&
          'type' in prop &&
          (prop.type === 'string' ||
            prop.type === 'number' ||
            prop.type === 'integer')
        );
      }
    );
  }
  return undefined;
};

/**
 * Tests whether the schema has an enum based on oneOf.
 */
export const isOneOfEnumSchema = (schema: JsonSchema | any) =>
  !!schema &&
  Object.prototype.hasOwnProperty.call(schema, 'oneOf') &&
  schema.oneOf &&
  (schema.oneOf as JsonSchema[]).every((s) => s.const !== undefined);

/**
 * Tests whether the schema has an enum.
 */
export const isEnumSchema = (schema: JsonSchema) =>
  !!schema &&
  typeof schema === 'object' &&
  (Object.prototype.hasOwnProperty.call(schema, 'enum') ||
    Object.prototype.hasOwnProperty.call(schema, 'const'));
