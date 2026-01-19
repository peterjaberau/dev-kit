import { LuSearch as SearchIcon } from "react-icons/lu"
import { ShortcutIcon } from "./Icons/ShortcutIcon"
import { Body } from "./Primitives/Body"
import { Dialog, DialogTrigger, DialogContent } from "./UI/Dialog"

import classnames from "../utilities/classnames"
import { SearchPalette } from "./SearchPalette"
import { useState } from "react"
import { useJsonColumnViewAPI } from "../hooks/useJsonColumnView"
import { useJsonSearchApi } from "../hooks/useJsonSearch"

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const { goToNodeId } = useJsonColumnViewAPI()
  const searchApi = useJsonSearchApi()

  return (
    <Dialog open={isOpen} onOpenChange={() => !isOpen && searchApi.reset()}>
      <DialogTrigger className="focus:outline-none focus-visible:outline-none" onClick={() => setIsOpen(true)}>
        <div className="group flex w-44 items-center justify-between rounded bg-slate-300 py-[3px] transition hover:cursor-pointer hover:bg-slate-400 hover:bg-opacity-50 dark:bg-slate-800 dark:text-slate-400 hover:dark:bg-slate-700 hover:dark:bg-opacity-70">
          <div className="flex items-center pl-1">
            <SearchIcon className="mr-1 h-4 w-4" />
            <Body>Search…</Body>
          </div>
          <div className="flex items-center gap-1 pr-1">
            <ShortcutIcon className="h-4 w-4 bg-slate-200 text-sm transition group-hover:bg-slate-100 dark:bg-slate-700 dark:group-hover:bg-slate-600">
              ⌘
            </ShortcutIcon>
            <ShortcutIcon className="h-4 w-4 bg-slate-200 text-sm transition group-hover:bg-slate-100 dark:bg-slate-700 dark:group-hover:bg-slate-600">
              K
            </ShortcutIcon>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        onOverlayClick={() => setIsOpen(false)}
        className={classnames(
          "fixed z-50",
          "w-[95vw] max-w-2xl rounded-lg",
          "left-[50%] top-0 -translate-x-[50%]",
          "mt-[60px]",
          "border-[1px] border-slate-500 bg-white dark:border-slate-700 dark:bg-slate-800",
        )}
      >
        <SearchPalette
          onClose={() => setIsOpen(false)}
          onSelect={(entry) => {
            setIsOpen(false)
            goToNodeId(entry, "search")
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
