"use client"
import dynamic from "next/dynamic"
import { Center } from "@chakra-ui/react"
import { cache, useEffect, useState } from "react"

const registryMeta: any = {
  'ai-chat': dynamic(() => import("#views/components/panels/base/ai-chat"), { ssr: false }),
  'code': dynamic(() => import("#views/components/panels/base/code"), { ssr: false }),
  'default': dynamic(() => import("#views/components/panels/base/default"), { ssr: false }),
  'empty': dynamic(() => import("#views/components/panels/base/empty"), { ssr: false }),
  'json-viewer': dynamic(() => import("#views/components/panels/base/json-viewer"), { ssr: false }),
  'placeholder': dynamic(() => import("#views/components/panels/base/placeholder"), { ssr: false }),
  'renderer': dynamic(() => import("#views/components/panels/base/renderer"), { ssr: false }),
  'json-viewer-custom': dynamic(() => import("#views/components/panels/custom/json-viewer-custom"), { ssr: false }),
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
