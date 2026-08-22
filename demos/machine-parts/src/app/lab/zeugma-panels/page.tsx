import { Suspense } from 'react'
import { DemoView } from "./example/views/demo"


export default async function Page() {
  return (
    <>
      <Suspense>
        <DemoView />
      </Suspense>
    </>
  )
}
