import { createFilter } from '@zag-js/i18n-utils'
import { useMemo } from 'react'
import { useLocaleContext } from './use-locale-context'


export function useFilter(props: any): any {
  const env = useLocaleContext()
  const locale = props.locale ?? env.locale
  return useMemo(() => createFilter({ ...props, locale }), [locale, props])
}

