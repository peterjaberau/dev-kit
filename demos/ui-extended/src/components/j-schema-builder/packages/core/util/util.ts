

import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import includes from 'lodash/includes';
import find from 'lodash/find';
import type { JsonSchema, Scoped, UISchemaElement } from '..';
import { resolveData, resolveSchema } from './resolvers';
import { composePaths, toDataPathSegments } from './path';
import { isEnabled, isVisible } from './runtime';
import type Ajv from 'ajv';

/**
 * Escape the given string such that it can be used as a class name,
 * i.e. hashes and slashes will be replaced.
 *
 * @param {string} s the string that should be converted to a valid class name
 * @returns {string} the escaped string
 */
export const convertToValidClassName = (s: string): string =>
  s.replace('#', 'root').replace(new RegExp('/', 'g'), '_');

export const formatErrorMessage = (errors: string[]) => {
  if (errors === undefined || errors === null) {
    return '';
  }

  return errors.join('\n');
};

export const hasType = (jsonSchema: JsonSchema, expected: string): boolean => {
  return includes(deriveTypes(jsonSchema), expected);
};

/**
 * Derives the type of the jsonSchema element
 */
export const deriveTypes = (jsonSchema: JsonSchema): string[] => {
  if (isEmpty(jsonSchema)) {
    return [];
  }
  if (!isEmpty(jsonSchema.type) && typeof jsonSchema.type === 'string') {
    return [jsonSchema.type];
  }
  if (isArray(jsonSchema.type)) {
    return jsonSchema.type;
  }
  if (
    !isEmpty(jsonSchema.properties) ||
    !isEmpty(jsonSchema.additionalProperties)
  ) {
    return ['object'];
  }
  if (!isEmpty(jsonSchema.items)) {
    return ['array'];
  }

  if (!isEmpty(jsonSchema.allOf)) {
    const allOfType = find(
      jsonSchema.allOf,
      (schema: JsonSchema) => deriveTypes(schema).length !== 0
    );

    if (allOfType) {
      return deriveTypes(allOfType);
    }
  }
  // ignore all remaining cases
  return [];
};

/**
 * Convenience wrapper around resolveData and resolveSchema.
 */
export const Resolve: {
  schema(
    schema: JsonSchema,
    schemaPath: string,
    rootSchema: JsonSchema
  ): JsonSchema;
  data(data: any, path: string): any;
} = {
  schema: resolveSchema,
  data: resolveData,
};

// Paths --
const fromScoped = (scopable: Scoped): string =>
  toDataPathSegments(scopable.scope).join('.');

export const Paths = {
  compose: composePaths,
  fromScoped,
};

// Runtime --
export const Runtime = {
  isEnabled(uischema: UISchemaElement, data: any, ajv: Ajv): boolean {
    return isEnabled(uischema, data, undefined, ajv);
  },
  isVisible(uischema: UISchemaElement, data: any, ajv: Ajv): boolean {
    return isVisible(uischema, data, undefined, ajv);
  },
};
