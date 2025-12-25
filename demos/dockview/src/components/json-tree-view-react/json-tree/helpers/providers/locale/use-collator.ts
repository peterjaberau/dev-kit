import { createCollator } from '@zag-js/i18n-utils'
import { useLocaleContext } from './use-locale-context'
import { useMemo } from 'react'


export function useCollator(props: any = {}): any {
  const env = useLocaleContext()
  const locale = props.locale ?? env.locale
  return useMemo(() => {
    const { locale: _, ...options } = props
    return createCollator(locale, options)
  }, [locale, props])
}
