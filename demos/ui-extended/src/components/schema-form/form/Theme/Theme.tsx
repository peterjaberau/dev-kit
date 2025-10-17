import { ThemeProps } from '#schemaForm/core';

import { generateTemplates } from '../Templates';
import { generateWidgets } from '../Widgets';
import { FormContextType, RJSFSchema, StrictRJSFSchema } from '#schemaForm/utils';

export function generateTheme<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(): ThemeProps<T, S, F> {
  return {
    templates: generateTemplates<T, S, F>(),
    widgets: generateWidgets<T, S, F>(),
  };
}

export default generateTheme();
