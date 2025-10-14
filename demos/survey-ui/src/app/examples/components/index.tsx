"use client"
import dynamic from "next/dynamic"
import { cache } from "react"
import { Center } from "@chakra-ui/react"

// export const registryMetadata = {
//   "sidebar-006": "#modules/creator-ui/sidebar/examples/sidebar-006",
//   "sidebar-003": "#modules/creator-ui/sidebar/examples/sidebar-003",
// }
// sidebar-with-side-navbar
export const registryMetadata: any[] = [
  {
    id: 'custom',
    title: 'Custom',
    path: "#modules/creator-ui/sidebar/examples/custom"
  },
  {
    id: 'sidebar-006',
    title: 'Sidebar 006',
    path: "#modules/creator-ui/sidebar/examples/sidebar-006"
  },
  {
    id: 'sidebar-003',
    title: 'Sidebar 003',
    path: "#modules/creator-ui/sidebar/examples/sidebar-003"
  },
  {
    id: 'sidebar-with-side-navbar',
    title: 'Sidebar With Side Navbar',
    path: "#modules/creator-ui/sidebar/examples/sidebar-with-side-navbar"
  }
]

export const registryComponentsObj = (id: any) => {

  const getComponentMeta = registryMetadata.find((item) => item.id === id)

  if (!getComponentMeta) {
    return () => <Center>Invalid example ID</Center>
  }
  return dynamic(() => import(`#modules/creator-ui/sidebar/examples/${id}`), { ssr: false })
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
