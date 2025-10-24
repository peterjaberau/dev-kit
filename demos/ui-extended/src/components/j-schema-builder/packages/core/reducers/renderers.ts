

import {
  ADD_RENDERER,
  AddRendererAction,
  REMOVE_RENDERER,
  RemoveRendererAction,
} from '../actions';
import { Reducer } from '../store/type';
import { JsonFormsRendererRegistryEntry } from '../store';

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
