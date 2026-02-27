import { type CSSProperties, ReactNode } from "react"
import { type DivProps } from "../shared/types"

export interface HeaderProps extends DivProps {
  /**
   * @description Actions to be displayed on the right side of the header
   */
  actions?: ReactNode
  /**
   * @description Class name for actions container
   */
  actionsClassName?: string
  /**
   * @description Style for actions container
   */
  actionsStyle?: CSSProperties
  /**
   * @description Logo to be displayed on the left side of the header
   */
  logo?: ReactNode
  /**
   * @description Class name for logo container
   */
  logoClassName?: string
  /**
   * @description Style for logo container
   */
  logoStyle?: CSSProperties
  /**
   * @description Navigation to be displayed on the right side of the logo
   */
  nav?: ReactNode
  /**
   * @description Class name for navigation container
   */
  navClassName?: string
  /**
   * @description Style for navigation container
   */
  navStyle?: CSSProperties
}
