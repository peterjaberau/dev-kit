"use client"
import dynamic from "next/dynamic"
import { Center } from "@chakra-ui/react"
import { cache, useEffect, useState } from "react"
import { registerComponentsPlugin } from "#plugins/components-plugin"
import { registerFormsPlugin } from "#plugins/forms-plugin"
import { registerRegistryManagerPlugin } from "#plugins/registry-manager-plugin"

export const makeRegistry = (loaders: any, prefix: string) =>
  Object.fromEntries(
    Object.entries(loaders).map(([key, loader]: any) => [`${prefix}${key}`, dynamic(loader, { ssr: false })]),
  )

const registry = {
  ...makeRegistry(registerComponentsPlugin.loaders, registerComponentsPlugin.prefix),
  ...makeRegistry(registerFormsPlugin.loaders, registerFormsPlugin.prefix),
  ...makeRegistry(registerRegistryManagerPlugin.loaders, registerRegistryManagerPlugin.prefix),
}

export const registryComponentsObj = (id: any) => {
  const getComponentMeta = registry[id]

  if (!getComponentMeta) {
    return () => <Center>Invalid example ID</Center>
  }
  return getComponentMeta
}

export const getComponentByID = (id: string, withCache: boolean, props?: any) => {
  const Component = withCache ? cache(registryComponentsObj(id)) : registryComponentsObj(id)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  return () => loading && <Component id={id} {...props} />
}

export const ComponentRenderer = (props: { id: string; withCache?: boolean; [key: string]: any }) => {
  const { id, withCache = false, props: extraProps = null, ...rest } = props
  const ComponentRendered = getComponentByID(id, withCache, extraProps)

  return <ComponentRendered key={id} {...rest} />
}

export const getRegistryNamesFromRegistry = (registry: Record<string, any>): string[] => Object.keys(registry)
export const registryNames: any = getRegistryNamesFromRegistry(registry)

