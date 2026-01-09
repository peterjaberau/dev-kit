"use client"
import dynamic from "next/dynamic"
import { Center } from "@chakra-ui/react"
import { cache, useEffect, useState } from "react"

const registryMeta: any = {
  "adaptive-tree-basic": dynamic(() => import("#adaptive-tree/views/adaptive-tree/stories/adaptive-tree-basic"), {
    ssr: false,
  }),

  "adaptive-json-all": dynamic(() => import("#adaptive-json/stories/all"), {
    ssr: false,
  }),

  "adaptive-json-basic": dynamic(() => import("#adaptive-json/stories/basic"), {
    ssr: false,
  }),

  "adaptive-json-errors": dynamic(() => import("#adaptive-json/stories/errors"), {
    ssr: false,
  }),

  "adaptive-json-expand-level": dynamic(() => import("#adaptive-json/stories/expand-level"), {
    ssr: false,
  }),

  "adaptive-json-functions": dynamic(() => import("#adaptive-json/stories/functions"), {
    ssr: false,
  }),
  "adaptive-json-map-and-set": dynamic(() => import("#adaptive-json/stories/map-and-set"), {
    ssr: false,
  }),

  "adaptive-json-regex": dynamic(() => import("#adaptive-json/stories/regex"), {
    ssr: false,
  }),

  "adaptive-json-render-value": dynamic(() => import("#adaptive-json/stories/render-value"), {
    ssr: false,
  }),

  "adaptive-json-root-provider": dynamic(() => import("#adaptive-json/stories/root-provider"), {
    ssr: false,
  }),

  //array-data

  //adaptive-json
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
