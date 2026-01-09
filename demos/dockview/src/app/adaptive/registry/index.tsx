"use client"
import dynamic from "next/dynamic"
import { Center } from "@chakra-ui/react"
import { cache, useEffect, useState } from "react"

const registryMeta: any = {
  "adaptive-tree-basic": dynamic(() => import("#adaptive-tree/views/adaptive-tree/stories/adaptive-tree-basic"), { ssr: false }),
}

export const registryComponentsObj = (id: any) => {
  const getComponentMeta = registryMeta[id]

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
