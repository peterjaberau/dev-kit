import { isRTL } from '@zag-js/i18n-utils'
import { LocaleContextProvider } from './use-locale-context'

export const LocaleProvider = (props: any) => {
  const { children, locale } = props

  const context: any = {
    locale,
    dir: isRTL(locale) ? 'rtl' : 'ltr',
  }

  return <LocaleContextProvider value={context}>{children}</LocaleContextProvider>
}
