import * as React from "react"
import  { FunctionComponent } from "react"
import type { IDockviewPanelProps } from "#adaptive-view/core"
import { DefaultPanel } from "./internals/defaultPanel"
import { ChartPanel } from "./chartPanel"
import { CorrelationPanel } from "./correlationPanel"
import { DebugPanel } from './debugPanel';
import { EventLogPanel } from "./eventLogPanel"
import { FxTilesPanel } from "./fxTilesPanel"
import { LayoutInspectorPanel } from "./layoutInspectorPanel"
import { MapboxPanel } from "./mapboxPanel"
import { NewsPanel } from "./newsPanel"
import { OrderBookPanel } from "./orderBookPanel"
import { OrdersPanel } from "./ordersPanel"
import { PositionSummaryPanel } from "./positionSummaryPanel"
import { PriceAlertPanel } from "./priceAlertPanel"
import { SignalsPanel } from "./signalsPanel"
import { VolSurfacePanel } from "./volSurfacePanel"
import { WatchlistPanel } from "./watchlistPanel"

import { WrapperWithScrollArea } from './components/scoll-area'
import { PanelApiProvider } from "../providers/PanelApiContext"


const DebugContext = React.createContext<boolean>(false)

const wrap = (Inner: FunctionComponent): FunctionComponent<IDockviewPanelProps> => {
  const Wrapped: FunctionComponent<IDockviewPanelProps> = ({ api }) => (
    <PanelApiProvider api={api}>
      <WrapperWithScrollArea>
        <Inner />
      </WrapperWithScrollArea>
    </PanelApiProvider>
  )
  Wrapped.displayName = `Dockable(${Inner.displayName ?? Inner.name ?? "Panel"})`
  return Wrapped
}


export const DESKTOP_DOCKVIEW_COMPONENTS: Record<string, FunctionComponent<IDockviewPanelProps>> = {
  default: wrap(DefaultPanel),
  chart: wrap(ChartPanel),
  correlation: wrap(CorrelationPanel),
  debuginfo: wrap(DebugPanel),
}