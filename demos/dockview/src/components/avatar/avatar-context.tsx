import type { ReactNode } from "react"
import { useAvatarContext } from "./use-avatar-context"

export const AvatarContext = (props: any) => props.children(useAvatarContext())
