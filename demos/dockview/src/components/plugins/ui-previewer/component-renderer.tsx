"use client"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { cache } from "react"
import { Center } from "@chakra-ui/react"

export const registryMeta: any = {
  "sharing-02": dynamic(() => import("#components/ui-demos/sharing-02"), { ssr: false }),
}

export const registryComponentsObj = (id: any) => {
  const getComponentMeta = registryMeta[id]

  if (!getComponentMeta) {
    return () => <Center>Invalid example ID</Center>
  }
  return getComponentMeta
}

export const getComponentByID = (id: string, withCache: boolean) => {
  const Component = withCache ? cache(registryComponentsObj(id)) : registryComponentsObj(id)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  return () => loading && <Component />
}

export const ComponentRenderer = (props: { id: string; withCache?: boolean; [key: string]: any }) => {
  const { id, withCache = false, ...rest } = props
  const WidgetComponentRenderer = getComponentByID(id, withCache)

  return <WidgetComponentRenderer key={id} {...rest} />
}
