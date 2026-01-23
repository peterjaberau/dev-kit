"use client"
import { FC, ReactNode } from "react"
import { Stack } from "@chakra-ui/react"
import useMeasure from "react-use-measure"
import { InspectorBody } from "./body"
import InspectorFooter from "./footer"
import { InspectorHeader } from "./header"


export interface BaseRootInspectorProps {
  title: string
  bodyContent: ReactNode
  footerContent?: ReactNode
  docLink?: string
  onClose: () => void
}

export interface RootInspectorProps extends BaseRootInspectorProps {
  docLink?: string
  canMove?: boolean
  w?: number
  h?: number
}






export const RootInspector: FC<RootInspectorProps> = (props) => {
  const { bodyContent, title, footerContent, canMove, w, h, onClose, docLink } = props

  const hasFooterChildren = (Array.isArray(footerContent) && footerContent.length > 0) || footerContent != null

  const [ref, rect] = useMeasure()

  return (
    <Stack
      gap={0}
      css={{
        width: w != undefined ? `${w}px` : "100%",
        height: h != undefined ? `${h}px` : "100%",
        backgroundColor: "white",
        boxShadow: "0px 4px 8px #20100010,0px 0px 1px #19140035",
        borderRadius: "0.5rem",
        border: "1px solid #e9e8e6",
      }}
    >
      <InspectorHeader title={title} onClose={onClose} canMove={canMove} docLink={docLink} />
      <InspectorBody footerHeight={rect.height}>{bodyContent}</InspectorBody>
      <InspectorFooter hasFooterChildren={hasFooterChildren} canMove={canMove} ref={ref}>
        {footerContent}
      </InspectorFooter>
    </Stack>
  )
}

RootInspector.displayName = "RootInspector"
