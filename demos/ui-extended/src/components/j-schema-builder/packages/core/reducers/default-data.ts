
import get from 'lodash/get';
import {
  ADD_DEFAULT_DATA,
  REMOVE_DEFAULT_DATA,
  RegisterDefaultDataAction,
  UnregisterDefaultDataAction,
} from '../actions';
import type { Reducer } from '../store/type';
import { JsonFormsState } from '../store';

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

export const getDefaultData = (
  state: JsonFormsState
): JsonFormsDefaultDataRegistryEntry[] =>
  extractDefaultData(get(state, 'jsonforms.defaultData'));
export const extractDefaultData = (
  state: JsonFormsDefaultDataRegistryEntry[]
): JsonFormsDefaultDataRegistryEntry[] => state;
