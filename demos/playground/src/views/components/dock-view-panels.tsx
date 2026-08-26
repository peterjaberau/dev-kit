import { PanelDynamic } from "./panels/dynamic"
export const DockViewPanels = {
  default: (props: any) => {
    return (
      <PanelDynamic props={props} />
    )
  },
  dynamic: (props: any) => {
    return (
      <PanelDynamic props={props} />
    )
  },
}
