import "./style.css"
import { Center, chakra } from "@chakra-ui/react"
import { AdaptiveMenu } from ".."
import { forwardRef } from "react"




// List > MenuList
export const NodeList = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <AdaptiveMenu.List {...css} {...rest} ref={ref}>
      <AdaptiveMenu.MenuList>{children}</AdaptiveMenu.MenuList>
    </AdaptiveMenu.List>
  )
})


// ListItem > MenuListItem
export const Node = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <AdaptiveMenu.ListItem {...css} {...rest} ref={ref}>
      <AdaptiveMenu.MenuListItem>{children}</AdaptiveMenu.MenuListItem>
    </AdaptiveMenu.ListItem>
  )
})


// MenuItem
export const NodeControl = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <AdaptiveMenu.MenuItem {...css} {...rest} ref={ref}>
      {children}
    </AdaptiveMenu.MenuItem>
  )
})


export const NodeIndicatorBefore = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <AdaptiveMenu.MenuItem {...css} {...rest} ref={ref}>
      {children}
    </AdaptiveMenu.MenuItem>
  )
})
export const NodeIndicatorAfter = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <AdaptiveMenu.MenuItem {...css} {...rest} ref={ref}>
      {children}
    </AdaptiveMenu.MenuItem>
  )
})
export const NodeActions = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props

  return (
    <AdaptiveMenu.MenuItem {...css} {...rest} ref={ref}>
      {children}
    </AdaptiveMenu.MenuItem>
  )
})

export const NodeBranch = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props
  return <AdaptiveMenu.ExpandableMenuItem {...css} {...rest} ref={ref} />
})
export const NodeBranchTrigger = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props
  return <AdaptiveMenu.ExpandableMenuItemTrigger {...css} {...rest} ref={ref} />
})
export const NodeBranchContent = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props
  return <AdaptiveMenu.ExpandableMenuItemContent {...css} {...rest} ref={ref} />
})

export const Item = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props
  return <AdaptiveMenu.MenuItem {...css} {...rest} ref={ref} />
})


export const AdaptiveMenuView = () => {
  return (
    <AdaptiveMenu.List>
      <AdaptiveMenu.MenuList>
        {/* Node */}
        <AdaptiveMenu.ListItem>
          {/* ItemButton | ItemText | ItemLink | ItemCustom */}
          <AdaptiveMenu.MenuListItem>
            <AdaptiveMenu.MenuItem>
              <AdaptiveMenu.MenuItemElementInteractive>
                <AdaptiveMenu.ItemText> example text item </AdaptiveMenu.ItemText>
              </AdaptiveMenu.MenuItemElementInteractive>
              <AdaptiveMenu.MenuItemElementBefore />
              <AdaptiveMenu.MenuItemElementAfter />
            </AdaptiveMenu.MenuItem>

            <AdaptiveMenu.MenuItem>
              <AdaptiveMenu.MenuItemElementInteractive>
                <AdaptiveMenu.ItemButton> example button item </AdaptiveMenu.ItemButton>
              </AdaptiveMenu.MenuItemElementInteractive>
              <AdaptiveMenu.MenuItemElementBefore />
              <AdaptiveMenu.MenuItemElementAfter />
            </AdaptiveMenu.MenuItem>

            <AdaptiveMenu.MenuItem>
              <AdaptiveMenu.MenuItemElementInteractive>
                <AdaptiveMenu.ItemCustom> example custom item </AdaptiveMenu.ItemCustom>
              </AdaptiveMenu.MenuItemElementInteractive>
              <AdaptiveMenu.MenuItemElementBefore />
              <AdaptiveMenu.MenuItemElementAfter />
            </AdaptiveMenu.MenuItem>
          </AdaptiveMenu.MenuListItem>
        </AdaptiveMenu.ListItem>

        <AdaptiveMenu.ExpandableMenuItem>
          <AdaptiveMenu.ExpandableMenuItemTrigger>
            <AdaptiveMenu.MenuItem>{/* render  */}</AdaptiveMenu.MenuItem>
          </AdaptiveMenu.ExpandableMenuItemTrigger>
          <AdaptiveMenu.ExpandableMenuItemContent>

            {/*Primitive list*/}
            <AdaptiveMenu.List>

              <AdaptiveMenu.ItemButton />
              <AdaptiveMenu.ItemText />
              <AdaptiveMenu.ItemLink />

            </AdaptiveMenu.List>
          </AdaptiveMenu.ExpandableMenuItemContent>
        </AdaptiveMenu.ExpandableMenuItem>
      </AdaptiveMenu.MenuList>
    </AdaptiveMenu.List>
  )
}
