import { forwardRef, useId } from "react"
import { chakra, HStack } from "@chakra-ui/react"
import { MenuListItem } from "./menu-list-item"
import { MenuSectionContext } from "./menu-section-context"

// export const MenuSection = forwardRef((props: any, ref: any) => {
//   const { css, ...rest } = props
//
//   return (
//     <chakra.div
//       role="group"
//       data-scope="menu-section"
//       ref={ref}
//       css={{
//         ...css,
//       }}
//     />
//   )
// })

export const MenuSection = ({ children, isMenuListItem = false }: any) => {
  const id = useId()


  const content = (
    <MenuSectionContext.Provider value={id}>
      <div role="group" aria-labelledby={`${id}-heading`}>
        {children}
      </div>
    </MenuSectionContext.Provider>
  )

  if (isMenuListItem) {
    return <MenuListItem>{content}</MenuListItem>
  }

  // Legacy. isMenuListItem should become default.
  return content
}
