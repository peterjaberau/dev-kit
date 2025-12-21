import JsonView, { defaultURLRegExp, JsonViewProps } from './components/json-view'
import { stringifyForCopying as stringify } from './utils'
import {
  BiSolidEdit as EditIcon,
  BiTrash as DeleteIcon,
  BiCheck as DoneIcon,
  BiXCircle as CancelIcon,
  BiCopy as CopyIcon,
  BiCheckCircle as CopiedIcon,
  BiLinkExternal as LinkIcon
} from "react-icons/bi";


export { JsonView as default, stringify, defaultURLRegExp,
  // EditSVG, DeleteSVG, DoneSVG, CancelSVG, CopySVG, CopiedSVG, LinkSVG,
  EditIcon, DeleteIcon, DoneIcon, CancelIcon, CopyIcon, CopiedIcon, LinkIcon
}
export type { JsonViewProps }
