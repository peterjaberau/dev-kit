'use client'
import {
  cellReducer,
  configReducer,
  coreReducer,
  i18nReducer,
  JsonFormsState,
  JsonFormsSubStates,
  rendererReducer,
  uischemaRegistryReducer,
} from '#jSchemaBuilder/core';
import { connect } from 'react-redux';
import { combineReducers, Reducer } from 'redux';
import React from 'react';
// This import will be aliased to '#jSchemaBuilder/react' via rollup
import { JsonFormsContext, JsonFormsReduxContextProps } from '..';

const JsonFormsReduxProvider = ({
  children,
  dispatch,
  ...other
}: JsonFormsReduxContextProps) => {
  return (
    <JsonFormsContext.Provider
      value={{
        dispatch,
        ...other,
      }}
    >
      {children}
    </JsonFormsContext.Provider>
  );
};

export const JsonFormsReduxContext = connect((state: JsonFormsState) => ({
  ...state.jsonforms,
}))(JsonFormsReduxProvider);

export const jsonformsReducer = (
  additionalReducers = {}
): Reducer<JsonFormsSubStates> =>
  combineReducers<JsonFormsSubStates>({
    core: coreReducer,
    renderers: rendererReducer,
    cells: cellReducer,
    config: configReducer,
    uischemas: uischemaRegistryReducer,
    i18n: i18nReducer,
    ...additionalReducers,
  });
