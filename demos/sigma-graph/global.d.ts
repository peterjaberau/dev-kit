// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react"

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

declare module "*?raw" {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
