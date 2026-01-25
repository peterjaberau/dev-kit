import { ReactNode } from "react"


export default function Layout({ children }: { children: ReactNode }) {
  return <div className={"bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"}>{children}</div>
}
