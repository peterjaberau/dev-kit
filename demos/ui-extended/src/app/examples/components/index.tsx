"use client"
import { useState, useEffect } from 'react'
import dynamic from "next/dynamic"
import { cache } from "react"
import { Center } from "@chakra-ui/react"

export const registryMeta: any = {
  "custom": dynamic(() => import('#components/ui-chakra-pro/custom'), { ssr: false }),
  "sidebar-006": dynamic(() => import('#components/ui-chakra-pro/sidebar-006'), { ssr: false }),
  "sidebar-003": dynamic(() => import('#components/ui-chakra-pro/sidebar-003'), { ssr: false }),
  "sidebar-with-side-navbar": dynamic(() => import('#components/ui-chakra-pro/sidebar-with-side-navbar'), { ssr: false }),
  "parameter-field-004": dynamic(() => import('#components/ui-chakra-pro/parameter-field-004'), { ssr: false }),
  "parameter-field-003": dynamic(() => import('#components/ui-chakra-pro/parameter-field-003'), { ssr: false }),
  "example-preview-003": dynamic(() => import('#components/ui-chakra-pro/example-preview-003'), { ssr: false }),
  "code-block-010": dynamic(() => import('#components/ui-chakra-pro/code-block-010'), { ssr: false }),
  "code-block-003": dynamic(() => import('#components/ui-chakra-pro/code-block-003'), { ssr: false }),
  "code-block-006": dynamic(() => import('#components/ui-chakra-pro/code-block-006'), { ssr: false }),
  "code-block-002": dynamic(() => import('#components/ui-chakra-pro/code-block-002'), { ssr: false }),
  "ai-code-and-preview": dynamic(() => import('#components/ui-chakra-pro/ai-code-and-preview'), { ssr: false }),
  "page-header-with-actions-02": dynamic(() => import('#components/ui-chakra-pro/page-header-with-actions-02'), { ssr: false }),
  "ai-prompt-with-action-centered": dynamic(() => import('#components/ui-chakra-pro/ai-prompt-with-action-centered'), { ssr: false }),
  "sharing-02": dynamic(() => import('#components/ui-chakra-pro/sharing-02'), { ssr: false }),
  "property-panel-00": dynamic(() => import('#components/ui-chakra-pro/property-panel-00'), { ssr: false }),
  "property-panel-01": dynamic(() => import('#components/ui-chakra-pro/property-panel-01'), { ssr: false }),
  "property-panel-02": dynamic(() => import('#components/ui-chakra-pro/property-panel-02'), { ssr: false }),
  "property-panel-03": dynamic(() => import('#components/ui-chakra-pro/property-panel-03'), { ssr: false }),
  "movable-panel-001": dynamic(() => import('#components/ui-examples/movable-panel-001'), { ssr: false }),
  "panel-001": dynamic(() => import('#components/ui-examples/panel-001'), { ssr: false }),
  "layout-001": dynamic(() => import('#components/ui-examples/layout-001'), { ssr: false }),



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
  // return (
  //   <>
  //   <Sidebar006 />
  //   </>
  // )
  const WidgetComponentRenderer = getComponentByID(id, withCache)

  return <WidgetComponentRenderer key={id} {...rest} />
}

/*
  *** export const Named ***
  component: dynamic(() => import("#registry/widgets-registry/components/ag-grid").then((mod) => mod.WidgetAGGrid)),


  *** export default Comp ***
  * component: dynamic(() => import('@/registry/blocks/sidebar-01/page')),

 */
