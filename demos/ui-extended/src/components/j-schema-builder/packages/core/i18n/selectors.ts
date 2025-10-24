
import get from 'lodash/get';
import {
  ErrorTranslator,
  JsonFormsI18nState,
  Translator,
  JsonFormsState,
} from '../store';
import { defaultErrorTranslator, defaultTranslator } from './i18nUtil';

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

export const getLocale = (state: JsonFormsState) =>
  fetchLocale(get(state, 'jsonforms.i18n'));

export const getTranslator =
  () =>
  (state: JsonFormsState): Translator =>
    fetchTranslator(get(state, 'jsonforms.i18n'));

export const getErrorTranslator =
  () =>
  (state: JsonFormsState): ErrorTranslator =>
    fetchErrorTranslator(get(state, 'jsonforms.i18n'));
