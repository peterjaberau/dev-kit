// utils.ts
import classNames from "classnames"
import { upperFirst } from "lodash"
import type { PANEL_POSITIONS } from "./constants"

interface GetDisplayStyleParameters {
  isFloating?: boolean
}

export const getDisplayStyle = ({ isFloating }: GetDisplayStyleParameters): string =>
  classNames(`panel${upperFirst(isFloating ? "Fixed" : "Relative")}`)

interface GetPositionStyleParameters {
  position?: (typeof PANEL_POSITIONS)[number]
}

export const getPositionStyle = ({ position }: GetPositionStyleParameters): string =>
  classNames(`panel${upperFirst(position)}`)
