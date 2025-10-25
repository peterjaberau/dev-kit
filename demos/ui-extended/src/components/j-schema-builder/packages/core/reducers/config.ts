

import merge from 'lodash/merge';
import { SET_CONFIG, SetConfigAction } from '../actions';
import { configDefault } from '../configDefault';
import type { Reducer } from '../util';

const applyDefaultConfiguration = (config: any = {}) =>
  merge({}, configDefault, config);

export const configReducer: Reducer<any, SetConfigAction> = (
  state = applyDefaultConfiguration(),
  action
) => {
  switch (action.type) {
    case SET_CONFIG:
      return applyDefaultConfiguration(action.config);
    default:
      return state;
  }
};
