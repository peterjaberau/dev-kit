import "./style.css"
import { Center, chakra } from "@chakra-ui/react"
import { AdaptiveMenu } from ".."
import { forwardRef, useRef } from "react"

export const ViewContainer = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props
  return (
    <Center
      data-scope='view-container'
      css={{
      margin: "0px",
      padding: "0px",
      borderRadius: "sm",
      borderColor: "#0b120e24",
      borderWidth: "thin",
      borderStyle: "solid",
      width: "20pc",
      backgroundColor: "#fff",
      ...css
    }} ref={ref} {...css} {...rest}>
      {children}
    </Center>
  )
})
export const ViewSidebar = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props
  return (
    <chakra.div
      data-scope='view-sidebar'
      data-auto-scrollable={true}
      ref={ref}
      css={{
        ...css,
        margin: "0px",
        padding: "0px",
        flex: "1 1 0px",
        overflow: "auto",
      }}
      {...rest}
    ></chakra.div>
  )})
export const ViewSidebarContent = forwardRef((props: any, ref: any) => {
  const { children, css, ...rest } = props
  return (
    <chakra.div
      data-scope="view-sidebar-content"
      ref={ref}
      css={{
        ...css,
        margin: "0px",
        padding: "0px",
        paddingBlockStart: "9pt",
        paddingInlineEnd: "9pt",
        paddingBlockEnd: "9pt",
        paddingInlineStart: "9pt",
      }}
      {...rest}
    ></chakra.div>
  )})



export const AdaptiveMenuView = () => {
  const ref = useRef<any | null>(null)

  return (
    <ViewContainer>
      <ViewSidebar>
        <ViewSidebarContent>
          <AdaptiveMenu.MenuList>
            <AdaptiveMenu.DndGroupIndicator ref={ref} isActive={state === "is-over"}>

            </AdaptiveMenu.DndGroupIndicator>
          </AdaptiveMenu.MenuList>
        </ViewSidebarContent>
      </ViewSidebar>
    </ViewContainer>
  )
}


/*




      <AdaptiveMenu.List>
        <AdaptiveMenu.MenuList>
<AdaptiveMenu.ListItem>
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
    <AdaptiveMenu.MenuItem></AdaptiveMenu.MenuItem>
  </AdaptiveMenu.ExpandableMenuItemTrigger>
  <AdaptiveMenu.ExpandableMenuItemContent>
    <AdaptiveMenu.List>
      <AdaptiveMenu.ItemButton />
      <AdaptiveMenu.ItemText />
      <AdaptiveMenu.ItemLink />
    </AdaptiveMenu.List>
  </AdaptiveMenu.ExpandableMenuItemContent>
</AdaptiveMenu.ExpandableMenuItem>
</AdaptiveMenu.MenuList>
</AdaptiveMenu.List>

 */