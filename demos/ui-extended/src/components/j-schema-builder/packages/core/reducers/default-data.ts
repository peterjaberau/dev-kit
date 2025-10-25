

import {
  ADD_DEFAULT_DATA,
  RegisterDefaultDataAction,
  REMOVE_DEFAULT_DATA,
  UnregisterDefaultDataAction,
} from '../actions';
import type { Reducer } from '../util';

export interface JsonFormsDefaultDataRegistryEntry {
  schemaPath: string;
  data: any;
}

type ValidDefaultDataActions =
  | RegisterDefaultDataAction
  | UnregisterDefaultDataAction;

export const defaultDataReducer: Reducer<
  JsonFormsDefaultDataRegistryEntry[],
  ValidDefaultDataActions
> = (state = [], action) => {
  switch (action.type) {
    case ADD_DEFAULT_DATA:
      return state.concat([
        { schemaPath: action.schemaPath, data: action.data },
      ]);
    case REMOVE_DEFAULT_DATA:
      return state.filter((t) => t.schemaPath !== action.schemaPath);
    default:
      return state;
  }
};

export const extractDefaultData = (
  state: JsonFormsDefaultDataRegistryEntry[]
): JsonFormsDefaultDataRegistryEntry[] => state;
