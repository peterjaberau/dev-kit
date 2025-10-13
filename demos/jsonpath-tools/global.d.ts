// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react"

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

declare module "./language-service-worker?worker&inline" {
  const worker: new () => Worker;
  export default worker;
}
