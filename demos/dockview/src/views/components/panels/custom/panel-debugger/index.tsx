import { CollapseWrapper } from "../../../common"
import JsonViewer from "../../base/json-viewer"

export const PanelDebugger = ({id, data, viewOptions, dataOptions }: any) => {

  return (
    <CollapseWrapper title={`Inspect Panel - ${id}`}>
      <JsonViewer props={data} />
    </CollapseWrapper>
  )

}
