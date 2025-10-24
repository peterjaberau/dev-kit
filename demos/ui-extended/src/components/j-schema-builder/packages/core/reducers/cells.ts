
import {
  ADD_CELL,
  AddCellRendererAction,
  REMOVE_CELL,
  RemoveCellRendererAction,
} from '../actions';
import { JsonFormsCellRendererRegistryEntry, Reducer } from '../store';

type ValidCellReducerActions = AddCellRendererAction | RemoveCellRendererAction;

export type JsonFormsCellRendererRegistryState =
  JsonFormsCellRendererRegistryEntry[];

export const cellReducer: Reducer<
  JsonFormsCellRendererRegistryState,
  ValidCellReducerActions
> = (state = [], { type, tester, cell }) => {
  switch (type) {
    case ADD_CELL:
      return state.concat([{ tester, cell }]);
    case REMOVE_CELL:
      return state.filter((t) => t.tester !== tester);
    default:
      return state;
  }
};
