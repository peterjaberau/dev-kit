import { createContext } from '../../utils/create-context'


export const [LocaleContextProvider, useLocaleContext]: any = createContext<any>({
  name: 'LocaleContext',
  hookName: 'useLocaleContext',
  providerName: '<LocaleProvider />',
  strict: false,
  defaultValue: { dir: 'ltr', locale: 'en-US' },
})
