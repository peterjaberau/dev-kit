import { PanelSuspense } from "./PanelSuspense"
import { PanelSettingsContext, PanelRenderProps, PanelDefinition } from "./types"

const PatternPanelImpl = ({ panelId, panelTitle, config, setConfig }: PanelRenderProps) => {
  return <div>this is pattern Panel</div>
}

const PatternPanelSettingsImpl = ({ config, setConfig, topics }: PanelSettingsContext) => {
  return <div>this is pattern Panel settings</div>
}

export const patternPanelDefinition: PanelDefinition = {
  type: "Pattern",
  defaultTitle: "Pattern",
  createDefaultConfig: () => ({
    topic: "",
    uiRefreshHz: 10,
    pauseUpdates: false,
    latestOnly: true,
    maxExpandedDepth: 4,
    maxRows: 2000,
    maxBinaryPreviewBytes: 256,
    binaryCopyFormat: "uint8array",
  }),
  configSchema: {
    version: 1,
    parse: ({ input }: any) => {
      return {
        topic: input.topic || "",
        uiRefreshHz: input.uiRefreshHz || 10,
        pauseUpdates: input.pauseUpdates || false,
        latestOnly: input.latestOnly || true,
        maxExpandedDepth: input.maxExpandedDepth || 4,
        maxRows: input.maxRows || 2000,
        maxBinaryPreviewBytes: input.maxBinaryPreviewBytes || 256,
        binaryCopyFormat: input.binaryCopyFormat || "uint8array",
      }
    },
  },
  render: (props: PanelRenderProps) => {
    return (
      <PanelSuspense>
        <PatternPanelImpl {...props} />
      </PanelSuspense>
    )
  },
  renderSettings: (ctx: PanelSettingsContext) => {
    return <PatternPanelSettingsImpl {...ctx} />
  },
}
