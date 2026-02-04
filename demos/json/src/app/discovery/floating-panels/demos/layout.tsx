import { Provider } from "#app/provider"
import { Suspense } from "react"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <Provider>{children}</Provider>
    </Suspense>
  )
}
