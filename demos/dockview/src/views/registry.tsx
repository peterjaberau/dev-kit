"use client"
import dynamic from "next/dynamic"
import { Center } from "@chakra-ui/react"
import { cache, useEffect, useState } from "react"

const registryMeta: any = {
  'default': dynamic(() => import("#views/components/panels/base/default"), { ssr: false }),

  // Json Tree
  'json-tree-tree': dynamic(() => import("#views/components/panels/json-tree/tree"), { ssr: false }),

  // Drag & Drop
  'pdnd-tree': dynamic(() => import("#views/components/panels/pdnd/tree"), { ssr: false }),

  // Json Drafts
  'json-view-tree': dynamic(() => import("#views/components/panels/base/json-view-tree"), { ssr: false }),
  'json-tree-renderer': dynamic(() => import("#views/components/panels/base/json-tree-renderer"), { ssr: false }),
  'tree-view-pro': dynamic(() => import("#views/components/panels/base/tree-view-pro"), { ssr: false }),
  'json-tree-view-react': dynamic(() => import("#views/components/panels/base/json-tree-view-react"), { ssr: false }),
  'json-viewer-custom': dynamic(() => import("#views/components/panels/custom/json-viewer-custom"), { ssr: false }),
  'json-viewer': dynamic(() => import("#views/components/panels/base/json-viewer"), { ssr: false }),
  'recursive': dynamic(() => import("#views/components/panels/custom/recursive"), { ssr: false }),

  // Oas
  'oas': dynamic(() => import("#views/components/panels/custom/oas"), { ssr: false }),
  'oas-manager': dynamic(() => import("#views/components/panels/oas-panels/manager"), { ssr: false }),
  'oas-doc': dynamic(() => import("#views/components/panels/custom/oas-doc"), { ssr: false }),
  'oas-json-viewer': dynamic(() => import("#views/components/panels/custom/oas-json-viewer"), { ssr: false }),

  // Misc dockables
  'ai-chat': dynamic(() => import("#views/components/panels/base/ai-chat"), { ssr: false }),
  'code': dynamic(() => import("#views/components/panels/base/code"), { ssr: false }),
  'empty': dynamic(() => import("#views/components/panels/base/empty"), { ssr: false }),
  'placeholder': dynamic(() => import("#views/components/panels/base/placeholder"), { ssr: false }),
  'canvas-illa': dynamic(() => import("#views/components/panels/custom/canvas-illa"), { ssr: false }),
  'renderer': dynamic(() => import("#views/components/panels/base/renderer"), { ssr: false }),
  'custom-collapsible': dynamic(() => import("#views/components/panels/custom/custom-collapsible"), { ssr: false }),


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
