

import {
  defaultErrorTranslator,
  defaultTranslator,
  JsonFormsI18nState,
} from '../i18n';
import {
  I18nActions,
  SET_LOCALE,
  SET_TRANSLATOR,
  UPDATE_I18N,
} from '../actions';
import type { Reducer } from '../util';

export const defaultJsonFormsI18nState: Required<JsonFormsI18nState> = {
  locale: 'en',
  translate: defaultTranslator,
  translateError: defaultErrorTranslator,
};

export const i18nReducer: Reducer<JsonFormsI18nState, I18nActions> = (
  state = defaultJsonFormsI18nState,
  action
) => {
  switch (action.type) {
    case UPDATE_I18N: {
      const locale = action.locale ?? defaultJsonFormsI18nState.locale;
      const translate =
        action.translator ?? defaultJsonFormsI18nState.translate;
      const translateError =
        action.errorTranslator ?? defaultJsonFormsI18nState.translateError;

      if (
        locale !== state.locale ||
        translate !== state.translate ||
        translateError !== state.translateError
      ) {
        return {
          ...state,
          locale,
          translate,
          translateError,
        };
      }
      return state;
    }
    case SET_TRANSLATOR:
      return {
        ...state,
        translate: action.translator ?? defaultTranslator,
        translateError: action.errorTranslator ?? defaultErrorTranslator,
      };
    case SET_LOCALE:
      return {
        ...state,
        locale: action.locale ?? navigator.languages[0],
      };
    default:
      return state;
  }
};

export const fetchLocale = (state?: JsonFormsI18nState) => {
  if (state === undefined) {
    return undefined;
  }
  return state.locale;
};

export const fetchTranslator = (state?: JsonFormsI18nState) => {
  if (state === undefined) {
    return defaultTranslator;
  }
  return state.translate;
};

export const fetchErrorTranslator = (state?: JsonFormsI18nState) => {
  if (state === undefined) {
    return defaultErrorTranslator;
  }
  return state.translateError;
};
