import { DocumentTitle } from "./DocumentTitle"

export function Header() {

  return (
    <header className="flex h-[40px] w-screen items-center justify-between border-b-[1px] border-slate-600 bg-indigo-700 dark:bg-slate-800">
      <div className="flex h-8 items-center justify-center gap-1 pl-2 pt-0.5 sm:gap-1.5">
        <div className="w-20 sm:w-24"></div>
        <p className="font-sans text-sm text-slate-300">by</p>
      </div>
      <DocumentTitle />
      <ol className="flex items-center gap-2 px-4 text-sm"></ol>
    </header>
  )
}
