"use client"
import dynamic from "next/dynamic"
import { Center } from "@chakra-ui/react"
import { cache, useEffect, useState } from "react"
import { getRegisteredComponent } from "./registry-core"

export const resolveComponent = (id: any) => {
  const Component = getRegisteredComponent(id)

  if (!Component) {
    return () => <Center>Invalid example ID</Center>
  }
  return Component
}

export const getComponentByID = (id: string, withCache: boolean, props?: any) => {
  const Component = withCache ? cache(resolveComponent(id)) : resolveComponent(id)

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
