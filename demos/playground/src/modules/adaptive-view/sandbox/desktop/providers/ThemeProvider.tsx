import { useSelector } from "@xstate/react"
import { DESKTOP_DARK_COLORS, DESKTOP_LIGHT_COLORS } from "../presets"
import { useDesktop } from "../selectors/desktop.selector"

const useThemeActor = (kind: "desktop" | "dockview") => {
  const { desktopContext } = useDesktop()
  const actorRef = desktopContext.theme[`${kind}ThemeRef`]
  const state: any = useSelector(actorRef, (snapshot) => snapshot)

  return { actorRef, state, context: state.context }
}

export const useDesktopTheme = () => {
  const { actorRef, state, context } = useThemeActor("desktop")

  return {
    desktopThemeRef: actorRef,
    sendToDesktopTheme: actorRef.send,
    desktopThemeState: state,
    desktopThemeContext: context,
    desktopThemeName: context.current.desktopTheme,
    desktopTheme: context.current.desktopThemeProfile?.theme,
  }
}

export const useDockviewTheme = () => {
  const { actorRef, state, context } = useThemeActor("dockview")

  return {
    dockviewThemeRef: actorRef,
    sendToDockviewTheme: actorRef.send,
    dockviewThemeState: state,
    dockviewThemeContext: context,
    dockviewTheme: context.current.dockviewThemeProfile,
  }
}

export const useDesktopColors = () => {
  const { desktopThemeContext } = useDesktopTheme()
  const { dockviewTheme } = useDockviewTheme()
  const colorScheme = dockviewTheme.colorScheme === "light" ? "light" : "dark"

  return (
    desktopThemeContext.current.desktopThemeProfile?.colors?.[colorScheme] ??
    (colorScheme === "light" ? DESKTOP_LIGHT_COLORS : DESKTOP_DARK_COLORS)
  )
}
