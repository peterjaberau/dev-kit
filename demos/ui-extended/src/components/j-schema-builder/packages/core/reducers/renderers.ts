

import type { RankedTester } from '../testers';
import {
  ADD_RENDERER,
  AddRendererAction,
  REMOVE_RENDERER,
  RemoveRendererAction,
} from '../actions';
import type { Reducer } from '../util';

export interface JsonFormsRendererRegistryEntry {
  tester: RankedTester;
  renderer: any;
}

type ValidRendererReducerActions = AddRendererAction | RemoveRendererAction;

export const rendererReducer: Reducer<
  JsonFormsRendererRegistryEntry[],
  ValidRendererReducerActions
> = (state = [], action) => {
  switch (action.type) {
    case ADD_RENDERER:
      return state.concat([
        { tester: action.tester, renderer: action.renderer },
      ]);
    case REMOVE_RENDERER:
      return state.filter((t) => t.tester !== action.tester);
    default:
      return state;
  }
};
