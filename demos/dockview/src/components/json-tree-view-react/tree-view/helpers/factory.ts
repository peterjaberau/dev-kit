import { mergeProps } from '@zag-js/core'
import { ReactElement, Ref } from "react"
import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  memo,
} from 'react'
import { composeRefs } from '../utils/compose-refs'


// Credits to the Radix team
function getRef(element: ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) {
    return (element as any).ref
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) {
    return (element.props as { ref?: Ref<unknown> | undefined }).ref
  }

  return (element.props as { ref?: Ref<unknown> | undefined }).ref || (element as any).ref
}

const withAsChild = (Component: React.ElementType) => {
  const Comp = memo(
    forwardRef((props, ref) => {
      const { asChild, children, ...restProps }: any = props

      if (!asChild) {
        return createElement(Component, { ...restProps, ref }, children)
      }

      if (!isValidElement<Record<string, unknown>>(children)) {
        return null
      }

      const onlyChild: React.ReactElement<Record<string, unknown>> = Children.only(children)

      const childRef = getRef(onlyChild)

      return cloneElement(onlyChild, {
        ...mergeProps(restProps, onlyChild.props),
        ref: ref ? composeRefs(ref, childRef) : childRef,
      })
    }),
  )

  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name

  return Comp
}

export const jsxFactory = () => {
  const cache = new Map()

  return new Proxy(withAsChild, {
    apply(_target, _thisArg, argArray) {
      return withAsChild(argArray[0])
    },
    get(_, element) {
      const asElement = element as React.ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement))
      }
      return cache.get(asElement)
    },
  }) as any
}

export const ark = jsxFactory()
