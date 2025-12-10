import { ComponentType, ReactNode } from "react"

export interface DevToolbarTab {
  id: string;
  label: string;
  icon?: ComponentType<{ size?: number | string; className?: string }>;
  content: ReactNode | (() => ReactNode);
}

export interface DevToolbarProps {
  tabs: DevToolbarTab[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'pane';
  defaultTab?: string;
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  hideInProduction?: boolean;
  environment?: 'development' | 'staging' | 'production' | string;  // Explicit environment
  customIcon?: ReactNode;
  title?: string;
  width?: string;
  maxHeight?: string;
  defaultPaneHeight?: string;  // For pane mode
  defaultOpen?: boolean;  // Control initial open state
}
