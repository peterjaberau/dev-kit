import "react18-json-view/src/style.css"
import { Provider } from "./provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Provider>{children}</Provider>
}
