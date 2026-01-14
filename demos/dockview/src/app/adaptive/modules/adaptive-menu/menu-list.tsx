import { forwardRef } from "react"
import { chakra, HStack } from "@chakra-ui/react"
import { useMenu } from './use-menu'
import { List } from './list'
/**
 * An [unordered list] for semantically grouping list items.
 */
// export const MenuList = forwardRef((props: any, ref: any) => {
//   const { css, ...rest } = props
//
//
//
//   return (
//     <chakra.div
//       data-scope="menu-list"
//       ref={ref}
//       css={{
//         flexDirection: 'column',
//         display: 'flex',
//         flex: 1,
//         ...css,
//       }}
//       {...rest}
//       >
//       <List/>
//     </chakra.div>
//   )
// })

export { List as MenuList } from './list'
