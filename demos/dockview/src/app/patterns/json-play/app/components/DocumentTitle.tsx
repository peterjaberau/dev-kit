import { useJsonDoc } from "../hooks/useJsonDoc";

export function DocumentTitle() {
  const { doc } = useJsonDoc();

  return (
    <div className="flex w-full items-center justify-center" title={doc.title}>
      <span
        className={
          "min-w-[15vw] text-ellipsis rounded-sm border-none bg-transparent px-2 py-1 pl-10 text-slate-300 transition placeholder:text-slate-400 hover:cursor-text focus:border-none focus:bg-black/30 focus:outline-none dark:bg-transparent dark:text-slate-200 dark:placeholder:text-slate-400 dark:focus:bg-black dark:focus:bg-opacity-10"
        }
      >
        {doc.title}
      </span>
    </div>
  )
}
