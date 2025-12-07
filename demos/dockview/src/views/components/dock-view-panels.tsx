import { useDockViewPanel } from "#actors/model/machines/dock-view"
import { PanelWrapperDockview } from "./panels/wrappers/panel.wrapper.dockview"
import {
  PanelBaseAiChat,
  PanelBaseCode,
  PanelBaseDefault,
  PanelBaseEmpty,
  PanelBasePlaceholder,
  PanelBaseRenderer,
  PanelBaseJsonViewer,
} from "./panels/base"
import { PanelCustomJsonViewer } from "./panels/custom/panel.custom.json-viewer"

export const DockViewPanels = {
  default: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelCustomJsonViewer {...props} />
      </PanelWrapperDockview>
    )
  },

  placeholderPanel: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBasePlaceholder />
      </PanelWrapperDockview>
    )
  },

  codePanel: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBaseCode />
      </PanelWrapperDockview>
    )
  },

  rendererPanel: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBaseRenderer />
      </PanelWrapperDockview>
    )
  },

  emptyPanel: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBaseEmpty />
      </PanelWrapperDockview>
    )
  },

  aiChatPanel: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBaseAiChat />
      </PanelWrapperDockview>
    )
  },

  jsonViewerPanel: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBaseJsonViewer />
      </PanelWrapperDockview>
    )
  },
}
