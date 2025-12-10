"use client"
import { ComponentType, ReactNode } from "react"
import { DevToolbarTab } from "../types"

export const useDevToolbarTab = (
  id: string,
  label: string,
  icon: ComponentType<{ size?: number | string; className?: string }> | undefined,
  content: ReactNode | (() => ReactNode)
): DevToolbarTab => {
  return { id, label, icon, content };
};
