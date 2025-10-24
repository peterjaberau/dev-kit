

import maxBy from 'lodash/maxBy';
import remove from 'lodash/remove';
import { ADD_UI_SCHEMA, REMOVE_UI_SCHEMA, UISchemaActions } from '../actions';
import { NOT_APPLICABLE } from '../testers';
import type { JsonSchema, UISchemaElement } from '../models';
import type { Reducer } from '../store/type';
import { JsonFormsUISchemaRegistryEntry } from '../store';

export const uischemaRegistryReducer: Reducer<
  JsonFormsUISchemaRegistryEntry[],
  UISchemaActions
> = (state = [], action) => {
  switch (action.type) {
    case ADD_UI_SCHEMA:
      return state
        .slice()
        .concat({ tester: action.tester, uischema: action.uischema });
    case REMOVE_UI_SCHEMA: {
      const copy = state.slice();
      remove(copy, (entry) => entry.tester === action.tester);
      return copy;
    }
    default:
      return state;
  }
};

export const findMatchingUISchema =
  (state: JsonFormsUISchemaRegistryEntry[]) =>
  (
    jsonSchema: JsonSchema,
    schemaPath: string,
    path: string
  ): UISchemaElement => {
    const match = maxBy(state, (entry) =>
      entry.tester(jsonSchema, schemaPath, path)
    );
    if (
      match !== undefined &&
      match.tester(jsonSchema, schemaPath, path) !== NOT_APPLICABLE
    ) {
      return match.uischema;
    }
    return undefined as any;
  };
