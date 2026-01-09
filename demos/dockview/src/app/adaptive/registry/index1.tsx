"use client"
import { Center } from "@chakra-ui/react"
import { cache, useEffect, useState, useId } from "react"
import dynamic from "next/dynamic"

export const fetchDefaultComponent = (loader: () => Promise<any>) => dynamic(loader, { ssr: false })

export const fetchFromRegistry = (loader?: () => Promise<any>) => {
  if (!loader) {

    console.log("---loader-----", loader)

    return () => <Center>Invalid example ID</Center>
  }
  return fetchDefaultComponent(loader)
}

export const loadFromRegistry = (
  props:
    | {
        path: string
        withCache: boolean
        extraProps?: any
      }
    | any,
) => {
  const { path, withCache, module = null, extraProps = null, ...rest } = props

  const Component = path ? (withCache ? cache(fetchFromRegistry(path)) : fetchFromRegistry(path)) : null


  const [mounted, setMounted] = useState(false)
  const id = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!Component) return <Center>Invalid example ID</Center>
  if (!mounted) return null

  return <Component {...extraProps} {...rest} id={id} />

}

export const RenderComponent = (props: { path: string; withCache?: boolean; extraProps?: any; [key: string]: any }) => {
  const { path, withCache = false, module = null, extraProps = null, ...rest } = props
  const ComponentRendered: any = loadFromRegistry({ path, withCache, extraProps })

  return <ComponentRendered {...rest} />
}
