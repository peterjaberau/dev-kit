"use client"
import { Card } from '@chakra-ui/react'
import { PanelHeader } from "./components/panel-header"
import { ActionMenu } from "./components/action-menu"
import { ActionToobar } from "./components/action-toolbar"

import { PanelTitle } from "./components/panel-title"
import { IndicatorWarning } from "./components/indicator-warning"
import { IndicatorStreaming } from "./components/indicator-streaming"
import { IndicatorSpinner } from "./components/indicator-spinner"
import { IndicatorProgress } from "./components/indicator-progress"
import { IndicatorCollapsible } from "./components/indicator-collapsible"
import { PanelContent } from './components/panel-content'
import { useState } from "react"

export const Panel = ({ title, menu, toolbar, warning, collapse }: any) => {
  const [collapseOpen, setCollapseOpen] = useState(collapse)



  const start = [
    collapse?.collapsible && <IndicatorCollapsible collapsed={collapse?.collapsed || false} />,
    warning?.show && !!warning?.tooltip && (
      <IndicatorWarning content={warning.tooltip} />
    ),
    <PanelTitle title={title} />,
    <IndicatorStreaming />,
  ].filter(Boolean)


  return (
    <>
      <Card.Root>
        <Card.Header>
          <PanelHeader
            start={start}
            end={[<ActionToobar items={toolbar} />, <ActionMenu items={menu} />]}
          />
        </Card.Header>
        <Card.Body>
          <PanelContent renderAs='placeholder' title='placeholder title' description='description content' />
        </Card.Body>
      </Card.Root>
    </>
  )
}
