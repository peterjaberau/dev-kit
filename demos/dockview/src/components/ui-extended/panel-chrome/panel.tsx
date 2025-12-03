'use client'
import { PanelHeader } from "./components/panel-header"
import { ActionMenu } from './components/action-menu'
import { ActionToobar } from "./components/action-toolbar"

import { PanelTitle } from "./components/panel-title"
import { IndicatorWarning } from "./components/indicator-warning"
import { IndicatorStreaming } from "./components/indicator-streaming"
import { IndicatorSpinner } from "./components/indicator-spinner"
import { IndicatorProgress } from "./components/indicator-progress"
import { IndicatorCollapsible } from "./components/indicator-collapsible"



export const Panel = ({ title, menu, toolbar }: any) => {
  return (
    <>
    <PanelHeader
      start={[
        <IndicatorCollapsible />,
        <IndicatorWarning />,
        <PanelTitle title={title} />,
        <IndicatorStreaming />
      ]}
      end={[
        // <ActionToobar items={toolbar} />,
        <ActionMenu items={menu} />

      ]}
    />
    </>
  )
}
