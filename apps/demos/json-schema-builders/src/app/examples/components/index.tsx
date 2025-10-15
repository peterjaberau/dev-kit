"use client"
import dynamic from "next/dynamic"
import { cache } from "react"
import { Center } from "@chakra-ui/react"

// export const registryMetadata = {
//   "sidebar-006": "#components/ui-chakra-pro/sidebar-006",
//   "sidebar-003": "#components/ui-chakra-pro/sidebar-003",
// }
// sidebar-with-side-navbar
export const registryMetadata: any[] = [
  {
    id: 'custom',
    title: 'Custom',
    path: "#components/ui-chakra-pro/custom"
  },
  {
    id: 'sidebar-006',
    title: 'Sidebar 006',
    path: "#components/ui-chakra-pro/sidebar-006"
  },
  {
    id: 'sidebar-003',
    title: 'Sidebar 003',
    path: "#components/ui-chakra-pro/sidebar-003"
  },
  {
    id: 'sidebar-with-side-navbar',
    title: 'Sidebar With Side Navbar',
    path: "#components/ui-chakra-pro/sidebar-with-side-navbar"
  },
//

  {
    id: 'parameter-field-004',
    title: 'Parameter Field 004',
    path: "#components/ui-chakra-pro/parameter-field-004"
  },
  // example-preview-003
  {
    id: 'parameter-field-003',
    title: 'Parameter Field 003',
    path: "#components/ui-chakra-pro/parameter-field-003"
  },

  {
    id: 'example-preview-003',
    title: 'Example Preview 003',
    path: "#components/ui-chakra-pro/example-preview-003"
  },

  {
    id: 'code-block-010',
    title: 'Code block 010',
    path: "#components/ui-chakra-pro/code-block-010"
  },

  {
    id: 'code-block-003',
    title: 'Code block 003',
    path: "#components/ui-chakra-pro/code-block-003"
  },

  {
    id: 'code-block-006',
    title: 'Code block 006',
    path: "#components/ui-chakra-pro/code-block-006"
  },

  {
    id: 'code-block-002',
    title: 'Code block 002',
    path: "#components/ui-chakra-pro/code-block-002"
  },

  {
    id: 'ai-code-and-preview',
    title: 'Ai Code And Preview',
    path: "#components/ui-chakra-pro/ai-code-and-preview"
  },

  {
    id: 'page-header-with-actions-02',
    title: 'Page Header With Actions 02',
    path: "#components/ui-chakra-pro/page-header-with-actions-02"
  },
  {
    id: 'ai-prompt-with-action-centered',
    title: 'Ai Prompt With Action Centered',
    path: "#components/ui-chakra-pro/ai-prompt-with-action-centered"
  },

  {
    id: 'sharing-02',
    title: 'Sharing 02',
    path: "#components/ui-chakra-pro/sharing-02"
  },

  {
    id: 'property-panel-00',
    title: 'Property panel 00',
    path: "#components/ui-chakra-pro/property-panel-00"
  },

  {
    id: 'property-panel-01',
    title: 'Property panel 01',
    path: "#components/ui-chakra-pro/property-panel-01"
  },

  {
    id: 'property-panel-02',
    title: 'Property panel 02',
    path: "#components/ui-chakra-pro/property-panel-02"
  },

  {
    id: 'property-panel-03',
    title: 'Property panel 03',
    path: "#components/ui-chakra-pro/property-panel-03"
  },


]

export const registryComponentsObj = (id: any) => {

  const getComponentMeta = registryMetadata.find((item) => item.id === id)

  if (!getComponentMeta) {
    return () => <Center>Invalid example ID</Center>
  }
  return dynamic(() => import(`#components/ui-chakra-pro/${id}`), { ssr: false })
}

export const getComponentByID = (id: string, withCache: boolean) => {
  const Component = withCache ? cache(registryComponentsObj(id)) : registryComponentsObj(id)
  return () => <Component />
}

export const ComponentRenderer = (props: { id: string; withCache?: boolean; [key: string]: any }) => {
  const { id, withCache = false, ...rest } = props
  const WidgetComponentRenderer = getComponentByID(id, withCache)

  return <WidgetComponentRenderer key={id} {...rest} />
}

/*
  *** export const Named ***
  component: dynamic(() => import("#registry/widgets-registry/components/ag-grid").then((mod) => mod.WidgetAGGrid)),


  *** export default Comp ***
  * component: dynamic(() => import('@/registry/blocks/sidebar-01/page')),

 */
