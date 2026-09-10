import { LuDownload, LuStar, LuPlus, LuMenu } from "react-icons/lu"
import { BiExitFullscreen, BiCollapseAlt, BiExpandAlt } from "react-icons/bi"
import { RxOpenInNewWindow } from "react-icons/rx"
import { MdTune, MdClose } from "react-icons/md"
import { FaLayerGroup } from "react-icons/fa6"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { FiMaximize, FiMinimize } from "react-icons/fi"
import { PiSquareSplitHorizontal as SplitHorizontal, PiSquareSplitVertical as SplitVertical } from "react-icons/pi";
import { AiFillCode } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import { LuLightbulb } from "react-icons/lu";
import { GoTasklist } from "react-icons/go";
import { LuArchive } from "react-icons/lu";
import { FaRegSquareCheck } from "react-icons/fa6";
import { Icon } from "@chakra-ui/react"

const headerIconComponents: any = {
  download: LuDownload,
  star: LuStar,
  close_fullscreen: BiExitFullscreen,
  expand: BiExpandAlt,
  collapse: BiCollapseAlt,
  menu: LuMenu,
  add: LuPlus,

  "open-new-window": RxOpenInNewWindow,
  preferences: MdTune,
  maximize: FiMaximize,
  minimize: FiMinimize,
  visible: FaRegEye,
  hidden: FaRegEyeSlash,
  close: MdClose,
  group: FaLayerGroup,
  "split-horizontal": SplitHorizontal,
  "split-vertical": SplitVertical,
  "exit-fullscreen": BiExitFullscreen,

  console: AiFillCode,
  description: FaRegFileAlt,
  shortcut: MdOutlineEditNote,
  solution: LuLightbulb,
  test_cases: GoTasklist,
  archive: LuArchive,
  check_square: FaRegSquareCheck,
}

const RenderIconFromMap = ({ name }: { name: keyof typeof headerIconComponents } | any) => {
  const RenderIcon = headerIconComponents[name]
  return RenderIcon ? <RenderIcon /> : null
}

export type HeaderIconProps = {
  name: string
  onClick?: () => void
  size?: string | any
  css?: any
  [key: string]: any
}


export const HeaderIconRenderer = (props: HeaderIconProps) => {
  const { size = "sm", name, css = {}, ...rest } = props
  return (
    <Icon size={size} css={{ ...css }} {...rest}>
      <RenderIconFromMap name={props.name} />
    </Icon>
  )
}
