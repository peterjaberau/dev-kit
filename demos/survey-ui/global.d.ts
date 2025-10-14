// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react"

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}


declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}

declare module '*.svg?url' {
  const content: any
  export default content
}
