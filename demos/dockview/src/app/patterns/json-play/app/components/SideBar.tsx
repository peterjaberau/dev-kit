import { ViewColumnsIcon as TemplateIcon, CodeBracketIcon as CodeIcon } from "@heroicons/react/24/outline"
import { TreeIcon } from "./Icons/TreeIcon"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useJsonDoc } from "../hooks/useJsonDoc"
import { Body } from "./Primitives/Body"
import { ShortcutIcon } from "./Icons/ShortcutIcon"

export function SideBar() {
  const { doc } = useJsonDoc()

  return (
    <div className="side-bar align-center flex h-full flex-col justify-between bg-slate-200 p-1 transition dark:bg-slate-800">
      <ol className="relative">
        <SidebarLink to={{ id: doc.id, mode: "columns" }}>
          <Body>Column view</Body>
          <TemplateIcon className="h-full w-full p-2" />
        </SidebarLink>

        <SidebarLink to={{ id: doc.id, mode: "editor" }}>
          <Body>JSON view</Body>
          <CodeIcon className="h-full w-full p-2" />
        </SidebarLink>

        <SidebarLink to={{ id: doc.id, mode: "tree" }}>
          <Body>Tree view</Body>
          <TreeIcon className="h-full w-full p-2" />
        </SidebarLink>
      </ol>
    </div>
  )
}

function SidebarLink({ children, to }: { children: React.ReactNode; to: { id: string; mode?: string } }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentId = searchParams.get("id")
  const currentMode = searchParams.get("mode") ?? "columns"

  const isActive = currentId === to.id && currentMode === (to.mode ?? "columns") // ← active via query match

  const activeClasses = "relative w-10 h-10 mb-1 text-white bg-indigo-700 rounded-sm transition"

  const inactiveClasses =
    "relative w-10 h-10 mb-1 text-slate-700 hover:bg-slate-300 rounded-sm transition dark:text-white dark:hover:bg-slate-700"

  return (
    <Link
      href={{
        pathname, // ← same page
        query: {
          id: to.id,
          mode: to.mode ?? "columns",
        },
      }}
      scroll={false}
    >
      <li className={isActive ? activeClasses : inactiveClasses}>{children}</li>
    </Link>
  )
}
