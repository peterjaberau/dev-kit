import { SchemaCombinerName } from '@stoplight/json-schema-tree';
import { Dictionary } from '@stoplight/types';

export const COMBINER_PRETTY_NAMES: any = {
  [SchemaCombinerName.AllOf]: 'and',
  [SchemaCombinerName.AnyOf]: 'and/or',
  [SchemaCombinerName.OneOf]: 'or',
};

export const COMMON_JSON_SCHEMA_AND_OAS_FORMATS: any = {
  // strings are omitted because they are the default type to apply format to
  number: ['byte', 'int32', 'int64', 'float', 'double'],
  get integer() {
    return this.number;
  },
};

export const NESTING_OFFSET = 3;


export const COMBINER_NAME_MAP: Dictionary<string, SchemaCombinerName> | any = {
  allOf: 'all of',
  anyOf: 'any of',
  oneOf: 'one of',
};
