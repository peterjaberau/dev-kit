import { createInstance } from "antd-style"
import { StudioStylish, StudioThemeToken } from "./themes"

type ProEditorToken = {
  editorPrefix: string
}
declare module "antd-style" {
  export interface CustomToken extends StudioThemeToken {}

  export interface CustomStylish extends StudioStylish {}
  export interface CustomToken extends ProEditorToken {}
}

const { createStyles, ThemeProvider } = createInstance<ProEditorToken>({
  customToken: {
    editorPrefix: "editor",
  },
})

export {
  createGlobalStyle,
  css,
  cx,
  injectGlobal,
  keyframes,
  useAntdToken as useToken,
  type AntdToken,
} from "antd-style"
export * from "./themes"
export { ThemeProvider, createStyles }
