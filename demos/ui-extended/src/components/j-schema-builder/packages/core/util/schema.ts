

import find from 'lodash/find';
import { JsonSchema } from '../models';

export const getFirstPrimitiveProp: any = (schema: any) => {
  if (schema.properties) {
    return find(Object.keys(schema.properties), (propName) => {
      const prop = schema.properties[propName];
      return (
        prop.type === 'string' ||
        prop.type === 'number' ||
        prop.type === 'integer'
      );
    });
  }
  return undefined;
};

/**
 * Tests whether the schema has an enum based on oneOf.
 */
export const isOneOfEnumSchema: any = (schema: JsonSchema) =>
  !!schema &&
  Object.prototype.hasOwnProperty.call(schema, 'oneOf') &&
  schema.oneOf &&
  (schema.oneOf as JsonSchema[]).every((s) => s.const !== undefined);
