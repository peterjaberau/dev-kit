// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react"

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

declare module "html2canvas" {
  function html2canvas(
    element: HTMLElement,
    options?: any
  ): Promise<HTMLCanvasElement>;
  export default html2canvas;
}

declare module "screenfull" {
  interface Screenfull {
    isEnabled: boolean;
    isFullscreen: boolean;
    request(element?: HTMLElement): Promise<void>;
    exit(): Promise<void>;
    toggle(element?: HTMLElement): Promise<void>;
    onchange: ((event?: Event) => void) | null;
    onerror: ((event?: Event) => void) | null;
  }
  const screenfull: Screenfull;
  export default screenfull;
}
