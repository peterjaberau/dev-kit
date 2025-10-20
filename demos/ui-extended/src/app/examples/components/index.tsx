"use client"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { cache } from "react"
import { Center } from "@chakra-ui/react"

export const registryMeta: any = {
  "jsw-array-items": dynamic(() => import("#components/schema-designer/examples/jsw-array-items"), { ssr: false }),
  "group-panels": dynamic(() => import("#components/ui-dockables/group-panels"), { ssr: false }),
  "movable-panel-001": dynamic(() => import("#components/ui-examples/movable-panel-001"), { ssr: false }),

  "ai-code-and-preview": dynamic(() => import("#components/ui-chakra-pro/ai-code-and-preview"), { ssr: false }),
  "ai-prompt-with-action-02": dynamic(() => import("#components/ui-chakra-pro/ai-prompt-with-action-02"), { ssr: false }),
  "ai-prompt-with-action-centered": dynamic(() => import("#components/ui-chakra-pro/ai-prompt-with-action-centered"), { ssr: false }),
  "card-authentification": dynamic(() => import("#components/ui-chakra-pro/card-authentification"), { ssr: false }),
  "card-career": dynamic(() => import("#components/ui-chakra-pro/card-career"), { ssr: false }),
  "card-payment": dynamic(() => import("#components/ui-chakra-pro/card-payment"), { ssr: false }),
  "card-share-documents": dynamic(() => import("#components/ui-chakra-pro/card-share-documents"), { ssr: false }),
  "card-with-tabs": dynamic(() => import("#components/ui-chakra-pro/card-with-tabs"), { ssr: false }),
  "code-block-002": dynamic(() => import("#components/ui-chakra-pro/code-block-002"), { ssr: false }),
  "code-block-003": dynamic(() => import("#components/ui-chakra-pro/code-block-003"), { ssr: false }),
  "code-block-006": dynamic(() => import("#components/ui-chakra-pro/code-block-006"), { ssr: false }),
  "code-block-010": dynamic(() => import("#components/ui-chakra-pro/code-block-010"), { ssr: false }),
  "custom": dynamic(() => import("#components/ui-chakra-pro/custom"), { ssr: false }),
  "divider-with-button": dynamic(() => import("#components/ui-chakra-pro/divider-with-button"), { ssr: false }),
  "divider-with-button-group": dynamic(() => import("#components/ui-chakra-pro/divider-with-button-group"), { ssr: false }),
  "example-preview-001": dynamic(() => import("#components/ui-chakra-pro/example-preview-001"), { ssr: false }),
  "example-preview-002": dynamic(() => import("#components/ui-chakra-pro/example-preview-002"), { ssr: false }),
  "example-preview-003": dynamic(() => import("#components/ui-chakra-pro/example-preview-003"), { ssr: false }),
  "feed-with-comments-01": dynamic(() => import("#components/ui-chakra-pro/feed-with-comments-01"), { ssr: false }),
  "feed-with-upvote-01": dynamic(() => import("#components/ui-chakra-pro/feed-with-upvote-01"), { ssr: false }),
  "help-center-collection-03": dynamic(() => import("#components/ui-chakra-pro/help-center-collection-03"), { ssr: false }),
  "help-center-collection-04": dynamic(() => import("#components/ui-chakra-pro/help-center-collection-04"), { ssr: false }),
  "help-center-section-02": dynamic(() => import("#components/ui-chakra-pro/help-center-section-02"), { ssr: false }),

  "layout-001": dynamic(() => import("#components/ui-examples/layout-001"), { ssr: false }),
  "layout-app-multi-level-navbar": dynamic(() => import("#components/ui-chakra-pro/layout-app-multi-level-navbar"), { ssr: false }),
  "layout-app-sidebar-column-content": dynamic(() => import("#components/ui-chakra-pro/layout-app-sidebar-column-content"), { ssr: false }),
  "layout-app-two-columns": dynamic(() => import("#components/ui-chakra-pro/layout-app-two-columns"), { ssr: false }),
  "layout-app-width-sidebar": dynamic(() => import("#components/ui-chakra-pro/layout-app-width-sidebar"), { ssr: false }),
  "layout-with-sticky-navbar": dynamic(() => import("#components/ui-chakra-pro/layout-with-sticky-navbar"), { ssr: false }),
  "layout-with-sticky-sidebar": dynamic(() => import("#components/ui-chakra-pro/layout-with-sticky-sidebar"), { ssr: false }),

  "navbar-004": dynamic(() => import("#components/ui-chakra-pro/navbar-004"), { ssr: false }),
  "navbar-multi-level": dynamic(() => import("#components/ui-chakra-pro/navbar-multi-level"), { ssr: false }),
  "navbar-with-centered-search": dynamic(() => import("#components/ui-chakra-pro/navbar-with-centered-search"), { ssr: false }),
  "navbar-with-search": dynamic(() => import("#components/ui-chakra-pro/navbar-with-search"), { ssr: false }),
  "notification-tray-with-filter-empty-state": dynamic(() => import("#components/ui-chakra-pro/notification-tray-with-filter-empty-state"), { ssr: false }),
  "notification-tray-with-tabs-empty-state": dynamic(() => import("#components/ui-chakra-pro/notification-tray-with-tabs-empty-state"), { ssr: false }),
  "onboarding-simple-02": dynamic(() => import("#components/ui-chakra-pro/onboarding-simple-02"), { ssr: false }),
  "onboarding-workspace-03": dynamic(() => import("#components/ui-chakra-pro/custom"), { ssr: false }),
  "onboarding-workspace-04": dynamic(() => import("#components/ui-chakra-pro/onboarding-workspace-04"), { ssr: false }),

  "page-header-with-actions-02": dynamic(() => import("#components/ui-chakra-pro/page-header-with-actions-02"), { ssr: false }),
  "pagination-002": dynamic(() => import("#components/ui-chakra-pro/pagination-002"), { ssr: false }),
  "pagination-003": dynamic(() => import("#components/ui-chakra-pro/pagination-003"), { ssr: false }),

  "panel-001": dynamic(() => import("#components/ui-examples/panel-001"), { ssr: false }),
  "parameter-field-003": dynamic(() => import("#components/ui-chakra-pro/parameter-field-003"), { ssr: false }),
  "parameter-field-004": dynamic(() => import("#components/ui-chakra-pro/parameter-field-004"), { ssr: false }),
  "property-panel-00": dynamic(() => import("#components/ui-chakra-pro/property-panel-00"), { ssr: false }),
  "property-panel-01": dynamic(() => import("#components/ui-chakra-pro/property-panel-01"), { ssr: false }),
  "property-panel-02": dynamic(() => import("#components/ui-chakra-pro/property-panel-02"), { ssr: false }),
  "property-panel-03": dynamic(() => import("#components/ui-chakra-pro/property-panel-03"), { ssr: false }),
  "setting-api-key-empty-state": dynamic(() => import("#components/ui-chakra-pro/setting-api-key-empty-state"), { ssr: false }),
  "setting-billing-usage": dynamic(() => import("#components/ui-chakra-pro/setting-billing-usage"), { ssr: false }),
  "setting-copy-api-key-02": dynamic(() => import("#components/ui-chakra-pro/setting-copy-api-key-02"), { ssr: false }),

  "sharing-02": dynamic(() => import("#components/ui-chakra-pro/sharing-02"), { ssr: false }),
  "sidebar-001": dynamic(() => import("#components/ui-chakra-pro/sidebar-001"), { ssr: false }),

  "sidebar-003": dynamic(() => import("#components/ui-chakra-pro/sidebar-003"), { ssr: false }),
  "sidebar-004": dynamic(() => import("#components/ui-chakra-pro/sidebar-004"), { ssr: false }),
  "sidebar-005": dynamic(() => import("#components/ui-chakra-pro/sidebar-005"), { ssr: false }),

  "sidebar-006": dynamic(() => import("#components/ui-chakra-pro/sidebar-006"), { ssr: false }),
  "sidebar-with-side-navbar": dynamic(() => import("#components/ui-chakra-pro/sidebar-with-side-navbar"), { ssr: false }),
  "toc-line": dynamic(() => import("#components/ui-chakra-pro/toc-line"), { ssr: false }),
  "toc-minimal": dynamic(() => import("#components/ui-chakra-pro/toc-minimal"), { ssr: false }),
  "with-actions": dynamic(() => import("#components/ui-chakra-pro/with-actions"), { ssr: false }),
  "with-project": dynamic(() => import("#components/ui-chakra-pro/with-project"), { ssr: false }),
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
