import { useEffect, useRef } from "react"
import { WORKERS_ENUM } from "#/layout-consts"


export function useStringMatchWorker(dictionary: any, searchQuery: any, onResults: any) {
  const workerRef = useRef<Worker | null>(null)

  console.log(dictionary)

  useEffect(() => {
    // const worker = new Worker(new URL(workerRelativePath + WORKERS_ENUM.STRING_MATCH, import.meta.url), { type: "module" });
    const worker = new Worker(new URL("../workers/string-match.worker.ts", import.meta.url), { type: "module" })

    workerRef.current = worker

    worker.onmessage = (e) => onResults?.(e.data)
    return () => worker.terminate()
  }, [])

  useEffect(() => {
    workerRef.current?.postMessage({ name: "set-dictionary", value: dictionary })
    workerRef.current?.postMessage({ name: "find-matches", value: searchQuery })
  }, [dictionary, searchQuery])
}
